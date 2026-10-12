// MCP endpoint for the AI Sense Wiki backend — exposes the knowledge base to
// external agents over SSE (GET /sse + POST /messages).
// Tools: ask_wiki (grounded Q&A via the same upstream model) and search_wiki
// (term/loop/FDE-question lookup over the site's public search index).
//
// Each SSE connection gets its own McpServer: the SDK refuses to connect one
// server to a second transport, so a shared instance crashed on the second
// concurrent client. Open sessions are capped and idle ones are closed.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

const IDLE_MS = 30 * 60_000;

export function mountMcp(app, { askUpstream, spendDaily, rateLimit, siteUrl, token, mcpDailyCap, maxSessions }) {
  let indexCache = null;
  let indexAt = 0;
  async function loadIndex() {
    if (indexCache && Date.now() - indexAt < 10 * 60_000) return indexCache;
    const res = await fetch(`${siteUrl}/wiki/search-index.json`, { signal: AbortSignal.timeout(5_000) });
    if (!res.ok) throw new Error(`index fetch ${res.status}`);
    indexCache = await res.json();
    indexAt = Date.now();
    return indexCache;
  }

  // ask_wiki gets its own (smaller) daily budget on top of the global one, so
  // agents can't starve the site chat.
  let mcpDay = "";
  let mcpCount = 0;
  function spendMcp() {
    const today = new Date().toISOString().slice(0, 10);
    if (today !== mcpDay) {
      mcpDay = today;
      mcpCount = 0;
    }
    if (mcpCount >= mcpDailyCap || !spendDaily()) return false;
    mcpCount += 1;
    return true;
  }

  function createServer() {
    const server = new McpServer({ name: "ai-sense-wiki", version: "1.1.0" });

    server.tool(
      "ask_wiki",
      "向 AI Sense Wiki 知识库提问（建造者词典 411 词 / 建造者学院课程（含 FDE 认证章节）/ 建造者品味 / 信号源 / 机会）。返回带引用的中文或英文回答。",
      { question: z.string().max(4000).describe("要问的问题"), language: z.enum(["zh", "en"]).optional() },
      async ({ question }) => {
        if (!spendMcp()) return { content: [{ type: "text", text: "daily limit reached" }] };
        const reply = await askUpstream(question);
        const cites = (reply.cites ?? []).map(([tag, name]) => `[${tag}] ${name}`).join(" · ");
        return { content: [{ type: "text", text: `${reply.grounded}\n\n${reply.text}${cites ? `\n\n引用：${cites}` : ""}` }] };
      },
    );

    server.tool(
      "search_wiki",
      "在建造者词典的术语、课程回路与小节、FDE 认证题目里搜索关键词，返回最多 10 条命中（含类型与所属分类/章节/知识域）。",
      { query: z.string().min(1).max(100).describe("搜索关键词（中英皆可）") },
      async ({ query }) => {
        const idx = await loadIndex();
        const q = query.trim().toLowerCase();
        const hits = idx
          .filter((e) =>
            [e.title, e.en, e.al, e.tag].some((f) => typeof f === "string" && f.toLowerCase().includes(q)),
          )
          .slice(0, 10)
          .map((e) => {
            const kind = e.k === "term" ? "术语" : e.k === "loop" ? "回路" : e.k === "fde" ? "FDE 题" : "小节";
            const where = e.k === "term" ? `${e.topic}/${e.cat}` : e.k === "fde" ? `FDE · ${e.cat}` : `第 ${e.ch} 章`;
            return `- [${kind}] ${e.title}${e.en ? ` (${e.en})` : ""} — ${where}`;
          });
        return { content: [{ type: "text", text: hits.length ? hits.join("\n") : `没有匹配「${query}」的条目` }] };
      },
    );
    return server;
  }

  // Optional shared secret: when WIKI_MCP_TOKEN is set, clients must send
  // `Authorization: Bearer <token>`.
  function auth(req, res, next) {
    if (!token) return next();
    if (req.get("authorization") === `Bearer ${token}`) return next();
    res.status(401).json({ error: "unauthorized" });
  }

  const sessions = new Map(); // sessionId → { transport, server, timer }
  function close(id) {
    const s = sessions.get(id);
    if (!s) return;
    sessions.delete(id);
    clearTimeout(s.timer);
    s.server.close().catch(() => {});
  }
  function touch(id) {
    const s = sessions.get(id);
    if (!s) return;
    clearTimeout(s.timer);
    s.timer = setTimeout(() => close(id), IDLE_MS);
  }

  app.get("/sse", rateLimit, auth, async (req, res) => {
    if (sessions.size >= maxSessions) return res.status(503).json({ error: "too many sessions" });
    const transport = new SSEServerTransport("/messages", res);
    const server = createServer();
    const id = transport.sessionId;
    sessions.set(id, { transport, server, timer: null });
    touch(id);
    res.on("close", () => close(id));
    try {
      await server.connect(transport);
    } catch (err) {
      console.error("mcp connect error:", err?.message || err);
      close(id);
      if (!res.headersSent) res.status(500).json({ error: "mcp connect failed" });
      else res.end();
    }
  });

  app.post("/messages", rateLimit, auth, async (req, res) => {
    const s = sessions.get(req.query.sessionId);
    if (!s) return res.status(400).json({ error: "unknown session" });
    touch(req.query.sessionId);
    try {
      await s.transport.handlePostMessage(req, res, req.body);
    } catch (err) {
      console.error("mcp message error:", err?.message || err);
      if (!res.headersSent) res.status(500).json({ error: "mcp message failed" });
    }
  });
}

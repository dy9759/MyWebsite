// MCP endpoint for the AI Sense Wiki backend — exposes the knowledge base to
// external agents over SSE (GET /sse + POST /messages).
// Tools: ask_wiki (grounded Q&A via the same upstream model) and search_wiki
// (term/loop lookup over the site's public search index).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

export function mountMcp(app, { askUpstream, spendDaily, siteUrl }) {
  let indexCache = null;
  let indexAt = 0;
  async function loadIndex() {
    if (indexCache && Date.now() - indexAt < 10 * 60_000) return indexCache;
    const res = await fetch(`${siteUrl}/wiki/search-index.json`);
    if (!res.ok) throw new Error(`index fetch ${res.status}`);
    indexCache = await res.json();
    indexAt = Date.now();
    return indexCache;
  }

  const server = new McpServer({ name: "ai-sense-wiki", version: "1.0.0" });

  server.tool(
    "ask_wiki",
    "向 AI Sense Wiki 知识库提问（建造者词典 411 词 / 建造者学院九章课程 / 建造者品味 / 信号源 / 机会）。返回带引用的中文或英文回答。",
    { question: z.string().max(4000).describe("要问的问题"), language: z.enum(["zh", "en"]).optional() },
    async ({ question }) => {
      if (!spendDaily()) return { content: [{ type: "text", text: "daily limit reached" }] };
      const reply = await askUpstream(question);
      const cites = (reply.cites ?? []).map(([tag, name]) => `[${tag}] ${name}`).join(" · ");
      return { content: [{ type: "text", text: `${reply.grounded}\n\n${reply.text}${cites ? `\n\n引用：${cites}` : ""}` }] };
    },
  );

  server.tool(
    "search_wiki",
    "在建造者词典的术语、课程回路与小节里搜索关键词，返回最多 10 条命中（含类型与所属分类/章节）。",
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
          const kind = e.k === "term" ? "术语" : e.k === "loop" ? "回路" : "小节";
          const where = e.k === "term" ? `${e.topic}/${e.cat}` : `第 ${e.ch} 章`;
          return `- [${kind}] ${e.title}${e.en ? ` (${e.en})` : ""} — ${where}`;
        });
      return { content: [{ type: "text", text: hits.length ? hits.join("\n") : `没有匹配「${query}」的条目` }] };
    },
  );

  const transports = new Map();
  app.get("/sse", async (_req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    transports.set(transport.sessionId, transport);
    res.on("close", () => transports.delete(transport.sessionId));
    await server.connect(transport);
  });
  app.post("/messages", async (req, res) => {
    const transport = transports.get(req.query.sessionId);
    if (!transport) return res.status(400).json({ error: "unknown session" });
    await transport.handlePostMessage(req, res, req.body);
  });
}

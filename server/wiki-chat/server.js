// AI Sense Wiki chat backend — standalone service (NOT part of the static site).
// Proxies chat to Bailian's Anthropic-compatible endpoint (deepseek). The API
// key is read from the environment and never leaves the server.
import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE } from "./knowledge.js";

const {
  ANTHROPIC_BASE_URL = "https://dashscope.aliyuncs.com/apps/anthropic",
  ANTHROPIC_API_KEY,
  ANTHROPIC_MODEL = "deepseek-v4-flash-0731",
  PORT = 8787,
  WIKI_ALLOWED_ORIGINS = "*",
} = process.env;

if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY. Set it in the environment (never hardcode).");
  process.exit(1);
}

const client = new Anthropic({ baseURL: ANTHROPIC_BASE_URL, apiKey: ANTHROPIC_API_KEY });

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin: WIKI_ALLOWED_ORIGINS === "*" ? true : WIKI_ALLOWED_ORIGINS.split(",").map((s) => s.trim()),
  }),
);

const SYSTEM = `${KNOWLEDGE}

# 回复格式（必须遵守）
只输出一个紧凑 JSON 对象，不要任何多余文字或 markdown：
{"grounded": string, "text": string, "cites": [[tag, name], ...]}
- grounded：一句话，说明命中了哪个域/几条（如「命中 闭环学院 · 第 0 章」）。
- text：正文答案，用用户语言。
- cites：最多 4 个 [标签, 名称]，指向你用到的来源/术语/课程/招聘条目。`;

app.get("/health", (_req, res) => res.json({ ok: true, model: ANTHROPIC_MODEL }));

app.post("/chat", async (req, res) => {
  const message = (req.body?.message || "").toString().slice(0, 4000);
  if (!message.trim()) return res.status(400).json({ error: "empty message" });
  try {
    const resp = await client.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      messages: [{ role: "user", content: message }],
    });
    const raw = (resp.content?.[0]?.type === "text" ? resp.content[0].text : "").trim();
    res.json(parseReply(raw, ANTHROPIC_MODEL));
  } catch (err) {
    console.error("chat error:", err?.message || err);
    res.status(502).json({ error: "upstream failed" });
  }
});

// The model is asked for strict JSON; fall back to wrapping raw text if it drifts.
function parseReply(raw, model) {
  try {
    const json = JSON.parse(raw.replace(/^```json\s*|\s*```$/g, ""));
    if (json && typeof json.text === "string") {
      return {
        grounded: typeof json.grounded === "string" ? json.grounded : `已接入 · ${model}`,
        text: json.text,
        cites: Array.isArray(json.cites) ? json.cites.filter((c) => Array.isArray(c) && c.length === 2).slice(0, 4) : [],
      };
    }
  } catch {
    /* not JSON — fall through */
  }
  return { grounded: `已接入 · ${model}`, text: raw || "（空响应）", cites: [] };
}

app.listen(PORT, () => console.log(`wiki-chat backend on :${PORT} → ${ANTHROPIC_BASE_URL} (${ANTHROPIC_MODEL})`));

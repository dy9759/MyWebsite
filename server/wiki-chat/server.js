// AI Sense Wiki chat backend — standalone service (NOT part of the static site).
// Proxies chat to Bailian's Anthropic-compatible endpoint (deepseek). The API
// key is read from the environment and never leaves the server.
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
// Resolve .env next to this file, so the server can be launched from any CWD.
dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });
import express from "express";
import cors from "cors";
import { MAX_MESSAGE, chatBody, parseReply } from "./prompt.js";
import { mountMcp } from "./mcp.js";

const {
  // Bailian OpenAI-compatible endpoint (workspace sk-ws-* keys are accepted
  // here; the /apps/anthropic proxy 403s them).
  ANTHROPIC_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1",
  ANTHROPIC_API_KEY,
  ANTHROPIC_MODEL = "deepseek-v4-flash-0731",
  PORT = 8787,
  WIKI_ALLOWED_ORIGINS = "*",
  WIKI_RATE_PER_MIN = "20",
  WIKI_SITE_URL = "http://localhost:3000",
  WIKI_DAILY_CAP = "2000",
  WIKI_MCP_DAILY_CAP = "200",
  WIKI_MCP_TOKEN = "",
  WIKI_MCP_MAX_SESSIONS = "20",
  // Which proxies may set X-Forwarded-For (Express "trust proxy"). Default:
  // only a reverse proxy on this host. Set the hop count (e.g. "1") when a
  // platform proxy fronts the service, so the limiter keys on the client IP.
  WIKI_TRUST_PROXY = "loopback",
} = process.env;

// Last-resort guard: a stray rejection must never take the chat down.
process.on("unhandledRejection", (err) => console.error("unhandled rejection:", err?.message || err));

if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY. Set it in the environment (never hardcode).");
  process.exit(1);
}
// Fail safe: an open CORS default is dev-only. In production the operator must
// name the site origin(s) explicitly, or the server refuses to start.
if (process.env.NODE_ENV === "production" && WIKI_ALLOWED_ORIGINS === "*") {
  console.error("WIKI_ALLOWED_ORIGINS must list explicit origins in production (not '*').");
  process.exit(1);
}

const app = express();
app.set("trust proxy", /^\d+$/.test(WIKI_TRUST_PROXY) ? Number(WIKI_TRUST_PROXY) : WIKI_TRUST_PROXY);
app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin: WIKI_ALLOWED_ORIGINS === "*" ? true : WIKI_ALLOWED_ORIGINS.split(",").map((s) => s.trim()),
  }),
);

// Rate limiting: per-IP sliding minute window + a global daily spend
// circuit-breaker. In-memory (single instance) — the endpoint proxies a paid
// model API, so an unlimited public POST is an open proxy for quota burn.
const perMin = Number(WIKI_RATE_PER_MIN) || 20;
const dailyCap = Number(WIKI_DAILY_CAP) || 2000;
const hits = new Map(); // ip → [timestamps]
let dayKey = new Date().toISOString().slice(0, 10);
let dayCount = 0;
// Shared spend gate for /chat and the MCP ask_wiki tool.
function spendDaily() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= dailyCap) return false;
  dayCount += 1;
  return true;
}
// Give a slot back when the upstream call fails — no tokens were billed.
function refundDaily() {
  if (dayCount > 0) dayCount -= 1;
}
// Per-IP sliding-minute limiter, shared by /chat and the MCP endpoints.
function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "?";
  const windowStart = now - 60_000;
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (list.length >= perMin) {
    hits.set(ip, list);
    return res.status(429).json({ error: "rate limited" });
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 10_000) {
    for (const [k, v] of hits) if (!v.some((t) => t > windowStart)) hits.delete(k);
  }
  next();
}
app.use("/chat", rateLimit);


app.get("/health", (_req, res) => res.json({ ok: true, model: ANTHROPIC_MODEL }));

async function askUpstream(message) {
  const upstream = await fetch(`${ANTHROPIC_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${ANTHROPIC_API_KEY}` },
    body: JSON.stringify(chatBody(ANTHROPIC_MODEL, message)),
    signal: AbortSignal.timeout(30_000),
  });
  if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
  const data = await upstream.json();
  const raw = (data.choices?.[0]?.message?.content ?? "").trim();
  return parseReply(raw, ANTHROPIC_MODEL);
}

app.post("/chat", async (req, res) => {
  const message = (req.body?.message || "").toString().slice(0, MAX_MESSAGE);
  if (!message.trim()) return res.status(400).json({ error: "empty message" });
  // Charge the daily budget only for a valid request, and refund on failure.
  if (!spendDaily()) return res.status(429).json({ error: "daily limit reached" });
  try {
    res.json(await askUpstream(message));
  } catch (err) {
    refundDaily();
    console.error("chat error:", err?.message || err);
    res.status(502).json({ error: "upstream failed" });
  }
});


// MCP endpoint (GET /sse + POST /messages) — external agents get ask_wiki / search_wiki.
mountMcp(app, {
  askUpstream,
  spendDaily,
  refundDaily,
  rateLimit,
  siteUrl: WIKI_SITE_URL,
  token: WIKI_MCP_TOKEN,
  mcpDailyCap: Number(WIKI_MCP_DAILY_CAP) || 200,
  maxSessions: Number(WIKI_MCP_MAX_SESSIONS) || 20,
});

// Terminal error handler: malformed JSON bodies etc. must never surface a
// stack trace to the client (Express's default does when NODE_ENV≠production).
app.use((err, _req, res, _next) => {
  console.error("request error:", err?.message || err);
  res.status(err?.type === "entity.parse.failed" || err?.status === 400 ? 400 : 500).json({ error: "bad request" });
});

app.listen(PORT, () => console.log(`wiki-chat backend on :${PORT} → ${ANTHROPIC_BASE_URL} (${ANTHROPIC_MODEL})`));

import { Limiter, type Limits } from "./limiter";
import { checkRequest, originAllowed, parseList, retryableStatus, upstreamBody, type ProxyConfig } from "./policy";

// AI proxy for the static site: the Bailian key lives only in this Worker's
// secrets. It forwards plain chat requests (streamed) and enforces origin,
// per-IP and site-wide daily limits. Request and response bodies are never
// logged or stored.

export { Limiter };

type Env = {
  BAILIAN_API_KEY: string; // secret
  LIMITER: DurableObjectNamespace<Limiter>;
  UPSTREAM_URL: string;
  ALLOWED_ORIGINS: string;
  MODELS: string;
  MAX_TOKENS: string;
  MAX_INPUT_CHARS: string;
  DAILY_LIMIT: string;
  IP_DAILY_LIMIT: string;
  IP_MINUTE_LIMIT: string;
};

const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const json = (status: number, data: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...headers } });

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin");
    const cfg: ProxyConfig = {
      allowedOrigins: parseList(env.ALLOWED_ORIGINS),
      models: parseList(env.MODELS),
      maxTokens: Number(env.MAX_TOKENS) || 2048,
      maxInputChars: Number(env.MAX_INPUT_CHARS) || 60000,
    };

    if (url.pathname === "/health") return json(200, { ok: true, models: cfg.models });
    if (url.pathname !== "/chat") return json(404, { error: "not found" });
    if (!originAllowed(origin, cfg.allowedOrigins)) return json(403, { error: "origin not allowed" });
    const headers = cors(origin!);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (req.method !== "POST") return json(405, { error: "method not allowed" }, headers);
    if (!env.BAILIAN_API_KEY) return json(503, { error: "proxy not configured" }, headers);

    const checked = checkRequest(await req.json().catch(() => null), cfg);
    if (!checked.ok) return json(checked.status, { error: checked.error }, headers);

    const limits: Limits = {
      daily: Number(env.DAILY_LIMIT) || 500,
      ipDaily: Number(env.IP_DAILY_LIMIT) || 120,
      ipMinute: Number(env.IP_MINUTE_LIMIT) || 15,
    };
    const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
    const verdict = await env.LIMITER.get(env.LIMITER.idFromName("global")).take(ip, limits);
    if (!verdict.ok) return json(429, { error: "rate limited", reason: verdict.reason }, headers);

    const send = (noThinking: boolean) =>
      fetch(env.UPSTREAM_URL, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${env.BAILIAN_API_KEY}` },
        body: JSON.stringify(upstreamBody(checked.body, cfg.maxTokens, noThinking)),
      });
    let noThinking = true;
    let upstream = await send(noThinking);
    if (upstream.status === 400) upstream = await send((noThinking = false)); // model rejects enable_thinking
    if (retryableStatus(upstream.status)) upstream = await send(noThinking); // one retry for transient errors

    if (!upstream.ok || !upstream.body) {
      // Do not echo upstream error bodies: they can mention account details.
      return json(upstream.status === 429 ? 429 : 502, { error: "upstream error", status: upstream.status }, headers);
    }
    return new Response(upstream.body, {
      status: 200,
      headers: { ...headers, "content-type": "text/event-stream", "cache-control": "no-store" },
    });
  },
};

export default worker;

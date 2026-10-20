// Request policy for the AI proxy, kept pure so it can be unit-tested from
// the site's test suite. The Worker refuses anything that is not a plain
// chat request within budget; the model, output cap and thinking mode are
// always set here, never by the caller.

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ProxyConfig = {
  allowedOrigins: string[];
  models: string[]; // first one is the default
  maxTokens: number;
  maxInputChars: number;
};

export type Checked =
  | { ok: true; body: { model: string; messages: ChatMessage[]; temperature: number } }
  | { ok: false; status: number; error: string };

const ROLES = new Set(["system", "user", "assistant"]);

export function parseList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// CORS keeps other websites' pages from using the quota in a browser; it is
// not a security boundary against scripts (they can fake Origin), which is
// why the rate limits exist too.
export function originAllowed(origin: string | null, allowed: string[]): boolean {
  return !!origin && allowed.includes(origin);
}

export function checkRequest(raw: unknown, cfg: ProxyConfig): Checked {
  if (!raw || typeof raw !== "object") return { ok: false, status: 400, error: "invalid body" };
  const { model, messages, temperature } = raw as Record<string, unknown>;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
    return { ok: false, status: 400, error: "messages must be a non-empty array (max 40)" };
  }
  let chars = 0;
  const clean: ChatMessage[] = [];
  for (const m of messages) {
    const { role, content } = (m ?? {}) as Record<string, unknown>;
    if (typeof role !== "string" || !ROLES.has(role) || typeof content !== "string") {
      return { ok: false, status: 400, error: "each message needs a role and string content" };
    }
    chars += content.length;
    clean.push({ role: role as ChatMessage["role"], content });
  }
  if (chars > cfg.maxInputChars) return { ok: false, status: 413, error: "input too long" };
  const chosen = typeof model === "string" && cfg.models.includes(model) ? model : cfg.models[0];
  const temp = typeof temperature === "number" && temperature >= 0 && temperature <= 1 ? temperature : 0.3;
  return { ok: true, body: { model: chosen, messages: clean, temperature: temp } };
}

// The upstream body: always streamed, output capped, thinking off.
export function upstreamBody(body: { model: string; messages: ChatMessage[]; temperature: number }, maxTokens: number, noThinking: boolean) {
  return {
    ...body,
    stream: true,
    max_tokens: maxTokens,
    ...(noThinking ? { enable_thinking: false } : {}),
  };
}

export const utcDay = (now: Date) => now.toISOString().slice(0, 10);
export const utcMinute = (now: Date) => now.toISOString().slice(0, 16);

// Cloudflare-to-origin errors (520-524) and plain 5xx from Bailian are often
// transient (slow first token on long prompts); worth one more try. Client
// errors and rate limits are not.
export const retryableStatus = (status: number) => status >= 500 && status !== 501;

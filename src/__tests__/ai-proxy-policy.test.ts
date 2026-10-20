import { describe, expect, it } from "vitest";
import { checkRequest, originAllowed, parseList, upstreamBody, type ProxyConfig } from "../../workers/ai-proxy/src/policy";

const cfg: ProxyConfig = {
  allowedOrigins: ["https://chauncey.myoii.com"],
  models: ["deepseek-v4.1-flash", "qwen-plus"],
  maxTokens: 2048,
  maxInputChars: 100,
};
const msg = (content: string, role = "user") => ({ role, content });

describe("AI proxy policy", () => {
  it("allows only listed origins", () => {
    expect(originAllowed("https://chauncey.myoii.com", cfg.allowedOrigins)).toBe(true);
    expect(originAllowed("https://evil.example", cfg.allowedOrigins)).toBe(false);
    expect(originAllowed(null, cfg.allowedOrigins)).toBe(false);
  });

  it("keeps a listed model and falls back to the default otherwise", () => {
    const pick = (model: string) => {
      const r = checkRequest({ model, messages: [msg("hi")] }, cfg);
      return r.ok ? r.body.model : null;
    };
    expect(pick("qwen-plus")).toBe("qwen-plus");
    expect(pick("qwen-max")).toBe("deepseek-v4.1-flash"); // pricier models cannot be requested
  });

  it("rejects malformed or oversized requests", () => {
    expect(checkRequest(null, cfg)).toMatchObject({ ok: false, status: 400 });
    expect(checkRequest({ messages: [] }, cfg)).toMatchObject({ ok: false, status: 400 });
    expect(checkRequest({ messages: [msg("x", "tool")] }, cfg)).toMatchObject({ ok: false, status: 400 });
    expect(checkRequest({ messages: [msg("x".repeat(101))] }, cfg)).toMatchObject({ ok: false, status: 413 });
  });

  it("drops unknown fields and always caps output, streams and disables thinking", () => {
    const r = checkRequest({ messages: [msg("hi")], max_tokens: 99999, tools: [{}], temperature: 5 }, cfg);
    expect(r.ok && r.body).toEqual({ model: "deepseek-v4.1-flash", messages: [msg("hi")], temperature: 0.3 });
    if (!r.ok) return;
    expect(upstreamBody(r.body, cfg.maxTokens, true)).toMatchObject({ stream: true, max_tokens: 2048, enable_thinking: false });
    expect(upstreamBody(r.body, cfg.maxTokens, false)).not.toHaveProperty("enable_thinking");
  });

  it("parses comma lists", () => {
    expect(parseList(" a, b ,,c ")).toEqual(["a", "b", "c"]);
  });
});

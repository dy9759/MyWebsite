// Bring-your-own-key chat for the static site. When no backend is configured
// (NEXT_PUBLIC_WIKI_API_URL unset — i.e. the public deploy), a visitor can paste
// their own Bailian key; the browser then calls Bailian's OpenAI-compatible
// endpoint directly (both regions allow CORS from any origin). The key only
// ever goes to Bailian. It lives in sessionStorage by default, localStorage
// only when the visitor ticks "remember".
import { useEffect, useState } from "react";
import type { WikiReply } from "@/content/wiki";

export type ByokRegion = "cn" | "intl";
export type ByokConfig = { region: ByokRegion; model: string; key: string; remember: boolean };

export const BYOK_ENDPOINTS: Record<ByokRegion, string> = {
  cn: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  intl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
};
export const BYOK_DEFAULT_MODEL = "qwen-plus";

const STORE_KEY = "wiki-byok-v1";
const EVENT = "wiki-byok-change";

function parse(raw: string | null): ByokConfig | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<ByokConfig>;
    if (typeof v.key !== "string" || !v.key.trim()) return null;
    return {
      region: v.region === "intl" ? "intl" : "cn",
      model: typeof v.model === "string" && v.model.trim() ? v.model.trim() : BYOK_DEFAULT_MODEL,
      key: v.key.trim(),
      remember: Boolean(v.remember),
    };
  } catch {
    return null;
  }
}

export function getByok(): ByokConfig | null {
  try {
    return parse(sessionStorage.getItem(STORE_KEY)) ?? parse(localStorage.getItem(STORE_KEY));
  } catch {
    return null;
  }
}

// Save (or clear with null) and notify every mounted useByok().
export function saveByok(cfg: ByokConfig | null) {
  try {
    sessionStorage.removeItem(STORE_KEY);
    localStorage.removeItem(STORE_KEY);
    if (cfg) (cfg.remember ? localStorage : sessionStorage).setItem(STORE_KEY, JSON.stringify(cfg));
  } catch {
    /* storage blocked — the key just won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useByok(): ByokConfig | null {
  const [cfg, setCfg] = useState<ByokConfig | null>(null);
  useEffect(() => {
    const sync = () => setCfg(getByok());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return cfg;
}

const ERRORS: Record<string, { zh: string; en: string }> = {
  "401": { zh: "Key 无效或已过期，请在设置里检查。", en: "The key is invalid or expired — check it in settings." },
  "403": { zh: "这个 Key 没有该模型的调用权限，换个模型试试。", en: "This key can't call that model — try another model." },
  "404": { zh: "找不到这个模型，请检查模型名称和地域。", en: "Model not found — check the model name and region." },
  "429": { zh: "请求太频繁或额度不足，稍后再试。", en: "Rate limited or out of quota — try again later." },
};

// Ask Bailian directly with the visitor's key. Errors come back as a reply so
// the visitor sees what went wrong instead of a silent demo answer.
export async function askByok(cfg: ByokConfig, message: string, language: "zh" | "en"): Promise<WikiReply> {
  // Loaded on demand: the knowledge digest only ships to visitors who use it.
  const { chatBody, parseReply } = await import("../../server/wiki-chat/prompt.js");
  try {
    const res = await fetch(`${BYOK_ENDPOINTS[cfg.region]}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify(chatBody(cfg.model, message.slice(0, 4000))),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const raw = String(data.choices?.[0]?.message?.content ?? "").trim();
    return parseReply(raw, cfg.model) as WikiReply;
  } catch (e) {
    const code = e instanceof Error ? e.message : "";
    const msg = ERRORS[code]?.[language] ?? (language === "zh" ? `调用失败（${code || "网络错误"}），请稍后再试。` : `Request failed (${code || "network error"}) — try again later.`);
    return { grounded: language === "zh" ? "自带 Key · 出错" : "Your key · error", text: msg, cites: [] };
  }
}

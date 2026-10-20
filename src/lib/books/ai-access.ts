import { useMemo } from "react";
import { useByok, type ByokConfig } from "@/lib/wiki-byok";

// How the reading features reach a model: the visitor's own Bailian key when
// they set one (calls go straight to Bailian), otherwise the site's proxy
// (workers/ai-proxy), whose key never reaches the browser. Null when
// neither is available.

export type AiAccess =
  | { mode: "byok"; cfg: ByokConfig }
  | { mode: "proxy"; url: string; model: string };

export const AI_PROXY_URL = process.env.NEXT_PUBLIC_AI_PROXY_URL ?? "";
export const PROXY_MODEL = "deepseek-v4.1-flash";

// Module-level, so hooks that depend on the access object stay stable.
const PROXY: AiAccess | null = AI_PROXY_URL ? { mode: "proxy", url: AI_PROXY_URL, model: PROXY_MODEL } : null;

export function useAiAccess(): AiAccess | null {
  const byok = useByok();
  return useMemo(() => (byok ? { mode: "byok", cfg: byok } : PROXY), [byok]);
}

export const accessModel = (a: AiAccess) => (a.mode === "byok" ? a.cfg.model : a.model);

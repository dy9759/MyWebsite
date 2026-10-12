// System prompt + reply parsing shared by the local backend (server.js) and
// the static site's bring-your-own-key mode (src/lib/wiki-data.ts imports this
// file directly), so both paths answer from the same knowledge digest.
import { KNOWLEDGE } from "./knowledge.js";

export const SYSTEM = `${KNOWLEDGE}

# 回复格式（必须遵守）
只输出一个紧凑 JSON 对象，不要任何多余文字或 markdown：
{"grounded": string, "text": string, "cites": [[tag, name], ...]}
- grounded：一句话，说明命中了哪个域/几条（如「命中 建造者学院 · 第 0 章」）。
- text：正文答案，用用户语言。
- cites：最多 4 个 [标签, 名称]，指向你用到的来源/术语/课程/招聘条目。
- 当问题属于学习性质（课程/术语/概念）时，在 text 结尾另起一行附一道验证小题：
  以「小题：」开头的一句话提问，检验刚才讲的核心点，不给选项不给答案。
  闲聊、招聘、来源检索类问题不附。`;

export const MAX_TOKENS = 1024;

// OpenAI-compatible chat/completions request body.
export function chatBody(model, message) {
  return {
    model,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: message },
    ],
  };
}

// The model is asked for strict JSON; fall back to wrapping raw text if it drifts.
export function parseReply(raw, model) {
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

// AI Sense Wiki content: 建造者词典术语库 + 建造者学院 course + bilingual chrome and
// the demo (frontend-shell) reply rules. The "AI 知识源" domain is not stored
// here — it is read live from AI_CONFIG (useAIConfig) so it stays in sync with
// the sources library. Chat is a frontend shell: replies are preset rules, no
// backend. The real version routes through Claude Agent SDK × Bailian.
import type { Language } from "@/components/language-provider";

export type WikiCite = [string, string];
export type WikiReply = { grounded: string; text: string; cites: WikiCite[] };

// 建造者学院 header + the user's own progress. The full course structure lives in
// wiki-course.ts and lesson bodies in public/wiki/lessons/*.json (imported with
// the user's authorization — the course is their personalized program).
export const WIKI_COURSE = {
  eyebrow: "你的建造者旅程",
  desc: "九章 = 你用 AI 做「语音智能体」的真实生命周期。每章知识在被需要的那一刻出现，走完这条路，产出的是一个真实上线的产品。",
};

// AI Native 招聘 — job postings from AI-native companies (user-curated links).
export type WikiJob = {
  company: string;
  role: string;
  desc: { zh: string; en: string };
  url: string;
};

export const WIKI_JOBS: WikiJob[] = [
  {
    company: "DeepSeek · 幻方 High-Flyer",
    role: "Harness 团队",
    desc: {
      zh: "DeepSeek / 幻方 Harness 团队岗位：Agent 运行时、评测与工程化。",
      en: "DeepSeek / High-Flyer Harness team roles: agent runtime, evaluation and engineering.",
    },
    url: "https://app.mokahr.com/social-recruitment/high-flyer/140576#/job/8d40c764-d2b2-49b1-826c-e3f2adb75c01",
  },
  {
    company: "Flowith",
    role: "多个岗位",
    desc: {
      zh: "AI native 创业公司 Flowith 招聘（来自创始团队 @BruceGuai）。",
      en: "AI-native startup Flowith is hiring (via founder @BruceGuai).",
    },
    url: "https://x.com/BruceGuai/status/2090779138944848192",
  },
];

export const WIKI_UI = {
  zh: {
    kicker: "个人 AI 信息系统",
    intro: "浏览六大知识域，或问随行 —— 左右两侧同一底层数据源。",
    protoNote:
      "演示壳 · 对话为预设规则、未接后端；真实版由 Claude Agent SDK × 百炼在同一数据源上检索、带引用作答。",
    connectedNote:
      "已接入后端 · 经百炼驱动 deepseek-v4-flash-0731 在知识库上作答（密钥仅服务端）。",
    domains: { sources: "建造者信号", vibe: "建造者词典", course: "建造者学院", jobs: "建造者机会", slop: "建造者品味", fde: "FDE 能力测试" },
    open: "打开",
    inProgress: "进行中",
    related: "关联",
    progress: "已完成 {done} / {total} 个回路",
    progressEcho: "学过的知识会在后续回路里「回声」式复现——这是记忆的物理学。",
    minutesPrefix: "约",
    minutesSuffix: "分钟",
    chat: {
      title: "随行 · 跨域问答",
      sub: "与左侧同一数据源；回答带来源 / 术语 / 课程引用。",
      tag: "演示",
      tagLive: "已接入",
      placeholder: "问点什么…（演示，未接后端）",
      send: "发送",
      emptyPrompt: "任何一步没看懂，随时问我。",
      emptySub: "随行了解你在看什么、你的产品是什么；选中任意条目，也可以直接「问这句」。",
      footnote: "随行了解你的进度与产品背景 · 回答可能附带一道验证小题",
    },
    form: { open: "打开随行", close: "关闭" },
    chips: ["vibe coding 指什么？", "这周 agent 有什么进展？", "建造者学院第 0 章讲什么？"],
  },
  en: {
    kicker: "Personal AI sense system",
    intro: "Browse six knowledge domains, or ask the companion — both share one data source.",
    protoNote:
      "Frontend shell · replies are preset rules, no backend. The real version retrieves and cites via Claude Agent SDK × Bailian on the same data source.",
    connectedNote:
      "Backend connected · answers over the knowledge base via Bailian-driven deepseek-v4-flash-0731 (key server-side only).",
    domains: { sources: "Builder Signals", vibe: "Builder Lexicon", course: "Builder Academy", jobs: "Builder Openings", slop: "Builder Taste", fde: "FDE Study" },
    open: "Open",
    inProgress: "in progress",
    related: "Related",
    progress: "{done} / {total} loops done",
    progressEcho: "Learned ideas echo back in later loops — the physics of memory.",
    minutesPrefix: "~",
    minutesSuffix: "min",
    chat: {
      title: "Companion · cross-domain Q&A",
      sub: "Same data source as the left; answers cite sources / terms / course.",
      tag: "Demo",
      tagLive: "Live",
      placeholder: "Ask anything… (demo, no backend)",
      send: "Send",
      emptyPrompt: "Stuck on any step? Just ask.",
      emptySub: "The companion knows what you're reading and what you're building; select any item to ask about it.",
      footnote: "Knows your progress and product context · replies may include a quick check",
    },
    form: { open: "Open companion", close: "Close" },
    chips: ["What is vibe coding?", "Agent news this week?", "What is Builder Academy ch.0?"],
  },
};

// Frontend-shell demo replies — preset keyword rules, no backend.
export function wikiDemoReply(q: string, lang: Language): WikiReply {
  const s = q.toLowerCase();
  const zh = lang === "zh";
  if (/闭环|学院|回路|课/.test(q) || s.includes("loop academy") || s.includes("academy") || s.includes("ch.0")) {
    return {
      grounded: zh ? "命中 建造者学院 · 第 0 章" : "Builder Academy · ch.0",
      text: zh
        ? "第 0 章「你刚刚创造了什么」用三个回路解剖一次 vibe coding：AI 生成的文件、本地 vs 服务器、从网址到页面；里程碑是生成产品 v0.1 并画出文件地图。"
        : "Chapter 0 dissects one vibe-coding session in three loops — the generated files, local vs server, and URL-to-page; the milestone is a v0.1 product with a file map.",
      cites: [["课程", "第 0 章"], ["回路", "01 vibe coding"], ["里程碑", "v0.1"]],
    };
  }
  if (q.includes("招聘") || q.includes("岗位") || s.includes("deepseek") || s.includes("flowith") || s.includes("hiring") || s.includes("job")) {
    return {
      grounded: zh ? "命中 建造者机会 · 2 家" : "Builder Openings · 2 hits",
      text: zh
        ? "DeepSeek / 幻方 Harness 团队在招 Agent 运行时、评测与工程化；AI native 创业公司 Flowith 也有多个岗位。点卡片打开原始招聘链接。"
        : "DeepSeek / High-Flyer's Harness team is hiring for agent runtime, evaluation and engineering; AI-native startup Flowith also has openings. Open a card for the original posting.",
      cites: [["招聘", "DeepSeek Harness"], ["招聘", "Flowith"]],
    };
  }
  if (s.includes("vibe") || q.includes("术语")) {
    return {
      grounded: zh ? "命中 建造者词典 1 条 · 建造者信号 2 条" : "Builder Lexicon 1 · Builder Signals 2",
      text: zh
        ? "指用自然语言驱动 AI 生成并迭代代码的工作方式。本周 Latent Space 与 simonwillison.net 都在谈它与 agent harness 的结合。"
        : "Driving AI to generate and iterate code via natural language. This week Latent Space and simonwillison.net both discuss its tie to agent harness.",
      cites: [["术语", "vibe coding"], ["L3", "Latent Space"], ["L2", "simonwillison.net"]],
    };
  }
  if (s.includes("agent") || q.includes("进展") || q.includes("这周") || s.includes("harness") || s.includes("week")) {
    return {
      grounded: zh ? "基于 建造者信号 检索 · 命中 3 条" : "Builder Signals · 3 hits",
      text: zh
        ? "Latent Space 与 The Pragmatic Engineer 本周都在谈 agent harness 的评测与工程化；simonwillison.net 有一篇可上手的 SDK 实操。"
        : "Latent Space and The Pragmatic Engineer both cover agent-harness evaluation and engineering this week; simonwillison.net has a hands-on SDK piece.",
      cites: [["L3", "Latent Space"], ["L2", "Pragmatic Engineer"], ["L2", "simonwillison.net"]],
    };
  }
  return {
    grounded: zh ? "已跨三域检索 · 命中 2 条" : "Cross-domain · 2 hits",
    text: zh
      ? "这是演示的预设回答：真实版会在与左侧同一份数据源（建造者信号 + 建造者词典 + 建造者学院）上检索，给出带引用的回答。"
      : "Preset demo answer: the real version retrieves over the same data source (Builder Signals + Builder Lexicon + Builder Academy) and answers with citations.",
    cites: [["L3", "Latent Space"], ["术语", "AI Sense Wiki"]],
  };
}

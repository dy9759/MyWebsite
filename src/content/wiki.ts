// AI Sense Wiki content: Vibe 术语库 + 闭环学院 course + bilingual chrome and
// the demo (frontend-shell) reply rules. The "AI 知识源" domain is not stored
// here — it is read live from AI_CONFIG (useAIConfig) so it stays in sync with
// the sources library. Chat is a frontend shell: replies are preset rules, no
// backend. The real version routes through Claude Agent SDK × Bailian.
import type { Language } from "@/components/language-provider";

export type WikiCite = [string, string];
export type WikiReply = { grounded: string; text: string; cites: WikiCite[] };

export type WikiTerm = {
  term: string;
  def: { zh: string; en: string };
  rel: WikiCite[];
};

export type WikiLesson = {
  no: string;
  type: string;
  done: boolean;
  title: string;
  min: number;
};
export type WikiChapter = {
  num: string;
  title: string;
  sub: string;
  lessons: WikiLesson[];
  milestone: string;
};

export const WIKI_TERMS: WikiTerm[] = [
  {
    term: "vibe coding",
    def: {
      zh: "用自然语言驱动 AI 生成并迭代代码的工作方式。",
      en: "Driving AI to generate and iterate code through natural language.",
    },
    rel: [
      ["L3", "Latent Space"],
      ["L2", "simonwillison.net"],
    ],
  },
  {
    term: "agent harness",
    def: {
      zh: "承载 agent 运行、评测与工程化的框架与运行时。",
      en: "The framework and runtime that hosts agent execution, evaluation and engineering.",
    },
    rel: [
      ["L3", "Latent Space"],
      ["L2", "Pragmatic Engineer"],
    ],
  },
  {
    term: "RAG",
    def: {
      zh: "检索增强生成：先在知识库检索证据，再生成带引用的回答。",
      en: "Retrieval-augmented generation: retrieve evidence first, then answer with citations.",
    },
    rel: [["架构", "本 Wiki 数据层"]],
  },
  {
    term: "MCP",
    def: {
      zh: "Model Context Protocol：把数据 / 工具暴露给外部 Agent 调用。",
      en: "Model Context Protocol: expose data and tools for external agents to call.",
    },
    rel: [["交互层", "MCP 接入"]],
  },
  {
    term: "eval / 评测",
    def: {
      zh: "用可复现基准衡量模型与 agent 的质量。",
      en: "Measuring model and agent quality with reproducible benchmarks.",
    },
    rel: [["案例", "模型产品"]],
  },
];

// 闭环学院 — replicated from the site's visible structure (chapters 0–1). The
// remaining chapters need the source content (the origin site is unreachable).
export const WIKI_COURSE = {
  eyebrow: "你的建造者旅程",
  title: "lsy：从 Vibe Coder 到 Product Builder",
  desc: "八章 = 你用 AI 做「语音智能体」的真实生命周期。每章知识在被需要的那一刻出现，走完这条路，产出的是一个真实上线的产品。",
  done: 3,
  total: 29,
  chapters: [
    {
      num: "第 0 章",
      title: "你刚刚创造了什么",
      sub: "解剖一次 vibe coding —— 从你已有的经验出发",
      lessons: [
        { no: "01", type: "概念", done: true, title: "解剖一次 vibe coding", min: 35 },
        { no: "02", type: "概念", done: true, title: "本地与服务器：代码住在哪里", min: 35 },
        { no: "03", type: "概念", done: true, title: "从输入网址到看到页面", min: 35 },
      ],
      milestone: "用 AI 生成你产品的 v0.1，亲手画出它的文件地图",
    },
    {
      num: "第 1 章",
      title: "软件的解剖学",
      sub: "前端、后端与数据的世界 —— 看懂结构，才能对话、排期、验收",
      lessons: [
        { no: "04", type: "概念", done: false, title: "前端：你看得见的那一层", min: 35 },
        { no: "05", type: "概念", done: false, title: "后端：看不见的逻辑与规则", min: 35 },
        { no: "06", type: "概念", done: false, title: "数据：信息如何被存下来", min: 35 },
      ],
      milestone: "画出你产品的前后端与数据流图",
    },
  ] as WikiChapter[],
  rest: "第 2 – 7 章 · 剩余 23 回路（原站内容，待接入）",
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
    intro: "浏览四大知识域，或问随行 —— 左右两侧同一底层数据源。",
    protoNote:
      "演示壳 · 对话为预设规则、未接后端；真实版由 Claude Agent SDK × 百炼在同一数据源上检索、带引用作答。",
    browseTitle: "AI Sense Wiki · 知识库",
    domains: { sources: "AI 知识源", vibe: "Vibe Hub", course: "闭环学院", jobs: "AI Native 招聘" },
    sourceCats: {
      podcasts: "播客",
      newsletters: "Newsletters",
      people: "人物",
      products: "产品",
    },
    open: "打开",
    related: "关联",
    progress: "个回路已完成",
    progressEcho: "学过的知识会在后续回路里「回声」式复现",
    done: "✓ 已完成",
    todo: "○ 未开始",
    milestone: "里程碑",
    minutesPrefix: "约",
    minutesSuffix: "分钟",
    chat: {
      title: "随行 · 跨域问答",
      sub: "与左侧同一数据源；回答带来源 / 术语 / 课程引用。",
      tag: "演示",
      placeholder: "问点什么…（演示，未接后端）",
      send: "发送",
    },
    form: { float: "悬浮小窗", rail: "满窗边栏", open: "打开随行", close: "关闭" },
    chips: ["vibe coding 指什么？", "这周 agent 有什么进展？", "闭环学院第 0 章讲什么？"],
  },
  en: {
    kicker: "Personal AI sense system",
    intro: "Browse four knowledge domains, or ask the companion — both share one data source.",
    protoNote:
      "Frontend shell · replies are preset rules, no backend. The real version retrieves and cites via Claude Agent SDK × Bailian on the same data source.",
    browseTitle: "AI Sense Wiki · Knowledge base",
    domains: { sources: "AI Sources", vibe: "Vibe Hub", course: "Loop Academy", jobs: "AI-Native Jobs" },
    sourceCats: {
      podcasts: "Podcasts",
      newsletters: "Newsletters",
      people: "People",
      products: "Products",
    },
    open: "Open",
    related: "Related",
    progress: "loops done",
    progressEcho: "Learned ideas echo back in later loops",
    done: "✓ Done",
    todo: "○ Not started",
    milestone: "Milestone",
    minutesPrefix: "~",
    minutesSuffix: "min",
    chat: {
      title: "Companion · cross-domain Q&A",
      sub: "Same data source as the left; answers cite sources / terms / course.",
      tag: "Demo",
      placeholder: "Ask anything… (demo, no backend)",
      send: "Send",
    },
    form: { float: "Floating", rail: "Sidebar", open: "Open companion", close: "Close" },
    chips: ["What is vibe coding?", "Agent news this week?", "What is Loop Academy ch.0?"],
  },
};

// Frontend-shell demo replies — preset keyword rules, no backend.
export function wikiDemoReply(q: string, lang: Language): WikiReply {
  const s = q.toLowerCase();
  const zh = lang === "zh";
  if (/闭环|学院|回路|课/.test(q) || s.includes("loop academy") || s.includes("academy") || s.includes("ch.0")) {
    return {
      grounded: zh ? "命中 闭环学院 · 第 0 章" : "Loop Academy · ch.0",
      text: zh
        ? "第 0 章「你刚刚创造了什么」用三个回路解剖一次 vibe coding：AI 生成的文件、本地 vs 服务器、从网址到页面；里程碑是生成产品 v0.1 并画出文件地图。"
        : "Chapter 0 dissects one vibe-coding session in three loops — the generated files, local vs server, and URL-to-page; the milestone is a v0.1 product with a file map.",
      cites: [["课程", "第 0 章"], ["回路", "01 vibe coding"], ["里程碑", "v0.1"]],
    };
  }
  if (q.includes("招聘") || q.includes("岗位") || s.includes("deepseek") || s.includes("flowith") || s.includes("hiring") || s.includes("job")) {
    return {
      grounded: zh ? "命中 AI Native 招聘 · 2 家" : "AI-Native Jobs · 2 hits",
      text: zh
        ? "DeepSeek / 幻方 Harness 团队在招 Agent 运行时、评测与工程化；AI native 创业公司 Flowith 也有多个岗位。点卡片打开原始招聘链接。"
        : "DeepSeek / High-Flyer's Harness team is hiring for agent runtime, evaluation and engineering; AI-native startup Flowith also has openings. Open a card for the original posting.",
      cites: [["招聘", "DeepSeek Harness"], ["招聘", "Flowith"]],
    };
  }
  if (s.includes("vibe") || q.includes("术语")) {
    return {
      grounded: zh ? "命中 Vibe Hub 1 条 · AI 知识源 2 条" : "Vibe Hub 1 · AI Sources 2",
      text: zh
        ? "指用自然语言驱动 AI 生成并迭代代码的工作方式。本周 Latent Space 与 simonwillison.net 都在谈它与 agent harness 的结合。"
        : "Driving AI to generate and iterate code via natural language. This week Latent Space and simonwillison.net both discuss its tie to agent harness.",
      cites: [["术语", "vibe coding"], ["L3", "Latent Space"], ["L2", "simonwillison.net"]],
    };
  }
  if (s.includes("agent") || q.includes("进展") || q.includes("这周") || s.includes("harness") || s.includes("week")) {
    return {
      grounded: zh ? "基于 AI 知识源检索 · 命中 3 条" : "AI Sources · 3 hits",
      text: zh
        ? "Latent Space 与 The Pragmatic Engineer 本周都在谈 agent harness 的评测与工程化；simonwillison.net 有一篇可上手的 SDK 实操。"
        : "Latent Space and The Pragmatic Engineer both cover agent-harness evaluation and engineering this week; simonwillison.net has a hands-on SDK piece.",
      cites: [["L3", "Latent Space"], ["L2", "Pragmatic Engineer"], ["L2", "simonwillison.net"]],
    };
  }
  return {
    grounded: zh ? "已跨三域检索 · 命中 2 条" : "Cross-domain · 2 hits",
    text: zh
      ? "这是演示的预设回答：真实版会在与左侧同一份数据源（AI 知识源 + Vibe Hub + 闭环学院）上检索，给出带引用的回答。"
      : "Preset demo answer: the real version retrieves over the same data source (AI Sources + Vibe Hub + Loop Academy) and answers with citations.",
    cites: [["L3", "Latent Space"], ["术语", "AI Sense Wiki"]],
  };
}

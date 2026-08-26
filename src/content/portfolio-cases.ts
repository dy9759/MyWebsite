import type { CaseStudy } from "./portfolio-types";

export const zhCases: CaseStudy[] = [
  {
    id: "case-sayso-voice-ai",
    slug: "sayso-voice-ai",
    number: "01",
    status: "已上线",
    title: "SaySo Voice Agent",
    summary: "国内首家 Voice AI 输入产品：1000 万+ 次真实交互，盲测优于 Whisper / Typeless",
    role: "C 端 Voice Agent 业务线产品负责人",
    period: "2025.7—2026.5",
    problems: [
      "语音输入真实场景噪声、口音和任务类型多样，模型效果与稳定性持续波动。",
      "用户需要快速获得第一次有效输出，同时保留失败重试和人工编辑能力。",
    ],
    decision:
      "确定用户场景后，以“准、快、结构化输出”为三个阶段性目标，覆盖四大核心场景与用户自定义自适应能力，用评测集、兜底和可编辑链路连接模型质量、用户体验与转化漏斗。",
    evidence: [
      { value: "900ms", label: "稳定首字延迟" },
      { value: "80% / 95%", label: "盲测胜 Typeless / Whisper" },
      { value: "1000 万+", label: "语音 / Agent 交互" },
      { value: "90.4%", label: "Speaker activation" },
    ],
    sections: {
      challenge: [
        "国内首家上线的语音输入产品，国外仅 Whisper、Typeless 等少数竞品；预判大厂将入局，需以差异化建立壁垒。",
        "Voice AI 的价值不只取决于单次识别准确率，还受到延迟、上下文、失败恢复和编辑成本共同影响。",
        "产品同时覆盖输入法、会议、个人语音助理和办公提效场景，需要统一核心行为与指标口径。",
      ],
      ownership: [
        "作为产品负责人，从 0 到 1 定义 SaySo 语音产品的核心行为、指标体系与技术方案，对激活、完成率与商业化结果负责。",
        "架构 Agent 链路，主导 LLM 选型与 Agent 评测；亲自清洗 1w+ 用户数据、对比竞品评测，定义评测数据集与产品评测标准，搭建评测平台链路。",
        "主导客户端语音转写、会议纪要等核心功能迭代研发，以及 UI/UX 布局与设计选型，把控交互细节与产品品味。",
        "以产品、UI、测试、前后端的产研组织协作，负责 PRD、路线图、排期、优先级与上线验收，主导客户端 + 后端与 Agent 功能设计，推动国内 / 国外 × Mac / Win 四端上线。",
        "设计问卷并深度访谈内容创作者、独立老师等居家办公用户，结合线上行为数据与灰度验证，建立激活、完成率、复用与订阅转化指标与需求洞察。",
      ],
      decisions: [
        "以“准、快、结构化输出”为三个阶段性目标，覆盖四大核心场景与用户自定义自适应能力。",
        "将首次有效输出作为 onboarding 的主目标，减少首次输入前的解释和设置成本。",
        "把 ASR/TTS/LLM 波动显式转化为失败提示、重试、编辑和模型降级策略。",
        "用真实任务评测和线上数据共同决定版本优先级。",
      ],
      system: [
        "产品层：输入法、会议、个人语音助理与办公提效场景。",
        "能力层：ASR、TTS、LLM 与端到端语音模型。",
        "客户端架构：Mac 端语音识别输入 / 输出、会议实时转写与灵动岛交互采用 Swift 原生，其余用 Electron 保证多端同步更新。",
        "保障层：评测集、埋点、灰度发布、异常兜底和用户反馈闭环。",
      ],
      results: [
        "场景盲测中，用户体验 80% 胜 Typeless、95% 胜 Whisper；首字延迟最快稳定在 900ms。",
        "截至 2026.08，累计 1000 万+ 次语音 / Agent 交互。",
        "非删除用户 Speaker activation 达 90.4%。",
        "整体完成率 93.3%；国内成功订单中年付占 58.6%，贡献国内成功付费收入 90.9%。",
      ],
      reflection: [
        "商业化仍处于早期，年付偏好是高意向用户信号，不能单独代表整体规模化转化。",
        "语音产品应持续区分模型问题、网络问题、交互问题与用户预期问题，避免用单一准确率解释体验。",
      ],
      next: [
        "补充分场景留存、P50/P95 首字延迟和会员转化样本量。",
        "增加可公开的产品界面、用户流程和指标漏斗截图。",
      ],
    },
    links: [
      { label: "国内版", url: "https://sayso.cn/" },
      { label: "国际版", url: "https://sayso.ai/" },
    ],
    needed: ["产品界面截图", "指标漏斗截图", "分场景留存数据"],
  },
  {
    id: "case-sayso-team",
    slug: "sayso-team",
    number: "02",
    status: "内部上线使用",
    title: "SaySo Team · Harness",
    summary: "多人、多 Agent 协作与 Harness 架构",
    role: "产品负责人 / Solo Builder",
    period: "2026.4—至今",
    problems: [
      "Claude Code、Codex、自研 Agent 等执行环境接口和上下文管理方式不同。",
      "多人协作与多 Agent 任务需要权限、过程可观测和人工接管机制。",
    ],
    decision:
      "将 Harness 设计为兼容层，用统一任务协议连接不同 CLI、SDK 与自研 Agent，产品层只关注任务、状态、权限和结果。",
    evidence: [
      { value: "内部上线使用", label: "当前产品阶段" },
      { value: "多运行时", label: "CLI / SDK / 自研 Agent" },
      { value: "待补充", label: "任务成功率", placeholder: true },
      { value: "待补充", label: "真实团队使用量", placeholder: true },
    ],
    sections: {
      challenge: [
        "不同 Agent 工具对任务、上下文、文件、权限和回调的表达不一致。",
        "团队场景不仅需要“能执行”，还需要知道谁发起、谁审批、执行到哪里和如何回滚。",
      ],
      ownership: [
        "作为 Claude Code + Codex 双开用户、Manus / OpenClaw / Cowork 等早期体验者，把跨工具真实使用体感转化为 Harness 兼容层设计。",
        "负责产品定位、核心场景、任务模型、界面原型与 MVP 推进。",
        "以 Solo Builder 方式完成可交互 Demo，验证后再拆解研发任务。",
      ],
      decisions: [
        "用统一任务协议和适配器隔离 Claude Code、Codex、SDK 与自研 Agent 差异。",
        "把人工确认、权限控制、日志和 trace 作为产品能力，而不是后台附加功能。",
        "先支持少量高频协作场景，再扩展复杂多 Agent 自主协作。",
      ],
      system: [
        "产品层：团队、任务、审批、状态和结果。",
        "Harness 层：任务协议、上下文、权限、日志与模型路由。",
        "云端执行：Claude Code Agent SDK 作为 worker 的 agent runtime，处理定时、循环、提醒等线上托管任务。",
        "本地执行：客户端串联 Claude Code、Codex，通过本地文件、浏览器权限与 computer use 处理本地任务。",
      ],
      results: [
        "已形成 Harness 兼容层与 SaySo Team MVP 方向。",
        "真实团队使用量与任务成功率仍需补充，不在当前页面虚构。",
      ],
      reflection: [
        "多 Agent 价值不在 Agent 数量，而在任务拆解质量、过程透明度和失败恢复成本。",
        "兼容层需要保持薄，避免把每个执行环境的特性全部抽象掉。",
      ],
      next: [
        "补充 MVP 截图、真实任务流程和架构图。",
        "补充团队用户量、任务成功率、人工接管率与 P95 调度延迟。",
      ],
    },
    links: [
      {
        label: "Harness Skill",
        url: "https://github.com/dy9759/claude-codex-orchestration",
      },
    ],
    needed: ["MVP 截图", "架构图", "团队用户量", "任务成功率"],
  },
  {
    id: "case-model-evaluation",
    slug: "model-evaluation",
    number: "04",
    status: "进行中",
    title: "模型产品：政务同传大模型",
    summary:
      "面向政务场景专项微调的实时同传大模型，从产品定义、数据、标注到评测与产品化全栈自建",
    role: "产品负责人 + 全栈 / 团队负责人",
    period: "2026.7—至今",
    problems: [
      "通用同传大模型在政务场景的术语、表达与合规上适配不足，与火山等大厂同质化。",
      "缺少政务场景的数据、标注、评测与产品化闭环，模型迭代没有量化抓手。",
    ],
    decision:
      "把产品定位在政务场景专项微调、与大厂差异化竞争；从爬虫、数据管线、标注平台、评测体系到产品展示页全栈自建，用评测与 bad case 反哺模型迭代。",
    evidence: [
      { value: "10s→2s", label: "首字延迟" },
      { value: "60%→98%", label: "场景翻译 benchmark 准确率" },
      { value: "1w+ 小时", label: "爬取政务场景数据" },
      { value: "待补充", label: "音色克隆 MOS 评分", placeholder: true },
    ],
    sections: {
      challenge: [
        "政务场景对术语准确性、表达规范与合规要求高，通用模型直接迁移效果差。",
        "首字延迟、翻译质量与音色克隆需同时优化，且缺少可复现的评测口径。",
      ],
      ownership: [
        "产品：定义政务同传场景与产品指标（延迟、翻译质量、音色），锚定政务专项微调的差异化定位。",
        "数据：定义主题关键词，短时间内爬取 1w+ 小时场景数据，并构建 bad case 扩展数据集。",
        "评测：主导定义场景评测集与 bad case 评测集。",
        "全栈：从 0 到 1 搭建数据标注平台、模型调试与评测平台、同传产品展示页，部署模型并打通数据管线。",
        "团队：带领研发 / 标注团队推进数据、标注、评测与模型迭代闭环。",
      ],
      decisions: [
        "产品定位在政务场景专项微调，与火山等大厂形成差异化，而非拼通用能力。",
        "以“用户听到第一个可理解译音”为体验锚点，把首字延迟作为核心指标。",
        "用 bad case 评测集反哺数据与后训练，形成可量化的模型优化闭环。",
      ],
      system: [
        "数据层：主题关键词爬虫、场景数据与 bad case 扩展数据集、数据管线。",
        "标注层：从 0 到 1 自建数据标注平台与评测体系。",
        "模型层：政务专项微调的端到端同传大模型（延迟 / 翻译 / 音色）。",
        "产品层：模型调试与评测平台、同传产品展示页。",
      ],
      results: [
        "首字延迟从约 10s 优化到 2s。",
        "场景内翻译质量 benchmark 评分准确率从 60% 提升到 98%。",
        "爬取 1w+ 小时政务场景数据，音色克隆质量同步提升。",
      ],
      reflection: [
        "垂直场景专项微调比拼通用能力更能建立差异化壁垒。",
        "自建标注与评测闭环，是让模型迭代可量化、可复现的前提。",
      ],
      next: [
        "推进政务同传大模型作为省级 / 国家级大会官方同传服务的落地与验证。",
        "补充 P50/P95 延迟、音色克隆 MOS 与真实场景样本量。",
        "补充可公开的评测平台截图与多模型对比结果。",
      ],
    },
    links: [],
    needed: ["P50/P95 延迟数据", "音色克隆评分", "评测平台截图", "公开 Demo"],
  },
  {
    id: "case-sayso-api",
    slug: "sayso-api",
    number: "03",
    status: "进行中",
    title: "SaySo API · B 端语音能力",
    summary: "把输入法级中英文实时转写产品化为对外 API，服务 B 端与硬件场景",
    role: "SaySo API / B 端产品负责人",
    period: "2026.5—至今",
    problems: [
      "C 端积累的实时转写能力，如何以稳定、可计费的对外 API 形式服务 B 端。",
      "出海与硬件场景对小语种、延迟与稳定性有差异化要求。",
    ],
    decision:
      "以输入法验证过的中英文实时转写为底座，抽象出统一对外 API，按 B 端与硬件需求扩展小语种与场景适配。",
    evidence: [
      { value: "中英 + 小语种", label: "覆盖语种（含印尼语）" },
      { value: "对外 API", label: "产品形态" },
      { value: "硬件厂商", label: "合作意向" },
      { value: "待补充", label: "调用量 / 延迟", placeholder: true },
    ],
    sections: {
      challenge: [
        "C 端能力转 B 端，需要重新定义稳定性、计费、鉴权与 SLA。",
        "出海与硬件场景对小语种（如印尼语）和端侧延迟要求更高。",
      ],
      ownership: [
        "负责 SaySo API 接口产品开发，将中英文实时转写产品化为对外 API。",
        "基于 B 端用户需求，深度开发印尼语等小语种能力。",
        "对接头部硬件厂商，推进合作意向落地。",
      ],
      decisions: [
        "以输入法验证过的转写能力为底座抽象统一 API，而非重造。",
        "按 B 端场景优先级排小语种与适配，而非一次铺全。",
      ],
      system: [
        "能力层：中英文实时转写与小语种扩展。",
        "接口层：对外 API（鉴权、计费、SLA）。",
        "场景层：B 端集成与硬件端侧。",
      ],
      results: [
        "已完成 API 产品化与印尼语等小语种方向，并与头部硬件厂商达成合作意向。",
        "调用量、延迟与商业化数据仍在积累，不在此虚构。",
      ],
      reflection: [
        "C 端到 B 端不是接口暴露，而是稳定性、计费与 SLA 的重新定义。",
        "小语种的价值取决于真实 B 端场景，而非语种数量。",
      ],
      next: [
        "补充真实调用量、P95 延迟与小语种准确率。",
        "补充 B 端接入案例与硬件合作进展。",
      ],
    },
    links: [],
    needed: ["调用量数据", "P95 延迟", "B 端接入案例", "硬件合作进展"],
  },
];

export const enCases: CaseStudy[] = zhCases.map((item) => ({ ...item }));

Object.assign(enCases[0], {
  status: "Live",
  title: "SaySo Voice Agent",
  summary: "China's first Voice AI input product: 10M+ interactions, beating Whisper / Typeless in blind tests",
  role: "Product Lead, Consumer Voice Agent",
  period: "Jul 2025—May 2026",
  problems: [
    "Real voice input varies by noise, accent and task, while model quality and stability fluctuate.",
    "Users need a fast first successful output with clear retry and editing paths.",
  ],
  decision:
    "After fixing the user scenarios, set accuracy, speed and structured output as three phased goals across four core scenarios plus user-custom adaptation, connecting model quality, experience and conversion through evaluation sets, fallback and editable output.",
  evidence: [
    { value: "900ms", label: "Stable first-token latency" },
    { value: "80% / 95%", label: "Blind-test wins vs Typeless / Whisper" },
    { value: "10M+", label: "Voice / Agent interactions" },
    { value: "90.4%", label: "Speaker activation" },
  ],
  sections: {
    challenge: [
      "First voice-input product to launch in China; abroad only a few rivals (Whisper, Typeless). With big players expected to enter, differentiation was the moat.",
      "Voice AI experience depends on latency, context, recovery and editing cost—not recognition accuracy alone.",
      "Input, meeting, assistant and productivity scenarios needed one shared core behavior and metric model.",
    ],
    ownership: [
      "As product lead, defined the SaySo speech product from zero to one — core behavior, metric model and technical approach — and owned activation, completion and commercialization outcomes.",
      "Architected the agent pipeline and led LLM selection and agent evaluation; personally cleaned 10k+ user records, benchmarked against competitors, defined the evaluation dataset and product evaluation standards, and built the evaluation platform.",
      "Led client-side core features (speech transcription, meeting notes) plus UI/UX layout and design choices, owning interaction detail and product taste.",
      "Ran the product / UI / QA / frontend / backend org to own PRDs, roadmap, release planning, prioritization and launch acceptance; led client + backend and agent feature design and shipped four clients (CN / Global x Mac / Win).",
      "Designed surveys and ran in-depth interviews with WFH users (content creators, independent teachers), combining them with production behavior data and staged rollout to establish activation, completion, reuse and subscription metrics and user insight.",
    ],
    decisions: [
      "Set accuracy, speed and structured output as three phased goals across four core scenarios plus user-custom adaptation.",
      "Made the first successful output the primary onboarding goal.",
      "Converted ASR/TTS/LLM variance into retry, editing, fallback and degradation paths.",
      "Used real-task evaluation together with production data to prioritize releases.",
    ],
    system: [
      "Product: input, meetings, personal voice assistant and productivity.",
      "Capabilities: ASR, TTS, LLM and end-to-end speech models.",
      "Client architecture: Swift-native for Mac speech I/O, live meeting transcription and Dynamic Island; Electron elsewhere for synchronized multi-client updates.",
      "Quality: evaluation sets, analytics, staged rollout, fallback and feedback loops.",
    ],
    results: [
      "In scenario blind tests users preferred the product 80% of the time over Typeless and 95% over Whisper; first-token latency stabilized as low as 900ms.",
      "10M+ voice / agent interactions as of Aug 2026.",
      "Speaker activation reached 90.4% among active records.",
      "93.3% overall completion; annual plans were 58.6% of successful CN orders and 90.9% of CN paid revenue.",
    ],
    reflection: [
      "Commercialization is still early; annual-plan preference is a high-intent signal, not proof of scaled conversion.",
      "Speech products must separate model, network, interaction and expectation failures.",
    ],
    next: [
      "Add scenario retention, P50/P95 first-token latency and conversion sample sizes.",
      "Add public product, journey and funnel screenshots.",
    ],
  },
  needed: ["Product screenshots", "Conversion funnel", "Scenario retention data"],
});

Object.assign(enCases[1], {
  status: "Internal launch",
  title: "SaySo Team · Harness",
  summary: "Multi-user, multi-agent collaboration through a harness architecture",
  role: "Product Lead / Solo Builder",
  period: "Apr 2026—Present",
  problems: [
    "Claude Code, Codex, SDKs and custom agents expose different interfaces and context models.",
    "Team workflows require permissions, observability and human takeover—not only execution.",
  ],
  decision:
    "Designed the harness as a compatibility layer: one task protocol connects CLIs, SDKs and custom agents while the product layer focuses on tasks, state, permissions and outcomes.",
  evidence: [
    { value: "Internal launch", label: "Current stage" },
    { value: "Multi-runtime", label: "CLI / SDK / custom agents" },
    { value: "Needed", label: "Task success rate", placeholder: true },
    { value: "Needed", label: "Real team usage", placeholder: true },
  ],
  sections: {
    challenge: [
      "Agent tools differ in task, context, file, permission and callback models.",
      "Team workflows need initiator, approval, progress and recovery visibility—not execution alone.",
    ],
    ownership: [
      "As a heavy Claude Code + Codex dual-runtime user and early adopter of Manus, OpenClaw and Cowork, turned cross-tool hands-on experience into the harness compatibility design.",
      "Owned positioning, core scenarios, task model, interface prototype and MVP delivery.",
      "Built an interactive demo as a solo builder before decomposing engineering work.",
    ],
    decisions: [
      "Used one task protocol and adapters to isolate Claude Code, Codex, SDK and custom-agent differences.",
      "Treated human confirmation, permissions, logs and traces as product capabilities.",
      "Started with a small set of high-frequency workflows before autonomous multi-agent complexity.",
    ],
    system: [
      "Product: teams, tasks, approvals, state and outcomes.",
      "Harness: task protocol, context, permissions, logs and model routing.",
      "Cloud execution: Claude Code Agent SDK as the worker agent runtime for scheduled, looped and reminder-based hosted tasks.",
      "Local execution: the client chains Claude Code and Codex, using local files, browser permissions and computer use for on-device tasks.",
    ],
    results: [
      "Defined the harness compatibility layer and SaySo Team MVP direction.",
      "Real team usage and task success rates still need evidence and are not fabricated here.",
    ],
    reflection: [
      "Multi-agent value comes from task decomposition, transparency and recovery—not the number of agents.",
      "The compatibility layer must stay thin enough to preserve useful runtime-specific features.",
    ],
    next: [
      "Add MVP screenshots, a real task flow and an architecture diagram.",
      "Add team usage, task success, human takeover and P95 scheduling latency.",
    ],
  },
  needed: ["MVP screenshots", "Architecture diagram", "Team usage", "Task success rate"],
});

Object.assign(enCases[2], {
  status: "In progress",
  title: "Model Product: Government Interpretation LLM",
  summary:
    "A real-time interpretation LLM fine-tuned for government scenarios—built full-stack from product definition and data to annotation, evaluation and productization",
  role: "Product Lead + Full-stack / Team Lead",
  period: "Jul 2026—Present",
  problems: [
    "General interpretation LLMs underfit government terminology, phrasing and compliance—undifferentiated from vendors like Volcano.",
    "No data, annotation, evaluation or productization loop for government scenarios, so model iteration had no quantitative lever.",
  ],
  decision:
    "Positioned the product as a government-specialized fine-tune differentiated from big vendors; built the crawler, data pipeline, annotation platform, evaluation system and demo page full-stack, feeding evaluation and bad cases back into model iteration.",
  evidence: [
    { value: "10s→2s", label: "First-token latency" },
    { value: "60%→98%", label: "In-scenario translation benchmark accuracy" },
    { value: "10k+ hrs", label: "Crawled government-scenario data" },
    { value: "Needed", label: "Voice-clone MOS score", placeholder: true },
  ],
  sections: {
    challenge: [
      "Government scenarios demand high terminology accuracy, phrasing norms and compliance; general models transfer poorly.",
      "First-token latency, translation quality and voice cloning must improve together, with no reproducible evaluation standard.",
    ],
    ownership: [
      "Product: defined government interpretation scenarios and product metrics (latency, translation quality, timbre), anchoring the government-specialized differentiation.",
      "Data: defined topic keywords, crawled 10k+ hours of scenario data in a short window and built a bad-case expansion dataset.",
      "Evaluation: led the definition of the scenario evaluation set and the bad-case evaluation set.",
      "Full-stack: built the annotation platform, model-debugging and evaluation platform, and interpretation demo page from scratch, deployed models and wired the data pipeline.",
      "Team: led R&D / annotation to run the data, annotation, evaluation and model-iteration loop.",
    ],
    decisions: [
      "Positioned on a government-specialized fine-tune, differentiating from vendors like Volcano rather than competing on general capability.",
      "Anchored experience on when users hear the first understandable translated speech, making first-token latency the core metric.",
      "Fed the bad-case evaluation set back into data and post-training to form a quantifiable model-optimization loop.",
    ],
    system: [
      "Data: topic-keyword crawler, scenario data and bad-case expansion dataset, data pipeline.",
      "Annotation: self-built annotation platform and evaluation system from scratch.",
      "Model: government-specialized end-to-end interpretation LLM (latency / translation / timbre).",
      "Product: model-debugging and evaluation platform, interpretation demo page.",
    ],
    results: [
      "Cut first-token latency from ~10s to 2s.",
      "Raised in-scenario translation benchmark accuracy from 60% to 98%.",
      "Crawled 10k+ hours of government-scenario data; voice-clone quality improved alongside.",
    ],
    reflection: [
      "A vertical-scenario specialized fine-tune builds a stronger moat than competing on general capability.",
      "A self-built annotation and evaluation loop is the precondition for quantifiable, reproducible model iteration.",
    ],
    next: [
      "Drive the government interpretation LLM toward official interpretation service for provincial / national conferences.",
      "Add P50/P95 latency, voice-clone MOS and real-world sample sizes.",
      "Add public evaluation-platform screenshots and multi-model comparisons.",
    ],
  },
  needed: [
    "P50/P95 latency data",
    "Voice-clone score",
    "Platform screenshots",
    "Public demo",
  ],
});

Object.assign(enCases[3], {
  status: "In progress",
  title: "SaySo API · B2B Speech",
  summary:
    "Productizing input-method-grade CN/EN real-time transcription into an external API for B2B and hardware",
  role: "SaySo API / B2B Product Lead",
  period: "May 2026—Present",
  problems: [
    "How to serve B2B with the consumer real-time transcription as a stable, billable external API.",
    "Overseas and hardware scenarios have distinct needs for low-resource languages, latency and stability.",
  ],
  decision:
    "Use the input-method-proven CN/EN transcription as the base, abstract a unified external API, and extend low-resource languages and scenario adaptation per B2B and hardware needs.",
  evidence: [
    { value: "CN/EN + more", label: "Languages (incl. Indonesian)" },
    { value: "External API", label: "Product form" },
    { value: "Hardware maker", label: "Partnership intent" },
    { value: "Needed", label: "Call volume / latency", placeholder: true },
  ],
  sections: {
    challenge: [
      "Turning a consumer capability into B2B means redefining stability, billing, auth and SLAs.",
      "Overseas and hardware scenarios demand stronger low-resource-language (e.g. Indonesian) and on-device latency.",
    ],
    ownership: [
      "Own SaySo API product development, productizing CN/EN real-time transcription into an external API.",
      "Deeply develop low-resource languages (e.g. Indonesian) driven by B2B needs.",
      "Engage a leading hardware maker and drive the partnership intent forward.",
    ],
    decisions: [
      "Abstract a unified API on top of the input-method-proven transcription rather than rebuilding.",
      "Sequence languages and adaptation by B2B scenario priority instead of covering everything at once.",
    ],
    system: [
      "Capability: CN/EN real-time transcription with low-resource-language extension.",
      "Interface: external API (auth, billing, SLA).",
      "Scenarios: B2B integration and on-device hardware.",
    ],
    results: [
      "Completed API productization and the low-resource-language direction, plus a partnership intent with a leading hardware maker.",
      "Call volume, latency and commercialization data are still accruing and are not fabricated here.",
    ],
    reflection: [
      "Consumer-to-B2B is not exposing an endpoint; it is redefining stability, billing and SLAs.",
      "Low-resource-language value depends on real B2B scenarios, not the number of languages.",
    ],
    next: [
      "Add real call volume, P95 latency and low-resource-language accuracy.",
      "Add B2B integration cases and hardware-partnership progress.",
    ],
  },
  needed: [
    "Call volume",
    "P95 latency",
    "B2B integration cases",
    "Hardware partnership progress",
  ],
});

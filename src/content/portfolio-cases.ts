import type { CaseStudy } from "./portfolio-types";

export const zhCases: CaseStudy[] = [
  {
    id: "case-sayso-voice-ai",
    slug: "sayso-voice-ai",
    number: "01",
    status: "已上线",
    title: "SaySo Voice Agent",
    summary: "国内首家 Voice AI 输入产品：1000 万+ 次真实交互，盲测优于 Whisper / Typeless；转写能力已产品化为 B 端 API",
    role: "C 端 Voice Agent 业务线产品负责人 · SaySo API B 端产品负责人",
    period: "2025.7—至今",
    problems: [
      "语音输入真实场景噪声、口音和任务类型多样，模型效果与稳定性持续波动。",
      "用户需要快速获得第一次有效输出，同时保留失败重试和人工编辑能力。",
      "C 端积累的实时转写能力，如何以稳定、可计费的对外 API 形式服务 B 端与硬件场景。",
    ],
    decision:
      "确定用户场景后，以“准、快、结构化输出”为三个阶段性目标，覆盖四大核心场景与用户自定义自适应能力，用评测集、兜底和可编辑链路连接模型质量、用户体验与转化漏斗；C 端验证后的转写底座进一步抽象为对外 API，按 B 端与硬件需求扩展小语种。",
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
        "C 端能力转 B 端需要重新定义稳定性、计费、鉴权与 SLA；出海与硬件场景对小语种（如印尼语）和端侧延迟要求更高。",
      ],
      ownership: [
        "作为产品负责人，从 0 到 1 定义 SaySo 语音产品的核心行为、指标体系与技术方案，对激活、完成率与商业化结果负责。",
        "架构 Agent 链路，主导 LLM 选型与 Agent 评测；亲自清洗 1w+ 用户数据、对比竞品评测，定义评测数据集与产品评测标准，搭建评测平台链路。",
        "主导客户端语音转写、会议纪要等核心功能迭代研发，以及 UI/UX 布局与设计选型，把控交互细节与产品品味。",
        "以产品、UI、测试、前后端的产研组织协作，负责 PRD、路线图、排期、优先级与上线验收，主导客户端 + 后端与 Agent 功能设计，推动国内 / 国外 × Mac / Win 四端上线。",
        "设计问卷并深度访谈内容创作者、独立老师等居家办公用户，结合线上行为数据与灰度验证，建立激活、完成率、复用与订阅转化指标与需求洞察。",
        "B 端延伸（2026.5 起）：负责 SaySo API 接口产品开发，把输入法验证过的中英文实时转写产品化为对外 API，并按 B 端需求深度开发印尼语等小语种。",
        "对接头部硬件厂商，推进合作意向落地。",
      ],
      decisions: [
        "以“准、快、结构化输出”为三个阶段性目标，覆盖四大核心场景与用户自定义自适应能力。",
        "将首次有效输出作为 onboarding 的主目标，减少首次输入前的解释和设置成本。",
        "把 ASR/TTS/LLM 波动显式转化为失败提示、重试、编辑和模型降级策略。",
        "用真实任务评测和线上数据共同决定版本优先级。",
        "以验证过的转写能力为底座抽象统一对外 API，按 B 端场景优先级扩小语种与适配，而非一次铺全。",
      ],
      system: [
        "产品层：输入法、会议、个人语音助理与办公提效场景。",
        "能力层：ASR、TTS、LLM 与端到端语音模型。",
        "客户端架构：Mac 端语音识别输入 / 输出、会议实时转写与灵动岛交互采用 Swift 原生，其余用 Electron 保证多端同步更新。",
        "保障层：评测集、埋点、灰度发布、异常兜底和用户反馈闭环。",
        "B 端接口层：对外 API（鉴权、计费、SLA），服务 B 端集成与硬件端侧。",
      ],
      results: [
        "场景盲测中，用户体验 80% 胜 Typeless、95% 胜 Whisper；首字延迟最快稳定在 900ms。",
        "截至 2026.08，累计 1000 万+ 次语音 / Agent 交互。",
        "非删除用户 Speaker activation 达 90.4%。",
        "整体完成率 93.3%；国内成功订单中年付占 58.6%，贡献国内成功付费收入 90.9%。",
        "B 端线：完成 API 产品化与印尼语等小语种方向，与头部硬件厂商达成合作意向（调用量与延迟数据积累中）。",
      ],
      reflection: [
        "商业化仍处于早期，年付偏好是高意向用户信号，不能单独代表整体规模化转化。",
        "语音产品应持续区分模型问题、网络问题、交互问题与用户预期问题，避免用单一准确率解释体验。",
        "C 端到 B 端不是接口暴露，而是稳定性、计费与 SLA 的重新定义。",
      ],
      next: [
        "补充分场景留存、P50/P95 首字延迟和会员转化样本量。",
        "增加可公开的产品界面、用户流程和指标漏斗截图。",
        "补充 API 调用量、P95 延迟、小语种准确率与 B 端接入案例。",
      ],
    },
    links: [
      { label: "国内版", url: "https://sayso.cn/" },
      { label: "国际版", url: "https://sayso.ai/" },
    ],
    needed: ["产品界面截图", "指标漏斗截图", "分场景留存数据", "API 调用量与硬件合作进展"],
  },
  {
    id: "case-sayso-team",
    slug: "sayso-team",
    number: "02",
    status: "内部上线使用",
    title: "Harness 产品：SaySo Team · Voice Agent Harness",
    summary: "一套 Harness 底座，两条产品线：SaySo Team 多人多 Agent 协作，与支撑 C 端语音产品的 Voice Agent Harness 运行时",
    role: "产品负责人 / Solo Builder",
    period: "2026.4—至今",
    problems: [
      "Claude Code、Codex、自研 Agent 等执行环境接口和上下文管理方式不同。",
      "多人协作与多 Agent 任务需要权限、过程可观测和人工接管机制。",
      "语音智能体同样需要 Harness 能力：工具调用、上下文、权限与观测要在实时语音链路里发生。",
    ],
    decision:
      "将 Harness 设计为兼容层，用统一任务协议连接不同 CLI、SDK 与自研 Agent，产品层只关注任务、状态、权限和结果；同一套底座向上支撑 SaySo Team 协作产品与 Voice Agent 运行时。",
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
        "把 C 端 Voice Agent 的运行时抽象为 Voice Agent Harness，与 SaySo Team 共用任务协议与权限模型。",
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
        "Voice Agent Harness：语音链路的 Agent 运行时——ASR / LLM / TTS 工具编排、打断与状态管理，支撑 SaySo C 端语音产品。",
      ],
      results: [
        "已形成 Harness 兼容层与 SaySo Team MVP 方向；同一底座同时支撑 Voice Agent 运行时。",
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
    number: "03",
    status: "进行中",
    title: "同传产品：大模型 + API + 移动端 App",
    summary:
      "面向政务 / 文旅 / 商务场景专项微调的实时同传大模型，中英日韩输入、18 种语言输出，以模型、对外 API 与移动端 App 三种形态交付——从 0 到 1 完成产品定义、数据、标注、评测与产品化的全栈自建",
    role: "产品负责人 + 全栈 / 团队负责人",
    period: "2026.7—至今",
    problems: [
      "通用同传大模型在政务 / 文旅 / 商务等垂直场景的术语、表达与合规上适配不足，与火山等大厂同质化。",
      "缺少政务场景的数据、标注、评测与产品化闭环，模型迭代没有量化抓手。",
      "模型能力要真正落到会议现场，还需要 API 接入与移动端 App 两种交付形态。",
    ],
    decision:
      "把产品定位在政务 / 文旅 / 商务垂直场景专项微调、与大厂差异化竞争；从爬虫、数据管线、标注平台、评测体系到产品展示页全栈自建，用评测与 bad case 反哺模型迭代；交付形态不止模型——同步产品化对外 API 与移动端 App。",
    evidence: [
      { value: "10s→2s", label: "首字延迟" },
      { value: "60%→98%", label: "场景翻译 benchmark 准确率" },
      { value: "1w+ 小时", label: "爬取政务场景数据" },
      { value: "中英日韩 → 18 语种", label: "输入 / 输出语言覆盖" },
      { value: "待补充", label: "音色克隆 MOS 评分", placeholder: true },
    ],
    sections: {
      challenge: [
        "政务 / 文旅 / 商务场景对术语准确性、表达规范与合规要求高，通用模型直接迁移效果差。",
        "首字延迟、翻译质量与音色克隆需同时优化，且缺少可复现的评测口径。",
        "多语种同传：中英日韩输入、18 种语言输出，小语种的质量与评测口径都要同步跟上。",
      ],
      ownership: [
        "产品：定义政务 / 文旅 / 商务同传场景与产品指标（延迟、翻译质量、音色），锚定政务专项微调的差异化定位；规划模型 / API / 移动端 App 三种交付形态。",
        "数据：定义主题关键词，短时间内爬取 1w+ 小时场景数据，并构建 bad case 扩展数据集。",
        "评测：主导定义场景评测集与 bad case 评测集。",
        "全栈：从 0 到 1 搭建数据标注平台、模型调试与评测平台、同传产品展示页，部署模型并打通数据管线；推进同传能力的对外 API 与移动端 App 产品化。",
        "团队：带领研发 / 标注团队推进数据、标注、评测与模型迭代闭环。",
      ],
      decisions: [
        "产品定位在政务 / 文旅 / 商务垂直场景专项微调，与火山等大厂形成差异化，而非拼通用能力。",
        "以“用户听到第一个可理解译音”为体验锚点，把首字延迟作为核心指标。",
        "用 bad case 评测集反哺数据与后训练，形成可量化的模型优化闭环。",
        "交付形态上不停在「模型」：API 服务会议系统集成，移动端 App 覆盖现场随行使用。",
      ],
      system: [
        "数据层：主题关键词爬虫、场景数据与 bad case 扩展数据集、数据管线。",
        "标注层：从 0 到 1 自建数据标注平台与评测体系。",
        "模型层：垂直场景专项微调的端到端同传大模型（延迟 / 翻译 / 音色），中英日韩输入、18 种语言输出。",
        "产品层：模型调试与评测平台、同传产品展示页。",
        "交付层：对外同传 API 与移动端 App（现场 / 随行同传入口）。",
      ],
      results: [
        "首字延迟从约 10s 优化到 2s。",
        "场景内翻译质量 benchmark 评分准确率从 60% 提升到 98%。",
        "爬取 1w+ 小时政务场景数据，音色克隆质量同步提升。",
        "同传能力已延伸出对外 API 与移动端 App 两种产品形态（接入与使用数据积累中）。",
        "语言覆盖：中英日韩输入，输出扩展到 18 种语言。",
      ],
      reflection: [
        "垂直场景专项微调比拼通用能力更能建立差异化壁垒。",
        "自建标注与评测闭环，是让模型迭代可量化、可复现的前提。",
      ],
      next: [
        "推进政务同传大模型作为省级 / 国家级大会官方同传服务的落地与验证。",
        "补充 P50/P95 延迟、音色克隆 MOS 与真实场景样本量。",
        "补充可公开的评测平台截图与多模型对比结果。",
        "补充 API 接入案例与移动端 App 的使用数据。",
      ],
    },
    links: [],
    needed: ["P50/P95 延迟数据", "音色克隆评分", "评测平台截图", "公开 Demo", "API 接入与 App 使用数据"],
  },
];

export const enCases: CaseStudy[] = zhCases.map((item) => ({ ...item }));

Object.assign(enCases[0], {
  status: "Live",
  links: [
    { label: "China", url: "https://sayso.cn/" },
    { label: "International", url: "https://sayso.ai/" },
  ],
  title: "SaySo Voice Agent",
  summary: "China's first Voice AI input product: 10M+ interactions, beating Whisper / Typeless in blind tests; transcription now productized as a B2B API",
  role: "Product Lead, Consumer Voice Agent · SaySo API B2B Product Lead",
  period: "Jul 2025—Present",
  problems: [
    "Real voice input varies by noise, accent and task, while model quality and stability fluctuate.",
    "Users need a fast first successful output with clear retry and editing paths.",
    "How to serve B2B and hardware scenarios with the consumer transcription stack as a stable, billable external API.",
  ],
  decision:
    "After fixing the user scenarios, set accuracy, speed and structured output as three phased goals across four core scenarios plus user-custom adaptation, connecting model quality, experience and conversion through evaluation sets, fallback and editable output; the proven transcription base was then abstracted into an external API extended per B2B and hardware needs.",
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
      "Consumer-to-B2B meant redefining stability, billing, auth and SLAs; overseas and hardware scenarios demand stronger low-resource languages (e.g. Indonesian) and on-device latency.",
    ],
    ownership: [
      "As product lead, defined the SaySo speech product from zero to one — core behavior, metric model and technical approach — and owned activation, completion and commercialization outcomes.",
      "Architected the agent pipeline and led LLM selection and agent evaluation; personally cleaned 10k+ user records, benchmarked against competitors, defined the evaluation dataset and product evaluation standards, and built the evaluation platform.",
      "Led client-side core features (speech transcription, meeting notes) plus UI/UX layout and design choices, owning interaction detail and product taste.",
      "Ran the product / UI / QA / frontend / backend org to own PRDs, roadmap, release planning, prioritization and launch acceptance; led client + backend and agent feature design and shipped four clients (CN / Global x Mac / Win).",
      "Designed surveys and ran in-depth interviews with WFH users (content creators, independent teachers), combining them with production behavior data and staged rollout to establish activation, completion, reuse and subscription metrics and user insight.",
      "B2B extension (from May 2026): own SaySo API product development, productizing the input-method-proven CN/EN real-time transcription into an external API with deep low-resource-language support (e.g. Indonesian).",
      "Engaged a leading hardware maker and drove the partnership intent forward.",
    ],
    decisions: [
      "Set accuracy, speed and structured output as three phased goals across four core scenarios plus user-custom adaptation.",
      "Made the first successful output the primary onboarding goal.",
      "Converted ASR/TTS/LLM variance into retry, editing, fallback and degradation paths.",
      "Used real-task evaluation together with production data to prioritize releases.",
      "Abstracted a unified external API on the proven transcription base, sequencing languages and adaptation by B2B scenario priority.",
    ],
    system: [
      "Product: input, meetings, personal voice assistant and productivity.",
      "Capabilities: ASR, TTS, LLM and end-to-end speech models.",
      "Client architecture: Swift-native for Mac speech I/O, live meeting transcription and Dynamic Island; Electron elsewhere for synchronized multi-client updates.",
      "Quality: evaluation sets, analytics, staged rollout, fallback and feedback loops.",
      "B2B interface: external API (auth, billing, SLA) serving integrations and on-device hardware.",
    ],
    results: [
      "In scenario blind tests users preferred the product 80% of the time over Typeless and 95% over Whisper; first-token latency stabilized as low as 900ms.",
      "10M+ voice / agent interactions as of Aug 2026.",
      "Speaker activation reached 90.4% among active records.",
      "93.3% overall completion; annual plans were 58.6% of successful CN orders and 90.9% of CN paid revenue.",
      "B2B line: completed API productization and the low-resource-language direction, with a partnership intent from a leading hardware maker (volume and latency data still accruing).",
    ],
    reflection: [
      "Commercialization is still early; annual-plan preference is a high-intent signal, not proof of scaled conversion.",
      "Speech products must separate model, network, interaction and expectation failures.",
      "Consumer-to-B2B is not exposing an endpoint; it is redefining stability, billing and SLAs.",
    ],
    next: [
      "Add scenario retention, P50/P95 first-token latency and conversion sample sizes.",
      "Add public product, journey and funnel screenshots.",
      "Add API call volume, P95 latency, low-resource-language accuracy and B2B integration cases.",
    ],
  },
  needed: ["Product screenshots", "Conversion funnel", "Scenario retention data", "API volume & hardware partnership progress"],
});

Object.assign(enCases[1], {
  status: "Internal launch",
  title: "Harness Product: SaySo Team · Voice Agent Harness",
  summary: "One harness foundation, two product lines: SaySo Team multi-user multi-agent collaboration, and the Voice Agent Harness runtime behind the consumer speech products",
  role: "Product Lead / Solo Builder",
  period: "Apr 2026—Present",
  problems: [
    "Claude Code, Codex, SDKs and custom agents expose different interfaces and context models.",
    "Team workflows require permissions, observability and human takeover—not only execution.",
    "Voice agents need the same harness capabilities—tool calling, context, permissions and observability—inside a real-time speech pipeline.",
  ],
  decision:
    "Designed the harness as a compatibility layer: one task protocol connects CLIs, SDKs and custom agents while the product layer focuses on tasks, state, permissions and outcomes; the same foundation powers both SaySo Team and the Voice Agent runtime.",
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
      "Abstracted the consumer Voice Agent's runtime into a Voice Agent Harness that shares SaySo Team's task protocol and permission model.",
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
      "Voice Agent Harness: the agent runtime for the voice pipeline — ASR / LLM / TTS tool orchestration, barge-in and state management — powering SaySo's consumer voice products.",
    ],
    results: [
      "Defined the harness compatibility layer and SaySo Team MVP direction; the same foundation also powers the Voice Agent runtime.",
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
  title: "Interpretation Product: LLM + API + Mobile App",
  summary:
    "A real-time interpretation LLM fine-tuned for government, culture-tourism and business scenarios — CN/EN/JA/KO input, 18 output languages — delivered as model, external API and mobile app — built from zero to one, full-stack across product definition, data, annotation, evaluation and productization",
  role: "Product Lead + Full-stack / Team Lead",
  period: "Jul 2026—Present",
  problems: [
    "General interpretation LLMs underfit the terminology, phrasing and compliance of government / culture-tourism / business scenarios—undifferentiated from vendors like Volcano.",
    "No data, annotation, evaluation or productization loop for government scenarios, so model iteration had no quantitative lever.",
    "Landing the model in real venues also required two delivery forms: API integration and a mobile app.",
  ],
  decision:
    "Positioned the product as a vertical-scenario fine-tune (government / culture-tourism / business) differentiated from big vendors; built the crawler, data pipeline, annotation platform, evaluation system and demo page full-stack, feeding evaluation and bad cases back into model iteration; delivery goes beyond the model itself with a productized external API and mobile app.",
  evidence: [
    { value: "10s→2s", label: "First-token latency" },
    { value: "60%→98%", label: "In-scenario translation benchmark accuracy" },
    { value: "10k+ hrs", label: "Crawled government-scenario data" },
    { value: "CN/EN/JA/KO → 18", label: "Input / output languages" },
    { value: "Needed", label: "Voice-clone MOS score", placeholder: true },
  ],
  sections: {
    challenge: [
      "Government, culture-tourism and business scenarios demand high terminology accuracy, phrasing norms and compliance; general models transfer poorly.",
      "First-token latency, translation quality and voice cloning must improve together, with no reproducible evaluation standard.",
      "Multilingual interpretation — CN/EN/JA/KO input with 18 output languages — needs low-resource quality and evaluation to keep pace.",
    ],
    ownership: [
      "Product: defined government / culture-tourism / business interpretation scenarios and product metrics (latency, translation quality, timbre), anchoring the government-specialized differentiation; planned three delivery forms — model / API / mobile app.",
      "Data: defined topic keywords, crawled 10k+ hours of scenario data in a short window and built a bad-case expansion dataset.",
      "Evaluation: led the definition of the scenario evaluation set and the bad-case evaluation set.",
      "Full-stack: built the annotation platform, model-debugging and evaluation platform, and interpretation demo page from scratch, deployed models and wired the data pipeline; drove productization of the external API and the mobile app.",
      "Team: led R&D / annotation to run the data, annotation, evaluation and model-iteration loop.",
    ],
    decisions: [
      "Positioned on a vertical-scenario fine-tune (government / culture-tourism / business), differentiating from vendors like Volcano rather than competing on general capability.",
      "Anchored experience on when users hear the first understandable translated speech, making first-token latency the core metric.",
      "Fed the bad-case evaluation set back into data and post-training to form a quantifiable model-optimization loop.",
      "Didn't stop at the model as the deliverable: an API for conference-system integration, and a mobile app for on-site and on-the-go use.",
    ],
    system: [
      "Data: topic-keyword crawler, scenario data and bad-case expansion dataset, data pipeline.",
      "Annotation: self-built annotation platform and evaluation system from scratch.",
      "Model: vertical-scenario end-to-end interpretation LLM (latency / translation / timbre), CN/EN/JA/KO input with 18 output languages.",
      "Product: model-debugging and evaluation platform, interpretation demo page.",
      "Delivery: external interpretation API and mobile app (on-site / on-the-go interpretation entry points).",
    ],
    results: [
      "Cut first-token latency from ~10s to 2s.",
      "Raised in-scenario translation benchmark accuracy from 60% to 98%.",
      "Crawled 10k+ hours of government-scenario data; voice-clone quality improved alongside.",
      "The interpretation capability now extends into two product forms — an external API and a mobile app (integration and usage data still accumulating).",
      "Language coverage: CN/EN/JA/KO input, with output extended to 18 languages.",
    ],
    reflection: [
      "A vertical-scenario specialized fine-tune builds a stronger moat than competing on general capability.",
      "A self-built annotation and evaluation loop is the precondition for quantifiable, reproducible model iteration.",
    ],
    next: [
      "Drive the government interpretation LLM toward official interpretation service for provincial / national conferences.",
      "Add P50/P95 latency, voice-clone MOS and real-world sample sizes.",
      "Add public evaluation-platform screenshots and multi-model comparisons.",
      "Add API integration cases and mobile app usage data.",
    ],
  },
  needed: [
    "P50/P95 latency data",
    "Voice-clone score",
    "Platform screenshots",
    "Public demo",
    "API integration & app usage data",
  ],
});


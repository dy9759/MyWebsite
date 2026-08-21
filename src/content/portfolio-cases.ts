import type { CaseStudy } from "./portfolio-types";

export const zhCases: CaseStudy[] = [
  {
    id: "case-sayso-voice-ai",
    slug: "sayso-voice-ai",
    number: "01",
    status: "已上线",
    title: "SaySo Voice Agent",
    summary: "44.5 万次真实交互的 Voice AI 产品实践",
    role: "C 端 Voice Agent 业务线产品负责人",
    period: "2025.7—2026.5",
    problems: [
      "语音输入真实场景噪声、口音和任务类型多样，模型效果与稳定性持续波动。",
      "用户需要快速获得第一次有效输出，同时保留失败重试和人工编辑能力。",
    ],
    decision:
      "将“完成一次有效语音 / Agent 交互”定义为核心行为，以评测、兜底和可编辑链路连接模型质量、用户体验与转化漏斗。",
    evidence: [
      { value: "44.5 万", label: "语音 / Agent 交互" },
      { value: "90.4%", label: "Speaker activation" },
      { value: "93.3%", label: "整体完成率" },
      { value: "58.6%", label: "国内成功订单年付占比" },
    ],
    sections: {
      challenge: [
        "Voice AI 的价值不只取决于单次识别准确率，还受到延迟、上下文、失败恢复和编辑成本共同影响。",
        "产品同时覆盖输入法、会议、个人语音助理和办公提效场景，需要统一核心行为与指标口径。",
      ],
      ownership: [
        "架构 Agent 链路，主导 LLM 选型与 Agent 评测；亲自清洗 1w+ 用户数据、对比竞品评测，定义评测数据集与产品评测标准，搭建评测平台链路。",
        "主导客户端语音转写、会议纪要等核心功能迭代研发，以及 UI/UX 布局与设计选型，把控交互细节与产品品味。",
        "负责 PRD、路线图、排期、优先级与上线验收，协同模型、算法、前后端与客户端团队。",
        "建立激活、完成率、使用深度、复用与订阅转化指标。",
      ],
      decisions: [
        "将首次有效输出作为 onboarding 的主目标，减少首次输入前的解释和设置成本。",
        "把 ASR/TTS/LLM 波动显式转化为失败提示、重试、编辑和模型降级策略。",
        "用真实任务评测和线上数据共同决定版本优先级。",
      ],
      system: [
        "产品层：输入法、会议、个人语音助理与办公提效场景。",
        "能力层：ASR、TTS、LLM 与端到端语音模型。",
        "保障层：评测集、埋点、灰度发布、异常兜底和用户反馈闭环。",
      ],
      results: [
        "截至 2026.05.23，累计 444,694 次语音 / Agent 交互。",
        "2,657 名非删除用户中 2,402 人完成至少一次交互，Speaker activation 为 90.4%。",
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
    period: "2026.5—至今",
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
    number: "03",
    status: "进行中",
    title: "模型评测：同传 · 播客 · TTS",
    summary: "围绕同传、播客与 TTS 场景的模型评测与产品定义",
    role: "产品设计、评测体系与场景定位",
    period: "2026.8—至今",
    problems: [
      "同传、播客、TTS 等语音模型缺少统一、可复现的评测口径与场景定位。",
      "模型能力需要转化为明确的产品定义、场景边界与验收标准。",
    ],
    decision:
      "围绕同传、播客、TTS 三类场景分别建立评测集、指标口径与产品定义，用统一 trace 连接模型表现与用户可感知体验。",
    evidence: [
      { value: "3 类", label: "同传 / 播客 / TTS 模型场景" },
      { value: "待补充", label: "各场景评测指标", placeholder: true },
      { value: "待补充", label: "真实场景样本量", placeholder: true },
      { value: "可视化", label: "全链路 trace" },
    ],
    sections: {
      challenge: [
        "同传：端到端与级联链路缺少统一的首字延迟和稳定性口径。",
        "播客 / TTS：自然度、音色一致性与长文稳定性难以仅靠单一指标衡量。",
      ],
      ownership: [
        "同传：从场景定义、音频数据管线、数据标注到模型评测与 benchmark，搭建可复现的端到端评测闭环。",
        "定义同传、播客、TTS 三类场景的评测目标、数据字段与产品边界。",
        "规划多供应商模型接入方式与真实场景数据集。",
        "将模型能力转化为产品定义、场景定位与验收标准。",
      ],
      decisions: [
        "同传：以“用户听到第一个可理解译音”为体验锚点，记录模型内部各阶段耗时。",
        "播客 / TTS：以自然度、音色一致性、长文稳定性和可控性作为核心评测维度。",
        "把模型池、数据集、指标与 trace 解耦，支持后续扩展不同供应商。",
      ],
      system: [
        "场景层：实时同传、播客生成与 TTS 产品化。",
        "数据层：音频数据管线、数据标注与真实场景 benchmark 数据集。",
        "模型层：端到端语音翻译、播客与 TTS 模型池。",
        "评测层：延迟、自然度、稳定性、错误类型与 trace。",
      ],
      results: [
        "已形成同传、播客、TTS 三类场景的评测与产品定义方向。",
        "定量评测结果仍在收集，当前不公开虚构数字。",
      ],
      reflection: [
        "评测口径与场景定位比单一指标更能驱动产品决策。",
        "供应商指标只有在相同切片、网络和终止条件下才可比较。",
      ],
      next: [
        "补充各场景 P50/P95 延迟、自然度评分与真实场景样本量。",
        "补充可公开的评测平台截图与多模型对比结果。",
      ],
    },
    links: [],
    needed: ["各场景评测指标", "真实场景样本量", "评测平台截图", "公开 Demo"],
  },
];

export const enCases: CaseStudy[] = zhCases.map((item) => ({ ...item }));

Object.assign(enCases[0], {
  status: "Live",
  title: "SaySo Voice Agent",
  summary: "A Voice AI product journey across 444K real interactions",
  role: "Product Lead, Consumer Voice Agent",
  period: "Jul 2025—May 2026",
  problems: [
    "Real voice input varies by noise, accent and task, while model quality and stability fluctuate.",
    "Users need a fast first successful output with clear retry and editing paths.",
  ],
  decision:
    "Defined one successful voice / agent interaction as the core behavior, then connected evaluation, fallback and editable output to activation and conversion.",
  evidence: [
    { value: "444K", label: "Voice / Agent interactions" },
    { value: "90.4%", label: "Speaker activation" },
    { value: "93.3%", label: "Overall completion rate" },
    { value: "58.6%", label: "Annual share of successful CN orders" },
  ],
  sections: {
    challenge: [
      "Voice AI experience depends on latency, context, recovery and editing cost—not recognition accuracy alone.",
      "Input, meeting, assistant and productivity scenarios needed one shared core behavior and metric model.",
    ],
    ownership: [
      "Architected the agent pipeline and led LLM selection and agent evaluation; personally cleaned 10k+ user records, benchmarked against competitors, defined the evaluation dataset and product evaluation standards, and built the evaluation platform.",
      "Led client-side core features (speech transcription, meeting notes) plus UI/UX layout and design choices, owning interaction detail and product taste.",
      "Owned PRDs, roadmap, release planning, prioritization and launch acceptance across model, algorithm, frontend, backend and client teams.",
      "Established activation, completion, depth, reuse and subscription metrics.",
    ],
    decisions: [
      "Made the first successful output the primary onboarding goal.",
      "Converted ASR/TTS/LLM variance into retry, editing, fallback and degradation paths.",
      "Used real-task evaluation together with production data to prioritize releases.",
    ],
    system: [
      "Product: input, meetings, personal voice assistant and productivity.",
      "Capabilities: ASR, TTS, LLM and end-to-end speech models.",
      "Quality: evaluation sets, analytics, staged rollout, fallback and feedback loops.",
    ],
    results: [
      "444,694 voice / agent interactions as of May 23, 2026.",
      "2,402 of 2,657 active records completed at least one interaction: 90.4% speaker activation.",
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
  period: "May 2026—Present",
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
  title: "Model Evaluation: Interpretation · Podcast · TTS",
  summary:
    "Model evaluation and product definition across interpretation, podcast and TTS scenarios",
  role: "Product design, evaluation system and scenario positioning",
  period: "Aug 2026—Present",
  problems: [
    "Interpretation, podcast and TTS speech models lack one reproducible evaluation standard and scenario positioning.",
    "Model capability must be turned into clear product definitions, scenario boundaries and acceptance criteria.",
  ],
  decision:
    "Build evaluation sets, metric definitions and product definitions for interpretation, podcast and TTS separately, and connect model behavior to perceived experience with a shared trace.",
  evidence: [
    { value: "3 tracks", label: "Interpretation / podcast / TTS scenarios" },
    { value: "Needed", label: "Per-scenario metrics", placeholder: true },
    { value: "Needed", label: "Real-world sample size", placeholder: true },
    { value: "Traceable", label: "Full-chain visualization" },
  ],
  sections: {
    challenge: [
      "Interpretation: end-to-end and cascaded systems lack one definition of first-token latency and stability.",
      "Podcast / TTS: naturalness, timbre consistency and long-form stability cannot be judged by a single metric.",
    ],
    ownership: [
      "Interpretation: built a reproducible end-to-end loop from scenario definition, audio data pipeline and annotation to model evaluation and benchmarking.",
      "Defined evaluation goals, data fields and product boundaries for interpretation, podcast and TTS.",
      "Planned multi-vendor model integrations and real-world datasets.",
      "Turned model capability into product definitions, scenario positioning and acceptance criteria.",
    ],
    decisions: [
      "Interpretation: anchored experience on when users hear the first understandable translated speech while recording internal stage times.",
      "Podcast / TTS: used naturalness, timbre consistency, long-form stability and controllability as core evaluation dimensions.",
      "Separated model pools, datasets, metrics and traces so vendors can be extended independently.",
    ],
    system: [
      "Scenarios: real-time interpretation, podcast generation and TTS productization.",
      "Data: audio data pipeline, annotation and real-world benchmark datasets.",
      "Models: end-to-end speech translation, podcast and TTS model pools.",
      "Evaluation: latency, naturalness, stability, error types and traces.",
    ],
    results: [
      "Defined the evaluation and product-definition direction for interpretation, podcast and TTS.",
      "Quantitative results are still being collected; no invented metrics are published.",
    ],
    reflection: [
      "Evaluation standards and scenario positioning drive product decisions more than any single metric.",
      "Vendor results are comparable only under the same chunking, network and termination conditions.",
    ],
    next: [
      "Add per-scenario P50/P95 latency, naturalness scores and real-world sample sizes.",
      "Add public evaluation-platform screenshots and multi-model comparisons.",
    ],
  },
  needed: [
    "Per-scenario metrics",
    "Real-world sample size",
    "Platform screenshots",
    "Public demo",
  ],
});

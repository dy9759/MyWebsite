import type { CaseStudy } from "./portfolio-types";

export const zhCases: CaseStudy[] = [
  {
    id: "case-sayso-voice-ai",
    slug: "sayso-voice-ai",
    number: "01",
    status: "已上线",
    title: "SaySo Voice AI",
    summary: "44.5 万次真实交互的 Voice AI 产品实践",
    role: "C 端 Voice Agent 业务线产品负责人",
    period: "2025.7—至今",
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
        "负责 PRD、产品路线图、版本排期、需求优先级与上线验收。",
        "协同模型、算法、前端、后端和客户端团队，将模型边界转化为接口、交互、埋点和验收标准。",
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
    id: "case-simultaneous-interpretation",
    slug: "simultaneous-interpretation",
    number: "02",
    status: "进行中",
    title: "实时同传评测与产品验证",
    summary: "从首字延迟到 ASR→翻译→TTS 全链路评测",
    role: "产品设计、评测体系与 Demo 推进",
    period: "进行中",
    problems: [
      "端到端同传与级联链路缺少统一、可复现的首字延迟和稳定性口径。",
      "线上演讲、会议与多人语音场景难以仅靠实验室音频判断真实体验。",
    ],
    decision:
      "同时评测端到端模型与 ASR→翻译→TTS 链路，将延迟拆到每个阶段，并用 trace 连接模型表现与用户可感知体验。",
    evidence: [
      { value: "待补充", label: "P50 / P95 首字延迟", placeholder: true },
      { value: "待补充", label: "真实场景样本量", placeholder: true },
      { value: "多模型", label: "端到端与级联模型池" },
      { value: "可视化", label: "全链路 trace" },
    ],
    sections: {
      challenge: [
        "不同厂商对首字延迟、音频切片和稳定性的定义不一致，横向对比容易失真。",
        "演讲结束、译音结束和观众鼓掌之间的时间关系，需要通过真实场景视频进行验证。",
      ],
      ownership: [
        "定义端到端和分链路首字延迟评测目标、数据字段与可视化 trace。",
        "规划火山、阿里、Gemini Live、Azure Realtime 等模型接入方式。",
        "建立中英双向、数字贸易与国际会议等真实场景数据集计划。",
      ],
      decisions: [
        "将“用户听到第一个可理解译音”的时间作为体验锚点，同时记录模型内部阶段耗时。",
        "把模型池、数据集、指标和 trace 解耦，支持后续扩展不同供应商。",
        "优先验证真实会议和演讲场景，而非只依赖干净录音。",
      ],
      system: [
        "输入层：实时音频、在线视频和会议音频。",
        "模型层：端到端语音翻译，或 ASR→翻译→TTS 级联链路。",
        "评测层：首字延迟、完整句延迟、稳定性、错误类型和 trace。",
      ],
      results: [
        "已完成评测目标、模型池与真实场景数据源的产品方案。",
        "定量评测结果仍在收集，当前不公开虚构数字。",
      ],
      reflection: [
        "更低的首字延迟不必然带来更好的同传体验，还需要同时评估语义稳定性和返工。",
        "供应商指标只有在相同切片、网络和终止条件下才可比较。",
      ],
      next: [
        "补充 P50/P95 首字延迟、完整句延迟与真实场景样本量。",
        "补充可公开的 trace 截图和多模型对比结果。",
      ],
    },
    links: [],
    needed: ["P50/P95 延迟数据", "真实场景样本量", "评测平台截图", "公开 Demo"],
  },
  {
    id: "case-sayso-team",
    slug: "sayso-team",
    number: "03",
    status: "MVP",
    title: "SaySo Team",
    summary: "多人、多 Agent 协作与 Harness 架构",
    role: "产品负责人 / Solo Builder",
    period: "2026.3—至今",
    problems: [
      "Claude Code、Codex、自研 Agent 等执行环境接口和上下文管理方式不同。",
      "多人协作与多 Agent 任务需要权限、过程可观测和人工接管机制。",
    ],
    decision:
      "将 Harness 设计为兼容层，用统一任务协议连接不同 CLI、SDK 与自研 Agent，产品层只关注任务、状态、权限和结果。",
    evidence: [
      { value: "MVP", label: "当前产品阶段" },
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
        "执行层：Claude Code CLI、Codex、Claude SDK 与自研 Agent。",
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
];

export const enCases: CaseStudy[] = zhCases.map((item) => ({ ...item }));

Object.assign(enCases[0], {
  status: "Live",
  summary: "A Voice AI product journey across 444K real interactions",
  role: "Product Lead, Consumer Voice Agent",
  period: "Jul 2025—Present",
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
      "Owned PRDs, roadmap, release planning, prioritization and launch acceptance.",
      "Worked across model, algorithm, frontend, backend and client teams to turn model limits into product requirements.",
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
  needed: [
    "Product screenshots",
    "Conversion funnel",
    "Scenario retention data",
  ],
});

Object.assign(enCases[1], {
  status: "In progress",
  title: "Real-time Interpretation Evaluation",
  summary:
    "Full-chain evaluation from first-token latency to ASR→translation→TTS",
  role: "Product design, evaluation system and demo delivery",
  period: "In progress",
  problems: [
    "End-to-end and cascaded systems lack one reproducible definition of first-token latency and stability.",
    "Clean lab audio does not represent live talks, meetings and multi-speaker conditions.",
  ],
  decision:
    "Evaluate end-to-end and cascaded systems together, decompose latency by stage, and connect model behavior to perceived experience with traces.",
  evidence: [
    {
      value: "Needed",
      label: "P50 / P95 first-token latency",
      placeholder: true,
    },
    { value: "Needed", label: "Real-world sample size", placeholder: true },
    { value: "Multi-model", label: "End-to-end and cascaded pool" },
    { value: "Traceable", label: "Full-chain visualization" },
  ],
  sections: {
    challenge: [
      "Vendors define first-token latency, chunking and stability differently, making comparison unreliable.",
      "The gap between the source ending, translated speech ending and audience response requires real-world video validation.",
    ],
    ownership: [
      "Defined end-to-end and stage-level latency goals, fields and trace views.",
      "Planned integrations for Volcengine, Alibaba Cloud, Gemini Live and Azure Realtime.",
      "Designed Chinese-English datasets for digital trade, international events and live talks.",
    ],
    decisions: [
      "Anchored experience on when users hear the first understandable translated speech while recording internal stage times.",
      "Separated model pools, datasets, metrics and traces so providers can be extended independently.",
      "Prioritized live meeting and speech conditions over clean audio only.",
    ],
    system: [
      "Input: live audio, online video and meeting audio.",
      "Models: end-to-end speech translation or ASR→translation→TTS.",
      "Evaluation: first-token latency, full-sentence latency, stability, error types and traces.",
    ],
    results: [
      "Completed the product plan for evaluation goals, model pool and real-world source collection.",
      "Quantitative results are still being collected; no invented metrics are published.",
    ],
    reflection: [
      "Lower first-token latency does not guarantee a better experience when semantic stability and rework are ignored.",
      "Vendor results are comparable only under the same chunking, network and termination conditions.",
    ],
    next: [
      "Add P50/P95 first-token and full-sentence latency plus real-world sample counts.",
      "Add public trace screenshots and multi-model comparisons.",
    ],
  },
  needed: [
    "P50/P95 latency",
    "Real-world sample size",
    "Platform screenshots",
    "Public demo",
  ],
});

Object.assign(enCases[2], {
  status: "MVP",
  summary:
    "Multi-user, multi-agent collaboration through a harness architecture",
  role: "Product Lead / Solo Builder",
  period: "Mar 2026—Present",
  problems: [
    "Claude Code, Codex, SDKs and custom agents expose different interfaces and context models.",
    "Team workflows require permissions, observability and human takeover—not only execution.",
  ],
  decision:
    "Designed the harness as a compatibility layer: one task protocol connects CLIs, SDKs and custom agents while the product layer focuses on tasks, state, permissions and outcomes.",
  evidence: [
    { value: "MVP", label: "Current stage" },
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
      "Execution: Claude Code CLI, Codex, Claude SDK and custom agents.",
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
  needed: [
    "MVP screenshots",
    "Architecture diagram",
    "Team usage",
    "Task success rate",
  ],
});

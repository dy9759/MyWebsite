export type PortfolioLanguage = "zh" | "en";

export type EvidenceItem = {
  value: string;
  label: string;
  placeholder?: boolean;
};

export type CaseStudy = {
  id: string;
  slug: string;
  number: string;
  status: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  problems: string[];
  decision: string;
  evidence: EvidenceItem[];
  sections: {
    challenge: string[];
    ownership: string[];
    decisions: string[];
    system: string[];
    results: string[];
    reflection: string[];
    next: string[];
  };
  links: { label: string; url: string }[];
  needed: string[];
};

export type LabProject = {
  id: string;
  title: string;
  status: string;
  summary: string;
  stack: string[];
  url?: string;
  urlLabel?: string;
  needed: string[];
};

type PortfolioCopy = {
  nav: {
    home: string;
    cases: string;
    lab: string;
    research: string;
    ai: string;
  };
  hero: {
    name: string;
    title: string;
    summary: string;
    location: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: EvidenceItem[];
  capabilities: {
    id: string;
    title: string;
    description: string;
  }[];
  cases: {
    heading: string;
    intro: string;
    viewAll: string;
    viewCase: string;
    labels: {
      role: string;
      problem: string;
      decision: string;
      evidence: string;
    };
    items: CaseStudy[];
  };
  experience: {
    heading: string;
    company: string;
    role: string;
    duration: string;
    highlights: string[];
  };
  lab: {
    heading: string;
    intro: string;
    viewAll: string;
    open: string;
    unavailable: string;
    items: LabProject[];
  };
  research: {
    eyebrow: string;
    heading: string;
    summary: string;
    intro: string;
    highlights: string[];
    viewAll: string;
    verificationNote: string;
  };
  closing: {
    text: string;
    resume: string;
    email: string;
    resumeNote: string;
  };
  casePage: {
    back: string;
    challenge: string;
    ownership: string;
    decisions: string;
    system: string;
    results: string;
    reflection: string;
    next: string;
    evidence: string;
    links: string;
    needed: string;
    placeholder: string;
  };
};

const zhCases: CaseStudy[] = [
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

const enCases: CaseStudy[] = zhCases.map((item) => ({ ...item }));

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

export const PORTFOLIO_COPY: Record<PortfolioLanguage, PortfolioCopy> = {
  zh: {
    nav: {
      home: "首页",
      cases: "代表案例",
      lab: "Builder Lab",
      research: "研究",
      ai: "AI 资源库",
    },
    hero: {
      name: "李盛园",
      title: "AI 产品负责人 / Applied AI Builder",
      summary:
        "从模型评测、产品设计到上线增长，把 AI 能力转化为真实用户持续使用的产品。",
      location: "Hangzhou, China",
      primaryCta: "查看代表案例",
      secondaryCta: "邮件联系",
    },
    metrics: [
      { value: "44.5 万", label: "语音 / Agent 交互" },
      { value: "90.4%", label: "Speaker activation" },
      { value: "93.3%", label: "整体完成率" },
      { value: "1000+", label: "评测案例" },
    ],
    capabilities: [
      {
        id: "product",
        title: "AI 产品设计与落地",
        description:
          "洞察真实用户场景，定义可衡量的 AI 产品方案，从 0 到 1 推动落地并持续迭代。",
      },
      {
        id: "evaluation",
        title: "模型评测与质量保障",
        description:
          "围绕 LLM、ASR、TTS 与端到端语音模型构建评测、兜底和可观测体系。",
      },
      {
        id: "growth",
        title: "增长与数据驱动",
        description:
          "用激活、完成率、复用和订阅转化指标驱动产品判断与规模化增长。",
      },
    ],
    cases: {
      heading: "代表案例",
      intro:
        "AI 产品从 0 到 1 与规模化落地的实践，覆盖语音、评测与多 Agent 协作。",
      viewAll: "查看全部案例",
      viewCase: "查看案例",
      labels: {
        role: "我的角色",
        problem: "面临的问题",
        decision: "关键决策",
        evidence: "效果与证据",
      },
      items: zhCases,
    },
    experience: {
      heading: "当前工作",
      company: "宇生月伴(杭州)智能科技有限公司(种子轮，Voice Agent 赛道)",
      role: "C端 Voice Agent 业务线产品负责人",
      duration: "2025.7 - 至今",
      highlights: [
        "负责 Voice Agent 产品线规划、需求定义、团队协作与迭代落地。",
        "主导 LLM、ASR、TTS 与端到端语音模型评测。",
        "以数据与用户反馈驱动激活、复用和商业化闭环。",
      ],
    },
    lab: {
      heading: "Builder Lab",
      intro: "用于验证 Agent、Skill、语音 AI 与个人效率产品假设的可交互实验。",
      viewAll: "查看全部项目",
      open: "查看项目",
      unavailable: "待补充公开链接",
      items: [
        {
          id: "harness-skill",
          title: "Harness Skill",
          status: "Open Source",
          summary:
            "编排 Claude Code 与 Codex 双 Agent 工作流的可复用开发协作流程。",
          stack: ["Claude Code", "Codex", "Harness"],
          url: "https://github.com/dy9759/claude-codex-orchestration",
          urlLabel: "GitHub",
          needed: ["运行截图", "兼容矩阵"],
        },
        {
          id: "meeting-agent",
          title: "会议 / 面试官 Agent",
          status: "MVP",
          summary: "面向线下会议与面试的实时提问、总结和评分 Agent。",
          stack: ["Go", "LiveKit", "ASR", "Agent"],
          needed: ["公开 Demo", "产品截图", "真实使用数据"],
        },
        {
          id: "reimbursement-skill",
          title: "报销审批 Skill",
          status: "Prototype",
          summary: "整理发票、支付凭证和报销表格，并生成飞书审批摘要。",
          stack: ["Skill", "OCR", "PDF", "Feishu"],
          needed: ["GitHub 仓库", "处理前后示例"],
        },
        {
          id: "myattention",
          title: "MyAttention",
          status: "Open Source",
          summary: "记录浏览注意力信号，并通过 LLM 生成主题复盘与洞察。",
          stack: ["Chrome Extension", "LLM", "IndexedDB"],
          url: "https://github.com/MyAIOSHub/MyAttention-extansion",
          urlLabel: "GitHub",
          needed: ["产品截图", "周报样例"],
        },
        {
          id: "tts-evaluation",
          title: "TTS / ASR 评测平台",
          status: "Open Source",
          summary: "用于标准化测试、结果对比和语音模型效果追踪。",
          stack: ["TTS", "ASR", "Evaluation"],
          url: "https://github.com/dy9759/One-Eval0425",
          urlLabel: "GitHub",
          needed: ["评测结果截图", "指标说明"],
        },
      ],
    },
    research: {
      eyebrow: "Research → Product",
      heading: "研究与教育",
      summary: "武汉大学硕士 · 建筑学（建筑技术科学）",
      intro:
        "研究经历的价值不止是论文数量，而是把复杂问题转化为可验证假设、数据口径、模型方案与决策证据。",
      highlights: [
        "多篇 JCR Q1、核心期刊论文与会议成果。",
        "研究覆盖预测、优化、空间模拟与可持续能源。",
        "将复杂问题拆解、数据评测和模型验证能力迁移到 AI 产品。",
      ],
      viewAll: "查看论文与成果",
      verificationNote:
        "本页仅展示教育背景及论文、会议成果索引；旧实验室时间线不作为公开任职经历。",
    },
    closing: {
      text: "正在寻找 Voice AI、Agent 与 Applied AI 方向的产品合作机会。",
      resume: "查看简历",
      email: "发送邮件",
      resumeNote: "中英文 PDF 简历待补充",
    },
    casePage: {
      back: "返回代表案例",
      challenge: "背景与挑战",
      ownership: "我的职责",
      decisions: "关键产品判断",
      system: "产品与系统方案",
      results: "结果与证据",
      reflection: "复盘与权衡",
      next: "下一步",
      evidence: "关键证据",
      links: "相关链接",
      needed: "待补充素材",
      placeholder: "待补充",
    },
  },
  en: {
    nav: {
      home: "Home",
      cases: "Case Studies",
      lab: "Builder Lab",
      research: "Research",
      ai: "AI Library",
    },
    hero: {
      name: "Chauncey Lee",
      title: "AI Product Lead / Applied AI Builder",
      summary:
        "I turn AI capabilities into products people keep using—from model evaluation and product design to launch and growth.",
      location: "Hangzhou, China",
      primaryCta: "View selected work",
      secondaryCta: "Email me",
    },
    metrics: [
      { value: "444K", label: "Voice / Agent interactions" },
      { value: "90.4%", label: "Speaker activation" },
      { value: "93.3%", label: "Overall completion rate" },
      { value: "1,000+", label: "Evaluation cases" },
    ],
    capabilities: [
      {
        id: "product",
        title: "AI Product Delivery",
        description:
          "Find real user problems, define measurable product bets, and ship from zero to one.",
      },
      {
        id: "evaluation",
        title: "Evaluation & Quality",
        description:
          "Build evaluation, fallback and observability for LLM, ASR, TTS and speech-to-speech systems.",
      },
      {
        id: "growth",
        title: "Data-led Growth",
        description:
          "Use activation, completion, reuse and subscription conversion to drive product decisions.",
      },
    ],
    cases: {
      heading: "Selected Case Studies",
      intro:
        "Zero-to-one and scaled AI product work across voice, evaluation and multi-agent collaboration.",
      viewAll: "View all case studies",
      viewCase: "View case study",
      labels: {
        role: "My role",
        problem: "Problem",
        decision: "Key decision",
        evidence: "Evidence",
      },
      items: enCases,
    },
    experience: {
      heading: "Current Role",
      company:
        "Yusheng Yueban (Hangzhou) Intelligent Technology Co., Ltd. (Seed Round, Voice Agent Track)",
      role: "Consumer Voice Agent Product Lead",
      duration: "Jul 2025 - Present",
      highlights: [
        "Lead product planning, requirements and iteration for a consumer Voice Agent line.",
        "Own evaluation for LLM, ASR, TTS and end-to-end speech models.",
        "Connect activation, reuse and monetization through data and user feedback.",
      ],
    },
    lab: {
      heading: "Builder Lab",
      intro:
        "Interactive experiments used to validate product bets across agents, skills, speech AI and personal productivity.",
      viewAll: "View all builds",
      open: "Open project",
      unavailable: "Public link needed",
      items: [
        {
          id: "harness-skill",
          title: "Harness Skill",
          status: "Open Source",
          summary:
            "A reusable Claude Code and Codex dual-agent development workflow.",
          stack: ["Claude Code", "Codex", "Harness"],
          url: "https://github.com/dy9759/claude-codex-orchestration",
          urlLabel: "GitHub",
          needed: ["Runtime screenshot", "Compatibility matrix"],
        },
        {
          id: "meeting-agent",
          title: "Meeting / Interview Agent",
          status: "MVP",
          summary:
            "Real-time questions, summaries and scoring for in-person meetings and interviews.",
          stack: ["Go", "LiveKit", "ASR", "Agent"],
          needed: ["Public demo", "Product screenshots", "Usage data"],
        },
        {
          id: "reimbursement-skill",
          title: "Expense Approval Skill",
          status: "Prototype",
          summary:
            "Organizes invoices and payment proof, creates an expense sheet and Feishu approval summary.",
          stack: ["Skill", "OCR", "PDF", "Feishu"],
          needed: ["GitHub repository", "Before / after example"],
        },
        {
          id: "myattention",
          title: "MyAttention",
          status: "Open Source",
          summary:
            "Captures browsing attention signals and generates LLM-powered topic reviews.",
          stack: ["Chrome Extension", "LLM", "IndexedDB"],
          url: "https://github.com/MyAIOSHub/MyAttention-extansion",
          urlLabel: "GitHub",
          needed: ["Product screenshots", "Weekly report sample"],
        },
        {
          id: "tts-evaluation",
          title: "TTS / ASR Evaluation",
          status: "Open Source",
          summary:
            "Standardized testing, result comparison and quality tracking for speech models.",
          stack: ["TTS", "ASR", "Evaluation"],
          url: "https://github.com/dy9759/One-Eval0425",
          urlLabel: "GitHub",
          needed: ["Result screenshots", "Metric definitions"],
        },
      ],
    },
    research: {
      eyebrow: "Research → Product",
      heading: "Research & Education",
      summary:
        "Wuhan University · MSc in Architecture (Architectural Technology Science)",
      intro:
        "The value of research is not the publication count alone. It is the ability to turn complex questions into testable hypotheses, data definitions, model choices, and decision evidence.",
      highlights: [
        "Multiple JCR Q1 and PKU Core journal and conference papers.",
        "Research across prediction, optimization, spatial simulation and sustainable energy.",
        "Transfer complex problem solving, evaluation and model validation into AI products.",
      ],
      viewAll: "View papers and outcomes",
      verificationNote:
        "This page publishes verified education plus paper and conference indexes only. Legacy lab timelines are not presented as employment experience.",
    },
    closing: {
      text: "Open to product opportunities and collaboration in Voice AI, agents and Applied AI.",
      resume: "View resume",
      email: "Send email",
      resumeNote: "Verified CN / EN PDF resumes needed",
    },
    casePage: {
      back: "Back to case studies",
      challenge: "Context & challenge",
      ownership: "My ownership",
      decisions: "Key product decisions",
      system: "Product & system design",
      results: "Results & evidence",
      reflection: "Reflection & trade-offs",
      next: "Next steps",
      evidence: "Evidence",
      links: "Links",
      needed: "Assets needed",
      placeholder: "Needed",
    },
  },
};

export const CASE_SLUGS = zhCases.map((item) => item.slug);

export function getCaseStudy(language: PortfolioLanguage, slug: string) {
  return PORTFOLIO_COPY[language].cases.items.find(
    (item) => item.slug === slug,
  );
}

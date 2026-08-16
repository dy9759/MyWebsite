import type { PortfolioLanguage, PortfolioCopy } from "./portfolio-types";
import { zhCases, enCases } from "./portfolio-cases";

export type {
  PortfolioLanguage,
  EvidenceItem,
  CaseStudy,
  LabProject,
} from "./portfolio-types";

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

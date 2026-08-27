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
    hero: {
      name: "李盛园",
      title: "AI 产品负责人 / Applied AI Builder",
      summary:
        "AI-native builder：双开 Claude Code / Codex、付费追前沿、用 AI 造 AI 产品；从模型评测、产品设计到用户付费，把 AI 能力转化为真实用户持续使用的产品。",
      location: "Hangzhou, China",
      primaryCta: "查看项目经验",
      secondaryCta: "邮件联系",
    },
    metrics: [
      { value: "1000 万+", label: "语音 / Agent 交互" },
      { value: "90.4%", label: "Speaker activation" },
      { value: "93.3%", label: "整体完成率" },
      { value: "10 万+", label: "评测案例" },
    ],
    skills: {
      heading: "技能栈",
      groups: [
        {
          label: "AI · 算法 · Agent",
          items: [
            "LLM",
            "RAG",
            "Agent",
            "ASR / TTS",
            "端到端语音",
            "模型评测 / benchmark",
            "YOLOv8",
            "GCN-LSTM",
            "强化学习",
            "Llama 微调",
            "Claude Code / Codex",
            "Agent SDK",
            "computer use",
            "Harness",
          ],
        },
        {
          label: "工程 · 全栈",
          items: [
            "React",
            "TypeScript",
            "Electron",
            "Swift（macOS / iOS）",
            "Go",
            "Python（FastAPI）",
            "Node.js",
            "Docker",
            "Kubernetes",
          ],
        },
        {
          label: "产品 · 方法",
          items: [
            "PRD",
            "用户研究（问卷 / 访谈）",
            "数据分析",
            "A/B / 灰度",
            "增长指标",
          ],
        },
        {
          label: "证书 · 工具",
          items: [
            "SPSS",
            "GIS",
            "Axure",
            "IBM & Google–Pendo AI 产品管理证书",
            "英语 CEFR-B2",
          ],
        },
      ],
    },
    credentials: {
      heading: "荣誉与资质",
      groups: [
        {
          label: "荣誉奖项",
          items: [
            "全国绿色建筑设计竞赛 最佳设计一等奖、最佳团队一等奖（1/500+）",
            "校优秀学生奖学金、校三好学生（多次）",
          ],
        },
        {
          label: "学术成果",
          items: [
            "发表 SCI 一区 1 篇 · 二区 3 篇 · 三区 3 篇，北大核心 / 中文期刊 4 篇",
            "参与重大国自然 1 项、专著 1 部",
            "学术会议 5 次",
            "TOP 期刊审稿人",
            "中国建筑协会 · 中国能源研究会会员",
          ],
        },
      ],
    },
    cases: {
      heading: "项目经验",
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
      heading: "工作经验",
      intro:
        "一条命中注定走向 AI 的主线：产品直觉（教培创业）→ 技术深度（AI 算法 · 电力低碳）→ AI 产品交付（SaySo Voice / Team / API）；每一段履历都是为做 AI 产品做的准备。",
      positions: [
        {
          company: "宇生月伴(杭州)智能科技有限公司 · VUILABS（Pre A 轮，Voice Agent 赛道）",
          role: "产品负责人 · 全栈 Agent 研发 · 同传大模型 / Agent Harness / C 端 Voice Agent 客户端 / B 端 API",
          duration: "2025.7 - 至今",
          highlights: [
            "负责 C 端 Voice Agent 产品线规划、需求定义、团队协作与迭代落地。",
            "主导 LLM、ASR、TTS 与端到端语音模型评测。",
            "以数据与用户反馈驱动激活、复用和商业化闭环。",
            "拓展 SaySo API / B 端产品线（2026.5 起）：把输入法中英文实时转写产品化为对外 API，按 B 端需求深度开发印尼语等小语种，并与头部硬件厂商达成合作意向。",
          ],
        },
        {
          company: "杭州稀拓智能科技有限公司",
          role: "AI 算法研发",
          duration: "2022.9 - 2025.6",
          highlights: [
            "视觉检测：YOLOv8 迁移学习 + SAM 半自动标注构建屋顶光伏检测/分割模型，材质识别 92%、面积误差 <3%。",
            "时序预测与强化学习：GCN-LSTM 时空建模预测绿电出力（MAE 较 LSTM/XGBoost 降 10%），Q-learning 优化负荷侧调度。",
            "大模型微调：Colab 微调 Llama3.2 + 本地 RAG 检索增强，构建可自动更新的问答知识库。",
          ],
        },
        {
          company: "上海几凡设计教育杭州校区（区域教培头部）",
          role: "联合创始人 · 课程产品负责人",
          duration: "2020.6 - 2022.8",
          highlights: [
            "市场定位：高净值考研教培市场，客资人均 1w+ 消费 / 年，区域 Top1。",
            "用户增长：机器学习分析付费用户画像 + 精准投放，实现 30% 用户增长、20% 营收增长。",
            "产品设计：成本不变下推出精品小班，核心用户黏性提升、退课率降低 15%。",
          ],
        },
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
            "在 GitHub 发布并维护的开源 Skill：编排 Claude Code × Codex 双 Agent 协作开发工作流。",
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
      education: [
        {
          school: "武汉大学",
          degree: "硕士",
          field: "建筑学（建筑技术科学）",
          duration: "2022.09 - 2025.06",
          detail:
            "所在建筑智慧能源实验室为全球前 2%。研究方向：人工智能应用、智慧能源、智慧城市、智慧园区；主修建筑智能化、人工智能等课程。GPA 90+/100（Top 5%）。",
        },
        {
          school: "浙大宁波理工学院",
          degree: "本科",
          field: "建筑学",
          duration: "2015.09 - 2020.06",
          detail: "GPA 85+/100（Top 10%）；人工智能课程 95/100。",
        },
      ],
      intro:
        "研究经历的价值不止是论文数量，而是把复杂问题转化为可验证假设、数据口径、模型方案与决策证据。",
      highlights: [
        "研究覆盖预测、优化、空间模拟与可持续能源。",
        "将复杂问题拆解、数据评测和模型验证能力迁移到 AI 产品。",
      ],
      viewAll: "查看论文与成果",
      verificationNote:
        "本页仅展示教育背景及论文、会议成果索引；旧实验室时间线不作为公开任职经历。",
    },
    casePage: {
      back: "返回项目经验",
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
    hero: {
      name: "Chauncey Lee",
      title: "AI Product Lead / Applied AI Builder",
      summary:
        "AI-native builder — dual-run Claude Code / Codex, pay to stay on the frontier, build AI with AI; from model evaluation and product design to user monetization, turning AI into products people keep using.",
      location: "Hangzhou, China",
      primaryCta: "View projects",
      secondaryCta: "Email me",
    },
    metrics: [
      { value: "10M+", label: "Voice / Agent interactions" },
      { value: "90.4%", label: "Speaker activation" },
      { value: "93.3%", label: "Overall completion rate" },
      { value: "100K+", label: "Evaluation cases" },
    ],
    skills: {
      heading: "Tech Stack",
      groups: [
        {
          label: "AI · ML · Agent",
          items: [
            "LLM",
            "RAG",
            "Agent",
            "ASR / TTS",
            "End-to-end speech",
            "Model evaluation / benchmarking",
            "YOLOv8",
            "GCN-LSTM",
            "Reinforcement learning",
            "Llama fine-tuning",
            "Claude Code / Codex",
            "Agent SDK",
            "computer use",
            "Harness",
          ],
        },
        {
          label: "Engineering · Full-stack",
          items: [
            "React",
            "TypeScript",
            "Electron",
            "Swift (macOS / iOS)",
            "Go",
            "Python (FastAPI)",
            "Node.js",
            "Docker",
            "Kubernetes",
          ],
        },
        {
          label: "Product · Methods",
          items: [
            "PRD",
            "User research (surveys / interviews)",
            "Data analysis",
            "A/B / staged rollout",
            "Growth metrics",
          ],
        },
      ],
    },
    credentials: {
      heading: "Honors & Credentials",
      groups: [
        {
          label: "Awards",
          items: [
            "National Green Building Design Competition — Best Design First Prize and Best Team First Prize (1/500+)",
            "University Merit Scholarship and Merit Student (multiple)",
          ],
        },
        {
          label: "Academic",
          items: [
            "Published SCI: 1 CAS-Q1, 3 CAS-Q2, 3 CAS-Q3; 4 PKU-core / Chinese-journal papers",
            "Contributed to 1 major NSFC project and 1 monograph",
            "5 academic conferences",
            "Reviewer for top journals",
            "Member, Architectural Society of China · China Energy Research Society",
          ],
        },
      ],
    },
    cases: {
      heading: "Projects",
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
      heading: "Experience",
      intro:
        "One throughline that always led to AI: product intuition (edtech founding) -> technical depth (AI algorithms, power & low-carbon) -> AI product delivery (SaySo Voice / Team / API); every chapter was preparation for building AI products.",
      positions: [
        {
          company:
            "Yusheng Yueban (Hangzhou) Intelligent Technology · VUILABS (Pre-A, Voice Agent Track)",
          role: "Product Lead · Full-stack Agent Developer · Interpretation LLM / Agent Harness / Consumer Voice Agent / B2B API",
          duration: "Jul 2025 - Present",
          highlights: [
            "Lead product planning, requirements and iteration for the consumer Voice Agent line.",
            "Own evaluation for LLM, ASR, TTS and end-to-end speech models.",
            "Connect activation, reuse and monetization through data and user feedback.",
            "Expanded the SaySo API / B2B line (from May 2026): productized CN/EN real-time transcription into an external API, deep low-resource-language support (e.g. Indonesian), and a partnership intent with a leading hardware maker.",
          ],
        },
        {
          company: "Hangzhou Xituo Intelligent Technology",
          role: "AI Algorithm R&D",
          duration: "Sep 2022 - Jun 2025",
          highlights: [
            "Vision detection: YOLOv8 transfer learning + SAM semi-auto labeling for a rooftop-PV detection/segmentation model — 92% material recognition, <3% area error.",
            "Time-series forecasting & RL: GCN-LSTM spatiotemporal modeling for green-power output (MAE 10% below LSTM/XGBoost) and Q-learning for load-side scheduling.",
            "LLM fine-tuning: Llama 3.2 fine-tuning on Colab + local RAG to build a self-updating Q&A knowledge base.",
          ],
        },
        {
          company: "Jifan Design Education, Hangzhou (regional edtech leader)",
          role: "Co-founder · Course Product Lead",
          duration: "Jun 2020 - Aug 2022",
          highlights: [
            "Market: high-net-worth exam-prep segment, 10k+ RMB annual spend per lead, regional No.1.",
            "Growth: ML-based user profiling and targeted offers drove 30% user growth and 20% revenue growth.",
            "Product design: a premium small-class format at flat cost improved retention and cut negative-review refunds 15%.",
          ],
        },
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
            "An open-source skill published and maintained on GitHub, orchestrating a Claude Code x Codex dual-agent development workflow.",
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
      education: [
        {
          school: "Wuhan University",
          degree: "MSc",
          field: "Architecture (Architectural Technology Science)",
          duration: "Sep 2022 - Jun 2025",
          detail:
            "Smart Building Energy Lab (top 2% globally). Focus: applied AI, smart energy, smart cities and smart parks; coursework in building intelligence and AI. GPA 90+/100 (Top 5%).",
        },
        {
          school: "Zhejiang University Ningbo Institute of Technology",
          degree: "BEng",
          field: "Architecture",
          duration: "Sep 2015 - Jun 2020",
          detail: "GPA 85+/100 (Top 10%); AI course 95/100.",
        },
      ],
      intro:
        "The value of research is not the publication count alone. It is the ability to turn complex questions into testable hypotheses, data definitions, model choices, and decision evidence.",
      highlights: [
        "Research across prediction, optimization, spatial simulation and sustainable energy.",
        "Transfer complex problem solving, evaluation and model validation into AI products.",
      ],
      viewAll: "View papers and outcomes",
      verificationNote:
        "This page publishes verified education plus paper and conference indexes only. Legacy lab timelines are not presented as employment experience.",
    },
    casePage: {
      back: "Back to projects",
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

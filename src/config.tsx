import { Icons } from '@/components/icons'

type Config = {
    name: string
    avatar: string
    title: string
    siteUrl: string
    socials: {
        name: string
        url: string
        icon: keyof typeof Icons
    }[]
    contactMethods?: {
        label: string
        value: string
        href?: string
        icon: keyof typeof Icons
    }[]
    description: string | JSX.Element
    descriptionRaw: string
    projects: {
        name: string
        icon?: keyof typeof Icons
        image?: string
        duration?: string
        description: string
        url: string
        links?: {
            label: string
            url: string
        }[]
        tags: {
            name: string
            icon: keyof typeof Icons
        }[]
        github?: string
        featured: boolean
        pinned?: boolean
        testimonial?: string
    }[]
    workExperience?: {
        positions?: {
            company: string
            role: string
            duration: string
            description: string | JSX.Element
            link?: string
            tags: {
                name: string
                icon: keyof typeof Icons
            }[]
        }[]
    }
    education?: {
        school: string
        degree: string
        field: string
        duration?: string
        details?: string
    }[]
    qualifications?: {
        title: string
        icon: keyof typeof Icons
        items: string[]
    }[]
    futureWork?: {
        name: string
        direction: string
        description: string
        pinned?: boolean
        tags: {
            name: string
            icon: keyof typeof Icons
        }[]
    }[]
    openSourceProjects?: {
        name: string
        repo: string
        url: string
        description: string
        pinned?: boolean
        tags: {
            name: string
            icon: keyof typeof Icons
        }[]
    }[]
    research?: {
        publications?: {
            authors: string
            title: string
            venue: string
            year: string
            url: string
            tier: string
            pinned?: boolean
        }[]
        conferences?: {
            authors: string
            title: string
            venue: string
            year: string
            url?: string
            pinned?: boolean
        }[]
        grants?: {
            name: string
            funding: string
            duration: string
            overview: string
            role: string
            outcomes: string
            pinned?: boolean
        }[]
    }
}

export const CONFIG: Config = {
    name: '李盛园',
    avatar: '/images/headshot.jpg',
    title: 'AI Product Manager',
    siteUrl: 'https://dy9759.github.io/MyWebsite/',
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/dy9759',
            icon: 'github',
        },
    ],
    contactMethods: [
        {
            label: '国内邮箱',
            value: 'dy0509@foxmail.com',
            href: 'mailto:dy0509@foxmail.com',
            icon: 'email',
        },
        {
            label: '手机号',
            value: '18668206791',
            href: 'tel:18668206791',
            icon: 'phone',
        },
        {
            label: 'Global 邮箱',
            value: 'dy9759@gmail.com',
            href: 'mailto:dy9759@gmail.com',
            icon: 'email',
        },
        {
            label: 'WeChat',
            value: 'ChaunceyAI2030',
            icon: 'wechat',
        },
        {
            label: '出生年月',
            value: '1997年5月出生',
            icon: 'calendar',
        },
        {
            label: '政治面貌',
            value: '中共党员',
            icon: 'badgeCheck',
        },
    ],
    description: (
        <>
            👋 你好!我是李盛园,一名 AI 产品经理,拥有 3+ 年 AI
            产品研发与落地经验。 武汉大学建筑学(建筑技术科学)硕士(GPA
            90+/100,Top 5%),本科毕业于浙大宁波理工学院建筑学。
            熟悉大模型本地部署、RAG、Agent、模型微调等技术方案,在建筑、能源、电商等领域有产品经验。
            研究成果包括期刊论文 8 篇(SCI 7 篇、中文期刊 1 篇)、会议论文 5
            篇、科研项目 1 项,参与专著 1 部,担任 TOP 期刊审稿人。欢迎交流合作!
        </>
    ),
    descriptionRaw:
        "Hi, I'm Shengyuan Li. AI Product Manager with 3+ years of experience in LLM deployment, RAG, Agent workflows, and model fine-tuning. M.S. in Architecture (Architectural Technology Science) from Wuhan University, B.S. in Architecture. Research outputs include 8 journal papers (7 SCI-indexed and 1 Chinese journal article), 5 conference papers, 1 research project, and 1 contributed monograph.",
    projects: [
        {
            name: 'Sayso ToC 产品',
            duration: '2025年10月 - 至今',
            description:
                '负责 ToC 产品 Sayso,覆盖输入法、会议、个人语音助理与个人办公提效场景,负责产品并与前后端开发配合。MVP 版本处于产品试验期,获得 1000+ 用户,注册体验后付费转化率达 2.77%,年会员占比 58.6%。',
            url: '',
            links: [
                { label: '国内版', url: 'https://sayso.cn/' },
                { label: '国际版', url: 'https://sayso.ai/' },
            ],
            tags: [
                { name: 'ToC', icon: 'gear' },
                { name: 'Product', icon: 'gear' },
                { name: 'AI Assistant', icon: 'llm' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'Sayso Team',
            duration: '2026年3月 - 至今',
            description:
                '负责 Sayso Team,面向 A2A 协作与团队提效场景,一人 solo builder 推进产品构建。',
            url: '',
            tags: [
                { name: 'A2A', icon: 'llm' },
                { name: 'Team Productivity', icon: 'gear' },
                { name: 'Solo Builder', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'MyAttention 浏览器插件',
            description:
                'Chrome 浏览器插件,用于记录 AI 对话、网页高亮、停留阅读与浏览历史等注意力信号,并通过 LLM 生成周报、主题复盘与心理洞察,帮助突破信息茧房。',
            url: '',
            github: 'https://github.com/MyAIOSHub/MyAttention-extansion',
            tags: [
                { name: 'Chrome Extension', icon: 'gear' },
                { name: 'LLM', icon: 'llm' },
                { name: 'IndexedDB', icon: 'gear' },
                { name: 'TypeScript', icon: 'typescript' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: '大模型评测平台',
            duration: '2026年10月 - 至今',
            description: '负责 LLM、TTS、ASR 与端到端语音模型评测平台建设。',
            url: '',
            tags: [
                { name: 'LLM Evaluation', icon: 'llm' },
                { name: 'TTS', icon: 'gear' },
                { name: 'ASR', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'VuiLabs 官网建设',
            duration: '2026年9月 - 至今',
            description: '参与 ToB 产品 VuiLabs 官网建设。',
            url: '',
            tags: [
                { name: 'ToB', icon: 'gear' },
                { name: 'Website', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Sayso 数据 Agent',
            duration: '2026年4月',
            description:
                '负责内部数据 Agent 工具,通过 MCP 调用替代传统数据看板开发。',
            url: '',
            tags: [
                { name: 'Data Agent', icon: 'llm' },
                { name: 'MCP', icon: 'gear' },
                { name: 'Internal Tool', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: '内容创作冷启动',
            duration: '2025年8月 - 2025年9月',
            description: '负责小红书新号内容创作与冷启动,一个月涨粉 1000+。',
            url: '',
            tags: [
                { name: 'Content', icon: 'gear' },
                { name: 'Growth', icon: 'gear' },
                { name: '小红书', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: '沉浸式播客 AI 产品',
            duration: '2025年6月',
            description:
                'C 端产品设计。针对信息过载、碎片焦虑与信息留存率不足,定义“沉浸式播客 + 记忆强化 + 视角拓展”的内容消费链路。通过 Coze 实现多 Agent 角色讨论 MVP,支持围绕任意链接/文档进行多视角播客式讨论;评测发现法律、数学格式等内容召回缺陷,为后续微调提供优化建议。',
            url: '',
            tags: [
                { name: 'Coze', icon: 'gear' },
                { name: 'Multi-Agent', icon: 'llm' },
                { name: 'Evaluation', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: '智能问答 AI 行业知识库',
            duration: '2025年3月',
            description:
                'B 端产品研发。面向企业内部知识检索与数据隐私需求,使用 100K 高质量行业数据在 Colab 上对 Llama 3.2 进行 LoRA 监督微调,通过 TrainingArguments 等参数压缩至本地部署规模。使用 Python 构建本地 RAG MVP 并进行回答准确性与召回评测;通过 Coze 验证 Agent workflow,实现无人值守、自动更新的 AI 问答知识库。',
            url: '',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'RAG', icon: 'llm' },
                { name: 'Llama 3.2', icon: 'llm' },
                { name: 'Coze', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: '新能源 + 负荷侧能源管理 AI',
            duration: '2024年12月',
            description:
                'B 端产品研发。面向虚拟电厂新能源出力与负荷侧预测偏差超过 30% 的问题,采用 GCN-LSTM 融合时空多维特征预测产品采用趋势与绿电波动,较 LSTM、XGBoost 等方法 MAE 降低 10%,绿电波动准确性提升 15%。基于全球室内外热数据集与 Q-learning 深度强化学习控制负荷侧能耗,负荷侧能耗 -15%,绿电消纳能力 +50%。',
            url: '',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'GCN-LSTM', icon: 'gear' },
                { name: 'DRL', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: '光伏产品需求分析 AI',
            duration: '2022年9月',
            description:
                'C 端功能研发。面向海外屋顶光伏采购场景,用 YOLOv8 迁移学习 + 1w+ 人工标注样本校准的 SAM 半自动标注识别屋顶容量,覆盖 5 类光伏面板与 200+ 屋顶材质类别,材质识别准确率 92%,面积测量误差 <3%,勘察时效从 3 小时缩短至 5 分钟。通过 Agent workflow + Stable Diffusion 批量生成 20 种实景方案效果图,客户决策周期平均缩短 5 天,满意度提升 60%。',
            url: '',
            tags: [
                { name: 'YOLOv8', icon: 'gear' },
                { name: 'SAM', icon: 'gear' },
                { name: 'Stable Diffusion', icon: 'openai' },
                { name: 'Agent', icon: 'llm' },
            ],
            featured: false,
        },
    ],
    openSourceProjects: [
        {
            name: '个人开发 Harness Skill',
            repo: 'dy9759/claude-codex-orchestration',
            url: 'https://github.com/dy9759/claude-codex-orchestration',
            description:
                '搭建个人开发 harness skill,编排 Claude Code 与 Codex 双 Agent 工作流,沉淀为可复用的开发协作流程。',
            pinned: true,
            tags: [
                { name: 'Claude Code', icon: 'llm' },
                { name: 'Codex', icon: 'llm' },
                { name: 'Harness', icon: 'gear' },
            ],
        },
        {
            name: 'MyIsland 灵动岛交互',
            repo: 'MyAIOSHub/MyIsland',
            url: 'https://github.com/MyAIOSHub/MyIsland',
            description:
                '灵动岛与 Notch Launcher 等 macOS 桌面交互实验,探索系统状态提示、快捷入口与浮层体验。',
            tags: [
                { name: 'macOS', icon: 'gear' },
                { name: 'Dynamic Island', icon: 'gear' },
                { name: 'Swift', icon: 'gear' },
            ],
        },
        {
            name: '多人多 Agent Team 协作',
            repo: 'dy9759/rudder0518',
            url: 'https://github.com/dy9759/rudder0518',
            description:
                '面向多人、多 Agent 的协作与调度平台,探索 agent teams 的任务编排、运行控制与团队提效。',
            pinned: true,
            tags: [
                { name: 'Multi-Agent', icon: 'llm' },
                { name: 'Team', icon: 'gear' },
                { name: 'Orchestration', icon: 'gear' },
            ],
        },
        {
            name: 'TTS 评测平台',
            repo: 'dy9759/One-Eval0425',
            url: 'https://github.com/dy9759/One-Eval0425',
            description:
                '面向 TTS、ASR 与端到端语音模型的评测平台,用于标准化测试、结果对比与模型效果追踪。',
            tags: [
                { name: 'TTS', icon: 'gear' },
                { name: 'ASR', icon: 'gear' },
                { name: 'Evaluation', icon: 'llm' },
            ],
        },
    ],
    futureWork: [
        {
            name: 'Voice Agent 产品',
            direction: 'ToC 方向',
            description:
                '负责 Voice Agent 产品规划与构建,重点包括牙科诊所 Voice Agent 系统与创作者平台。',
            pinned: true,
            tags: [
                { name: 'Voice Agent', icon: 'llm' },
                { name: 'ToC', icon: 'gear' },
                { name: 'Creator Platform', icon: 'gear' },
            ],
        },
        {
            name: '青少年 Vibe Coding 竞赛课程',
            direction: '教育产品',
            description:
                '负责面向竞赛的青少年 Vibe Coding 课程设计,以类似阿里天池赛、全国 AI 赛的竞赛场景为卖点。第一节课即可通过口述式 Vibe Coding 完成竞赛题目,并通过排行榜展示口述代码的打分结果与全国排名。',
            tags: [
                { name: 'Education', icon: 'gear' },
                { name: 'Vibe Coding', icon: 'llm' },
                { name: 'Competition', icon: 'gear' },
            ],
        },
    ],
    education: [
        {
            school: '武汉大学',
            degree: '硕士',
            field: '建筑学(建筑技术科学)',
            duration: '2022.9 - 2025.6',
            details: 'GPA 90+/100 (Top 5%)',
        },
        {
            school: '浙大宁波理工学院',
            degree: '本科',
            field: '建筑学',
            duration: '2015.9 - 2020.6',
            details: 'GPA 85+/100 (Top 10%)',
        },
    ],
    qualifications: [
        {
            title: '荣誉奖项',
            icon: 'star',
            items: [
                '多次获校优秀学生奖学金、校三好学生',
                '全国绿建竞赛全国最佳设计 / 最佳团队一等奖(1/500+)',
            ],
        },
        {
            title: '技能与工具',
            icon: 'gear',
            items: [
                'Python、SPSS、GIS、Axure',
                'Prompt、RAG、Agent 等 AI 解决方案',
            ],
        },
        {
            title: '产品管理证书',
            icon: 'badgeCheck',
            items: [
                'IBM AI 产品管理证书',
                'Google AI 产品管理证书',
                'Pendo AI 产品管理证书',
            ],
        },
        {
            title: '语言与会员',
            icon: 'badgeCheck',
            items: ['英语 CEFR-B2', '中国建筑协会会员', '中国能源研究会会员'],
        },
        {
            title: '学术补充',
            icon: 'llm',
            items: ['参与专著 1 部', '担任 TOP 期刊审稿人'],
        },
    ],
    research: {
        publications: [
            {
                authors:
                    'Xiaohuan Xie, Senhong Cai, Haifeng Deng, Shengyuan Li, Xin Liu, Zhonghua Gou',
                title: 'Optimizing county-level land use for sustainable photovoltaic development in China: A multi-scenario analysis',
                venue: 'Land Use Policy, Vol. 163, 107920',
                year: '2026',
                url: 'https://doi.org/10.1016/j.landusepol.2026.107920',
                tier: 'JCR Q1 · 中科院一区 Top',
            },
            {
                authors:
                    'Xiaohuan Xie, Qiting Lin, Shengyuan Li, Xin Liu, Zhonghua Gou',
                title: 'Optimal urban expansion rates for balancing ecosystem services and economic development in mega-city fringe areas: A modeling framework applied to Huadu district, Guangzhou',
                venue: 'Ecological Modelling, Vol. 513, 111436',
                year: '2026',
                url: 'https://doi.org/10.1016/j.ecolmodel.2025.111436',
                tier: 'JCR Q2 · 中科院三区',
            },
            {
                authors: '谢晓欢, 林绮婷, 李盛园, 苟中华',
                title: '超大城市边缘县域生态系统服务与经济发展耦合协调性时空演化——以广州市花都区为例',
                venue: '小城镇建设, 2026, 44(5): 74-82',
                year: '2026',
                url: 'https://www.dosct.cn/article/doi/10.3969/j.issn.1009-1483.2026.05.011',
                tier: '中文期刊',
            },
            {
                authors: 'Chen Yang, Shengyuan Li, Zhonghua Gou',
                title: 'Spatiotemporal prediction of urban building rooftop photovoltaic potential based on GCN-LSTM',
                venue: 'Energy and Buildings, Vol. 334, 115522',
                year: 'May 2025',
                url: 'https://doi.org/10.1016/j.enbuild.2025.115522',
                tier: 'JCR Q1 · 中科院二区 Top',
            },
            {
                authors:
                    'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li, Zhonghua Gou',
                title: 'Pathways for Reducing Carbon Emission in County-Level Transportation: A Life Cycle Perspective and Multi-Scenario Analysis',
                venue: 'Energy Strategy Reviews, Vol. 58, 101678',
                year: 'Mar 2025',
                url: 'https://doi.org/10.1016/j.esr.2025.101678',
                tier: 'JCR Q1 · 中科院二区',
            },
            {
                authors: 'Shengyuan Li, Zhonghua Gou',
                title: 'Energy efficiency and cost benefits of office-to-residential building transformation: Insights from Los Angeles',
                venue: 'Journal of Building Engineering, Vol. 98, 111496',
                year: 'Dec 2024',
                url: 'https://doi.org/10.1016/j.jobe.2024.111496',
                tier: 'JCR Q1 · 中科院二区 Top · First Author',
                pinned: true,
            },
            {
                authors:
                    'Xiaohuan Xie, Haifeng Deng, Shengyuan Li, Zhonghua Gou',
                title: 'Optimizing Land Use for Carbon Neutrality: Integrating Photovoltaic Development in Lingbao, Henan Province',
                venue: 'Land, Vol. 13(1), 97',
                year: 'Jan 2024',
                url: 'https://doi.org/10.3390/land13010097',
                tier: 'JCR Q2 · 中科院三区',
            },
            {
                authors: 'Shengyuan Li, Zhonghua Gou',
                title: 'Accepting Solar Photovoltaic Panels in Rural Landscapes: The Tangle among Nostalgia, Morality, and Economic Stakes',
                venue: 'Land, Vol. 12(10), 1956',
                year: 'Oct 2023',
                url: 'https://doi.org/10.3390/land12101956',
                tier: 'JCR Q2 · 中科院三区 · First Author',
                pinned: true,
            },
        ],
        grants: [
            {
                name: '乡村地域系统协同观测与转型机理及模拟',
                funding: '国家自然科学基金重大项目 (NSFC Major Program)',
                duration: 'Jan 2023 – Present',
                overview:
                    '聚焦乡村地域系统转型,开展交通、土地等减碳优化研究,综合评估产业经济效应,探索区域最优发展路径。',
                role: '开发 2 套研究方法论;技术指导 6 人团队开展数据分析;负责项目申报、推进与结项管理。',
                outcomes:
                    '提前完成 10 项成果转化;研究成果被纳入地方政府规划参考,提升区域可持续发展能力。',
                pinned: true,
            },
        ],
        conferences: [
            {
                authors: 'Xiaohuan Xie, Qiting Lin, Shengyuan Li',
                title: 'Dynamic Coupling and Coordinated Assessment of Urban Production-Living-Ecology System Using System Dynamics Model: A Case Study of Lingbao',
                venue: '18th IACP Conference, Hangzhou, China',
                year: 'Jul 2024',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li',
                title: 'Scenario Simulation of County-Level Transportation Energy Carbon Emissions in Huadu District, Guangzhou: A Life-Cycle Perspective',
                venue: '2024 International Conference on Energy, Materials and Management Science, Chengdu, China',
                year: 'Mar 2024',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li',
                title: 'Explore the county transportation energy decarbonization path with a simplified full life cycle assessment linked LEAP model',
                venue: '18th IACP Conference, Hangzhou, China',
                year: 'Jul 2024',
            },
            {
                authors: '邓海峰, 李盛园, 谢晓欢',
                title: '碳中和背景下粮食主产区土地利用多情景模拟与碳储量分析',
                venue: '中国地理学会自然地理学专业委员会 2024 年学术年会, 广东梅州',
                year: 'Jun 2024',
                pinned: true,
            },
            {
                authors: '滕腾, 邓海峰, 李盛园, 谢晓欢',
                title: '城乡融合发展背景下城乡结合区典型县域土地利用多情景模拟与评价',
                venue: '中国地理学大会, 江苏南京',
                year: 'Sep 2024',
            },
        ],
    },
    workExperience: {
        positions: [
            {
                company: '宇生月伴(杭州)智能科技有限公司',
                role: '业务线产品负责人 / AI Agent Product Builder',
                duration: '2025年7月 - 至今',
                description: (
                    <>
                        负责业务线产品规划、需求定义、产品设计、团队协作与迭代落地。2025年8月起使用
                        Claude Code、Codex、Antigravity 等 AI Agent
                        工具进行产品研发实践,产出 AI 产品。
                    </>
                ),
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'Agent', icon: 'gear' },
                    { name: 'Product', icon: 'gear' },
                    { name: 'Claude Code', icon: 'llm' },
                    { name: 'Codex', icon: 'llm' },
                    { name: 'Antigravity', icon: 'gear' },
                ],
            },
            {
                company: '北京智能问问科技(AI 初创)',
                role: 'AI Product Manager — Intern',
                duration: 'May 2025 – Jul 2025',
                description: (
                    <>
                        竞品分析(NotebookLM / ima.copilot / 飞书知识问答),构建
                        1000+ 评测案例集,产品设计提出沉浸式播客 AI 方向。
                    </>
                ),
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'RAG', icon: 'llm' },
                    { name: 'Evaluation', icon: 'gear' },
                    { name: 'Coze', icon: 'gear' },
                ],
            },
            {
                company: '武汉大学建筑智慧能源实验室(全球前 2%)',
                role: 'AI for Science 研究实践 / AI Product R&D — Part-time',
                duration: '2023年 - 至今',
                description: (
                    <>
                        使用 AI 与 GitHub Copilot
                        辅助科研建模、数据分析与论文写作,产出论文成果。实验室阶段
                        Jan 2023 – Jun 2025,推动光伏识别业务 +20 倍范围,GCN-LSTM
                        + DRL 绿电消纳 +50%,本地 RAG 知识库自动更新。
                    </>
                ),
                tags: [
                    { name: 'AI for Science', icon: 'llm' },
                    { name: 'GitHub Copilot', icon: 'github' },
                    { name: 'Python', icon: 'python' },
                    { name: 'YOLOv8', icon: 'gear' },
                    { name: 'DRL', icon: 'gear' },
                ],
            },
            {
                company: '上海几凡设计教育(杭州校区)',
                role: '联合创始人 / 增长与产品负责人',
                duration: 'Jun 2020 – Aug 2022',
                description: (
                    <>
                        基于聚类 + 回归分析用户画像,用户增长 +30%、营收
                        +20%;设计精品小班产品,差评退课率 -15%。
                    </>
                ),
                tags: [
                    { name: 'Python', icon: 'python' },
                    { name: 'SQL', icon: 'sql' },
                ],
            },
        ],
    },
}

export const CONFIG_EN: Config = {
    ...CONFIG,
    name: 'Shengyuan Li',
    title: 'AI Product Manager',
    contactMethods: [
        {
            label: 'China Email',
            value: 'dy0509@foxmail.com',
            href: 'mailto:dy0509@foxmail.com',
            icon: 'email',
        },
        {
            label: 'Phone',
            value: '18668206791',
            href: 'tel:18668206791',
            icon: 'phone',
        },
        {
            label: 'Global Email',
            value: 'dy9759@gmail.com',
            href: 'mailto:dy9759@gmail.com',
            icon: 'email',
        },
        {
            label: 'WeChat',
            value: 'ChaunceyAI2030',
            icon: 'wechat',
        },
        {
            label: 'Date of Birth',
            value: 'May 1997',
            icon: 'calendar',
        },
        {
            label: 'Political Status',
            value: 'CPC Member',
            icon: 'badgeCheck',
        },
    ],
    description: (
        <>
            Hi, I&apos;m Shengyuan Li, an AI Product Manager with 3+ years of AI
            product R&D and delivery experience. I hold an M.S. in Architecture
            (Architectural Technology Science) from Wuhan University (GPA
            90+/100, Top 5%) and a B.S. in Architecture from Zhejiang University
            NingboTech. I work across local LLM deployment, RAG, agents, and
            model fine-tuning, with product experience in architecture, energy,
            and e-commerce. Research outputs include 8 journal papers (7
            SCI-indexed and 1 Chinese journal article), 5 conference papers, and
            1 research project, plus 1 contributed monograph. I also serve as a
            reviewer for top journals. Open to collaboration.
        </>
    ),
    projects: [
        {
            name: 'Sayso ToC Product',
            duration: 'Oct 2025 – Present',
            description:
                'Led Sayso ToC product across input method, meetings, personal voice assistant, and personal productivity scenarios; owned product direction and coordinated frontend/backend delivery. The MVP trial reached 1,000+ users, 2.77% paid conversion after registration/trial, and 58.6% annual membership share.',
            url: '',
            links: [
                { label: 'China', url: 'https://sayso.cn/' },
                { label: 'Global', url: 'https://sayso.ai/' },
            ],
            tags: [
                { name: 'ToC', icon: 'gear' },
                { name: 'Product', icon: 'gear' },
                { name: 'AI Assistant', icon: 'llm' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'Sayso Team',
            duration: 'Mar 2026 – Present',
            description:
                'Led Sayso Team for A2A collaboration and team productivity, building the product as a solo builder.',
            url: '',
            tags: [
                { name: 'A2A', icon: 'llm' },
                { name: 'Team Productivity', icon: 'gear' },
                { name: 'Solo Builder', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'MyAttention Browser Extension',
            description:
                'Built a Chrome extension that records attention signals from AI conversations, highlights, reading dwell time, and browser history, then uses LLMs to generate weekly reports, topic reviews, and psychology insights to break information bubbles.',
            url: '',
            github: 'https://github.com/MyAIOSHub/MyAttention-extansion',
            tags: [
                { name: 'Chrome Extension', icon: 'gear' },
                { name: 'LLM', icon: 'llm' },
                { name: 'IndexedDB', icon: 'gear' },
                { name: 'TypeScript', icon: 'typescript' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'LLM Evaluation Platform',
            duration: 'Oct 2026 – Present',
            description:
                'Led the evaluation platform for LLM, TTS, ASR, and end-to-end voice models.',
            url: '',
            tags: [
                { name: 'LLM Evaluation', icon: 'llm' },
                { name: 'TTS', icon: 'gear' },
                { name: 'ASR', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'VuiLabs Website',
            duration: 'Sep 2026 – Present',
            description:
                'Contributed to the official website for VuiLabs, a ToB product.',
            url: '',
            tags: [
                { name: 'ToB', icon: 'gear' },
                { name: 'Website', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Sayso Data Agent',
            duration: 'Apr 2026',
            description:
                'Built an internal data agent that uses MCP calls to replace traditional data dashboard development.',
            url: '',
            tags: [
                { name: 'Data Agent', icon: 'llm' },
                { name: 'MCP', icon: 'gear' },
                { name: 'Internal Tool', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Content Creation Cold Start',
            duration: 'Aug 2025 – Sep 2025',
            description:
                'Led content creation and cold start for a new Xiaohongshu account, gaining 1,000+ followers in one month.',
            url: '',
            tags: [
                { name: 'Content', icon: 'gear' },
                { name: 'Growth', icon: 'gear' },
                { name: 'Xiaohongshu', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Immersive Podcast AI Product',
            duration: 'Jun 2025',
            description:
                'Designed a consumer AI product for information overload, fragmented attention, and low information retention. Defined a content loop around immersive podcasting, memory reinforcement, and perspective expansion. Built a Coze-based multi-agent MVP with role-based discussions around any link or document; evaluation surfaced recall issues in legal and math-format content, informing future fine-tuning.',
            url: '',
            tags: [
                { name: 'Coze', icon: 'gear' },
                { name: 'Multi-Agent', icon: 'llm' },
                { name: 'Evaluation', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'AI Industry Knowledge Base',
            duration: 'Mar 2025',
            description:
                'Built a B2B intelligent Q&A product for internal knowledge retrieval and data privacy. Fine-tuned Llama 3.2 with LoRA on 100K high-quality industry samples in Colab, using TrainingArguments to reduce the model to a local-deployable scale. Built a Python local RAG MVP with answer-accuracy and recall evaluation, then validated a Coze Agent workflow for unattended, auto-updating knowledge-base operations.',
            url: '',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'RAG', icon: 'llm' },
                { name: 'Llama 3.2', icon: 'llm' },
                { name: 'Coze', icon: 'gear' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'Renewable Energy + Demand-Side AI Management',
            duration: 'Dec 2024',
            description:
                'Developed a B2B energy AI product for virtual power plant scenarios where renewable output and demand-side forecasts can deviate by over 30%. Used GCN-LSTM with spatiotemporal features to predict adoption trends and green-power fluctuation, reducing MAE by 10% versus LSTM/XGBoost and improving fluctuation accuracy by 15%. Built Q-learning control on a global indoor/outdoor thermal dataset, reducing demand-side energy use by 15% and improving green electricity consumption by 50%.',
            url: '',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'GCN-LSTM', icon: 'gear' },
                { name: 'DRL', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'PV Product Demand Analysis AI',
            duration: 'Sep 2022',
            description:
                'Built a consumer-side PV feature for overseas rooftop solar purchasing. Used YOLOv8 transfer learning plus SAM semi-automatic annotation calibrated on 10K+ manually labeled samples to identify rooftop capacity across 5 PV panel categories and 200+ roof-material classes, reaching 92% material-recognition accuracy and <3% area-measurement error while reducing survey time from 3 hours to 5 minutes. Used Agent workflow + Stable Diffusion to generate 20 real-scene renderings, shortening average customer decision cycles by 5 days and improving satisfaction by 60%.',
            url: '',
            tags: [
                { name: 'YOLOv8', icon: 'gear' },
                { name: 'SAM', icon: 'gear' },
                { name: 'Stable Diffusion', icon: 'openai' },
                { name: 'Agent', icon: 'llm' },
            ],
            featured: false,
        },
    ],
    openSourceProjects: [
        {
            name: 'Personal Development Harness Skill',
            repo: 'dy9759/claude-codex-orchestration',
            url: 'https://github.com/dy9759/claude-codex-orchestration',
            description:
                'Built a personal development harness skill that orchestrates Claude Code and Codex dual-agent workflows into reusable engineering collaboration routines.',
            pinned: true,
            tags: [
                { name: 'Claude Code', icon: 'llm' },
                { name: 'Codex', icon: 'llm' },
                { name: 'Harness', icon: 'gear' },
            ],
        },
        {
            name: 'MyIsland Dynamic Island Interaction',
            repo: 'MyAIOSHub/MyIsland',
            url: 'https://github.com/MyAIOSHub/MyIsland',
            description:
                'Explored macOS desktop interaction patterns such as Dynamic Island and Notch Launcher for system status, quick entry points, and floating UI experiences.',
            tags: [
                { name: 'macOS', icon: 'gear' },
                { name: 'Dynamic Island', icon: 'gear' },
                { name: 'Swift', icon: 'gear' },
            ],
        },
        {
            name: 'Multi-Agent Team Collaboration',
            repo: 'dy9759/rudder0518',
            url: 'https://github.com/dy9759/rudder0518',
            description:
                'Built a collaboration and orchestration platform for multiple people and multiple agents, exploring task routing, run control, and team productivity.',
            pinned: true,
            tags: [
                { name: 'Multi-Agent', icon: 'llm' },
                { name: 'Team', icon: 'gear' },
                { name: 'Orchestration', icon: 'gear' },
            ],
        },
        {
            name: 'TTS Evaluation Platform',
            repo: 'dy9759/One-Eval0425',
            url: 'https://github.com/dy9759/One-Eval0425',
            description:
                'Built an evaluation platform for TTS, ASR, and end-to-end voice models, supporting standardized tests, result comparison, and model quality tracking.',
            tags: [
                { name: 'TTS', icon: 'gear' },
                { name: 'ASR', icon: 'gear' },
                { name: 'Evaluation', icon: 'llm' },
            ],
        },
    ],
    futureWork: [
        {
            name: 'Voice Agent Product',
            direction: 'ToC',
            description:
                'Own product planning and construction for Voice Agent products, focusing on a dental-clinic voice agent system and a creator platform.',
            pinned: true,
            tags: [
                { name: 'Voice Agent', icon: 'llm' },
                { name: 'ToC', icon: 'gear' },
                { name: 'Creator Platform', icon: 'gear' },
            ],
        },
        {
            name: 'Youth Vibe Coding Competition Course',
            direction: 'Education Product',
            description:
                'Design a youth Vibe Coding course for competition-oriented learning, using scenarios similar to Tianchi or national AI contests as the hook. In the first class, students can solve competition tasks through voice-driven vibe coding and see leaderboard scores and national ranking.',
            tags: [
                { name: 'Education', icon: 'gear' },
                { name: 'Vibe Coding', icon: 'llm' },
                { name: 'Competition', icon: 'gear' },
            ],
        },
    ],
    education: [
        {
            school: 'Wuhan University',
            degree: "Master's Degree",
            field: 'Architecture (Architectural Technology Science)',
            duration: '2022.9 - 2025.6',
            details: 'GPA 90+/100 (Top 5%)',
        },
        {
            school: 'Zhejiang University NingboTech',
            degree: "Bachelor's Degree",
            field: 'Architecture',
            duration: '2015.9 - 2020.6',
            details: 'GPA 85+/100 (Top 10%)',
        },
    ],
    qualifications: [
        {
            title: 'Awards',
            icon: 'star',
            items: [
                'Multiple university outstanding student scholarships and Three-Good Student honors',
                'National Green Building Competition Best Design / Best Team First Prize (1/500+)',
            ],
        },
        {
            title: 'Skills & Tools',
            icon: 'gear',
            items: [
                'Python, SPSS, GIS, Axure',
                'Prompting, RAG, Agent, and other AI solution workflows',
            ],
        },
        {
            title: 'Product Management Certificates',
            icon: 'badgeCheck',
            items: [
                'IBM AI Product Management certificate',
                'Google AI Product Management certificate',
                'Pendo AI Product Management certificate',
            ],
        },
        {
            title: 'Language & Memberships',
            icon: 'badgeCheck',
            items: [
                'English CEFR-B2',
                'Member of China Architecture Association',
                'Member of China Energy Research Society',
            ],
        },
        {
            title: 'Academic Additions',
            icon: 'llm',
            items: ['Contributed to 1 monograph', 'Reviewer for top journals'],
        },
    ],
    research: {
        publications:
            CONFIG.research?.publications?.map((publication) => ({
                ...publication,
                tier: publication.tier
                    .replace('中科院一区', 'CAS Q1')
                    .replace('中科院二区', 'CAS Q2')
                    .replace('中科院三区', 'CAS Q3')
                    .replace('第一作者', 'First Author'),
            })) ?? [],
        grants: [
            {
                name: 'Collaborative Observation, Transformation Mechanisms, and Simulation of Rural Territorial Systems',
                funding: 'NSFC Major Program',
                duration: 'Jan 2023 – Present',
                overview:
                    'Focused on rural territorial system transformation, carbon-reduction optimization for transportation and land use, integrated industrial-economic impact evaluation, and optimal regional development pathways.',
                role: 'Developed two research methodologies; provided technical guidance for a six-person data analysis team; supported proposal writing, project execution, and final delivery management.',
                outcomes:
                    'Completed 10 research-to-application outputs ahead of schedule; research outcomes were included as references for local government planning and improved regional sustainability capacity.',
                pinned: true,
            },
        ],
        conferences: [
            ...(CONFIG.research?.conferences ?? []).slice(0, 3),
            {
                authors: 'Haifeng Deng, Shengyuan Li, Xiaohuan Xie',
                title: 'Multi-Scenario Land Use Simulation and Carbon Storage Analysis in Major Grain-Producing Areas under Carbon Neutrality',
                venue: '2024 Annual Meeting of the Geographical Society of China Physical Geography Committee, Meizhou, Guangdong',
                year: 'Jun 2024',
                pinned: true,
            },
            {
                authors: 'Teng Teng, Haifeng Deng, Shengyuan Li, Xiaohuan Xie',
                title: 'Multi-Scenario Land Use Simulation and Evaluation of Typical Counties in Urban-Rural Fringe Areas under Integrated Urban-Rural Development',
                venue: 'Annual Conference of the Geographical Society of China, Nanjing, Jiangsu',
                year: 'Sep 2024',
            },
        ],
    },
    workExperience: {
        positions: [
            {
                company:
                    'Yusheng Yueban (Hangzhou) Intelligent Technology Co., Ltd.',
                role: 'Business Line Product Lead / AI Agent Product Builder',
                duration: 'Jul 2025 – Present',
                description: (
                    <>
                        Own business-line product planning, requirement
                        definition, product design, team collaboration, and
                        iteration delivery. Since Aug 2025, I have used Claude
                        Code, Codex, Antigravity, and other AI agent tools for
                        product R&D practice, delivering AI products.
                    </>
                ),
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'Agent', icon: 'gear' },
                    { name: 'Product', icon: 'gear' },
                    { name: 'Claude Code', icon: 'llm' },
                    { name: 'Codex', icon: 'llm' },
                    { name: 'Antigravity', icon: 'gear' },
                ],
            },
            {
                company: 'Beijing ZhiNeng WenWen Technology (AI Startup)',
                role: 'AI Product Manager — Intern',
                duration: 'May 2025 – Jul 2025',
                description: (
                    <>
                        Conducted competitive analysis for NotebookLM,
                        ima.copilot, and Feishu Knowledge Q&A; built a 1,000+
                        case evaluation set; proposed an immersive podcast AI
                        product direction.
                    </>
                ),
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'RAG', icon: 'llm' },
                    { name: 'Evaluation', icon: 'gear' },
                    { name: 'Coze', icon: 'gear' },
                ],
            },
            {
                company:
                    'Wuhan University Smart Building Energy Lab (Global Top 2%)',
                role: 'AI for Science Research Practice / AI Product R&D — Part-time',
                duration: '2023 – Present',
                description: (
                    <>
                        Used AI and GitHub Copilot to support scientific
                        modeling, data analysis, and paper writing, producing
                        research publications. During Jan 2023 – Jun 2025, I
                        expanded PV recognition coverage by 20x, improved green
                        electricity consumption by 50% with GCN-LSTM + DRL, and
                        built an automatically updating local RAG knowledge
                        base.
                    </>
                ),
                tags: [
                    { name: 'AI for Science', icon: 'llm' },
                    { name: 'GitHub Copilot', icon: 'github' },
                    { name: 'Python', icon: 'python' },
                    { name: 'YOLOv8', icon: 'gear' },
                    { name: 'DRL', icon: 'gear' },
                ],
            },
            {
                company: 'Shanghai Jifan Design Education (Hangzhou Campus)',
                role: 'Co-founder / Growth & Product Lead',
                duration: 'Jun 2020 – Aug 2022',
                description: (
                    <>
                        Built user personas through clustering and regression
                        analysis, driving +30% user growth and +20% revenue;
                        designed premium small-class products and reduced
                        refund/dropout caused by negative reviews by 15%.
                    </>
                ),
                tags: [
                    { name: 'Python', icon: 'python' },
                    { name: 'SQL', icon: 'sql' },
                ],
            },
        ],
    },
}

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
    descriptionRaw: string
    workExperience?: {
        positions?: {
            company: string
            role: string
            duration: string
            description: string | JSX.Element
            descriptionSegments?: (
                | string
                | {
                      title: string
                      content: string
                  }
            )[]
            link?: string
            tags: {
                name: string
                icon: keyof typeof Icons
            }[]
        }[]
    }
    research?: {
        publications?: {
            authors: string
            title: string
            venue: string
            year: string
            url?: string
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
    title: 'AI 产品负责人 / Applied AI Builder',
    siteUrl: 'https://chauncey.myoii.com/',
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
    ],
    descriptionRaw:
        '李盛园（Chauncey Lee），AI 产品负责人 / Applied AI Builder。负责 SaySo Voice Agent 产品线，聚焦 Voice AI、Agent 编排、模型评测与 AI 产品增长。',
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
                authors: '谢晓欢, 王宁歆, 李盛园, 钟月琳, 洪武扬',
                title: '超大城市边缘区县域产业协同进阶指数构建与转型路径模拟——以广州市花都区为例',
                venue: '地域研究与开发(录用)',
                year: '录用',
                tier: '北大核心',
            },
            {
                authors: '谢晓欢, 滕腾, 李盛园, 洪武扬',
                title: '基于Delphi-AHP-TOPSIS的大都市郊区乡村产业转型评估及其时空分布研究——以广州市花都区为例',
                venue: '地域研究与开发(录用)',
                year: '录用',
                tier: '北大核心',
            },
            {
                authors: '谢晓欢, 黎锶彤, 李盛园',
                title: '基于MOP-PLUS-InVEST的粮食主产县域土地利用对碳储量的时空响应与多情景优化路径',
                venue: '地域研究与开发(录用)',
                year: '录用',
                tier: '北大核心',
            },
            {
                authors: 'Chen Yang, Shengyuan Li, Zhonghua Gou',
                title: 'Spatiotemporal prediction of urban building rooftop photovoltaic potential based on GCN-LSTM',
                venue: 'Energy and Buildings, Vol. 334, 115522',
                year: '2025.5',
                url: 'https://doi.org/10.1016/j.enbuild.2025.115522',
                tier: 'JCR Q1 · 中科院二区',
            },
            {
                authors:
                    'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li, Zhonghua Gou',
                title: 'Pathways for Reducing Carbon Emission in County-Level Transportation: A Life Cycle Perspective and Multi-Scenario Analysis',
                venue: 'Energy Strategy Reviews, Vol. 58, 101678',
                year: '2025.3',
                url: 'https://doi.org/10.1016/j.esr.2025.101678',
                tier: 'JCR Q1 · 中科院二区',
            },
            {
                authors: 'Shengyuan Li, Zhonghua Gou',
                title: 'Energy efficiency and cost benefits of office-to-residential building transformation: Insights from Los Angeles',
                venue: 'Journal of Building Engineering, Vol. 98, 111496',
                year: '2024.12',
                url: 'https://doi.org/10.1016/j.jobe.2024.111496',
                tier: 'JCR Q1 · 中科院二区 Top',
                pinned: true,
            },
            {
                authors:
                    'Xiaohuan Xie, Haifeng Deng, Shengyuan Li, Zhonghua Gou',
                title: 'Optimizing Land Use for Carbon Neutrality: Integrating Photovoltaic Development in Lingbao, Henan Province',
                venue: 'Land, Vol. 13(1), 97',
                year: '2024.1',
                url: 'https://doi.org/10.3390/land13010097',
                tier: 'JCR Q2 · 中科院三区',
            },
            {
                authors: 'Shengyuan Li, Zhonghua Gou',
                title: 'Accepting Solar Photovoltaic Panels in Rural Landscapes: The Tangle among Nostalgia, Morality, and Economic Stakes',
                venue: 'Land, Vol. 12(10), 1956',
                year: '2023.10',
                url: 'https://doi.org/10.3390/land12101956',
                tier: 'JCR Q2 · 中科院三区',
                pinned: true,
            },
        ],
        grants: [],
        conferences: [
            {
                authors: 'Xiaohuan Xie, Qiting Lin, Shengyuan Li',
                title: 'Dynamic Coupling and Coordinated Assessment of Urban Production-Living-Ecology System Using System Dynamics Model: A Case Study of Lingbao',
                venue: '18th IACP Conference, Hangzhou, China',
                year: '2024.7',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li',
                title: 'Scenario Simulation of County-Level Transportation Energy Carbon Emissions in Huadu District, Guangzhou: A Life-Cycle Perspective',
                venue: '2024 International Conference on Energy, Materials and Management Science, Chengdu, China',
                year: '2024.3',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Shengyuan Li',
                title: 'Explore the county transportation energy decarbonization path with a simplified full life cycle assessment linked LEAP model',
                venue: '18th IACP Conference, Hangzhou, China',
                year: '2024.7',
            },
            {
                authors: '邓海峰, 李盛园, 谢晓欢',
                title: '碳中和背景下粮食主产区土地利用多情景模拟与碳储量分析',
                venue: '中国地理学会自然地理学专业委员会 2024 年学术年会, 广东梅州',
                year: '2024.6',
                pinned: true,
            },
            {
                authors: '滕腾, 邓海峰, 李盛园, 谢晓欢',
                title: '城乡融合发展背景下城乡结合区典型县域土地利用多情景模拟与评价',
                venue: '中国地理学大会, 江苏南京',
                year: '2024.9',
            },
        ],
    },
    workExperience: {
        positions: [
            {
                company:
                    '宇生月伴(杭州)智能科技有限公司(种子轮，Voice Agent 赛道)',
                role: 'C端 Voice Agent 业务线产品负责人',
                duration: '2025.7 - 至今',
                description: (
                    <>
                        产品线负责人，负责业务线产品规划、需求定义、产品设计、团队协作与迭代落地。全栈
                        Builder，使用 Claude Code、Codex、Antigravity 等 Agent
                        CLI，独立进行 Demo
                        开发，先上线验证后进入开发，快速迭代产品。深度调研，通过用户访谈、竞品调研、行业调研，深度了解语音赛道与用户需求
                        gap。负责从
                        PRD、路线图、版本排期、需求优先级到上线验收的完整推进。评测，负责产品评测(知识库、教育、语音
                        AI
                        输入法)与模型评测(LLM、ASR、TTS、端到端对话大模型)。围绕激活、使用深度、完成率、复用与付费转化漏斗持续追踪产品健康度。
                    </>
                ),
                descriptionSegments: [
                    {
                        title: '产品线负责人',
                        content:
                            '负责业务线产品规划、需求定义、产品设计、团队协作与迭代落地。',
                    },
                    {
                        title: '复杂项目管理',
                        content:
                            '负责 Voice Agent 业务线从 PRD、路线图、版本排期、需求优先级到上线验收的完整推进，协同模型、算法、前后端与客户端团队，将模型评测结果、用户反馈和业务指标转化为版本迭代决策。',
                    },
                    {
                        title: '全栈 Builder',
                        content:
                            '使用 Claude Code、Codex、Antigravity 等 Agent CLI，独立进行 Demo 开发，先上线验证后进入开发，快速迭代产品。',
                    },
                    {
                        title: '深度调研',
                        content:
                            '通过用户访谈、竞品调研、行业调研，深度了解语音赛道与用户需求 gap。',
                    },
                    {
                        title: 'C 端体验设计',
                        content:
                            '围绕 Voice Agent 与语音输入场景，优化 onboarding、首轮体验、空状态引导、输入成本、失败提示、结果可解释性与会员转化路径，降低用户从打开产品到完成首次有效输出的使用成本。',
                    },
                    {
                        title: '模型边界产品化',
                        content:
                            '针对幻觉、召回不足、延迟、成本、上下文长度、ASR 识别错误、TTS 表达质量与端到端对话稳定性，设计评测集、兜底策略、产品限制与功能形态，把 AI 能力边界转化为可交付的产品方案。',
                    },
                    {
                        title: '评测',
                        content:
                            '负责产品评测(知识库、教育、语音 AI 输入法)与模型评测(LLM、ASR、TTS、端到端对话大模型)。',
                    },
                    {
                        title: '指标体系',
                        content:
                            '围绕激活率、使用频次/会话深度、完成率、复用、订阅转化漏斗与年付占比建立追踪口径；截至 2026.05.23，SaySo 累计 444,694 次语音/Agent 交互，Speaker activation 90.4%，整体完成率 93.3%。',
                    },
                    {
                        title: '增长闭环',
                        content:
                            '通过数据埋点、用户反馈、版本复盘与转化漏斗分析，持续定位激活流失点、低频使用原因与会员转化阻塞点，并将结论回流到 onboarding、功能入口、默认示例、会员权益表达和高频场景优化中。',
                    },
                    {
                        title: '竞品分析',
                        content:
                            '深入比较 NotebookLM、ima.copilot、飞书知识问答等 AI 知识库功能差异。',
                    },
                    {
                        title: '案例评测',
                        content: '构建 1000+ 评测案例集。',
                    },
                    {
                        title: '产品设计',
                        content: '提出沉浸式播客 AI 方向。',
                    },
                ],
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'RAG', icon: 'llm' },
                    { name: 'Agent', icon: 'gear' },
                    { name: 'Product', icon: 'gear' },
                    { name: 'UX', icon: 'gear' },
                    { name: 'Growth', icon: 'gear' },
                    { name: 'Metrics', icon: 'gear' },
                    { name: 'Evaluation', icon: 'gear' },
                    { name: 'Coze', icon: 'gear' },
                    { name: 'Claude Code', icon: 'llm' },
                    { name: 'Codex', icon: 'llm' },
                    { name: 'Antigravity', icon: 'gear' },
                ],
            },
        ],
    },
}

const EN_DATE_LABELS: Record<string, string> = {
    '2023.10': 'Oct 2023',
    '2024.1': 'Jan 2024',
    '2024.3': 'Mar 2024',
    '2024.7': 'Jul 2024',
    '2024.12': 'Dec 2024',
    '2025.3': 'Mar 2025',
    '2025.5': 'May 2025',
    录用: 'Accepted',
}

const toEnglishDateLabel = (value: string) => EN_DATE_LABELS[value] ?? value

const EN_TIER_LABELS: Record<string, string> = {
    中科院一区: 'CAS Q1',
    中科院二区: 'CAS Q2',
    中科院三区: 'CAS Q3',
    北大核心: 'PKU Core',
    中文期刊: 'Chinese Journal',
}

const toEnglishTierLabel = (tier: string) =>
    Object.entries(EN_TIER_LABELS).reduce(
        (label, [zh, en]) => label.replaceAll(zh, en),
        tier,
    )

export const CONFIG_EN: Config = {
    ...CONFIG,
    name: 'Chauncey Lee',
    title: 'AI Product Lead / Applied AI Builder',
    contactMethods: [
        {
            label: 'China Email',
            value: 'dy0509@foxmail.com',
            href: 'mailto:dy0509@foxmail.com',
            icon: 'email',
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
    ],
    research: {
        publications:
            CONFIG.research?.publications?.map((publication) => ({
                ...publication,
                authors: publication.authors.replaceAll(
                    '李盛园',
                    'Shengyuan Li',
                ),
                year: toEnglishDateLabel(publication.year),
                tier: toEnglishTierLabel(publication.tier),
            })) ?? [],
        grants: [],
        conferences: [
            ...(CONFIG.research?.conferences ?? [])
                .slice(0, 3)
                .map((conference) => ({
                    ...conference,
                    authors: conference.authors.replaceAll(
                        '李盛园',
                        'Shengyuan Li',
                    ),
                    year: toEnglishDateLabel(conference.year),
                })),
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
                    'Yusheng Yueban (Hangzhou) Intelligent Technology Co., Ltd. (Seed Round, Voice Agent Track)',
                role: 'Consumer Voice Agent Product Lead',
                duration: 'Jul 2025 - Present',
                description: (
                    <>
                        As product-line lead, owned business-line planning,
                        requirement definition, product design, team
                        collaboration, and iteration delivery. As a full-stack
                        builder, used Claude Code, Codex, Antigravity, and other
                        agent CLIs to independently develop demos, launch first
                        for validation before formal development, and iterate
                        products quickly. Conducted deep research through user
                        interviews, competitive research, and industry research
                        to understand the voice-agent market and user-demand
                        gaps. Led evaluation across products (knowledge bases,
                        education, and voice AI input methods) and models (LLM,
                        ASR, TTS, and end-to-end conversational large models).
                        Owned the full delivery loop from PRD, roadmap, version
                        schedule, and requirement priority to launch acceptance,
                        while tracking activation, usage depth, completion,
                        reuse, and paid-conversion funnels.
                    </>
                ),
                descriptionSegments: [
                    {
                        title: 'Product-line Lead',
                        content:
                            'Owned business-line planning, requirement definition, product design, team collaboration, and iteration delivery.',
                    },
                    {
                        title: 'Complex Project Management',
                        content:
                            'Owned the Voice Agent product line from PRD, roadmap, version scheduling, and requirement prioritization to launch acceptance, coordinating model, algorithm, frontend, backend, and client teams to turn evaluation results, user feedback, and business metrics into iteration decisions.',
                    },
                    {
                        title: 'Full-stack Builder',
                        content:
                            'Used Claude Code, Codex, Antigravity, and other agent CLIs to independently develop demos, launch first for validation before formal development, and iterate products quickly.',
                    },
                    {
                        title: 'Deep Research',
                        content:
                            'Conducted user interviews, competitive research, and industry research to understand the voice-agent market and user-demand gaps.',
                    },
                    {
                        title: 'Consumer Experience Design',
                        content:
                            'Optimized onboarding, first-run experience, empty-state guidance, input cost, failure prompts, result explainability, and membership conversion paths for Voice Agent and voice-input scenarios, reducing the user cost from opening the product to completing the first valid output.',
                    },
                    {
                        title: 'Productizing Model Boundaries',
                        content:
                            'Designed evaluation sets, fallback strategies, product constraints, and feature forms around hallucination, recall gaps, latency, cost, context-length limits, ASR recognition errors, TTS quality, and end-to-end conversation stability.',
                    },
                    {
                        title: 'Evaluation',
                        content:
                            'Led evaluation across products (knowledge bases, education, and voice AI input methods) and models (LLM, ASR, TTS, and end-to-end conversational large models).',
                    },
                    {
                        title: 'Metric System',
                        content:
                            'Tracked activation rate, usage frequency/session depth, completion rate, reuse, subscription conversion funnel, and annual-plan share; as of 2026.05.23, SaySo had 444,694 voice/agent interactions, 90.4% speaker activation, and a 93.3% completion rate.',
                    },
                    {
                        title: 'Growth Loop',
                        content:
                            'Used event instrumentation, user feedback, version retrospectives, and conversion-funnel analysis to locate activation drop-offs, low-frequency usage causes, and membership-conversion blockers, then fed findings back into onboarding, feature entry points, default examples, membership value communication, and high-frequency scenario optimization.',
                    },
                    {
                        title: 'Competitive Analysis',
                        content:
                            'Compared NotebookLM, ima.copilot, and Feishu Knowledge Q&A.',
                    },
                    {
                        title: 'Case Evaluation',
                        content: 'Built a 1,000+ case evaluation set.',
                    },
                    {
                        title: 'Product Design',
                        content:
                            'Proposed an immersive podcast AI product direction.',
                    },
                ],
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'RAG', icon: 'llm' },
                    { name: 'Agent', icon: 'gear' },
                    { name: 'Product', icon: 'gear' },
                    { name: 'UX', icon: 'gear' },
                    { name: 'Growth', icon: 'gear' },
                    { name: 'Metrics', icon: 'gear' },
                    { name: 'Evaluation', icon: 'gear' },
                    { name: 'Coze', icon: 'gear' },
                    { name: 'Claude Code', icon: 'llm' },
                    { name: 'Codex', icon: 'llm' },
                    { name: 'Antigravity', icon: 'gear' },
                ],
            },
        ],
    },
}

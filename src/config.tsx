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
    description: string | JSX.Element
    descriptionRaw: string
    projects: {
        name: string
        icon?: keyof typeof Icons
        image?: string
        description: string
        url: string
        tags: {
            name: string
            icon: keyof typeof Icons
        }[]
        github?: string
        featured: boolean
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
    research?: {
        publications?: {
            authors: string
            title: string
            venue: string
            year: string
            url: string
            tier: string
        }[]
        conferences?: {
            authors: string
            title: string
            venue: string
            year: string
            url?: string
        }[]
        grants?: {
            name: string
            funding: string
            duration: string
            overview: string
            role: string
            outcomes: string
        }[]
    }
}

// NOTE: Avatar, siteUrl, and socials URLs below are placeholders.
// Replace with real values before publishing.
export const CONFIG: Config = {
    name: '李盛园',
    avatar: '/images/headshot.jpg',
    title: 'AI Product Manager',
    siteUrl: 'https://example.com/', // placeholder — replace with real domain
    socials: [
        // GitHub is real; LinkedIn/Email still placeholders.
        {
            name: 'GitHub',
            url: 'https://github.com/dy9759',
            icon: 'github',
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/',
            icon: 'linkedin',
        },
        {
            name: 'Email',
            url: 'mailto:placeholder@example.com',
            icon: 'email',
        },
    ],
    description: (
        <>
            👋 你好!我是李盛园,一名 AI 产品经理,拥有 3+ 年 AI 产品研发与落地经验。
            武汉大学建筑智慧能源方向硕士(GPA Top 5%),本科毕业于浙大宁波理工学院建筑学。
            熟悉大模型本地部署、RAG、Agent、模型微调等技术方案,在建筑、能源、电商等领域有产品经验。
            发表 SCI 期刊论文 5 篇,担任 TOP 期刊审稿人。欢迎交流合作!
        </>
    ),
    descriptionRaw:
        "Hi, I'm Shengyuan Li. AI Product Manager with 3+ years of experience in LLM deployment, RAG, Agent workflows, and model fine-tuning. M.S. in Smart Energy from Wuhan University, B.S. in Architecture. Published 5 SCI papers.",
    projects: [
        {
            name: '沉浸式播客 AI 产品',
            description:
                'C 端产品设计。针对信息过载与碎片焦虑,用多 Agent 重构内容消费链路,支持围绕任意链接/文档进行多视角播客式讨论。',
            url: 'https://example.com/project-podcast',
            tags: [
                { name: 'Coze', icon: 'gear' },
                { name: 'Multi-Agent', icon: 'llm' },
                { name: 'Evaluation', icon: 'gear' },
            ],
            featured: true,
        },
        {
            name: '智能问答 AI 行业知识库',
            description:
                'B 端产品研发。Llama 3.2 LoRA 微调 + Python 本地部署 RAG + Coze Agent 自动更新,显著提升团队知识检索效率。',
            url: 'https://example.com/project-kb',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'RAG', icon: 'llm' },
                { name: 'Llama 3.2', icon: 'llm' },
                { name: 'Coze', icon: 'gear' },
            ],
            featured: true,
        },
        {
            name: '新能源 + 负荷侧能源管理 AI',
            description:
                'B 端产品研发。GCN-LSTM 时空预测出力 + Q-learning 控制负荷,绿电消纳能力 +50%,负荷侧能耗 -15%。',
            url: 'https://example.com/project-energy',
            tags: [
                { name: 'Python', icon: 'python' },
                { name: 'GCN-LSTM', icon: 'gear' },
                { name: 'DRL', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: '光伏产品需求分析 AI',
            description:
                'C 端功能研发。YOLOv8 迁移学习 + SAM 半自动标注识别屋顶容量 (准确率 92%),Agent + SD 批量生成效果图,勘察时效 3h → 5min。',
            url: 'https://example.com/project-pv',
            tags: [
                { name: 'YOLOv8', icon: 'gear' },
                { name: 'SAM', icon: 'gear' },
                { name: 'Stable Diffusion', icon: 'openai' },
                { name: 'Agent', icon: 'llm' },
            ],
            featured: false,
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
            },
            {
                authors: 'Xiaohuan Xie, Ruobing Wang, Zhonghua Gou',
                title: 'Changes in park visits and the shift towards rural recreation: Evidence from the COVID-19 pandemic in the UK',
                venue: 'Journal of Rural Studies, Vol. 106, 103221',
                year: '2024',
                url: 'https://doi.org/10.1016/j.jrurstud.2024.103221',
                tier: 'JCR Q1 · 中科院一区',
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
                role: 'Product Lead — Sayso',
                duration: 'Jul 2025 – Present',
                description: (
                    <>
                        负责 Sayso 产品全流程:需求定义、产品设计、团队协作与迭代落地。
                    </>
                ),
                tags: [
                    { name: 'LLM', icon: 'llm' },
                    { name: 'Agent', icon: 'gear' },
                    { name: 'Product', icon: 'gear' },
                ],
            },
            {
                company: '北京智能问问科技(AI 初创)',
                role: 'AI Product Manager — Intern',
                duration: 'May 2025 – Jul 2025',
                description: (
                    <>
                        竞品分析(NotebookLM / ima.copilot / 飞书知识问答),构建 1000+ 评测案例集,产品设计提出沉浸式播客 AI 方向。
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
                role: 'AI Product R&D — Part-time',
                duration: 'Jan 2023 – Jun 2025',
                description: (
                    <>
                        光伏识别业务 +20 倍范围,GCN-LSTM + DRL 绿电消纳 +50%,本地 RAG 知识库自动更新。
                    </>
                ),
                tags: [
                    { name: 'Python', icon: 'python' },
                    { name: 'LLM', icon: 'llm' },
                    { name: 'YOLOv8', icon: 'gear' },
                    { name: 'DRL', icon: 'gear' },
                ],
            },
            {
                company: '上海几凡设计教育(杭州校区)',
                role: 'Product Manager — Founder',
                duration: 'Jun 2020 – Aug 2022',
                description: (
                    <>
                        基于聚类 + 回归分析用户画像,用户增长 +30%、营收 +20%;设计精品小班产品,差评退课率 -15%。
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

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
}

// NOTE: Avatar, siteUrl, and socials URLs below are placeholders.
// Replace with real values before publishing.
export const CONFIG: Config = {
    name: '李盛园',
    avatar: '/images/headshot.png', // placeholder — replace with real photo
    title: 'AI Product Manager',
    siteUrl: 'https://example.com/', // placeholder — replace with real domain
    socials: [
        // All social URLs below are placeholders.
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
    workExperience: {
        positions: [
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

import { Icons } from '@/components/icons'
import type { SegmentListItem } from '@/components/segment-list'

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
    aboutSegments?: SegmentListItem[]
    projects: {
        name: string
        icon?: keyof typeof Icons
        image?: string
        duration?: string
        description: string
        descriptionSegments?: {
            title: string
            content: string
        }[]
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
        descriptionSegments?: {
            title: string
            content: string
        }[]
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
    title: 'AI Product Manager & Agent Builder',
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
            👋 你好!我是李盛园,一名 AI Product Manager & Agent
            Builder,核心优势是把大模型能力落到真实业务场景中:长期拆解
            DeepSeek、ChatGPT、Claude、Gemini、豆包、Kimi、通义等国内外 AI
            产品与 Agent 工具,理解模型能力边界、交互成本与用户使用门槛;负责
            SaySo / Voice Agent 等 C 端 AI
            产品,覆盖语音输入、会议、个人办公提效与语音助理场景;具备技术型 PM
            能力,能与模型、算法和研发团队协同,通过评测、Demo
            验证、兜底策略和指标体系推动产品上线与迭代。
        </>
    ),
    descriptionRaw:
        "Hi, I'm Chauncey Lee, an AI Product Manager & Agent Builder focused on turning large-model capabilities into real business scenarios: I actively dissect DeepSeek, ChatGPT, Claude, Gemini, Doubao, Kimi, Tongyi/Qwen, and other AI/Agent products to understand model boundaries, interaction cost, and user adoption barriers; I lead consumer AI products such as SaySo and Voice Agent across voice input, meetings, personal productivity, and voice-assistant scenarios; and I work as a technical PM with model, algorithm, and engineering teams, using evaluation, demo validation, fallback strategy, and metric systems to ship and iterate AI products.",
    aboutSegments: [
        {
            title: 'AI 产品深度用户 / 场景拆解',
            content:
                '长期高频使用 DeepSeek、ChatGPT、Claude、Gemini、豆包、Kimi、通义等大模型与 Agent 产品，重点拆解语音输入、会议纪要、知识库问答、个人办公提效、Agent 工作流等真实业务场景，判断模型能力边界、交互成本、结果质量与用户使用门槛。',
        },
        {
            title: 'C 端 AI 产品落地 / Voice Agent 场景',
            content:
                '负责 SaySo 语音输入 AI 工具与 Voice Agent 业务线，覆盖输入法、会议、个人语音助理、个人办公提效等 C 端场景，从用户需求洞察、onboarding、首轮体验、核心行为定义到 MVP 验证、激活、复用与会员转化，推动 AI 能力变成可被用户高频使用的产品功能。',
        },
        {
            title: '技术型 PM / 模型能力产品化',
            content:
                '能与模型、算法、前端、后端和客户端协同，围绕 LLM、RAG、Agent、ASR/TTS、端到端语音对话等能力设计评测集、兜底策略、产品限制与 Demo 验证流程；在知识库、教育、语音输入、科研建模、能源与地理信息模拟等场景中，把模型幻觉、召回、延迟、成本、上下文长度和语音识别错误转化为具体产品方案。',
        },
        {
            title: 'C 端体验与 AI 产品化',
            content:
                '关注用户首次体验、输入成本、失败兜底、结果可解释性与会员转化路径，能把模型幻觉、召回、延迟、成本、上下文长度、ASR/TTS 错误等能力边界转化为评测体系、交互限制、兜底策略与可上线功能。',
        },
    ],
    projects: [
        {
            name: 'SaySo 语音输入AI工具',
            duration: '2025.10 - 至今',
            description:
                '负责 SaySo 语音输入 AI 工具,覆盖输入法、会议、个人语音助理与个人办公提效场景。负责 PRD、路线图、版本排期、跨模型/算法/研发协同与上线验收;围绕 onboarding、首轮语音输入、失败兜底、结果编辑和会员转化降低使用成本。基于 DB 截至 2026.05.23 的数据,建立激活、使用深度、完成率、复用与订阅转化等核心指标追踪:Speaker activation 90.4%,累计 444,694 次语音/Agent 交互,整体完成率 93.3%;国内付费仍早期,但年付订单占 58.6%,贡献国内成功付费收入 90.9%。',
            descriptionSegments: [
                {
                    title: '产品范围',
                    content:
                        '负责 SaySo 语音输入 AI 工具，覆盖输入法、会议、个人语音助理与个人办公提效场景。',
                },
                {
                    title: '版本规划与需求管理',
                    content:
                        '负责 SaySo 语音输入 AI 工具的 PRD、产品路线图、版本排期与需求优先级管理，围绕输入法、会议、个人语音助理与办公提效场景拆解需求，明确每个版本的目标指标、验收标准与上线范围。',
                },
                {
                    title: '跨团队协同',
                    content:
                        '协同模型、算法、前端、后端与客户端开发推进功能落地，将用户需求、模型能力边界与工程实现约束转化为可执行任务，包括接口方案、数据埋点、评测口径、交互状态、异常兜底与发布验收。',
                },
                {
                    title: '上线与迭代机制',
                    content:
                        '通过 Demo 验证、灰度发布、线上数据跟踪、用户反馈收集与版本复盘推进快速迭代；针对 ASR/TTS/LLM 效果波动、延迟、成本、召回与稳定性风险，提前设计降级策略、失败提示与人工可编辑路径。',
                },
                {
                    title: '体验降本',
                    content:
                        '围绕语音输入的低门槛使用链路，设计首轮引导、快捷输入、失败重试、结果编辑、空状态示例与会员转化触点，核心关注 Time-to-first-output、首次语音成功率、激活率、使用频次与订阅转化漏斗。',
                },
                {
                    title: 'AI 能力边界转功能',
                    content:
                        '基于 LLM、ASR、TTS 与端到端语音模型评测结果，将幻觉、召回、延迟、上下文长度、识别错误和对话稳定性问题转化为产品策略，包括任务边界提示、结果可解释化、失败兜底、人工可编辑、模型降级与场景化功能限制。',
                },
                {
                    title: '指标体系',
                    content:
                        '围绕激活率、交互次数、音频时长、完成率、复用、订阅转化漏斗与年付占比建立追踪口径，基于 DB 数据持续判断产品健康度。',
                },
                {
                    title: '核心行为与新用户激活',
                    content:
                        '定义 SaySo 的核心行为为“完成一次有效语音 / Agent 交互”，围绕 onboarding、首轮语音输入、示例任务、失败重试与结果编辑降低首次使用成本；截至 2026.05.23，2,657 名非删除用户中 2,402 人完成至少一次交互，Speaker activation 达 90.4%，最近 30 天新用户激活率 87.5%。',
                },
                {
                    title: '使用深度与粘性提升',
                    content:
                        '围绕使用频次、会话深度、复访天数、10 次以上交互、100 次以上交互等指标跟踪用户粘性；累计 444,694 次语音 / Agent 交互，人均 speaker 185.1 次交互，59.7% 的 speaker 使用超过 2 天，78.3% 有 10 次以上交互，24.9% 有 100 次以上交互。',
                },
                {
                    title: '会员转化与用户分层运营',
                    content:
                        '搭建从新用户、激活用户、高频用户、试用用户到付费用户的转化漏斗，结合使用深度、场景偏好与付费意愿进行用户分层；国内成功付费订单中年付占 58.6%，年付贡献国内成功付费收入 90.9%，说明当前商业化仍早期，但高意向用户具备较强年付偏好。',
                },
            ],
            url: '',
            links: [
                { label: '国内版', url: 'https://sayso.cn/' },
                { label: '国际版', url: 'https://sayso.ai/' },
            ],
            tags: [
                { name: 'ToC', icon: 'gear' },
                { name: 'Product', icon: 'gear' },
                { name: 'UX', icon: 'gear' },
                { name: 'Growth', icon: 'gear' },
                { name: 'Metrics', icon: 'gear' },
                { name: 'AI Assistant', icon: 'llm' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'Sayso Team',
            duration: '2026.3 - 至今',
            description:
                '负责 Sayso Team,面向 A2A 协作与团队提效场景,一人 solo builder 推进产品构建。',
            descriptionSegments: [
                {
                    title: '项目定位',
                    content: '面向 A2A 协作与团队提效场景。',
                },
                {
                    title: '建设方式',
                    content:
                        '负责 Sayso Team 产品构建，一人 solo builder 推进从需求到交付。',
                },
            ],
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
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        'Chrome 浏览器插件，用于记录 AI 对话、网页高亮、停留阅读与浏览历史等注意力信号。',
                },
                {
                    title: '功能产出',
                    content:
                        '通过 LLM 生成周报、主题复盘与心理洞察，帮助突破信息茧房。',
                },
            ],
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
            duration: '2026.10 - 至今',
            description: '负责 LLM、TTS、ASR 与端到端语音模型评测平台建设。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        '负责 LLM、TTS、ASR 与端到端语音模型评测平台建设。',
                },
                {
                    title: '评测对象',
                    content:
                        '覆盖文本大模型、语音识别、语音合成与端到端语音对话模型。',
                },
            ],
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
            duration: '2026.9 - 至今',
            description: '参与 ToB 产品 VuiLabs 官网建设。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content: '参与 ToB 产品 VuiLabs 官网建设。',
                },
                {
                    title: '产品表达',
                    content:
                        '围绕 ToB 产品定位、官网信息架构与转化路径进行内容和页面建设。',
                },
            ],
            url: '',
            tags: [
                { name: 'ToB', icon: 'gear' },
                { name: 'Website', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Sayso 数据 Agent',
            duration: '2026.4',
            description:
                '负责内部数据 Agent 工具,通过 MCP 调用替代传统数据看板开发。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content: '负责内部数据 Agent 工具建设。',
                },
                {
                    title: '技术实现',
                    content:
                        '通过 MCP 调用替代传统数据看板开发，提升内部数据查询和分析效率。',
                },
            ],
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
            duration: '2025.8 - 2025.9',
            description: '负责小红书新号内容创作与冷启动,一个月涨粉 1000+。',
            descriptionSegments: [
                {
                    title: '增长目标',
                    content: '负责小红书新号内容创作与冷启动。',
                },
                {
                    title: '结果验证',
                    content: '一个月涨粉 1000+。',
                },
            ],
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
            duration: '2025.6',
            description:
                'C 端产品设计。针对信息过载、碎片焦虑与信息留存率不足,定义“沉浸式播客 + 记忆强化 + 视角拓展”的内容消费链路。通过 Coze 实现多 Agent 角色讨论 MVP,支持围绕任意链接/文档进行多视角播客式讨论;评测发现法律、数学格式等内容召回缺陷,为后续微调提供优化建议。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        '针对信息过载、碎片焦虑与信息留存率不足的背景，设计 C 端沉浸式播客 AI 产品。',
                },
                {
                    title: '产品定义',
                    content:
                        '定义“沉浸式播客 + 记忆强化 + 视角拓展”的内容消费链路。',
                },
                {
                    title: '功能验证',
                    content:
                        '通过 Coze 实现多 Agent 角色讨论 MVP，支持围绕任意链接/文档进行多视角播客式讨论。',
                },
                {
                    title: '模型评测',
                    content:
                        '评测发现法律、数学格式等内容召回缺陷，为后续微调提供优化建议。',
                },
            ],
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
            duration: '2025.3',
            description:
                'B 端产品研发。面向企业内部知识检索与数据隐私需求,使用 100K 高质量行业数据在 Colab 上对 Llama 3.2 进行 LoRA 监督微调,通过 TrainingArguments 等参数压缩至本地部署规模。使用 Python 构建本地 RAG MVP 并进行回答准确性与召回评测;通过 Coze 验证 Agent workflow,实现无人值守、自动更新的 AI 问答知识库。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        '面向企业内部知识检索与数据隐私需求，建设 B 端智能问答 AI 行业知识库。',
                },
                {
                    title: 'LLM 大模型微调',
                    content:
                        '使用 100K 高质量行业数据在 Colab 上对 Llama 3.2 进行 LoRA 监督微调，并通过 TrainingArguments 等参数压缩至本地部署规模。',
                },
                {
                    title: 'AI 知识库部署',
                    content:
                        '使用 Python 构建本地 RAG MVP，并进行回答准确性与召回评测。',
                },
                {
                    title: 'Agent 智能更新',
                    content:
                        '通过 Coze 验证 Agent workflow，实现无人值守、自动更新的 AI 问答知识库。',
                },
            ],
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
            name: '地理信息模拟器',
            description:
                'B 端项目经验。担任算法负责人,整合传统地理空间模拟模型与机器学习算法,建设地理信息模拟器。模拟器支持 9 种情景选择与推演;在 SSP1 路径下,将三类发展方向与典型县域建立对应关系:绥德对应生态农业最优,灵宝对应科技农业最优,花都对应城乡融合发展最优,通过情景参数、约束规则与模型输出校准实现模拟对齐。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        'B 端地理信息模拟器项目，支持 9 种情景选择与推演。',
                },
                {
                    title: '算法职责',
                    content:
                        '担任算法负责人，整合传统地理空间模拟模型与机器学习算法。',
                },
                {
                    title: '情景模拟',
                    content:
                        '在 SSP1 路径下，将三类发展方向与典型县域建立对应关系。',
                },
                {
                    title: '结果映射',
                    content:
                        '绥德对应生态农业最优，灵宝对应科技农业最优，花都对应城乡融合发展最优，并通过情景参数、约束规则与模型输出校准实现模拟对齐。',
                },
            ],
            url: '',
            tags: [
                { name: 'B2B', icon: 'gear' },
                { name: 'GIS', icon: 'gear' },
                { name: 'Scenario Simulation', icon: 'gear' },
                { name: 'Machine Learning', icon: 'python' },
                { name: 'SSP1', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: '新能源 + 负荷侧能源管理 AI',
            duration: '2024.12',
            description:
                'B 端产品研发。面向虚拟电厂新能源出力与负荷侧预测偏差超过 30% 的问题,采用 GCN-LSTM 融合时空多维特征预测产品采用趋势与绿电波动,较 LSTM、XGBoost 等方法 MAE 降低 10%,绿电波动准确性提升 15%。基于全球室内外热数据集与 Q-learning 深度强化学习控制负荷侧能耗,负荷侧能耗 -15%,绿电消纳能力 +50%。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        '面向虚拟电厂能源管理平台，解决新能源出力与负荷侧预测偏差超过 30% 的问题。',
                },
                {
                    title: '产品增长预测',
                    content:
                        '采用 GCN-LSTM 融合时空多维特征预测产品采用趋势与绿电波动，较 LSTM、XGBoost 等方法 MAE 降低 10%，绿电波动准确性提升 15%。',
                },
                {
                    title: '深度控制策略',
                    content:
                        '基于全球室内外热数据集与 Q-learning 深度强化学习控制负荷侧能耗，负荷侧能耗 -15%，绿电消纳能力 +50%。',
                },
            ],
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
            duration: '2022.9',
            description:
                'C 端功能研发。面向海外屋顶光伏采购场景,用 YOLOv8 迁移学习 + 1w+ 人工标注样本校准的 SAM 半自动标注识别屋顶容量,覆盖 5 类光伏面板与 200+ 屋顶材质类别,材质识别准确率 92%,面积测量误差 <3%,勘察时效从 3 小时缩短至 5 分钟。通过 Agent workflow + Stable Diffusion 批量生成 20 种实景方案效果图,客户决策周期平均缩短 5 天,满意度提升 60%。',
            descriptionSegments: [
                {
                    title: '项目描述',
                    content:
                        '面向海外屋顶光伏采购场景，解决人工勘察耗时、容量识别与产品外观选型问题。',
                },
                {
                    title: '容量识别功能',
                    content:
                        '采用 YOLOv8 迁移学习 + 1w+ 人工标注样本校准的 SAM 半自动标注识别屋顶容量，覆盖 5 类光伏面板与 200+ 屋顶材质类别，材质识别准确率 92%，面积测量误差 <3%，勘察时效从 3 小时缩短至 5 分钟。',
                },
                {
                    title: '产品选型功能',
                    content:
                        '通过 Agent workflow + Stable Diffusion 批量生成 20 种实景方案效果图，客户决策周期平均缩短 5 天，满意度提升 60%。',
                },
            ],
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
            descriptionSegments: [
                {
                    title: '项目定位',
                    content: '个人开发 harness skill 与双 Agent 协作流程。',
                },
                {
                    title: '工作流编排',
                    content:
                        '编排 Claude Code 与 Codex 双 Agent 工作流，沉淀为可复用的开发协作流程。',
                },
            ],
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
            descriptionSegments: [
                {
                    title: '项目定位',
                    content: '灵动岛与 Notch Launcher 等 macOS 桌面交互实验。',
                },
                {
                    title: '体验探索',
                    content: '探索系统状态提示、快捷入口与浮层体验。',
                },
            ],
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
            descriptionSegments: [
                {
                    title: '项目定位',
                    content: '面向多人、多 Agent 的协作与调度平台。',
                },
                {
                    title: '能力探索',
                    content:
                        '探索 agent teams 的任务编排、运行控制与团队提效。',
                },
            ],
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
            descriptionSegments: [
                {
                    title: '项目定位',
                    content: '面向 TTS、ASR 与端到端语音模型的评测平台。',
                },
                {
                    title: '评测能力',
                    content: '用于标准化测试、结果对比与模型效果追踪。',
                },
            ],
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
            items: [
                '英语 CEFR-B2',
                '大学英语六级(CET-6)',
                '中国建筑协会会员',
                '中国能源研究会会员',
                'mindcode企图心俱乐部共创者',
            ],
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
                    'Xiaohuan Xie, Senhong Cai, Haifeng Deng, Chauncey Lee, Xin Liu, Zhonghua Gou',
                title: 'Optimizing county-level land use for sustainable photovoltaic development in China: A multi-scenario analysis',
                venue: 'Land Use Policy, Vol. 163, 107920',
                year: '2026',
                url: 'https://doi.org/10.1016/j.landusepol.2026.107920',
                tier: 'JCR Q1 · 中科院一区 Top',
            },
            {
                authors:
                    'Xiaohuan Xie, Qiting Lin, Chauncey Lee, Xin Liu, Zhonghua Gou',
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
                authors: 'Chen Yang, Chauncey Lee, Zhonghua Gou',
                title: 'Spatiotemporal prediction of urban building rooftop photovoltaic potential based on GCN-LSTM',
                venue: 'Energy and Buildings, Vol. 334, 115522',
                year: '2025.5',
                url: 'https://doi.org/10.1016/j.enbuild.2025.115522',
                tier: 'JCR Q1 · 中科院二区 Top',
            },
            {
                authors:
                    'Xiaohuan Xie, Yuelin Zhong, Chauncey Lee, Zhonghua Gou',
                title: 'Pathways for Reducing Carbon Emission in County-Level Transportation: A Life Cycle Perspective and Multi-Scenario Analysis',
                venue: 'Energy Strategy Reviews, Vol. 58, 101678',
                year: '2025.3',
                url: 'https://doi.org/10.1016/j.esr.2025.101678',
                tier: 'JCR Q1 · 中科院二区',
            },
            {
                authors: 'Chauncey Lee, Zhonghua Gou',
                title: 'Energy efficiency and cost benefits of office-to-residential building transformation: Insights from Los Angeles',
                venue: 'Journal of Building Engineering, Vol. 98, 111496',
                year: '2024.12',
                url: 'https://doi.org/10.1016/j.jobe.2024.111496',
                tier: 'JCR Q1 · 中科院二区 Top · First Author',
                pinned: true,
            },
            {
                authors:
                    'Xiaohuan Xie, Haifeng Deng, Chauncey Lee, Zhonghua Gou',
                title: 'Optimizing Land Use for Carbon Neutrality: Integrating Photovoltaic Development in Lingbao, Henan Province',
                venue: 'Land, Vol. 13(1), 97',
                year: '2024.1',
                url: 'https://doi.org/10.3390/land13010097',
                tier: 'JCR Q2 · 中科院三区',
            },
            {
                authors: 'Chauncey Lee, Zhonghua Gou',
                title: 'Accepting Solar Photovoltaic Panels in Rural Landscapes: The Tangle among Nostalgia, Morality, and Economic Stakes',
                venue: 'Land, Vol. 12(10), 1956',
                year: '2023.10',
                url: 'https://doi.org/10.3390/land12101956',
                tier: 'JCR Q2 · 中科院三区 · First Author',
                pinned: true,
            },
        ],
        grants: [
            {
                name: '乡村地域系统协同观测与转型机理及模拟',
                funding: '国家自然科学基金重大项目 (NSFC Major Program)',
                duration: '2023.1 - 至今',
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
                authors: 'Xiaohuan Xie, Qiting Lin, Chauncey Lee',
                title: 'Dynamic Coupling and Coordinated Assessment of Urban Production-Living-Ecology System Using System Dynamics Model: A Case Study of Lingbao',
                venue: '18th IACP Conference, Hangzhou, China',
                year: '2024.7',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Chauncey Lee',
                title: 'Scenario Simulation of County-Level Transportation Energy Carbon Emissions in Huadu District, Guangzhou: A Life-Cycle Perspective',
                venue: '2024 International Conference on Energy, Materials and Management Science, Chengdu, China',
                year: '2024.3',
            },
            {
                authors: 'Xiaohuan Xie, Yuelin Zhong, Chauncey Lee',
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
            {
                company: '武汉大学建筑智慧能源实验室(全球前 2%)',
                role: 'AI for Science 算法研发 & AI 产品研发',
                duration: '2022.9 - 2025.6',
                description: (
                    <>
                        使用 AI 与 GitHub Copilot
                        辅助科研建模、数据分析与论文写作,产出论文成果。实验室阶段
                        2023.1 - 2025.6,推动光伏识别业务 +20 倍范围,GCN-LSTM +
                        DRL 绿电消纳 +50%,本地 RAG 知识库自动更新。
                    </>
                ),
                descriptionSegments: [
                    {
                        title: '科研建模',
                        content:
                            '使用 AI 与 GitHub Copilot 辅助科研建模、数据分析与论文写作，产出论文成果。',
                    },
                    {
                        title: '业务需求',
                        content:
                            '实验室阶段 2023.1 - 2025.6，推动光伏识别业务 +20 倍范围。',
                    },
                    {
                        title: '功能研发',
                        content:
                            'GCN-LSTM + DRL 绿电消纳 +50%，本地 RAG 知识库自动更新。',
                    },
                ],
                tags: [
                    { name: 'AI for Science', icon: 'llm' },
                    { name: 'GitHub Copilot', icon: 'github' },
                    { name: 'Python', icon: 'python' },
                    { name: 'YOLOv8', icon: 'gear' },
                    { name: 'DRL', icon: 'gear' },
                ],
            },
            {
                company:
                    '上海几凡设计教育(杭州校区)，考研细分头部，新地区拓展从0到1',
                role: '联合创始人 / 增长与产品负责人',
                duration: '2020.6 - 2022.8',
                description: (
                    <>
                        基于聚类 + 回归分析用户画像,用户增长 +30%、营收
                        +20%;设计“线下集训 +
                        线上直播”形态的教育精品小班产品,差评退课率 -15%。
                    </>
                ),
                descriptionSegments: [
                    {
                        title: '解决方案',
                        content:
                            '基于聚类 + 回归分析用户画像，用户增长 +30%、营收 +20%。',
                    },
                    {
                        title: '产品设计',
                        content:
                            '设计“线下集训 + 线上直播”形态的教育精品小班产品，差评退课率 -15%。',
                    },
                ],
                tags: [
                    { name: 'Python', icon: 'python' },
                    { name: 'SQL', icon: 'sql' },
                ],
            },
        ],
    },
}

const EN_DATE_LABELS: Record<string, string> = {
    '2023.10': 'Oct 2023',
    '2024.1': 'Jan 2024',
    '2024.3': 'Mar 2024',
    '2024.6': 'Jun 2024',
    '2024.7': 'Jul 2024',
    '2024.9': 'Sep 2024',
    '2024.12': 'Dec 2024',
    '2025.3': 'Mar 2025',
    '2025.5': 'May 2025',
}

const toEnglishDateLabel = (value: string) => EN_DATE_LABELS[value] ?? value

export const CONFIG_EN: Config = {
    ...CONFIG,
    name: 'Chauncey Lee',
    title: 'AI Product Manager & Agent Builder',
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
            Hi, I&apos;m Chauncey Lee, an AI Product Manager & Agent Builder
            focused on turning large-model capabilities into real business
            scenarios. I actively dissect DeepSeek, ChatGPT, Claude, Gemini,
            Doubao, Kimi, Tongyi/Qwen, and other AI/Agent products to understand
            model boundaries, interaction cost, and user adoption barriers; I
            lead consumer AI products such as SaySo and Voice Agent across voice
            input, meetings, personal productivity, and voice-assistant
            scenarios; and I work as a technical PM with model, algorithm, and
            engineering teams, using evaluation, demo validation, fallback
            strategy, and metric systems to ship and iterate AI products.
        </>
    ),
    aboutSegments: [
        {
            title: 'AI Product Power User / Scenario Decomposition',
            content:
                'High-frequency user of DeepSeek, ChatGPT, Claude, Gemini, Doubao, Kimi, Tongyi/Qwen, and other AI/Agent products, with a focus on decomposing real scenarios such as voice input, meeting notes, knowledge-base Q&A, personal productivity, and agent workflows to judge model boundaries, interaction cost, output quality, and user adoption barriers.',
        },
        {
            title: 'Consumer AI Product Delivery / Voice Agent Scenarios',
            content:
                'Led the SaySo voice input AI tool and Voice Agent product line across input methods, meetings, personal voice assistant, and personal productivity scenarios, moving from user insight, onboarding, first-run experience, and core-action definition to MVP validation, activation, reuse, and membership conversion.',
        },
        {
            title: 'Technical PM / Productizing Model Capabilities',
            content:
                'Collaborates with model, algorithm, frontend, backend, and client teams to design evaluation sets, fallback strategies, product constraints, and demo-validation workflows around LLM, RAG, agents, ASR/TTS, and end-to-end voice conversation. Turns hallucination, recall gaps, latency, cost, context-length limits, and speech-recognition errors into concrete product decisions across knowledge-base, education, voice-input, research modeling, energy, and GIS simulation scenarios.',
        },
        {
            title: 'Consumer Experience & AI Productization',
            content:
                'Focuses on first-run experience, input cost, failure fallback, result explainability, and membership conversion paths, turning model boundaries such as hallucination, recall gaps, latency, cost, context length, and ASR/TTS errors into evaluation systems, interaction constraints, fallback strategies, and shippable features.',
        },
    ],
    projects: [
        {
            name: 'SaySo Voice Input AI Tool',
            duration: 'Oct 2025 - Present',
            description:
                'Led the SaySo voice input AI tool across input method, meetings, personal voice assistant, and productivity scenarios. Owned PRD, roadmap, version planning, cross-model/algorithm/engineering collaboration, and launch acceptance; reduced user cost through onboarding, first voice input, failure fallback, result editing, and membership conversion paths. Based on DB data as of 2026.05.23, tracked activation, depth, completion, reuse, and subscription conversion: 90.4% speaker activation, 444,694 voice/agent interactions, 93.3% completion rate, 58.6% CN annual-order share, and 90.9% CN revenue contribution from annual plans.',
            descriptionSegments: [
                {
                    title: 'Product Scope',
                    content:
                        'Led the SaySo voice input AI tool across input method, meetings, personal voice assistant, and personal productivity scenarios.',
                },
                {
                    title: 'Roadmap & Requirement Management',
                    content:
                        'Owned PRD, product roadmap, version schedule, and requirement prioritization for the SaySo voice input AI tool, decomposing input-method, meeting, personal voice assistant, and productivity scenarios into version goals, acceptance criteria, and launch scope.',
                },
                {
                    title: 'Cross-functional Collaboration',
                    content:
                        'Collaborated with model, algorithm, frontend, backend, and client teams to turn user needs, model boundaries, and engineering constraints into executable tasks covering API design, event instrumentation, evaluation criteria, interaction states, exception fallback, and release acceptance.',
                },
                {
                    title: 'Launch & Iteration Mechanism',
                    content:
                        'Used demo validation, staged rollout, online metric tracking, user feedback, and version retrospectives to drive fast iteration; designed degradation paths, failure prompts, and manual-edit flows for ASR/TTS/LLM quality fluctuation, latency, cost, recall, and stability risks.',
                },
                {
                    title: 'Experience Cost Reduction',
                    content:
                        'Designed first-run guidance, quick voice input, retry after failure, result editing, empty-state examples, and membership conversion touchpoints around a low-friction voice-input path, with attention to time-to-first-output, first voice success rate, activation, usage frequency, and subscription funnel.',
                },
                {
                    title: 'Turning AI Boundaries Into Features',
                    content:
                        'Based on LLM, ASR, TTS, and end-to-end voice-model evaluation, translated hallucination, recall gaps, latency, context limits, recognition errors, and conversation stability issues into product strategies such as task-boundary prompts, explainable outputs, fallback flows, manual editing, model downgrade, and scenario-specific feature constraints.',
                },
                {
                    title: 'Metric System',
                    content:
                        'Tracked activation rate, interaction volume, audio hours, completion rate, reuse, subscription funnel, and annual-plan share to judge product health from DB evidence.',
                },
                {
                    title: 'Core Action & New-user Activation',
                    content:
                        'Defined the core action as completing one effective voice/agent interaction, then lowered first-use cost through onboarding, first voice input, sample tasks, retry after failure, and result editing. As of 2026.05.23, 2,402 of 2,657 non-deleted users had completed at least one interaction, reaching 90.4% speaker activation; the latest 30-day new-user activation rate was 87.5%.',
                },
                {
                    title: 'Usage Depth & Stickiness',
                    content:
                        'Tracked stickiness through usage frequency, session depth, revisit days, 10+ interactions, and 100+ interactions. SaySo reached 444,694 voice/agent interactions, 185.1 interactions per speaker, 59.7% of speakers using it on more than 2 days, 78.3% with 10+ interactions, and 24.9% with 100+ interactions.',
                },
                {
                    title: 'Membership Conversion & User Segmentation',
                    content:
                        'Built a conversion funnel from new users to activated, high-frequency, trial, and paid users, segmenting by usage depth, scenario preference, and willingness to pay. CN annual orders accounted for 58.6% of successful paid orders and contributed 90.9% of CN successful paid revenue, showing early commercialization but strong annual-plan preference among high-intent users.',
                },
            ],
            url: '',
            links: [
                { label: 'China', url: 'https://sayso.cn/' },
                { label: 'Global', url: 'https://sayso.ai/' },
            ],
            tags: [
                { name: 'ToC', icon: 'gear' },
                { name: 'Product', icon: 'gear' },
                { name: 'UX', icon: 'gear' },
                { name: 'Growth', icon: 'gear' },
                { name: 'Metrics', icon: 'gear' },
                { name: 'AI Assistant', icon: 'llm' },
            ],
            featured: true,
            pinned: true,
        },
        {
            name: 'Sayso Team',
            duration: 'Mar 2026 - Present',
            description:
                'Led Sayso Team for A2A collaboration and team productivity, building the product as a solo builder.',
            descriptionSegments: [
                {
                    title: 'Project Positioning',
                    content:
                        'Focused on A2A collaboration and team productivity.',
                },
                {
                    title: 'Build Mode',
                    content:
                        'Built Sayso Team as a solo builder, driving the product from requirements to delivery.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Built a Chrome extension that records attention signals from AI conversations, highlights, reading dwell time, and browser history.',
                },
                {
                    title: 'Output',
                    content:
                        'Used LLMs to generate weekly reports, topic reviews, and psychology insights to break information bubbles.',
                },
            ],
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
            duration: 'Oct 2026 - Present',
            description:
                'Led the evaluation platform for LLM, TTS, ASR, and end-to-end voice models.',
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Led the evaluation platform for LLM, TTS, ASR, and end-to-end voice models.',
                },
                {
                    title: 'Evaluation Scope',
                    content:
                        'Covered text LLMs, speech recognition, speech synthesis, and end-to-end voice conversation models.',
                },
            ],
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
            duration: 'Sep 2026 - Present',
            description:
                'Contributed to the official website for VuiLabs, a ToB product.',
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Contributed to the official website for VuiLabs, a ToB product.',
                },
                {
                    title: 'Product Messaging',
                    content:
                        'Worked on ToB product positioning, website information architecture, and conversion-oriented content.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content: 'Built an internal data agent.',
                },
                {
                    title: 'Technical Implementation',
                    content:
                        'Used MCP calls to replace traditional data dashboard development and improve internal data query efficiency.',
                },
            ],
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
            duration: 'Aug 2025 - Sep 2025',
            description:
                'Led content creation and cold start for a new Xiaohongshu account, gaining 1,000+ followers in one month.',
            descriptionSegments: [
                {
                    title: 'Growth Goal',
                    content:
                        'Led content creation and cold start for a new Xiaohongshu account.',
                },
                {
                    title: 'Result',
                    content: 'Gained 1,000+ followers in one month.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Designed a consumer AI product for information overload, fragmented attention, and low information retention.',
                },
                {
                    title: 'Product Definition',
                    content:
                        'Defined a content loop around immersive podcasting, memory reinforcement, and perspective expansion.',
                },
                {
                    title: 'Functional Validation',
                    content:
                        'Built a Coze-based multi-agent MVP with role-based discussions around any link or document.',
                },
                {
                    title: 'Model Evaluation',
                    content:
                        'Evaluation surfaced recall issues in legal and math-format content, informing future fine-tuning.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Built a B2B intelligent Q&A product for internal knowledge retrieval and data privacy.',
                },
                {
                    title: 'LLM Fine-tuning',
                    content:
                        'Fine-tuned Llama 3.2 with LoRA on 100K high-quality industry samples in Colab and used TrainingArguments to reduce the model to a local-deployable scale.',
                },
                {
                    title: 'AI Knowledge Base Deployment',
                    content:
                        'Built a Python local RAG MVP with answer-accuracy and recall evaluation.',
                },
                {
                    title: 'Agent Auto-update',
                    content:
                        'Validated a Coze Agent workflow for unattended, auto-updating knowledge-base operations.',
                },
            ],
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
            name: 'Geographic Information Simulator',
            description:
                'B2B project experience. Served as algorithm lead, integrating conventional geospatial simulation models with machine-learning algorithms to build a geographic information simulator. The simulator supports nine scenario selections and simulation runs. Under the SSP1 pathway, it maps three development directions to representative counties: Suide as the ecological-agriculture optimum, Lingbao as the technology-agriculture optimum, and Huadu as the urban-rural integration optimum, implemented through scenario parameters, constraint rules, and model-output calibration.',
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'B2B geographic information simulator supporting nine scenario selections and simulation runs.',
                },
                {
                    title: 'Algorithm Role',
                    content:
                        'Served as algorithm lead, integrating conventional geospatial simulation models with machine-learning algorithms.',
                },
                {
                    title: 'Scenario Simulation',
                    content:
                        'Mapped three development directions to representative counties under the SSP1 pathway.',
                },
                {
                    title: 'Result Mapping',
                    content:
                        'Mapped Suide to the ecological-agriculture optimum, Lingbao to the technology-agriculture optimum, and Huadu to the urban-rural integration optimum through scenario parameters, constraint rules, and model-output calibration.',
                },
            ],
            url: '',
            tags: [
                { name: 'B2B', icon: 'gear' },
                { name: 'GIS', icon: 'gear' },
                { name: 'Scenario Simulation', icon: 'gear' },
                { name: 'Machine Learning', icon: 'python' },
                { name: 'SSP1', icon: 'gear' },
            ],
            featured: false,
        },
        {
            name: 'Renewable Energy + Demand-Side AI Management',
            duration: 'Dec 2024',
            description:
                'Developed a B2B energy AI product for virtual power plant scenarios where renewable output and demand-side forecasts can deviate by over 30%. Used GCN-LSTM with spatiotemporal features to predict adoption trends and green-power fluctuation, reducing MAE by 10% versus LSTM/XGBoost and improving fluctuation accuracy by 15%. Built Q-learning control on a global indoor/outdoor thermal dataset, reducing demand-side energy use by 15% and improving green electricity consumption by 50%.',
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Developed a B2B energy AI product for virtual power plant scenarios where renewable output and demand-side forecasts can deviate by over 30%.',
                },
                {
                    title: 'Product Growth Forecasting',
                    content:
                        'Used GCN-LSTM with spatiotemporal features to predict adoption trends and green-power fluctuation, reducing MAE by 10% versus LSTM/XGBoost and improving fluctuation accuracy by 15%.',
                },
                {
                    title: 'Deep Control Strategy',
                    content:
                        'Built Q-learning control on a global indoor/outdoor thermal dataset, reducing demand-side energy use by 15% and improving green electricity consumption by 50%.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Description',
                    content:
                        'Built a consumer-side PV feature for overseas rooftop solar purchasing, addressing manual survey time, rooftop capacity recognition, and product appearance selection.',
                },
                {
                    title: 'Capacity Recognition',
                    content:
                        'Used YOLOv8 transfer learning plus SAM semi-automatic annotation calibrated on 10K+ manually labeled samples to identify rooftop capacity across 5 PV panel categories and 200+ roof-material classes, reaching 92% material-recognition accuracy and <3% area-measurement error while reducing survey time from 3 hours to 5 minutes.',
                },
                {
                    title: 'Product Selection',
                    content:
                        'Used Agent workflow + Stable Diffusion to generate 20 real-scene renderings, shortening average customer decision cycles by 5 days and improving satisfaction by 60%.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Positioning',
                    content:
                        'Personal development harness skill for dual-agent collaboration.',
                },
                {
                    title: 'Workflow Orchestration',
                    content:
                        'Orchestrates Claude Code and Codex dual-agent workflows into reusable engineering collaboration routines.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Positioning',
                    content:
                        'macOS desktop interaction experiments around Dynamic Island and Notch Launcher.',
                },
                {
                    title: 'Experience Exploration',
                    content:
                        'Explores system status prompts, quick entry points, and floating UI experiences.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Positioning',
                    content:
                        'Collaboration and orchestration platform for multiple people and multiple agents.',
                },
                {
                    title: 'Capability Exploration',
                    content:
                        'Explores task routing, run control, and team productivity for agent teams.',
                },
            ],
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
            descriptionSegments: [
                {
                    title: 'Project Positioning',
                    content:
                        'Evaluation platform for TTS, ASR, and end-to-end voice models.',
                },
                {
                    title: 'Evaluation Capability',
                    content:
                        'Supports standardized tests, result comparison, and model quality tracking.',
                },
            ],
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
            duration: 'Sep 2022 - Jun 2025',
            details: 'GPA 90+/100 (Top 5%)',
        },
        {
            school: 'Zhejiang University NingboTech',
            degree: "Bachelor's Degree",
            field: 'Architecture',
            duration: 'Sep 2015 - Jun 2020',
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
                'College English Test Band 6 (CET-6)',
                'Member of China Architecture Association',
                'Member of China Energy Research Society',
                'MindCode Ambition Club Co-creator',
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
                authors: publication.authors.replaceAll(
                    '李盛园',
                    'Chauncey Lee',
                ),
                year: toEnglishDateLabel(publication.year),
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
                duration: 'Jan 2023 - Present',
                overview:
                    'Focused on rural territorial system transformation, carbon-reduction optimization for transportation and land use, integrated industrial-economic impact evaluation, and optimal regional development pathways.',
                role: 'Developed two research methodologies; provided technical guidance for a six-person data analysis team; supported proposal writing, project execution, and final delivery management.',
                outcomes:
                    'Completed 10 research-to-application outputs ahead of schedule; research outcomes were included as references for local government planning and improved regional sustainability capacity.',
                pinned: true,
            },
        ],
        conferences: [
            ...(CONFIG.research?.conferences ?? [])
                .slice(0, 3)
                .map((conference) => ({
                    ...conference,
                    authors: conference.authors.replaceAll(
                        '李盛园',
                        'Chauncey Lee',
                    ),
                    year: toEnglishDateLabel(conference.year),
                })),
            {
                authors: 'Haifeng Deng, Chauncey Lee, Xiaohuan Xie',
                title: 'Multi-Scenario Land Use Simulation and Carbon Storage Analysis in Major Grain-Producing Areas under Carbon Neutrality',
                venue: '2024 Annual Meeting of the Geographical Society of China Physical Geography Committee, Meizhou, Guangdong',
                year: 'Jun 2024',
                pinned: true,
            },
            {
                authors: 'Teng Teng, Haifeng Deng, Chauncey Lee, Xiaohuan Xie',
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
            {
                company:
                    'Wuhan University Smart Building Energy Lab (Global Top 2%)',
                role: 'AI for Science Algorithm R&D & AI Product R&D',
                duration: 'Sep 2022 - Jun 2025',
                description: (
                    <>
                        Used AI and GitHub Copilot to support scientific
                        modeling, data analysis, and paper writing, producing
                        research publications. During Jan 2023 - Jun 2025, I
                        expanded PV recognition coverage by 20x, improved green
                        electricity consumption by 50% with GCN-LSTM + DRL, and
                        built an automatically updating local RAG knowledge
                        base.
                    </>
                ),
                descriptionSegments: [
                    {
                        title: 'Scientific Modeling',
                        content:
                            'Used AI and GitHub Copilot to support scientific modeling, data analysis, and paper writing, producing research publications.',
                    },
                    {
                        title: 'Business Demand',
                        content:
                            'During Jan 2023 - Jun 2025, expanded PV recognition coverage by 20x.',
                    },
                    {
                        title: 'Feature R&D',
                        content:
                            'Improved green electricity consumption by 50% with GCN-LSTM + DRL and built an automatically updating local RAG knowledge base.',
                    },
                ],
                tags: [
                    { name: 'AI for Science', icon: 'llm' },
                    { name: 'GitHub Copilot', icon: 'github' },
                    { name: 'Python', icon: 'python' },
                    { name: 'YOLOv8', icon: 'gear' },
                    { name: 'DRL', icon: 'gear' },
                ],
            },
            {
                company:
                    'Shanghai Jifan Design Education (Hangzhou Campus), leading player in the postgraduate-exam design education segment, new-region expansion from 0 to 1',
                role: 'Co-founder / Growth & Product Lead',
                duration: 'Jun 2020 - Aug 2022',
                description: (
                    <>
                        Built user personas through clustering and regression
                        analysis, driving +30% user growth and +20% revenue;
                        designed premium small-class education products in an
                        offline bootcamp + online live-class format, reducing
                        refund/dropout caused by negative reviews by 15%.
                    </>
                ),
                descriptionSegments: [
                    {
                        title: 'Solution',
                        content:
                            'Built user personas through clustering and regression analysis, driving +30% user growth and +20% revenue.',
                    },
                    {
                        title: 'Product Design',
                        content:
                            'Designed premium small-class education products in an offline bootcamp + online live-class format, reducing refund/dropout caused by negative reviews by 15%.',
                    },
                ],
                tags: [
                    { name: 'Python', icon: 'python' },
                    { name: 'SQL', icon: 'sql' },
                ],
            },
        ],
    },
}

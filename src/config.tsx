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

// English fields for conferences whose zh title has no English original.
// Keyed by the zh title so the EN list derives 1:1 from the zh list and
// cannot drift out of alignment when the zh list is reordered or edited.
const EN_CONFERENCE_OVERRIDES: Record<
    string,
    { authors: string; title: string; venue: string }
> = {
    '碳中和背景下粮食主产区土地利用多情景模拟与碳储量分析': {
        authors: 'Haifeng Deng, Shengyuan Li, Xiaohuan Xie',
        title: 'Multi-Scenario Land Use Simulation and Carbon Storage Analysis in Major Grain-Producing Areas under Carbon Neutrality',
        venue: '2024 Annual Meeting of the Geographical Society of China Physical Geography Committee, Meizhou, Guangdong',
    },
    '城乡融合发展背景下城乡结合区典型县域土地利用多情景模拟与评价': {
        authors: 'Teng Teng, Haifeng Deng, Shengyuan Li, Xiaohuan Xie',
        title: 'Multi-Scenario Land Use Simulation and Evaluation of Typical Counties in Urban-Rural Fringe Areas under Integrated Urban-Rural Development',
        venue: 'Annual Conference of the Geographical Society of China, Nanjing, Jiangsu',
    },
}

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
        conferences:
            CONFIG.research?.conferences?.map((conference) => {
                const override = EN_CONFERENCE_OVERRIDES[conference.title]
                return {
                    ...conference,
                    authors:
                        override?.authors ??
                        conference.authors.replaceAll('李盛园', 'Shengyuan Li'),
                    title: override?.title ?? conference.title,
                    venue: override?.venue ?? conference.venue,
                    year: toEnglishDateLabel(conference.year),
                }
            }) ?? [],
    },
}

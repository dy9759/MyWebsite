import { AI_CONFIG, type AIConfig } from './ai-config'

const PEOPLE_EN: AIConfig['people'] = AI_CONFIG.people.map((person) => {
    if (person.handle === '@pmarca') {
        return {
            ...person,
            role: 'Co-founder, a16z. Veteran Silicon Valley investor.',
        }
    }
    if (person.handle === '@dotey') {
        return { ...person, name: 'Baoyu' }
    }
    return person
})

const renameItem = (
    items: { name: string; url?: string; note?: string; pinned?: boolean }[] | undefined,
    map: Record<string, { name?: string; note?: string }>,
) =>
    items?.map((item) => {
        const patch = map[item.name]
        return patch ? { ...item, ...patch } : item
    })

const SOURCES_EN: AIConfig['sources'] = [
    {
        ...AI_CONFIG.sources[0],
        title: 'News Aggregation (Broad Coverage)',
        description:
            'English & Chinese news outlets, WeChat accounts, etc. ★ Use Techmeme as the aggregator entry to scan headlines, then dive back to the source / official site / press conference / company blog.',
        items: renameItem(AI_CONFIG.sources[0].items, {
            Techmeme: { note: 'Aggregator hub' },
        }),
    },
    {
        ...AI_CONFIG.sources[1],
        title: 'Key People · Learn Product / Business / Investing',
        description:
            'Understanding Silicon Valley means going beyond technology into society and culture. VC + CEO personal sites / Twitter / LinkedIn + American business biographies.',
        items: renameItem(AI_CONFIG.sources[1].items, {
            'Amazon Best-Sellers: Computer & Tech Biographies': {
                note: 'Steve Jobs / Elon Musk biographies + Twitter / Uber / Salesforce / Walmart / Starbucks / OpenAI founder books',
            },
        }),
    },
    {
        ...AI_CONFIG.sources[2],
        title: 'Deep Podcast Interviews (Depth + Timeliness)',
        description:
            'AI podcasts since 2023 have been exceptionally good. Silicon Valley big-tech / startup CEOs, CTOs, AI product leads, and core researchers all do interviews. OpenAI / Anthropic / Google often pre-launch new models on top podcasts a day early (Llama 4, o3, Gemini 2.5 all did). Most are on YouTube (handy subtitles), then Apple Podcasts / Spotify.',
    },
    {
        ...AI_CONFIG.sources[3],
        title: 'Technical Deep Dive',
        description:
            'Developer conferences + technical blogs + papers + domain experts + open-source communities. Most rigorous and systematic.',
        groups: AI_CONFIG.sources[3].groups?.map((group, idx) => {
            const labels = [
                'Developer Conferences · Big-Tech Open Culture',
                'Technical Blogs & Reports',
                'Papers (read deep: problem definition / evaluation / project demo)',
                'Domain People · Personal Sites · LinkedIn · X',
                'Open Source Community',
            ]
            return {
                ...group,
                label: labels[idx] ?? group.label,
                items: group.items.map((item) => {
                    if (item.name === 'F5-TTS — 项目主页示例') {
                        return { ...item, name: 'F5-TTS — project demo page' }
                    }
                    if (
                        item.name ===
                        '3D Gaussian Splatting(高斯泼溅,三维重建开创性论文)'
                    ) {
                        return {
                            ...item,
                            name: '3D Gaussian Splatting (foundational 3D reconstruction paper)',
                        }
                    }
                    if (item.name === 'Andrej Karpathy — 个人主页') {
                        return { ...item, name: 'Andrej Karpathy — personal site' }
                    }
                    return item
                }),
            }
        }),
    },
    {
        ...AI_CONFIG.sources[4],
        title: 'User Research & Market Demand (English Communities)',
        description:
            'Reddit subreddits + Hacker News (YC tech community — open-source launches & high-signal commentary) + Discord (official AI-tool developer channels). Great for international launches; marketing / HR / productivity-tool subreddits have strong discussion.',
        groups: AI_CONFIG.sources[4].groups?.map((group, idx) => {
            const labels = ['Reddit', 'Hacker News', 'Discord', 'Market Signals']
            return {
                ...group,
                label: labels[idx] ?? group.label,
                items: group.items.map((item) => {
                    if (item.name === '案例 — DeepSeek v3 讨论搜索') {
                        return {
                            ...item,
                            name: 'Example — DeepSeek v3 discussion search',
                        }
                    }
                    if (item.name === '案例 — item 41695840(开源项目深度点评)') {
                        return {
                            ...item,
                            name: 'Example — item 41695840 (in-depth open-source review)',
                        }
                    }
                    if (item.name?.startsWith('各 AI 工具')) {
                        return {
                            ...item,
                            name: 'Official AI tool developer channels (join as needed)',
                        }
                    }
                    return item
                }),
            }
        }),
    },
    {
        ...AI_CONFIG.sources[5],
        title: 'Chinese Information Sphere (Supplementary)',
        description:
            'Pros: native-language speed, Chinese market perspective, Chinese-American researchers grant interviews to Chinese media/podcasts. Cons: takes are less bold, emotion and interactivity get lost in translation. Use: (1) pick the best original Chinese pieces; (2) treat as leads, then go back to English sources for careful study.',
        groups: AI_CONFIG.sources[5].groups?.map((group, idx) => {
            const labels = [
                'Chinese Media · WeChat',
                'Xiaoyuzhou Podcasts (Chinese)',
            ]
            return { ...group, label: labels[idx] ?? group.label }
        }),
    },
]

const SOURCES_USAGE_EN: AIConfig['sourcesUsage'] = [
    {
        rule: 'Go to the source. When Meta / Microsoft / Adobe / Salesforce ship a new product, watch the launch event — not the TechCrunch recap. When OpenAI ships a new model, read the official blog first.',
    },
    {
        rule: 'Occasionally read in-depth coverage of the tech figures you follow.',
    },
    {
        rule: 'Occasionally read deep commentary and well-known personal blogs.',
        examples: [
            {
                name: 'Ben Thompson — Stratechery deep commentary',
                url: 'https://stratechery.com/',
            },
            {
                name: 'Dario Amodei — Machines of Loving Grace',
                url: 'https://darioamodei.com/machines-of-loving-grace',
            },
            {
                name: 'Steven Sinofsky — On AI Requiring a New OS',
                url: 'https://hardcoresoftware.learningbyshipping.com/p/219-on-ai-requiring-a-new-os',
            },
        ],
    },
]

export const AI_CONFIG_EN: AIConfig = {
    ...AI_CONFIG,
    people: PEOPLE_EN,
    sources: SOURCES_EN,
    sourcesUsage: SOURCES_USAGE_EN,
}

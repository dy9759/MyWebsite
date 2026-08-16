import type { AIConfig } from "./ai-config-types";

export const AI_SOURCES: AIConfig['sources'] = [
        {
            layer: 'Layer 1',
            title: '新闻聚合(覆盖面广)',
            description:
                '英语 & 中文新闻报道、公众号等。★ Techmeme 聚合入口浏览汇总,再回到源头/官方/发布会/官网 blog。',
            items: [
                {
                    name: 'Techmeme',
                    url: 'https://www.techmeme.com/',
                    note: '聚合入口',
                    pinned: true,
                },
            ],
        },
        {
            layer: 'Layer 2',
            title: '关键人物追踪 · 学习产品 / 商业 / 投资',
            description:
                '理解硅谷不能只看技术,也要看社会与文化。VC + CEO 的个人网站/推特/LinkedIn + 美国商业传记。',
            items: [
                {
                    name: 'Ben Thompson — Stratechery',
                    url: 'https://stratechery.com/',
                },
                {
                    name: 'Sam Altman — Blog',
                    url: 'https://blog.samaltman.com/',
                },
                { name: 'Dario Amodei', url: 'https://darioamodei.com/' },
                {
                    name: 'Steven Sinofsky — Hardcore Software',
                    url: 'https://hardcoresoftware.learningbyshipping.com/',
                },
                {
                    name: "Lenny's Newsletter — State of the Product Job Market",
                    url: 'https://www.lennysnewsletter.com/p/state-of-the-product-job-market-in',
                },
                {
                    name: 'Amazon Best-Sellers: Computer & Tech Biographies',
                    url: 'https://www.amazon.com/Best-Sellers-Computer-Technology-Biographies/zgbs/books/3568',
                    note: '乔布斯传、马斯克传 + Twitter / Uber / Salesforce / 沃尔玛 / 星巴克 / OpenAI 创始人传记',
                },
            ],
        },
        {
            layer: 'Layer 3',
            title: '深度播客访谈(兼具深度与时效性)',
            description:
                '2023 起 AI 圈播客质量极高。硅谷大厂/创业公司 CEO、CTO、AI 产品负责人、核心研究员都会接受访谈。OpenAI / Anthropic / Google 新模型发布前一天常在知名播客上线(Llama 4、o3、Gemini 2.5 都是)。YouTube 最多(字幕方便),其次 Apple Podcast / Spotify。',
            items: [
                {
                    name: 'Y Combinator',
                    url: 'https://www.youtube.com/@ycombinator',
                },
                {
                    name: 'No Priors',
                    url: 'https://www.youtube.com/@NoPriorsPodcast',
                },
                {
                    name: 'Latent Space',
                    url: 'https://www.youtube.com/@LatentSpacePod',
                },
                {
                    name: 'AI Engineer',
                    url: 'https://www.youtube.com/@aiDotEngineer',
                },
            ],
        },
        {
            layer: 'Layer 4',
            title: '技术深度学习',
            description:
                '开发者大会 + 技术博客 + 论文 + 领域人物主页 + 开源社区。最专业深入、系统性最强。',
            groups: [
                {
                    label: '开发者大会 · 大厂公开技术文化',
                    items: [
                        {
                            name: 'NVIDIA GTC',
                            url: 'https://www.nvidia.com/gtc/',
                        },
                        { name: 'Google I/O', url: 'https://io.google/' },
                        {
                            name: 'OpenAI DevDay',
                            url: 'https://openai.com/devday/',
                        },
                        {
                            name: 'Adobe Max 2024 — Opening Keynote',
                            url: 'https://www.adobe.com/max/2024/sessions/opening-keynote-gs1.html',
                        },
                        {
                            name: 'Salesforce — Discover Agentforce',
                            url: 'https://www.salesforce.com/plus/experience/discover_agentforce/series/discover_agentforce/episode/episode-s1e4',
                        },
                    ],
                },
                {
                    label: '技术博客 & Technical Report',
                    items: [
                        {
                            name: 'Google Research Blog',
                            url: 'https://research.google/blog/',
                        },
                        {
                            name: 'OpenAI Research',
                            url: 'https://openai.com/research',
                        },
                        {
                            name: 'Anthropic Research',
                            url: 'https://www.anthropic.com/research',
                        },
                        {
                            name: 'Anthropic — Built a Multi-Agent Research System',
                            url: 'https://www.anthropic.com/engineering/built-multi-agent-research-system',
                        },
                        {
                            name: 'DeepMind Blog',
                            url: 'https://deepmind.google/discover/blog/',
                        },
                        {
                            name: 'OpenAI Codex — Best Practices',
                            url: 'https://developers.openai.com/codex/learn/best-practices',
                            pinned: true,
                        },
                        { name: 'DeepWiki', url: 'https://deepwiki.org/' },
                    ],
                },
                {
                    label: '论文(硬读:问题定义 / 评测 / 项目主页 demo)',
                    items: [
                        {
                            name: 'arXiv cs.AI',
                            url: 'https://arxiv.org/list/cs.AI/recent',
                        },
                        {
                            name: 'Google Scholar',
                            url: 'https://scholar.google.com/',
                        },
                        {
                            name: 'F5-TTS — 项目主页示例',
                            url: 'https://swivid.github.io/F5-TTS/',
                        },
                        {
                            name: '3D Gaussian Splatting(高斯泼溅,三维重建开创性论文)',
                            url: 'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/',
                        },
                    ],
                },
                {
                    label: '相关领域人物主页 · LinkedIn · X',
                    items: [
                        {
                            name: 'Mark Levoy (Stanford Graphics)',
                            url: 'https://graphics.stanford.edu/~levoy/',
                        },
                        {
                            name: 'Andrej Karpathy — 个人主页',
                            url: 'https://karpathy.ai/',
                        },
                        {
                            name: 'Kate Park — LinkedIn',
                            url: 'https://www.linkedin.com/in/kateparkmenlo/',
                        },
                    ],
                },
                {
                    label: '开源社区',
                    items: [
                        {
                            name: 'GitHub Trending',
                            url: 'https://github.com/trending',
                        },
                    ],
                },
            ],
        },
        {
            layer: 'Layer 5',
            title: '用户调研 & 市场需求(英文社区)',
            description:
                'Reddit 细分社区 + Hacker News(YC 技术社区,开源项目首发 + 高质量点评)+ Discord(各 AI 工具官方开发者频道)。出海宣传阵地,市场营销 / HR / 效率工具等细分社区优质讨论。',
            groups: [
                {
                    label: 'Reddit',
                    items: [
                        {
                            name: 'r/LocalLLaMA',
                            url: 'https://www.reddit.com/r/LocalLLaMA/',
                        },
                        {
                            name: 'r/MachineLearning',
                            url: 'https://www.reddit.com/r/MachineLearning/',
                        },
                        {
                            name: '案例 — DeepSeek v3 讨论搜索',
                            url: 'https://www.reddit.com/search/?q=deepseek+v3',
                        },
                    ],
                },
                {
                    label: 'Hacker News',
                    items: [
                        {
                            name: 'Hacker News',
                            url: 'https://news.ycombinator.com/',
                        },
                        {
                            name: '案例 — item 41695840(开源项目深度点评)',
                            url: 'https://news.ycombinator.com/item?id=41695840',
                        },
                    ],
                },
                {
                    label: 'Discord',
                    items: [{ name: '各 AI 工具官方开发者频道(按需加入)' }],
                },
                {
                    label: '市场信号',
                    items: [
                        {
                            name: 'Google Trends (US)',
                            url: 'https://trends.google.com/trending?geo=US',
                        },
                    ],
                },
            ],
        },
        {
            layer: 'Layer 6',
            title: '中文信息圈(补充视角)',
            description:
                '优势:母语快、有中国市场视角、硅谷华人研究员会接受中文媒体/播客访谈。劣势:解读不够大胆、英文内容转译后丢失情感与互动。用法:(1) 挑优质独特的看;(2) 作为线索,跳转回英语源头仔细学习。',
            groups: [
                {
                    label: '公众号 · 媒体',
                    items: [
                        {
                            name: '机器之心',
                            url: 'https://www.jiqizhixin.com/',
                        },
                        { name: 'Founder Park' },
                        { name: 'Z Potentials' },
                        { name: '虎嗅', url: 'https://www.huxiu.com/' },
                        {
                            name: '晚点 LatePost',
                            url: 'https://www.latepost.com/',
                        },
                        { name: '36Kr', url: 'https://36kr.com/' },
                        { name: '智东西', url: 'https://zhidx.com/' },
                        { name: '腾讯科技' },
                        { name: '张无常 (公众号)' },
                        { name: '爱范儿', url: 'https://www.ifanr.com/' },
                        { name: '真格基金', url: 'https://zhenfund.com/' },
                    ],
                },
                {
                    label: '小宇宙播客',
                    items: [
                        { name: '42章经' },
                        { name: 'Onboard' },
                        { name: 'AI 炼金术' },
                        { name: '张小珺' },
                        { name: '硅谷101' },
                        { name: '乱翻书' },
                        { name: '硬地骇客' },
                        { name: '出海去' },
                        { name: '此话当真' },
                    ],
                },
            ],
        },
]

export const AI_SOURCES_USAGE: AIConfig['sourcesUsage'] = [
        {
            rule: '优先看消息源头。Meta / 微软 / Adobe / Salesforce 发新产品,优先看发布会 — 不是 TechCrunch 的转述。OpenAI 发新模型,优先去官网看 blog。',
        },
        {
            rule: '偶尔看感兴趣的科技人物的深度报道。',
        },
        {
            rule: '偶尔看一些深度的评论文章、知名人物的博客。',
            examples: [
                {
                    name: 'Ben Thompson — Stratechery 深度评论',
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

export const AI_BIG_TECH: AIConfig['bigTech'] = [
        {
            company: 'NVIDIA',
            people: [{ name: 'Jensen Huang', role: 'CEO' }],
            events: [
                { title: 'CES 2025', type: 'Keynote', speaker: 'Jensen Huang' },
                {
                    title: 'SIGGRAPH 2024',
                    type: 'Keynote',
                    speaker: 'Jensen Huang',
                },
                {
                    title: 'National Taiwan University Commencement',
                    type: 'Keynote',
                    date: '2023',
                    speaker: 'Jensen Huang',
                },
                { title: 'GTC 2024', type: 'Keynote', speaker: 'Jensen Huang' },
                {
                    title: 'COMPUTEX 2023',
                    type: 'Keynote',
                    speaker: 'Jensen Huang',
                },
                {
                    title: 'AI Summit India 2024',
                    type: 'Fireside Chat',
                    speaker: 'Jensen Huang',
                },
                {
                    title: 'DealBook Summit 2023',
                    type: 'Interview',
                    speaker: 'Jensen Huang',
                },
                {
                    title: 'AI Summit Japan 2024',
                    type: 'Fireside Chat',
                    speaker: 'Jensen Huang',
                },
                {
                    title: 'SIGGRAPH 2024 — w/ Mark Zuckerberg',
                    type: 'Fireside Chat',
                    speaker: 'Jensen Huang',
                },
            ],
            podcasts: [
                { title: 'No Priors Podcast' },
                {
                    title: 'In Good Company',
                    url: 'https://www.youtube.com/watch?v=R9Mnn-HSS4o',
                },
                { title: 'Acquired Podcast' },
            ],
        },
        {
            company: 'Google',
            people: [
                { name: 'Sundar Pichai', role: 'CEO' },
                { name: 'Demis Hassabis', role: 'CEO, DeepMind' },
            ],
            events: [
                {
                    title: 'Google I/O 2023 Keynote',
                    type: 'Keynote',
                    speaker: 'Sundar Pichai',
                    date: 'May 10, 2023',
                },
                {
                    title: 'Google I/O 2024 Keynote',
                    type: 'Keynote',
                    speaker: 'Sundar Pichai',
                    date: 'May 14, 2024',
                },
                {
                    title: 'Google Cloud Next 2024',
                    type: 'Keynote',
                    speaker: 'Sundar Pichai',
                    date: 'Apr 9–11, 2024',
                },
            ],
            podcasts: [
                { title: 'AI for Science Forum', date: 'Oct 2023' },
                { title: 'Unreasonably Effective AI', date: 'Aug 14, 2024' },
                {
                    title: 'AI for Science: Demis Hassabis',
                    date: 'Nov 20, 2024',
                },
            ],
        },
        {
            company: 'Meta',
            people: [
                { name: 'Mark Zuckerberg', role: 'CEO' },
                { name: 'Yann LeCun', role: 'Chief AI Scientist' },
            ],
            events: [
                {
                    title: 'Meta Connect 2023',
                    type: 'Keynote',
                    speaker: 'Mark Zuckerberg',
                    date: 'Sep 27, 2023',
                },
                {
                    title: 'Acquired Live at Chase Center',
                    type: 'Fireside Chat',
                    speaker: 'Mark Zuckerberg',
                    date: 'Sep 10, 2024',
                },
                {
                    title: 'SIGGRAPH 2024 — w/ Jensen Huang',
                    type: 'Fireside Chat',
                    speaker: 'Mark Zuckerberg',
                    date: 'Jul 29, 2024',
                },
                {
                    title: 'Meta Connect 2024',
                    type: 'Keynote',
                    speaker: 'Mark Zuckerberg',
                    date: 'Sep 25, 2024',
                },
            ],
            podcasts: [
                { title: 'Acquired Podcast', date: 'Sep 18, 2024' },
                { title: 'Lex Fridman Podcast', date: 'Oct 10, 2023' },
                {
                    title: 'Lex Fridman Podcast (Metaverse)',
                    date: 'Dec 12, 2023',
                },
                { title: 'The Joe Rogan Experience', date: 'Apr 26, 2024' },
                {
                    title: 'Dwarkesh Patel Podcast (Llama 3)',
                    date: 'Apr 18, 2024',
                },
            ],
        },
        {
            company: 'Apple',
            people: [
                { name: 'Tim Cook', role: 'CEO' },
                { name: 'Craig Federighi', role: 'SVP Software Engineering' },
            ],
            events: [],
            podcasts: [],
        },
        {
            company: 'Microsoft',
            people: [],
            events: [],
            podcasts: [],
        },
        {
            company: 'OpenAI',
            people: [],
            events: [],
            podcasts: [],
        },
        {
            company: 'Tesla',
            people: [],
            events: [],
            podcasts: [],
        },
        {
            company: 'Amazon',
            people: [],
            events: [],
            podcasts: [],
        },
]

export const AI_BIG_TECH_ALSO_TRACKING: AIConfig['bigTechAlsoTracking'] = ['Salesforce (minor)']

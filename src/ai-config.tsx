import { Icons } from '@/components/icons'

export type VideoTag =
    | 'Fundamentals'
    | 'Product'
    | 'Founder Interview'
    | 'Research'
    | 'Tools'

export type AIConfig = {
    hero: {
        title: string
        intro: string
        heroImage: string
    }
    videos: {
        title: string
        channel: string
        duration: string
        url: string
        tldwUrl?: string
        tags: VideoTag[]
        featured?: boolean
        pinned?: boolean
    }[]
    podcasts: {
        title: string
        host: string
        description: string
        url: string
        featured?: boolean
        pinned?: boolean
    }[]
    people: {
        name: string
        handle: string
        avatar: string
        url: string
        role: string
        pinned?: boolean
    }[]
    newsletters: {
        title: string
        description: string
        url: string
        pinned?: boolean
    }[]
    products: {
        name: string
        description: string
        url: string
        icon?: keyof typeof Icons
        featured?: boolean
        pinned?: boolean
    }[]
    prompts: {
        title: string
        description: string
        content: string
        pinned?: boolean
    }[]
    skills: {
        title: string
        description: string
        demoUrl?: string
        githubUrl: string
        pinned?: boolean
    }[]
    sources: {
        layer: string
        title: string
        description?: string
        items?: {
            name: string
            url?: string
            note?: string
            pinned?: boolean
        }[]
        groups?: {
            label: string
            items: { name: string; url?: string; pinned?: boolean }[]
        }[]
    }[]
    sourcesUsage: {
        rule: string
        examples?: { name: string; url?: string }[]
    }[]
    bigTech: {
        company: string
        people: { name: string; role?: string }[]
        events: {
            title: string
            type: string
            speaker?: string
            date?: string
            url?: string
        }[]
        podcasts: {
            title: string
            date?: string
            url?: string
        }[]
    }[]
    bigTechAlsoTracking: string[]
}

export const AI_CONFIG: AIConfig = {
    hero: {
        title: 'AI Learning Library',
        intro: "Hi, I'm Chauncey. Below is my curated collection of AI learning resources — videos, podcasts, newsletters, and tools I personally use to keep up with the field. Everything here is free and aimed at anyone who wants to understand AI more deeply, technical or not.",
        heroImage: '/images/ai-hero.jpg',
    },
    videos: [
        {
            title: 'Intro to Large Language Models',
            channel: 'Andrej Karpathy',
            duration: '1h 0m',
            url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
            tags: ['Fundamentals'],
        },
        {
            title: "Let's build GPT: from scratch, in code, spelled out",
            channel: 'Andrej Karpathy',
            duration: '1h 56m',
            url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
            tags: ['Fundamentals', 'Research'],
            featured: true,
            pinned: true,
        },
        {
            title: 'How I use LLMs',
            channel: 'Andrej Karpathy',
            duration: '2h 7m',
            url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
            tags: ['Product', 'Tools'],
            featured: true,
            pinned: true,
        },
        {
            title: 'The State of AI with Sam Altman',
            channel: 'Stratechery',
            duration: '1h 15m',
            url: '',
            tags: ['Founder Interview'],
        },
        {
            title: 'Demis Hassabis on the future of AI',
            channel: 'Lex Fridman',
            duration: '2h 30m',
            url: '',
            tags: ['Founder Interview', 'Research'],
        },
        {
            title: 'Building AI Products that matter',
            channel: 'a16z',
            duration: '45m',
            url: '',
            tags: ['Product'],
        },
    ],
    podcasts: [
        {
            title: 'AI Explained',
            host: 'AI Explained',
            description:
                'Short, non-technical news recaps. Great for quick catch-up.',
            url: 'https://www.youtube.com/@ai-explained-',
            featured: true,
            pinned: true,
        },
        {
            title: 'Dwarkesh Podcast',
            host: 'Dwarkesh Patel',
            description:
                'Not AI-focused but AI-heavy; some heavy hitters. The new Lex Fridman.',
            url: 'https://www.dwarkeshpatel.com/podcast',
            featured: true,
            pinned: true,
        },
        {
            title: 'The DeepMind Podcast',
            host: 'Google DeepMind',
            description: 'Official DeepMind podcast on AI research.',
            url: 'https://deepmind.google/discover/the-podcast/',
            featured: true,
            pinned: true,
        },
        {
            title: 'The Cognitive Revolution',
            host: 'Nathan Labenz',
            description: 'Great new pod tracking AI frontier developments.',
            url: 'https://www.cognitiverevolution.ai/',
            featured: true,
            pinned: true,
        },
        {
            title: 'Robot Brains',
            host: 'Pieter Abbeel',
            description: 'Decent backlog on AI/robotics from a top researcher.',
            url: 'https://www.therobotbrains.ai/',
            featured: true,
            pinned: true,
        },
        {
            title: 'No Priors',
            host: 'Sarah Guo & Elad Gil',
            description:
                'Investor-perspective conversations with AI founders and researchers.',
            url: 'https://linktr.ee/nopriors',
            featured: true,
            pinned: true,
        },
        {
            title: 'Unsupervised Learning',
            host: 'Redpoint',
            description: 'VC conversations on AI — tight, product-focused.',
            url: 'https://podtail.com/en/podcast/unsupervised-learning/',
            featured: true,
            pinned: true,
        },
        {
            title: 'Lex Fridman Podcast',
            host: 'Lex Fridman',
            description:
                'Long-form conversations. Strongest AI episodes: Karpathy, Altman, Hassabis, LeCun.',
            url: 'https://www.youtube.com/c/lexfridman',
        },
        {
            title: "Lenny's Podcast",
            host: 'Lenny Rachitsky',
            description: 'Product management and growth, some AI guests.',
            url: 'https://www.youtube.com/@LennysPodcast',
        },
        {
            title: 'Samuel Albanie',
            host: 'Samuel Albanie',
            description:
                'Professor on YouTube explaining papers. New but very good.',
            url: 'https://www.youtube.com/@SamuelAlbanie1',
        },
        {
            title: 'Eye on AI',
            host: 'Craig S. Smith',
            description:
                'Weekly analysis at the intersection of AI and industry. Less technical, great guest backlog.',
            url: 'https://open.spotify.com/show/5aFnCGDhpL5bGr2uHy4bB5',
        },
        {
            title: 'AI & I',
            host: 'Dan Shipper (Every.to)',
            description:
                'Less-technical founder interview pod with some good technical guests.',
            url: 'https://www.youtube.com/watch?v=ELYaeUYjy48&list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL',
        },
        {
            title: 'AI Jason',
            host: 'AI Jason',
            description: 'Frequent AI project breakdown videos.',
            url: 'https://youtu.be/pJwR5pv0_gs',
        },
        {
            title: 'Matthew Berman',
            host: 'Matthew Berman',
            description:
                'Short explainer videos of AI engineering projects and news.',
            url: 'https://www.youtube.com/@matthew_berman',
        },
        {
            title: 'Algorithmic Simplicity',
            host: 'Algorithmic Simplicity',
            description: 'Clear explanations of model architectures.',
            url: 'https://www.youtube.com/watch?v=N6Piou4oYx8',
        },
        {
            title: 'Umar Jamil',
            host: 'Umar Jamil',
            description: 'Standard concept teaching channel, very technical.',
            url: 'https://www.youtube.com/@umarjamilai',
        },
        {
            title: 'Daniel Bourke',
            host: 'Daniel Bourke',
            description: 'Livestream paper replication.',
            url: 'https://www.youtube.com/@danielbourkearxiv2821',
        },
        {
            title: 'Efficient NLP',
            host: 'Efficient NLP',
            description: 'Good short paper/technique explainers.',
            url: 'https://www.youtube.com/@EfficientNLP',
        },
        {
            title: 'Trelis Research',
            host: 'Trelis Research',
            description: 'AI engineering walk-throughs and fine-tuning.',
            url: 'https://www.youtube.com/watch?v=ae2lbmtTY5A',
        },
        {
            title: 'McKay Wrigley',
            host: 'McKay Wrigley',
            description: 'Builder-focused AI tutorials and product demos.',
            url: 'https://www.youtube.com/@realmckaywrigley',
        },
        {
            title: 'Gradient Dissent',
            host: 'Weights & Biases',
            description:
                'Technical interviews from W&B. Hosted by Lukas, now Caryn Marooney.',
            url: 'https://www.youtube.com/playlist?list=PLD80i8An1OEEb1jP0sjEyiLG8ULRXFob_',
        },
        {
            title: 'Generally Intelligent',
            host: 'Kanjun Qiu',
            description:
                'Cerebral RL-focused pod (now dormant but great backlog).',
            url: 'https://generallyintelligent.com/podcast',
        },
        {
            title: 'Weaviate Podcast',
            host: 'Weaviate',
            description:
                'Good technical discussions on vector databases and RAG.',
            url: 'https://podcasters.spotify.com/pod/show/weaviate/episodes/Erika-Cardenas--Roman-Grebennikov--and-Vsevolod-Goloviznin-on-Recommendation-and-Metarank---Pod-43-e2280u3',
        },
        {
            title: 'NLP Highlights',
            host: 'Allen Institute',
            description:
                'Infrequent but great pre-2020 backlog. Check episode 36.',
            url: 'https://www.listennotes.com/podcasts/nlp-highlights-allen-institute-for-f9Yt4vD_ger/',
        },
        {
            title: 'High Agency',
            host: 'Raza Habib (HumanLoop)',
            description: 'New podcast for AI builders.',
            url: 'https://podcasts.apple.com/us/podcast/high-agency-the-podcast-for-ai-builders/id1747605459',
        },
        {
            title: 'Latent Space',
            host: 'swyx & Alessio',
            description:
                'Engineering-forward discussions of the AI stack — models, tools, evals, deployments.',
            url: 'https://latent.space/',
        },
        {
            title: 'Training Data',
            host: 'Sequoia',
            description: 'Sequoia Capital AI investor podcast.',
            url: 'https://podcasts.apple.com/gb/podcast/training-data/id1750736528',
        },
        {
            title: 'Y Combinator',
            host: 'Y Combinator',
            description:
                'YC channel — founder interviews and AI startup insights.',
            url: 'https://www.youtube.com/@ycombinator',
        },
        {
            title: 'The MAD Podcast',
            host: 'Matt Turck',
            description: 'Machine Learning / AI / Data landscape interviews.',
            url: 'https://podcasts.apple.com/us/podcast/the-mad-podcast-with-matt-turck/id1686238724',
        },
        {
            title: 'r/LocalLLaMA — Channels List',
            host: 'Reddit',
            description:
                '23 LocalLlama-focused YouTube channel recommendations.',
            url: 'https://www.reddit.com/r/LocalLLaMA/comments/1atycgd/which_localllama_focused_yt_channels_do_you_follow/',
        },
    ],
    people: [
        {
            name: 'Andrej Karpathy',
            handle: '@karpathy',
            avatar: 'https://pbs.twimg.com/profile_images/1296667294148382721/9Pr6XrPB_400x400.jpg',
            url: 'https://x.com/karpathy',
            role: 'Former Tesla AI, OpenAI. Best educator in the field.',
            pinned: true,
        },
        {
            name: 'Sam Altman',
            handle: '@sama',
            avatar: 'https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg',
            url: 'https://x.com/sama',
            role: 'CEO, OpenAI.',
        },
        {
            name: 'Dario Amodei',
            handle: '@DarioAmodei',
            avatar: '',
            url: 'https://x.com/DarioAmodei',
            role: 'CEO, Anthropic.',
        },
        {
            name: 'Sarah Guo',
            handle: '@saranormous',
            avatar: '',
            url: 'https://x.com/saranormous',
            role: 'Founder, Conviction. Co-host, No Priors.',
        },
        {
            name: 'Simon Willison',
            handle: '@simonw',
            avatar: '',
            url: 'https://x.com/simonw',
            role: 'Engineer, LLM tinkerer, best daily notes on what is shipping.',
            pinned: true,
        },
        {
            name: 'Nathan Lambert',
            handle: '@natolambert',
            avatar: '',
            url: 'https://x.com/natolambert',
            role: 'Interconnects newsletter. Post-training and RLHF writing.',
        },
        {
            name: 'Marc Andreessen',
            handle: '@pmarca',
            avatar: '',
            url: 'https://x.com/pmarca',
            role: 'Co-founder, a16z. 硅谷知名投资人。',
        },
        {
            name: 'Garry Tan',
            handle: '@garrytan',
            avatar: '',
            url: 'https://x.com/garrytan',
            role: 'CEO, Y Combinator.',
        },
        {
            name: 'Patrick Collison',
            handle: '@patrickc',
            avatar: '',
            url: 'https://x.com/patrickc',
            role: 'Co-founder & CEO, Stripe.',
        },
        {
            name: 'Michael Truell',
            handle: '@mntruell',
            avatar: '',
            url: 'https://x.com/mntruell',
            role: 'Co-founder & CEO, Cursor / Anysphere.',
        },
        {
            name: 'Tobi Lütke',
            handle: '@tobi',
            avatar: '',
            url: 'https://x.com/tobi',
            role: 'CEO, Shopify.',
        },
        {
            name: 'Ben Thompson',
            handle: 'stratechery.com',
            avatar: '',
            url: 'https://stratechery.com/',
            role: 'Stratechery — strategy and business analysis of tech.',
        },
        {
            name: 'Steven Sinofsky',
            handle: 'learningbyshipping.com',
            avatar: '',
            url: 'https://hardcoresoftware.learningbyshipping.com/',
            role: 'Former Windows chief. Hardcore Software on a16z.',
        },
        {
            name: 'BuilderPulse',
            handle: 'github.com/BuilderPulse',
            avatar: 'https://avatars.githubusercontent.com/u/BuilderPulse',
            url: 'https://github.com/BuilderPulse/BuilderPulse/tree/main',
            role: 'Open-source AI builder community and tooling.',
        },
        {
            name: 'Lenny Rachitsky',
            handle: 'refoundai.com',
            avatar: '',
            url: 'https://refoundai.com/lenny-skills/playbooks/',
            role: 'Refound AI playbooks — product and growth skills distilled.',
        },
        {
            name: 'Zara Zhang',
            handle: 'zara.faces.site',
            avatar: '',
            url: 'https://zara.faces.site/ai',
            role: 'Curator of the AI learning library that inspired this page.',
        },
        {
            name: 'DeepWiki',
            handle: 'deepwiki.org',
            avatar: '',
            url: 'https://deepwiki.org/',
            role: 'AI-powered wiki of topics, concepts, and research.',
        },
        {
            name: '宝玉 (Baoyu)',
            handle: '@dotey',
            avatar: '',
            url: 'https://baoyu.io/',
            role: 'Chinese AI translator and educator. Best daily posts on models and papers.',
        },
        {
            name: 'Sam Altman (Blog)',
            handle: 'blog.samaltman.com',
            avatar: 'https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg',
            url: 'https://blog.samaltman.com/',
            role: 'Long-form essays on startups, AI, and what is next.',
        },
    ],
    newsletters: [
        {
            title: 'Stratechery',
            description:
                'Ben Thompson on AI strategy, business models, and industry moves. Paid but worth it.',
            url: 'https://stratechery.com/',
            pinned: true,
        },
        {
            title: 'Import AI',
            description:
                'Jack Clark weekly digest of research papers and policy news. Free, skim in 5 minutes.',
            url: 'https://jack-clark.net/',
        },
        {
            title: 'Interconnects',
            description:
                'Nathan Lambert on post-training, RLHF, and open models. Deeply technical, free.',
            url: 'https://www.interconnects.ai/',
        },
        {
            title: 'Simon Willison Weblog',
            description:
                'What is worth trying this week — tools, models, prompts. Updated daily.',
            url: 'https://simonwillison.net/',
            pinned: true,
        },
    ],
    products: [
        {
            name: 'NotebookLM',
            description:
                'Upload any docs or YouTube links, get an instant audio podcast summary. Great for dense material.',
            url: 'https://notebooklm.google.com/',
            featured: true,
            pinned: true,
        },
        {
            name: 'Granola',
            description:
                'Meeting note-taker that records, transcribes, and generates structured notes. Replaces my meeting scratchpad.',
            url: 'https://granola.ai/',
        },
        {
            name: 'Snipd',
            description:
                'Podcast app with AI-generated chapter summaries and searchable transcripts. Best way to revisit a 2-hour podcast.',
            url: 'https://www.snipd.com/',
        },
        {
            name: 'Claude',
            description:
                'Default for thinking, writing, and coding. Strongest long-context and reasoning model for my workflow.',
            url: 'https://claude.ai/',
            featured: true,
            pinned: true,
        },
        {
            name: 'Cursor',
            description:
                'AI-first code editor. Inline completions and agent-style edits beat everything else I have tried.',
            url: 'https://cursor.com/',
            featured: true,
            pinned: true,
        },
    ],
    prompts: [
        {
            title: 'AI Dictionary',
            description:
                'Turns any AI term into a layman-friendly explanation with an analogy.',
            content: `You are an AI dictionary. When I give you a term from machine learning or AI (e.g. "transformer", "RLHF", "context window"), respond with:

1. A one-sentence plain-English definition
2. A short analogy anyone could understand
3. Why it matters in practice
4. A common misconception, if any

Keep each section to 2-3 sentences. Do not use jargon in the definition unless you also explain it.`,
        },
        {
            title: 'Video Notes Recorder',
            description:
                'Converts a YouTube transcript into structured notes with timestamps.',
            pinned: true,
            content: `You will receive a YouTube video transcript. Produce structured notes with:

- **Overview**: 2-3 sentence summary of the video
- **Key Points**: 5-10 bullet points, each prefixed with a [MM:SS] timestamp
- **Quotes**: any quotable lines worth saving, with timestamps
- **Actionable Takeaways**: 2-3 things the viewer could actually do

Preserve the speaker's voice in the quotes. Do not editorialize.`,
        },
        {
            title: 'Podcast to Blog Post',
            description:
                'Converts a podcast transcript into a readable blog post.',
            content: `You will receive a podcast transcript (1-2 speakers). Convert it into a blog post with:

- A title that captures the strongest idea
- A 3-sentence intro that hooks the reader
- 3-5 body sections with H2 headers, each built around one key claim from the conversation
- A closing section with the most quotable line and why it matters

Write in third person. Do not invent details not in the transcript.`,
        },
    ],
    sources: [
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
    ],
    sourcesUsage: [
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
    ],
    bigTech: [
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
    ],
    bigTechAlsoTracking: ['Salesforce (minor)'],
    skills: [
        {
            title: 'Frontend Presentations',
            description:
                'Build slide decks as React components instead of Keynote. Each slide is a page, transitions are CSS.',
            githubUrl: '',
        },
        {
            title: 'YouTube to Ebook',
            description:
                'Pipeline that takes a YouTube playlist and produces a polished EPUB with chapters, illustrations, and an index.',
            githubUrl: '',
            pinned: true,
        },
    ],
}

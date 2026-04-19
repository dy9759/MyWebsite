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
    }[]
    podcasts: {
        title: string
        host: string
        description: string
        url: string
        featured?: boolean
    }[]
    people: {
        name: string
        handle: string
        avatar: string
        url: string
        role: string
    }[]
    newsletters: {
        title: string
        description: string
        url: string
    }[]
    products: {
        name: string
        description: string
        url: string
        icon?: keyof typeof Icons
        featured?: boolean
    }[]
    prompts: {
        title: string
        description: string
        content: string
    }[]
    skills: {
        title: string
        description: string
        demoUrl?: string
        githubUrl: string
    }[]
    sources: {
        layer: string
        title: string
        description?: string
        items?: { name: string; url?: string; note?: string }[]
        groups?: {
            label: string
            items: { name: string; url?: string }[]
        }[]
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
            title: "Intro to Large Language Models",
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
        },
        {
            title: 'How I use LLMs',
            channel: 'Andrej Karpathy',
            duration: '2h 7m',
            url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
            tags: ['Product', 'Tools'],
            featured: true,
        },
        {
            title: 'The State of AI with Sam Altman',
            channel: 'Stratechery',
            duration: '1h 15m',
            url: 'https://www.youtube.com/watch?v=placeholder1',
            tags: ['Founder Interview'],
        },
        {
            title: 'Demis Hassabis on the future of AI',
            channel: 'Lex Fridman',
            duration: '2h 30m',
            url: 'https://www.youtube.com/watch?v=placeholder2',
            tags: ['Founder Interview', 'Research'],
        },
        {
            title: 'Building AI Products that matter',
            channel: 'a16z',
            duration: '45m',
            url: 'https://www.youtube.com/watch?v=placeholder3',
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
        },
        {
            title: 'Dwarkesh Podcast',
            host: 'Dwarkesh Patel',
            description:
                'Not AI-focused but AI-heavy; some heavy hitters. The new Lex Fridman.',
            url: 'https://www.dwarkeshpatel.com/podcast',
            featured: true,
        },
        {
            title: 'The DeepMind Podcast',
            host: 'Google DeepMind',
            description: 'Official DeepMind podcast on AI research.',
            url: 'https://deepmind.google/discover/the-podcast/',
            featured: true,
        },
        {
            title: 'The Cognitive Revolution',
            host: 'Nathan Labenz',
            description: 'Great new pod tracking AI frontier developments.',
            url: 'https://www.cognitiverevolution.ai/',
            featured: true,
        },
        {
            title: 'Robot Brains',
            host: 'Pieter Abbeel',
            description: 'Decent backlog on AI/robotics from a top researcher.',
            url: 'https://www.therobotbrains.ai/',
            featured: true,
        },
        {
            title: 'No Priors',
            host: 'Sarah Guo & Elad Gil',
            description:
                'Investor-perspective conversations with AI founders and researchers.',
            url: 'https://linktr.ee/nopriors',
            featured: true,
        },
        {
            title: 'Unsupervised Learning',
            host: 'Redpoint',
            description: 'VC conversations on AI — tight, product-focused.',
            url: 'https://podtail.com/en/podcast/unsupervised-learning/',
            featured: true,
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
            description: 'Cerebral RL-focused pod (now dormant but great backlog).',
            url: 'https://generallyintelligent.com/podcast',
        },
        {
            title: 'Weaviate Podcast',
            host: 'Weaviate',
            description: 'Good technical discussions on vector databases and RAG.',
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
            description: 'YC channel — founder interviews and AI startup insights.',
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
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/DarioAmodei',
            role: 'CEO, Anthropic.',
        },
        {
            name: 'Sarah Guo',
            handle: '@saranormous',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/saranormous',
            role: 'Founder, Conviction. Co-host, No Priors.',
        },
        {
            name: 'Simon Willison',
            handle: '@simonw',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/simonw',
            role: 'Engineer, LLM tinkerer, best daily notes on what is shipping.',
        },
        {
            name: 'Nathan Lambert',
            handle: '@natolambert',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/natolambert',
            role: 'Interconnects newsletter. Post-training and RLHF writing.',
        },
        {
            name: 'Marc Andreessen',
            handle: '@pmarca',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/pmarca',
            role: 'Co-founder, a16z. 硅谷知名投资人。',
        },
        {
            name: 'Garry Tan',
            handle: '@garrytan',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/garrytan',
            role: 'CEO, Y Combinator.',
        },
        {
            name: 'Patrick Collison',
            handle: '@patrickc',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/patrickc',
            role: 'Co-founder & CEO, Stripe.',
        },
        {
            name: 'Michael Truell',
            handle: '@mntruell',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/mntruell',
            role: 'Co-founder & CEO, Cursor / Anysphere.',
        },
        {
            name: 'Tobi Lütke',
            handle: '@tobi',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://x.com/tobi',
            role: 'CEO, Shopify.',
        },
        {
            name: 'Ben Thompson',
            handle: 'stratechery.com',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://stratechery.com/',
            role: 'Stratechery — strategy and business analysis of tech.',
        },
        {
            name: 'Steven Sinofsky',
            handle: 'learningbyshipping.com',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
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
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://refoundai.com/lenny-skills/playbooks/',
            role: 'Refound AI playbooks — product and growth skills distilled.',
        },
        {
            name: 'Zara Zhang',
            handle: 'zara.faces.site',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://zara.faces.site/ai',
            role: 'Curator of the AI learning library that inspired this page.',
        },
        {
            name: 'DeepWiki',
            handle: 'deepwiki.org',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
            url: 'https://deepwiki.org/',
            role: 'AI-powered wiki of topics, concepts, and research.',
        },
        {
            name: '宝玉 (Baoyu)',
            handle: '@dotey',
            avatar: 'https://pbs.twimg.com/profile_images/placeholder.jpg',
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
        },
    ],
    products: [
        {
            name: 'NotebookLM',
            description:
                'Upload any docs or YouTube links, get an instant audio podcast summary. Great for dense material.',
            url: 'https://notebooklm.google.com/',
            featured: true,
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
        },
        {
            name: 'Cursor',
            description:
                'AI-first code editor. Inline completions and agent-style edits beat everything else I have tried.',
            url: 'https://cursor.com/',
            featured: true,
        },
    ],
    prompts: [
        {
            title: 'AI Dictionary',
            description: 'Turns any AI term into a layman-friendly explanation with an analogy.',
            content: `You are an AI dictionary. When I give you a term from machine learning or AI (e.g. "transformer", "RLHF", "context window"), respond with:

1. A one-sentence plain-English definition
2. A short analogy anyone could understand
3. Why it matters in practice
4. A common misconception, if any

Keep each section to 2-3 sentences. Do not use jargon in the definition unless you also explain it.`,
        },
        {
            title: 'Video Notes Recorder',
            description: 'Converts a YouTube transcript into structured notes with timestamps.',
            content: `You will receive a YouTube video transcript. Produce structured notes with:

- **Overview**: 2-3 sentence summary of the video
- **Key Points**: 5-10 bullet points, each prefixed with a [MM:SS] timestamp
- **Quotes**: any quotable lines worth saving, with timestamps
- **Actionable Takeaways**: 2-3 things the viewer could actually do

Preserve the speaker's voice in the quotes. Do not editorialize.`,
        },
        {
            title: 'Podcast to Blog Post',
            description: 'Converts a podcast transcript into a readable blog post.',
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
            title: '资讯聚合 & 媒体优先级',
            description:
                '★ Techmeme + Twitter (follow CEOs) 浏览汇总,再回到源头/官方/发布会/官网 blog。纸媒 > 科技媒体。',
            items: [
                { name: 'Techmeme', url: 'https://www.techmeme.com/', note: '聚合入口' },
            ],
            groups: [
                {
                    label: '一线财经 / 主流纸媒',
                    items: [
                        { name: 'WSJ 华尔街日报', url: 'https://www.wsj.com/' },
                        { name: 'Bloomberg 彭博社', url: 'https://www.bloomberg.com/' },
                        { name: 'Reuters 路透社', url: 'https://www.reuters.com/' },
                        { name: 'NYT 纽约时报', url: 'https://www.nytimes.com/' },
                    ],
                },
                {
                    label: '财经周刊 / 特写',
                    items: [
                        { name: 'Financial Times', url: 'https://www.ft.com/' },
                        { name: 'The New Yorker', url: 'https://www.newyorker.com/' },
                        { name: 'Time 时代周刊', url: 'https://time.com/' },
                        { name: 'Forbes 福布斯', url: 'https://www.forbes.com/' },
                    ],
                },
                {
                    label: '科技深度',
                    items: [
                        { name: 'The Information', url: 'https://www.theinformation.com/' },
                    ],
                },
                {
                    label: '科技大众',
                    items: [
                        { name: 'Wired 连线', url: 'https://www.wired.com/' },
                        { name: 'TechCrunch (硅谷创业)', url: 'https://techcrunch.com/' },
                        { name: 'The Verge (数码 / AI)', url: 'https://www.theverge.com/' },
                    ],
                },
                {
                    label: '产品垂直',
                    items: [
                        { name: '9To5Google', url: 'https://9to5google.com/' },
                        { name: '9To5Mac', url: 'https://9to5mac.com/' },
                    ],
                },
            ],
        },
        {
            layer: 'Layer 2',
            title: '关键人物追踪',
            description:
                '通过特写文章、个人博客、推特、LinkedIn 理解行业趋势。',
            items: [
                { name: 'Ben Thompson — Stratechery', url: 'https://stratechery.com/' },
                { name: 'Sam Altman — Blog', url: 'https://blog.samaltman.com/' },
                { name: 'Dario Amodei', url: 'https://darioamodei.com/' },
                {
                    name: 'Steven Sinofsky — Hardcore Software',
                    url: 'https://hardcoresoftware.learningbyshipping.com/',
                },
                {
                    name: 'Amazon Best-Sellers: Computer & Tech Biographies',
                    url: 'https://www.amazon.com/Best-Sellers-Computer-Technology-Biographies/zgbs/books/3568',
                    note: '传记类书籍',
                },
            ],
        },
        {
            layer: 'Layer 3',
            title: '深度播客访谈',
            description: '优先看 YouTube 视频版本。',
            items: [
                { name: 'Y Combinator', url: 'https://www.youtube.com/@ycombinator' },
                { name: 'No Priors', url: 'https://www.youtube.com/@NoPriorsPodcast' },
                { name: 'Latent Space', url: 'https://www.youtube.com/@LatentSpacePod' },
                { name: 'AI Engineer', url: 'https://www.youtube.com/@aiDotEngineer' },
            ],
        },
        {
            layer: 'Layer 4',
            title: '技术深度学习',
            description:
                '开发者大会、知名 AI 团队案例分享、技术报告、论文、GitHub 开源社区。',
            items: [
                { name: 'Google Research Blog', url: 'https://research.google/blog/' },
                { name: 'OpenAI Research', url: 'https://openai.com/research' },
                { name: 'Anthropic Research', url: 'https://www.anthropic.com/research' },
                { name: 'Google DeepMind', url: 'https://deepmind.google/discover/blog/' },
                { name: 'arXiv', url: 'https://arxiv.org/list/cs.AI/recent' },
                { name: 'GitHub Trending', url: 'https://github.com/trending' },
            ],
        },
        {
            layer: 'Layer 5',
            title: '用户需求 & 市场调研',
            description: '技术调研、产品 idea 调研。',
            items: [
                { name: 'Reddit — r/LocalLLaMA', url: 'https://www.reddit.com/r/LocalLLaMA/' },
                { name: 'Reddit — r/MachineLearning', url: 'https://www.reddit.com/r/MachineLearning/' },
                { name: 'Hacker News', url: 'https://news.ycombinator.com/' },
                { name: 'Discord (官方开发者频道)', note: '各 AI 工具官方 Discord' },
                { name: '产品用户论坛 / 反馈区' },
            ],
        },
    ],
    bigTech: [
        {
            company: 'NVIDIA',
            people: [{ name: 'Jensen Huang', role: 'CEO' }],
            events: [
                { title: 'CES 2025', type: 'Keynote', speaker: 'Jensen Huang' },
                { title: 'SIGGRAPH 2024', type: 'Keynote', speaker: 'Jensen Huang' },
                {
                    title: 'National Taiwan University Commencement',
                    type: 'Keynote',
                    date: '2023',
                    speaker: 'Jensen Huang',
                },
                { title: 'GTC 2024', type: 'Keynote', speaker: 'Jensen Huang' },
                { title: 'COMPUTEX 2023', type: 'Keynote', speaker: 'Jensen Huang' },
                { title: 'AI Summit India 2024', type: 'Fireside Chat', speaker: 'Jensen Huang' },
                { title: 'DealBook Summit 2023', type: 'Interview', speaker: 'Jensen Huang' },
                { title: 'AI Summit Japan 2024', type: 'Fireside Chat', speaker: 'Jensen Huang' },
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
                { title: 'AI for Science: Demis Hassabis', date: 'Nov 20, 2024' },
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
                { title: 'Lex Fridman Podcast (Metaverse)', date: 'Dec 12, 2023' },
                { title: 'The Joe Rogan Experience', date: 'Apr 26, 2024' },
                { title: 'Dwarkesh Patel Podcast (Llama 3)', date: 'Apr 18, 2024' },
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
            githubUrl: 'https://github.com/placeholder/frontend-presentations',
        },
        {
            title: 'YouTube to Ebook',
            description:
                'Pipeline that takes a YouTube playlist and produces a polished EPUB with chapters, illustrations, and an index.',
            githubUrl: 'https://github.com/placeholder/yt-to-ebook',
        },
    ],
}

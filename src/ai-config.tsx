import type { AIConfig } from "./ai-config-types";
import {
    AI_SOURCES,
    AI_SOURCES_USAGE,
    AI_BIG_TECH,
    AI_BIG_TECH_ALSO_TRACKING,
} from "./ai-config-sources";

export type { AIConfig, VideoTag } from "./ai-config-types";

export const AI_CONFIG: AIConfig = {
    hero: {
        title: 'AI Sense Sources',
        intro: '这不是一份追求“大而全”的 AI 导航，而是我用于理解模型能力、产品趋势与 Agent 演进的个人信息系统。',
        positioning:
            '优先追踪一手发布、技术原文与深度访谈，再用社区讨论和中文内容补充市场反馈。',
        curationLabel: '编辑筛选，而非资源堆砌',
        updatedLabel: '最后更新',
        lastUpdated: '2026-08',
        updateNotes: [
            '重构六层信息源结构与阅读顺序',
            '突出一手信息、评测方法与产品判断',
            '隐藏缺少可访问链接的资源条目',
        ],
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
        // Onepod 信源 — 播客频道（海外科技 / AI / 产品 / 创业 YouTube）
        {
            title: 'Y Combinator',
            host: 'YouTube',
            description: '创业者、AI 公司和早期产品构建者的一手访谈。',
            url: 'https://www.youtube.com/@ycombinator',
        },
        {
            title: 'Every',
            host: 'YouTube',
            description: '围绕 AI、知识工作、组织和软件产品的深度内容。',
            url: 'https://www.youtube.com/@EveryInc',
        },
        {
            title: "Lenny's Podcast",
            host: 'YouTube',
            description: '产品增长、创业和团队建设的一线经验。',
            url: 'https://www.youtube.com/@LennysPodcast',
        },
        {
            title: 'Peter Yang',
            host: 'YouTube',
            description: '产品、创作者经济和 AI 工作流相关访谈。',
            url: 'https://www.youtube.com/@PeterYangYT',
        },
        {
            title: 'Latent Space',
            host: 'YouTube',
            description: '面向 AI 工程师和研究者的技术访谈与行业讨论。',
            url: 'https://www.youtube.com/@LatentSpacePod',
        },
        {
            title: 'The MAD Podcast (Matt Turck)',
            host: 'YouTube',
            description: '数据、AI、基础设施和企业软件创业者访谈。',
            url: 'https://www.youtube.com/@DataDrivenNYC',
        },
        {
            title: 'Lex Fridman',
            host: 'YouTube',
            description: 'AI、科学、工程和思想领域的长访谈。',
            url: 'https://www.youtube.com/@lexfridman',
        },
        {
            title: 'a16z',
            host: 'YouTube',
            description: '科技趋势、创业、投资和 AI 行业观点。',
            url: 'https://www.youtube.com/@a16z',
        },
        {
            title: 'South Park Commons',
            host: 'YouTube',
            description: '技术创业者、研究者和产品构建者的深度对话。',
            url: 'https://www.youtube.com/@southparkcommons',
        },
        {
            title: 'Stanford GSB',
            host: 'YouTube',
            description: '商业、领导力和技术趋势相关公开访谈。',
            url: 'https://www.youtube.com/@stanfordgsb',
        },
        {
            title: 'Google for Developers',
            host: 'YouTube',
            description: '开发者工具、AI API、平台能力和工程实践。',
            url: 'https://www.youtube.com/@GoogleDevelopers',
        },
        {
            title: 'TBPN',
            host: 'YouTube',
            description: '科技商业、AI 创业和硅谷实时讨论。',
            url: 'https://www.youtube.com/@TBPNLive',
        },
        {
            title: 'The Pragmatic Engineer',
            host: 'YouTube',
            description: '工程管理、软件行业和开发者职业观察。',
            url: 'https://www.youtube.com/@ThePragmaticEngineer',
        },
        {
            title: 'Andrej Karpathy',
            host: 'YouTube',
            description: 'AI 教育、深度学习、编程和技术直觉讲解。',
            url: 'https://www.youtube.com/@AndrejKarpathy',
        },
        {
            title: 'Anthropic',
            host: 'YouTube',
            description: 'Claude、AI 安全、模型能力和研究进展发布。',
            url: 'https://www.youtube.com/@anthropic-ai',
        },
        {
            title: 'Brett Malinowski',
            host: 'YouTube',
            description: 'AI 工具、自动化和创业机会拆解。',
            url: 'https://www.youtube.com/@TheBrettWay',
        },
        {
            title: 'Google DeepMind',
            host: 'YouTube',
            description: 'AI 研究、模型能力和前沿科学应用。',
            url: 'https://www.youtube.com/@googledeepmind',
        },
        {
            title: 'Mckay Wrigley',
            host: 'YouTube',
            description: 'AI coding、产品构建和个人自动化实践。',
            url: 'https://www.youtube.com/@realmckaywrigley',
        },
        {
            title: 'No Priors',
            host: 'YouTube',
            description: 'AI 创业者、研究者和投资人访谈。',
            url: 'https://www.youtube.com/@NoPriorsPodcast',
        },
        {
            title: 'The AI Daily Brief',
            host: 'YouTube',
            description: '每日 AI 新闻、产品动态和行业趋势。',
            url: 'https://www.youtube.com/@TheAIDailyBrief',
        },
        {
            title: 'Tiago Forte',
            host: 'YouTube',
            description: '知识管理、生产力和创作者工作流。',
            url: 'https://www.youtube.com/@TiagoForte',
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
            avatar: 'https://avatars.githubusercontent.com/u/275986651',
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
        // Onepod 信源 — 日报 RSS（AI / 开发者工具 / 科技媒体 / 内容产品）
        {
            title: 'simonwillison.net',
            description: "Simon Willison's Weblog 的 RSS 更新源。",
            url: 'https://simonwillison.net/atom/everything/',
        },
        {
            title: 'jeffgeerling.com',
            description: 'Jeff Geerling：Recent content on Jeff Geerling',
            url: 'https://www.jeffgeerling.com/blog.xml',
        },
        {
            title: 'seangoedecke.com',
            description: "seangoedecke.com RSS feed：Sean Goedecke's personal blog",
            url: 'https://www.seangoedecke.com/rss.xml',
        },
        {
            title: 'krebsonsecurity.com',
            description: 'Krebs on Security：In-depth security news and investigation',
            url: 'https://krebsonsecurity.com/feed/',
        },
        {
            title: 'daringfireball.net',
            description: 'Daring Fireball：By John Gruber',
            url: 'https://daringfireball.net/feeds/main',
        },
        {
            title: 'ericmigi.com',
            description: "Eric Migicovsky's Blog RSS Feed：Personal blog and portfolio",
            url: 'https://ericmigi.com/rss.xml',
        },
        {
            title: 'antirez.com',
            description: 'antirez.com 的 RSS 更新源。',
            url: 'http://antirez.com/rss',
        },
        {
            title: 'idiallo.com',
            description:
                'Software and Tech stories from an Insider：Knowledge accumulated through years of building software and writing about technology.',
            url: 'https://idiallo.com/feed.rss',
        },
        {
            title: 'maurycyz.com',
            description: "Maurycy's Blog：I sometimes post stuff here",
            url: 'https://maurycyz.com/index.xml',
        },
        {
            title: 'pluralistic.net',
            description:
                'Pluralistic: Daily links from Cory Doctorow：No trackers, no ads. Black type, white background.',
            url: 'https://pluralistic.net/feed/',
        },
        {
            title: 'shkspr.mobi',
            description: "Terence Eden's Blog：Regular nonsense about tech and its effects",
            url: 'https://shkspr.mobi/blog/feed/',
        },
        {
            title: 'lcamtuf.substack.com',
            description:
                "lcamtuf's thing：Geek culture, algorithms, electronic circuit design, and chainsaw safety tips",
            url: 'https://lcamtuf.substack.com/feed',
        },
        {
            title: 'mitchellh.com',
            description: "Mitchell Hashimoto：Mitchell Hashimoto's personal website.",
            url: 'https://mitchellh.com/feed.xml',
        },
        {
            title: 'dynomight.net',
            description: 'DYNOMIGHT：science and existential angst',
            url: 'https://dynomight.net/feed.xml',
        },
        {
            title: 'utcc.utoronto.ca/~cks',
            description: 'Wandering Thoughts 的 RSS 更新源。',
            url: 'https://utcc.utoronto.ca/~cks/space/blog/?atom',
        },
        {
            title: 'xeiaso.net',
            description: "Xe Iaso's blog：Thoughts and musings from Xe Iaso",
            url: 'https://xeiaso.net/blog.rss',
        },
        {
            title: 'devblogs.microsoft.com/oldnewthing',
            description: 'The Old New Thing：Practical development throughout the evolution of Windows.',
            url: 'https://devblogs.microsoft.com/oldnewthing/feed',
        },
        {
            title: 'righto.com',
            description:
                "Ken Shirriff's blog：Computer history, restoring vintage computers, IC reverse engineering, and whatever",
            url: 'https://www.righto.com/feeds/posts/default',
        },
        {
            title: 'lucumr.pocoo.org',
            description:
                "Armin Ronacher's Thoughts and Writings：A personal blog about programming, games and random thoughts.",
            url: 'https://lucumr.pocoo.org/feed.atom',
        },
        {
            title: 'skyfall.dev',
            description: 'Mahad Kalam：Personal website about Rust, TypeScript, web development, and more.',
            url: 'https://skyfall.dev/rss.xml',
        },
        {
            title: 'garymarcus.substack.com',
            description:
                'Marcus on AI：Gary Marcus on AI, cognitive science, risks, and public technology choices.',
            url: 'https://garymarcus.substack.com/feed',
        },
        {
            title: 'rachelbythebay.com',
            description: 'rachelbythebay.com 的 RSS 更新源。',
            url: 'https://rachelbythebay.com/w/atom.xml',
        },
        {
            title: 'overreacted.io',
            description: 'overreacted：A blog by Dan Abramov',
            url: 'https://overreacted.io/rss.xml',
        },
        {
            title: 'timsh.org',
            description: 'tim.sh：privacy, security and self-hosting related stuff',
            url: 'https://timsh.org/rss/',
        },
        {
            title: 'johndcook.com',
            description: 'John D. Cook：Applied mathematics, statistics, computing, and technical notes.',
            url: 'https://www.johndcook.com/blog/feed/',
        },
        {
            title: 'gilesthomas.com',
            description: "Giles' blog 的 RSS 更新源。",
            url: 'https://gilesthomas.com/feed/rss.xml',
        },
        {
            title: 'matklad.github.io',
            description: "matklad：matklad's Arts&Crafts",
            url: 'https://matklad.github.io/feed.xml',
        },
        {
            title: 'derekthompson.org',
            description: 'Derek Thompson | The Atlantic 的 RSS 更新源。',
            url: 'https://www.theatlantic.com/feed/author/derek-thompson/',
        },
        {
            title: 'evanhahn.com',
            description: "Evan Hahn：I'm Evan Hahn, a programmer.",
            url: 'https://evanhahn.com/feed.xml',
        },
        {
            title: 'terriblesoftware.org',
            description: 'Terrible Software：Software, engineering leadership, and tech.',
            url: 'https://terriblesoftware.org/feed/',
        },
        {
            title: 'rakhim.exotext.com',
            description:
                "Rakhim's blog：Personal writing from Rakhim, staff engineer and maker of Exotext and Minifeed.",
            url: 'https://rakhim.exotext.com/rss.xml',
        },
        {
            title: 'joanwestenberg.com',
            description: 'Joan Westenberg 的 RSS 更新源。',
            url: 'https://joanwestenberg.com/rss',
        },
        {
            title: 'xania.org',
            description: "Matt Godbolt's blog 的 RSS 更新源。",
            url: 'https://xania.org/feed',
        },
        {
            title: 'micahflee.com',
            description: 'micahflee：Security and productivity for journalists, researchers, and activists.',
            url: 'https://micahflee.com/feed/',
        },
        {
            title: 'nesbitt.io',
            description:
                'Andrew Nesbitt：Package management and open source metadata expert building Ecosyste.ms.',
            url: 'https://nesbitt.io/feed.xml',
        },
        {
            title: 'construction-physics.com',
            description: 'Construction Physics：Essays about buildings, infrastructure, and industrial technology.',
            url: 'https://www.construction-physics.com/feed',
        },
        {
            title: 'tedium.co',
            description: 'Tedium：A twice-weekly newsletter taking deep dives into the long tail.',
            url: 'https://feed.tedium.co/',
        },
        {
            title: 'susam.net',
            description: 'Susam Pal 的 RSS 更新源。',
            url: 'https://susam.net/feed.xml',
        },
        {
            title: 'entropicthoughts.com',
            description: 'Entropic Thoughts 的 RSS 更新源。',
            url: 'https://entropicthoughts.com/feed.xml',
        },
        {
            title: 'buttondown.com/hillelwayne',
            description: 'Computer Things：Hillel Wayne on software, formal methods, and computer things.',
            url: 'https://buttondown.com/hillelwayne/rss',
        },
        {
            title: 'dwarkesh.com',
            description: 'Dwarkesh Podcast 的 RSS 更新源。',
            url: 'https://www.dwarkeshpatel.com/feed',
        },
        {
            title: 'borretti.me',
            description: 'Fernando Borretti：Personal website',
            url: 'https://borretti.me/feed.xml',
        },
        {
            title: 'wheresyoured.at',
            description: "Where's Your Ed At 的 RSS 更新源。",
            url: 'https://www.wheresyoured.at/rss/',
        },
        {
            title: 'jayd.ml',
            description: "Jayden's Blog：Jayden's Amazing Blog",
            url: 'https://jayd.ml/feed.xml',
        },
        {
            title: 'minimaxir.com',
            description: "Max Woolf's Blog：Recent content on Max Woolf's Blog",
            url: 'https://minimaxir.com/index.xml',
        },
        {
            title: 'geohot.github.io',
            description: 'the singularity is nearer：A home for poorly researched ideas that get repeated anyway.',
            url: 'https://geohot.github.io/blog/feed.xml',
        },
        {
            title: 'paulgraham.com',
            description: 'Paul Graham: Essays：Scraped feed provided by aaronsw.com',
            url: 'http://www.aaronsw.com/2002/feeds/pgessays.rss',
        },
        {
            title: 'filfre.net',
            description: 'The Digital Antiquarian 的 RSS 更新源。',
            url: 'https://www.filfre.net/feed/',
        },
        {
            title: 'blog.jim-nielsen.com',
            description: "Jim Nielsen's Blog 的 RSS 更新源。",
            url: 'https://blog.jim-nielsen.com/feed.xml',
        },
        {
            title: 'dfarq.homeip.net',
            description: 'Dfarq 的 RSS 更新源。',
            url: 'https://dfarq.homeip.net/feed/',
        },
        {
            title: 'jyn.dev',
            description: 'jyn.dev 的 RSS 更新源。',
            url: 'https://jyn.dev/atom.xml',
        },
        {
            title: 'geoffreylitt.com',
            description: 'Geoffrey Litt 的 RSS 更新源。',
            url: 'https://www.geoffreylitt.com/feed.xml',
        },
        {
            title: 'downtowndougbrown.com',
            description: 'Downtown Doug Brown 的 RSS 更新源。',
            url: 'https://www.downtowndougbrown.com/feed/',
        },
        {
            title: 'brutecat.com',
            description: 'brutecat.com 的 RSS 更新源。',
            url: 'https://brutecat.com/rss.xml',
        },
        {
            title: 'eli.thegreenplace.net',
            description: "Eli Bendersky's website 的 RSS 更新源。",
            url: 'https://eli.thegreenplace.net/feeds/all.atom.xml',
        },
        {
            title: 'abortretry.fail',
            description: 'Abort Retry Fail 的 RSS 更新源。',
            url: 'https://www.abortretry.fail/feed',
        },
        {
            title: 'fabiensanglard.net',
            description: 'Fabien Sanglard：Chronicles of software wizardry',
            url: 'https://fabiensanglard.net/rss.xml',
        },
        {
            title: 'oldvcr.blogspot.com',
            description: 'Old Vintage Computing Research：REWIND and PLAY',
            url: 'https://oldvcr.blogspot.com/feeds/posts/default',
        },
        {
            title: 'bogdanthegeek.github.io',
            description: 'Bogdan the Geek 的 RSS 更新源。',
            url: 'https://bogdanthegeek.github.io/blog/index.xml',
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
    sources: AI_SOURCES,
    sourcesUsage: AI_SOURCES_USAGE,
    bigTech: AI_BIG_TECH,
    bigTechAlsoTracking: AI_BIG_TECH_ALSO_TRACKING,
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

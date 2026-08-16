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
        title: 'AI Learning Library',
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

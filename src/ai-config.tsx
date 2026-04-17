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
    }[]
    podcasts: {
        title: string
        host: string
        description: string
        url: string
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
        },
        {
            title: 'How I use LLMs',
            channel: 'Andrej Karpathy',
            duration: '2h 7m',
            url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
            tags: ['Product', 'Tools'],
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
            title: 'Lex Fridman Podcast',
            host: 'Lex Fridman',
            description:
                'Long-form conversations with researchers and founders. Strongest episodes for AI: Karpathy, Altman, Hassabis, LeCun.',
            url: 'https://www.youtube.com/@lexfridman',
        },
        {
            title: 'Dwarkesh Podcast',
            host: 'Dwarkesh Patel',
            description:
                'Technical and philosophical interviews. Dwarkesh asks the questions other hosts do not.',
            url: 'https://www.youtube.com/@DwarkeshPatel',
        },
        {
            title: 'No Priors',
            host: 'Sarah Guo & Elad Gil',
            description:
                'Investor-perspective conversations with AI founders and researchers. Tight, product-focused.',
            url: 'https://www.youtube.com/@NoPriorsPodcast',
        },
        {
            title: 'Latent Space',
            host: 'swyx & Alessio',
            description:
                'Engineering-forward discussions of the AI stack — models, tools, evals, deployments.',
            url: 'https://www.latent.space/',
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
        },
        {
            name: 'Cursor',
            description:
                'AI-first code editor. Inline completions and agent-style edits beat everything else I have tried.',
            url: 'https://cursor.com/',
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

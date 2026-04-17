# AI Learning Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/ai` route presenting a curated AI learning resource hub with 8 sections (Hero / Videos / Podcasts / People / Newsletters / Products / Prompts / Skills), modeled after https://zara.faces.site/ai. Rename site owner to Chauncey Lee. Scope a `radix-nova` visual theme to the new page only.

**Architecture:** Static data file (`src/ai-config.tsx`) → server-rendered `/ai/page.tsx` wrapping all sections in a `.theme-radix-nova` div → per-section components in `src/components/ai/`, most server-rendered with three client islands (video filter+table, prompt accordion).

**Tech Stack:** Next.js 14 App Router (RSC), Tailwind CSS v3, shadcn/ui, lucide-react, TypeScript. Project has no test suite — verification is manual via dev server + `npm run build`.

**Reference:** [docs/superpowers/specs/2026-04-17-ai-learning-library-design.md](../specs/2026-04-17-ai-learning-library-design.md)

---

## Conventions

- **Working directory:** `/Users/chauncey2025/Documents/GitHub/personal-website1101/.claude/worktrees/vigorous-wescoff-73fb22`
- **Dev server check:** `npm run dev` then load `http://localhost:3000/<path>` and inspect — there is no automated test suite
- **Build check:** `npm run build` must succeed with no new type errors
- **Layout constraint:** `src/app/layout.tsx` wraps `{children}` in `<main className='mx-auto max-w-2xl ...'>`. The `/ai` page content is constrained to `max-w-2xl` (672 px). Designs must fit that width.
- **Icons:** use `Icons` from `src/components/icons.tsx` (wraps `lucide-react`). If a needed icon is missing, import from `lucide-react` directly inside the new component.
- **Commit style:** short imperative lowercase subject, no prefix

---

## Task 1: Rename owner to Chauncey Lee

**Files:**
- Modify: `src/config.tsx` (line 45)
- Modify: `src/components/contact.tsx` (line 18)
- Modify: `src/app/projects/page.tsx` (audit)

- [ ] **Step 1: Search for all "Samuel" string occurrences**

Run: `grep -rn "Samuel" src/ --include="*.tsx" --include="*.ts"`
Expected output includes at least:
```
src/config.tsx:45:    name: 'Samuel Zhang',
src/components/contact.tsx:18:                <p className='text-sm text-muted-foreground'>© 2025 Samuel Zhang</p>
```

Also run: `grep -rn "Zhang" src/ --include="*.tsx" --include="*.ts"` and confirm no further occurrences outside those already identified.

- [ ] **Step 2: Edit `src/config.tsx` line 45**

Change:
```tsx
    name: 'Samuel Zhang',
```
to:
```tsx
    name: 'Chauncey Lee',
```

- [ ] **Step 3: Edit `src/components/contact.tsx` line 18**

Change:
```tsx
<p className='text-sm text-muted-foreground'>© 2025 Samuel Zhang</p>
```
to:
```tsx
<p className='text-sm text-muted-foreground'>© 2025 Chauncey Lee</p>
```

- [ ] **Step 4: Audit `src/app/projects/page.tsx`**

Read the file. If any hardcoded "Samuel" or "Zhang" strings exist, replace with "Chauncey" / "Lee". If none, no edit needed.

- [ ] **Step 5: Verify homepage**

Run: `npm run dev`
Load: `http://localhost:3000/`
Expected: Header shows "Chauncey Lee"; footer shows "© 2025 Chauncey Lee"

- [ ] **Step 6: Commit**

```bash
git add src/config.tsx src/components/contact.tsx src/app/projects/page.tsx
git commit -m "rename site owner to Chauncey Lee"
```

---

## Task 2: Add scoped radix-nova theme variables

**Files:**
- Modify: `src/app/globals.css`

**Context:** `radix-nova` is a newer shadcn style variant with a slightly more saturated/modern palette. We implement it as CSS variables under a `.theme-radix-nova` scope class so it only applies to `/ai` and does not change the homepage. Values below are tuned for a neutral-black base with a subtle indigo accent — adjust after visual review if needed.

- [ ] **Step 1: Append scoped theme block to `src/app/globals.css`**

Add this block after the existing `@layer base` block (after the closing `}` on line 88). Final file length will increase by ~60 lines:

```css
@layer base {
    .theme-radix-nova {
        --background: 0 0% 99%;
        --foreground: 240 10% 4%;

        --card: 0 0% 100%;
        --card-foreground: 240 10% 4%;

        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 4%;

        --primary: 240 6% 10%;
        --primary-foreground: 0 0% 98%;

        --secondary: 240 5% 96%;
        --secondary-foreground: 240 6% 10%;

        --muted: 240 5% 96%;
        --muted-foreground: 240 4% 35%;

        --accent: 250 90% 66%;
        --accent-foreground: 0 0% 100%;

        --destructive: 0 84% 60%;
        --destructive-foreground: 0 0% 98%;

        --border: 240 6% 90%;
        --input: 240 6% 90%;
        --ring: 250 90% 66%;

        --radius: 0.75rem;
    }

    .dark .theme-radix-nova {
        --background: 240 10% 4%;
        --foreground: 0 0% 98%;

        --card: 240 7% 8%;
        --card-foreground: 0 0% 98%;

        --popover: 240 7% 8%;
        --popover-foreground: 0 0% 98%;

        --primary: 0 0% 98%;
        --primary-foreground: 240 6% 10%;

        --secondary: 240 5% 14%;
        --secondary-foreground: 0 0% 98%;

        --muted: 240 5% 14%;
        --muted-foreground: 240 5% 70%;

        --accent: 250 85% 72%;
        --accent-foreground: 240 10% 4%;

        --destructive: 0 63% 40%;
        --destructive-foreground: 0 0% 98%;

        --border: 240 5% 18%;
        --input: 240 5% 18%;
        --ring: 250 85% 72%;
    }
}
```

- [ ] **Step 2: Verify the dev server still compiles**

Run: `npm run dev` (if not already running)
Load: `http://localhost:3000/`
Expected: homepage renders identically to before (no visual change — radix-nova not activated anywhere yet)

- [ ] **Step 3: Update components.json**

Replace the entire contents of `components.json` with:

```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "radix-nova",
    "rsc": true,
    "tsx": true,
    "tailwind": {
        "config": "tailwind.config.ts",
        "css": "src/app/globals.css",
        "baseColor": "neutral",
        "cssVariables": true,
        "prefix": ""
    },
    "iconLibrary": "lucide",
    "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks"
    }
}
```

Notes:
- `rsc: true` kept (project uses App Router RSC — do NOT switch to `false`)
- `css` points to actual file path, not `src/global.css`
- `@react-bits` registry from user's schema is omitted — not needed for this feature

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css components.json
git commit -m "add scoped radix-nova theme variables for /ai route"
```

---

## Task 3: Install shadcn components (accordion, table, toggle-group)

**Files:**
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/table.tsx`
- Create: `src/components/ui/toggle-group.tsx`
- Create: `src/components/ui/toggle.tsx` (required by toggle-group)
- Modify: `package.json` / `package-lock.json` (auto)

**Context:** shadcn CLI will add required Radix primitives as dependencies. If the CLI reports "style radix-nova not found", fall back to installing with `--style default` for each command (components are style-agnostic at the JSX level; the theme variables drive visual output).

- [ ] **Step 1: Install accordion**

Run: `npx shadcn@latest add accordion`
If prompted about style not found, retry with: `npx shadcn@latest add accordion --style default`
Expected: file `src/components/ui/accordion.tsx` created; dependency `@radix-ui/react-accordion` added to `package.json`

- [ ] **Step 2: Install table**

Run: `npx shadcn@latest add table` (or with `--style default` fallback)
Expected: `src/components/ui/table.tsx` created. Table is pure markup, no new Radix dep.

- [ ] **Step 3: Install toggle-group (pulls in toggle)**

Run: `npx shadcn@latest add toggle-group` (or with fallback)
Expected: `src/components/ui/toggle-group.tsx` AND `src/components/ui/toggle.tsx` created; `@radix-ui/react-toggle-group` and `@radix-ui/react-toggle` added

- [ ] **Step 4: Verify all four files exist**

Run: `ls src/components/ui/ | grep -E 'accordion|table|toggle'`
Expected output (exactly these four lines):
```
accordion.tsx
table.tsx
toggle-group.tsx
toggle.tsx
```

- [ ] **Step 5: Verify build still passes**

Run: `npm run build`
Expected: build completes with no errors. Warnings are OK.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ package.json package-lock.json
git commit -m "add shadcn accordion, table, toggle-group components"
```

---

## Task 4: Create AI config data file

**Files:**
- Create: `src/ai-config.tsx`

**Context:** Single source of truth for all `/ai` page content. Placeholder items below are a mix of real references from Zara's page (NotebookLM, Andrej Karpathy, Lex Fridman, etc.) and sensible defaults. User will replace with their own curation after the feature ships.

- [ ] **Step 1: Create `src/ai-config.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors related to `src/ai-config.tsx`. Pre-existing errors in other files (if any) are not regressions.

- [ ] **Step 3: Commit**

```bash
git add src/ai-config.tsx
git commit -m "add AI learning library data config"
```

---

## Task 5: Create `/ai` route skeleton

**Files:**
- Create: `src/app/ai/page.tsx`

**Context:** Page wraps all sections in a `.theme-radix-nova` div so theme variables scope correctly. For this task, the page only renders the breadcrumb and a placeholder — individual section components are built in later tasks and wired in Task 14.

- [ ] **Step 1: Create `src/app/ai/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { AI_CONFIG } from '@/ai-config'

export const metadata: Metadata = {
    title: 'AI Learning Library',
    description: AI_CONFIG.hero.intro,
}

export default function AIPage() {
    return (
        <div className='theme-radix-nova'>
            <div className='flex flex-col gap-12 bg-background text-foreground'>
                <nav className='px-4'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href='/'>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>AI Library</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </nav>

                <div className='px-4'>
                    <p className='text-muted-foreground'>
                        Sections will render here (Task 14).
                    </p>
                </div>
            </div>
        </div>
    )
}
```

- [ ] **Step 2: Verify the page loads**

Run: `npm run dev` (if not running)
Load: `http://localhost:3000/ai`
Expected:
- Breadcrumb renders: "Home / AI Library"
- Placeholder text "Sections will render here (Task 14)."
- No console errors
- Clicking "Home" navigates back to `/`

- [ ] **Step 3: Commit**

```bash
git add src/app/ai/page.tsx
git commit -m "scaffold /ai route with breadcrumb and theme wrapper"
```

---

## Task 6: Build AI Hero component

**Files:**
- Create: `src/components/ai/ai-hero.tsx`
- Create: `public/images/ai-hero.jpg` (placeholder — see step 4)

- [ ] **Step 1: Create `src/components/ai/ai-hero.tsx`**

```tsx
import Image from 'next/image'
import { AI_CONFIG } from '@/ai-config'

const AIHero = () => {
    return (
        <section className='flex flex-col gap-6 px-4 animate-slide-from-down-and-fade-1'>
            <div className='overflow-hidden rounded-xl border'>
                <Image
                    src={AI_CONFIG.hero.heroImage}
                    alt='AI Learning Library hero'
                    width={1200}
                    height={600}
                    className='h-auto w-full object-cover'
                    priority
                />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    {AI_CONFIG.hero.title}
                </h1>
                <p className='leading-relaxed text-muted-foreground'>
                    {AI_CONFIG.hero.intro}
                </p>
            </div>
        </section>
    )
}

export default AIHero
```

- [ ] **Step 2: Placeholder hero image**

Check if `public/images/` exists. If not, the engineer running this task should copy an existing project image as a placeholder:

Run: `ls public/images/`

If `ai-hero.jpg` does not exist, create a placeholder by copying the headshot:
Run: `cp public/images/headshot.png public/images/ai-hero.jpg`

If `public/images/headshot.png` also does not exist, skip this step and add `ai-hero.jpg` to the known follow-ups list. The page will 404 the image but still render the layout. The user will supply a real image later.

- [ ] **Step 3: Confirm Image component has no build error**

Next.js requires `<Image>` src to resolve or the build fails in prod mode, but dev mode tolerates missing images. Run: `npm run dev` and load `/ai` to confirm no runtime error beyond the broken image icon.

- [ ] **Step 4: Commit**

```bash
git add src/components/ai/ai-hero.tsx public/images/
git commit -m "add AIHero component for /ai page"
```

---

## Task 7: Build Video filter component

**Files:**
- Create: `src/components/ai/video-filter.tsx`

**Context:** Client component that renders a toggle-group of tags. Controlled — parent owns selected-tags state.

- [ ] **Step 1: Create `src/components/ai/video-filter.tsx`**

```tsx
'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { VideoTag } from '@/ai-config'

interface VideoFilterProps {
    tags: VideoTag[]
    selected: VideoTag[]
    onSelectedChange: (next: VideoTag[]) => void
}

const VideoFilter = ({ tags, selected, onSelectedChange }: VideoFilterProps) => {
    return (
        <ToggleGroup
            type='multiple'
            value={selected}
            onValueChange={(next) => onSelectedChange(next as VideoTag[])}
            variant='outline'
            size='sm'
            className='flex flex-wrap justify-start gap-2'
        >
            {tags.map((tag) => (
                <ToggleGroupItem key={tag} value={tag} aria-label={tag}>
                    {tag}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}

export default VideoFilter
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors. If shadcn's ToggleGroup does not accept `variant='outline'` on your installed version, remove that prop — it is a minor cosmetic preference.

- [ ] **Step 3: Commit**

```bash
git add src/components/ai/video-filter.tsx
git commit -m "add VideoFilter toggle group component"
```

---

## Task 8: Build Video table component

**Files:**
- Create: `src/components/ai/video-table.tsx`

**Context:** Client component (holds selected-tags state). Computes unique tags from data. Filters rows: empty selection = show all; any selection = show rows whose tags include at least one selected tag (OR semantics).

- [ ] **Step 1: Create `src/components/ai/video-table.tsx`**

```tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Youtube, FileText } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import VideoFilter from '@/components/ai/video-filter'
import { AI_CONFIG, type VideoTag } from '@/ai-config'

const VideoTable = () => {
    const videos = AI_CONFIG.videos

    const allTags = useMemo<VideoTag[]>(() => {
        const set = new Set<VideoTag>()
        for (const v of videos) for (const t of v.tags) set.add(t)
        return Array.from(set)
    }, [videos])

    const [selected, setSelected] = useState<VideoTag[]>([])

    const filtered = useMemo(() => {
        if (selected.length === 0) return videos
        return videos.filter((v) => v.tags.some((t) => selected.includes(t)))
    }, [videos, selected])

    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-2'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>YouTube Videos</h2>
                <p className='text-sm text-muted-foreground'>
                    Curated videos. Filter by tag.
                </p>
            </div>

            <VideoFilter
                tags={allTags}
                selected={selected}
                onSelectedChange={setSelected}
            />

            {filtered.length === 0 ? (
                <p className='py-6 text-center text-sm text-muted-foreground'>
                    No videos match the selected tags.
                </p>
            ) : (
                <div className='overflow-x-auto rounded-lg border'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className='hidden sm:table-cell'>
                                    Tags
                                </TableHead>
                                <TableHead className='w-20 text-right'>
                                    Links
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((video, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <Link
                                            href={video.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='font-medium hover:underline'
                                        >
                                            {video.title}
                                        </Link>
                                        <div className='mt-0.5 text-xs text-muted-foreground'>
                                            {video.channel} · {video.duration}
                                        </div>
                                        <div className='mt-1 flex flex-wrap gap-1 sm:hidden'>
                                            {video.tags.map((t) => (
                                                <Badge
                                                    key={t}
                                                    variant='outline'
                                                    className='text-[10px]'
                                                >
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className='hidden sm:table-cell'>
                                        <div className='flex flex-wrap gap-1'>
                                            {video.tags.map((t) => (
                                                <Badge
                                                    key={t}
                                                    variant='outline'
                                                >
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex items-center justify-end gap-1'>
                                            <Link
                                                href={video.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label='YouTube'
                                                className='text-muted-foreground hover:text-foreground'
                                            >
                                                <Youtube className='size-4' />
                                            </Link>
                                            {video.tldwUrl && (
                                                <Link
                                                    href={video.tldwUrl}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label='TLDW summary'
                                                    className='text-muted-foreground hover:text-foreground'
                                                >
                                                    <FileText className='size-4' />
                                                </Link>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </section>
    )
}

export default VideoTable
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ai/video-table.tsx
git commit -m "add VideoTable with tag filtering"
```

---

## Task 9: Build Podcast grid

**Files:**
- Create: `src/components/ai/podcast-grid.tsx`

- [ ] **Step 1: Create `src/components/ai/podcast-grid.tsx`**

```tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { AI_CONFIG } from '@/ai-config'

const PodcastGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Podcasts</h2>
                <p className='text-sm text-muted-foreground'>
                    Video podcasts I listen to regularly.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.podcasts.map((podcast, idx) => (
                    <Card
                        key={idx}
                        className='flex flex-col gap-2 p-4 transition-colors hover:bg-accent/10'
                    >
                        <Link
                            href={podcast.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-start justify-between gap-2'
                        >
                            <div className='flex flex-col gap-0.5'>
                                <h3 className='font-medium group-hover:underline'>
                                    {podcast.title}
                                </h3>
                                <p className='text-xs text-muted-foreground'>
                                    {podcast.host}
                                </p>
                            </div>
                            <ArrowUpRight className='size-4 shrink-0 text-muted-foreground group-hover:text-foreground' />
                        </Link>
                        <p className='text-sm text-muted-foreground'>
                            {podcast.description}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default PodcastGrid
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai/podcast-grid.tsx
git commit -m "add PodcastGrid component"
```

---

## Task 10: Build People grid

**Files:**
- Create: `src/components/ai/people-grid.tsx`

- [ ] **Step 1: Create `src/components/ai/people-grid.tsx`**

```tsx
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { AI_CONFIG } from '@/ai-config'
import { getInitials } from '@/lib/utils'

const PeopleGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>People to Follow</h2>
                <p className='text-sm text-muted-foreground'>
                    Builders and researchers worth following on X.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.people.map((person, idx) => (
                    <Link
                        key={idx}
                        href={person.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group'
                    >
                        <Card className='flex items-center gap-3 p-4 transition-colors hover:bg-accent/10'>
                            <Avatar className='size-10 shrink-0'>
                                <AvatarImage src={person.avatar} alt={person.name} />
                                <AvatarFallback>
                                    {getInitials(person.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex min-w-0 flex-col gap-0.5'>
                                <div className='flex items-center gap-1.5'>
                                    <h3 className='truncate font-medium group-hover:underline'>
                                        {person.name}
                                    </h3>
                                    <span className='text-xs text-muted-foreground'>
                                        {person.handle}
                                    </span>
                                </div>
                                <p className='line-clamp-2 text-xs text-muted-foreground'>
                                    {person.role}
                                </p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default PeopleGrid
```

- [ ] **Step 2: Check if `getInitials` exists**

Run: `grep -n "getInitials" src/lib/utils.ts`
Expected: match found (it is already used by `src/components/header.tsx`).
If missing, add to `src/lib/utils.ts`:
```ts
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0] ?? '')
        .join('')
        .toUpperCase()
        .slice(0, 2)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ai/people-grid.tsx src/lib/utils.ts
git commit -m "add PeopleGrid component"
```

---

## Task 11: Build Newsletter list

**Files:**
- Create: `src/components/ai/newsletter-list.tsx`

- [ ] **Step 1: Create `src/components/ai/newsletter-list.tsx`**

```tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AI_CONFIG } from '@/ai-config'

const NewsletterList = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Newsletters & Articles</h2>
                <p className='text-sm text-muted-foreground'>
                    Writers who consistently publish signal over noise.
                </p>
            </div>

            <ul className='flex flex-col divide-y divide-border rounded-lg border'>
                {AI_CONFIG.newsletters.map((n, idx) => (
                    <li key={idx}>
                        <Link
                            href={n.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-start justify-between gap-3 p-3 transition-colors hover:bg-accent/10'
                        >
                            <div className='flex min-w-0 flex-col gap-0.5'>
                                <h3 className='font-medium group-hover:underline'>
                                    {n.title}
                                </h3>
                                <p className='text-sm text-muted-foreground'>
                                    {n.description}
                                </p>
                            </div>
                            <ArrowUpRight className='size-4 shrink-0 text-muted-foreground group-hover:text-foreground' />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default NewsletterList
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai/newsletter-list.tsx
git commit -m "add NewsletterList component"
```

---

## Task 12: Build Product grid

**Files:**
- Create: `src/components/ai/product-grid.tsx`

- [ ] **Step 1: Create `src/components/ai/product-grid.tsx`**

```tsx
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { AI_CONFIG } from '@/ai-config'

const ProductGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Recommended Products</h2>
                <p className='text-sm text-muted-foreground'>
                    Tools I personally use.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.products.map((product, idx) => {
                    const Icon = product.icon
                        ? Icons[product.icon]
                        : Sparkles
                    return (
                        <Link
                            key={idx}
                            href={product.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group'
                        >
                            <Card className='flex items-start gap-3 p-4 transition-colors hover:bg-accent/10'>
                                <Icon className='mt-0.5 size-5 shrink-0 text-muted-foreground' />
                                <div className='flex min-w-0 flex-col gap-1'>
                                    <div className='flex items-center gap-1.5'>
                                        <h3 className='font-medium group-hover:underline'>
                                            {product.name}
                                        </h3>
                                        <ArrowUpRight className='size-3 text-muted-foreground' />
                                    </div>
                                    <p className='text-sm text-muted-foreground'>
                                        {product.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default ProductGrid
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai/product-grid.tsx
git commit -m "add ProductGrid component"
```

---

## Task 13: Build Prompt accordion

**Files:**
- Create: `src/components/ai/prompt-accordion.tsx`

**Context:** Client component — needs `navigator.clipboard` for copy-to-clipboard. Each prompt renders inside an `<AccordionItem>`.

- [ ] **Step 1: Create `src/components/ai/prompt-accordion.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { AI_CONFIG } from '@/ai-config'

const PromptAccordion = () => {
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

    const copy = async (text: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedIdx(idx)
            setTimeout(() => setCopiedIdx(null), 1500)
        } catch {
            setCopiedIdx(null)
        }
    }

    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-5'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Prompts</h2>
                <p className='text-sm text-muted-foreground'>
                    System prompts I reuse. Click to expand and copy.
                </p>
            </div>

            <Accordion type='multiple' className='rounded-lg border px-4'>
                {AI_CONFIG.prompts.map((prompt, idx) => (
                    <AccordionItem key={idx} value={`prompt-${idx}`}>
                        <AccordionTrigger className='text-left'>
                            <div className='flex flex-col items-start gap-0.5'>
                                <span className='font-medium'>
                                    {prompt.title}
                                </span>
                                <span className='text-xs font-normal text-muted-foreground'>
                                    {prompt.description}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2'>
                                <pre className='overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 font-mono text-xs'>
                                    {prompt.content}
                                </pre>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() =>
                                        copy(prompt.content, idx)
                                    }
                                    className='self-end'
                                >
                                    {copiedIdx === idx ? (
                                        <>
                                            <Check className='mr-1.5 size-3.5' />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className='mr-1.5 size-3.5' />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default PromptAccordion
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai/prompt-accordion.tsx
git commit -m "add PromptAccordion with copy-to-clipboard"
```

---

## Task 14: Build Skills grid

**Files:**
- Create: `src/components/ai/skills-grid.tsx`

- [ ] **Step 1: Create `src/components/ai/skills-grid.tsx`**

```tsx
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AI_CONFIG } from '@/ai-config'

const SkillsGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-5'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Skills</h2>
                <p className='text-sm text-muted-foreground'>
                    Small projects I have open-sourced.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.skills.map((skill, idx) => (
                    <Card
                        key={idx}
                        className='flex flex-col gap-3 p-4 transition-colors hover:bg-accent/10'
                    >
                        <div className='flex flex-col gap-1'>
                            <h3 className='font-medium'>{skill.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                                {skill.description}
                            </p>
                        </div>
                        <div className='flex gap-2'>
                            <Button asChild variant='outline' size='sm'>
                                <Link
                                    href={skill.githubUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <Github className='mr-1.5 size-3.5' />
                                    GitHub
                                </Link>
                            </Button>
                            {skill.demoUrl && (
                                <Button asChild variant='outline' size='sm'>
                                    <Link
                                        href={skill.demoUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <ExternalLink className='mr-1.5 size-3.5' />
                                        Demo
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default SkillsGrid
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai/skills-grid.tsx
git commit -m "add SkillsGrid component"
```

---

## Task 15: Wire all sections into `/ai` page

**Files:**
- Modify: `src/app/ai/page.tsx`

- [ ] **Step 1: Replace `src/app/ai/page.tsx` with the final composition**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import AIHero from '@/components/ai/ai-hero'
import VideoTable from '@/components/ai/video-table'
import PodcastGrid from '@/components/ai/podcast-grid'
import PeopleGrid from '@/components/ai/people-grid'
import NewsletterList from '@/components/ai/newsletter-list'
import ProductGrid from '@/components/ai/product-grid'
import PromptAccordion from '@/components/ai/prompt-accordion'
import SkillsGrid from '@/components/ai/skills-grid'
import { AI_CONFIG } from '@/ai-config'

export const metadata: Metadata = {
    title: 'AI Learning Library',
    description: AI_CONFIG.hero.intro,
}

export default function AIPage() {
    return (
        <div className='theme-radix-nova'>
            <div className='flex flex-col gap-12 bg-background text-foreground'>
                <nav className='px-4'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href='/'>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>AI Library</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </nav>

                <AIHero />
                <VideoTable />
                <PodcastGrid />
                <PeopleGrid />
                <NewsletterList />
                <ProductGrid />
                <PromptAccordion />
                <SkillsGrid />
            </div>
        </div>
    )
}
```

- [ ] **Step 2: Verify the page renders end-to-end**

Run: `npm run dev` (if not running)
Load: `http://localhost:3000/ai`
Verify in browser:
1. Breadcrumb: "Home / AI Library"
2. Hero: image placeholder + title "AI Learning Library" + intro paragraph
3. Videos section: filter bar + table with 6 rows; clicking a tag filters rows; clicking again deselects; clicking all tags shows all or none depending on OR semantics
4. Podcasts: 4 cards, 2 per row on desktop, 1 on mobile
5. People: 6 cards in same grid
6. Newsletters: vertical list of 4 items with hover underline
7. Products: 5 cards in grid
8. Prompts: accordion with 3 items; expand shows prompt text; click Copy → button shows "Copied" for ~1.5 s
9. Skills: 2 cards with GitHub buttons
10. Footer renders (from `RootLayout`'s `<Contact />`)
11. No console errors in DevTools
12. Toggle light/dark theme (via Contact footer's ModeToggle) — both themes render correctly on `/ai`

- [ ] **Step 3: Mobile-width check**

In DevTools, switch to iPhone viewport (≤ 400 px):
- All grids collapse to 1 column
- Video table scrolls horizontally
- No text overflow

- [ ] **Step 4: Commit**

```bash
git add src/app/ai/page.tsx
git commit -m "wire all sections into /ai page"
```

---

## Task 16: Add homepage link to `/ai`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import Project from '@/components/project'
import { Button } from '@/components/ui/button'
import WorkExperience from '@/components/work-experience'
import { CONFIG } from '@/config'
import Link from 'next/link'

export default function Home() {
    return (
        <div className='flex flex-col gap-12'>
            <Header />
            <div className='animate-slide-from-down-and-fade-2 flex flex-col gap-3 px-4'>
                <p className='leading-relaxed text-muted-foreground'>
                    {CONFIG.description}
                </p>
                <Button
                    asChild
                    variant='link'
                    className='self-start px-0 text-muted-foreground underline hover:text-foreground'
                >
                    <Link href='/ai'>
                        Check out my AI learning library
                        <Icons.arrowUpRight className='ml-0.5 inline-block size-4' />
                    </Link>
                </Button>
            </div>
            <div className='animate-slide-from-down-and-fade-3 space-y-4 px-4'>
                <h2 className='font-bold'>Featured Projects</h2>
                <div className='space-y-0'>
                    {CONFIG.projects
                        .filter((project) => project.featured)
                        .map((project, idx) => (
                            <Project
                                key={idx}
                                index={idx}
                                name={project.name}
                                icon={project.icon}
                                description={project.description}
                                image={project.image}
                                url={project.url}
                                tags={project.tags}
                                testimonial={project.testimonial}
                                github={project.github}
                            />
                        ))}
                </div>
                <Button
                    asChild
                    className='ml-auto items-end text-muted-foreground underline hover:text-foreground'
                    variant={'link'}
                >
                    <Link href='/projects'>
                        All projects
                        <Icons.arrowUpRight className='inline-block size-4' />
                    </Link>
                </Button>
            </div>

            <WorkExperience />
        </div>
    )
}
```

Key change vs current: the description `<div>` now renders the paragraph **plus** a `<Button variant="link">` pointing to `/ai`, laid out in a vertical flex with `gap-3`. The rest of the file is untouched.

- [ ] **Step 2: Verify homepage**

Load: `http://localhost:3000/`
Expected:
- Description paragraph renders
- Below it, a link "Check out my AI learning library ↗"
- Clicking the link navigates to `/ai`
- Rest of homepage (Featured Projects, Work Experience) unchanged

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "add AI library link on homepage"
```

---

## Task 17: Final verification

**Files:** none modified

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: build succeeds; any warnings are not regressions. Note: if `public/images/ai-hero.jpg` is missing, the build may fail on image optimization — in that case, either provide the image or temporarily remove `priority` and handle missing src in `AIHero`.

- [ ] **Step 2: Smoke test in production mode**

Run: `npm start` (after a successful build)
Load: `http://localhost:3000/` → homepage renders with Chauncey Lee name + AI library link
Load: `http://localhost:3000/ai` → all 8 sections render
Stop the server.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 4: Final git status check**

Run: `git status`
Expected: clean working tree. All commits from Tasks 1-16 are on the branch.

Run: `git log --oneline -20`
Expected: the 16+ commits from this plan visible in order.

- [ ] **Step 5: Summary to user**

Report to user:
- `/ai` route live with 8 sections
- Homepage renamed to Chauncey Lee + link to `/ai`
- radix-nova theme scoped to `/ai` only
- Known follow-ups the user needs to address:
  - `public/images/ai-hero.jpg` (if placeholder was used, replace with real hero image)
  - Socials and avatar in `src/config.tsx` still point to Samuel's accounts
  - Placeholder YouTube/X URLs in `src/ai-config.tsx` need real values
  - Tune radix-nova theme colors in `src/app/globals.css` if desired

---

## Known Follow-ups (Out of Scope for This Plan)

- Replace hero image with a real asset
- Update `src/config.tsx` socials, avatar, site URL, descriptions to Chauncey's details
- Replace placeholder content in `src/ai-config.tsx` with user's real curation
- Fine-tune radix-nova palette after visual review

# AI Learning Library — Design Spec

**Date:** 2026-04-17
**Status:** Approved by user
**Author:** Chauncey Lee

## Purpose

Add a new route `/ai` to the personal website that presents a curated AI learning resource hub. The page references the content structure and interaction style of https://zara.faces.site/ai, adapted to the project's existing Next.js 14 + shadcn/ui + Tailwind stack.

Also rename site owner from "Samuel Zhang" to "Chauncey Lee" across the codebase.

## Goals

- Add a dedicated `/ai` route with 8 content sections mirroring Zara's layout
- Match Zara's interaction style (tag filtering on videos, clean tables/lists/cards)
- Use shadcn/ui `radix-nova` style for the new page
- Keep the existing homepage visually untouched apart from (a) a small link to `/ai` and (b) owner name change

## Non-Goals

- No backend — content lives in a static `src/ai-config.tsx`
- No authoring UI or CMS
- No tag filtering on sections other than Videos
- No search functionality
- No content fetched from external APIs

## User-Facing Behavior

### Homepage (`/`)

- Owner name everywhere changes from "Samuel Zhang" → "Chauncey Lee"
- Below the personal description, add one small link: `→ Check out my AI learning library`
  - Uses `Button` variant `link` + `Icons.arrowUpRight`
  - Placed before the "Featured Projects" heading

### `/ai` page

Top-to-bottom sections:

**0. Breadcrumb** — `Home / AI Library` via shadcn `breadcrumb`.

**1. Hero**
- Large hero image
- `<h1>` "AI Learning Library"
- 1–2 sentence intro from Chauncey (placeholder content from Zara's hero, to be replaced)

**2. YouTube Videos** (primary interactive section)
- Heading + short description
- Tag filter bar (shadcn `toggle-group`, multi-select): tags include `Fundamentals`, `Product`, `Founder Interview`, etc. (derived from the data)
- Filtered table (shadcn `table`) with columns: `Title`, `Channel`, `Duration`, `Tags`, `Links`
- `Links` cell: YouTube icon link + optional TLDW (summary) link
- "No videos match selected tags" empty state when filter excludes everything

**3. Podcasts**
- Heading + short description
- Card grid (2-column on desktop, 1-column mobile)
- Each card: cover image (if present) + title + host + short description + link to YouTube playlist

**4. People to Follow**
- Heading + short description
- Card grid (3-column desktop, 2-column mobile): avatar + name + `@handle` + role
- Whole card is a link to the person's X profile

**5. Newsletters & Articles**
- Heading + short description
- Vertical list: title (link) + one-line description
- Hover underlines the title

**6. Recommended Products**
- Heading + short description
- Card grid (2-column desktop, 1-column mobile): icon + name + what Chauncey uses it for + link

**7. Prompts**
- Heading + short description
- `accordion` list — each item collapsed by default
- When expanded: full prompt text in `<pre>` + copy-to-clipboard button

**8. Skills**
- Heading + short description
- 2 cards: title + description + GitHub link + optional demo link

**Footer** — reuse existing `<Contact />` (already rendered by `RootLayout`).

## Architecture

### Route

```
src/app/ai/page.tsx
```

Server component. Imports `AI_CONFIG` and renders section components in order. Metadata (title + description) set via Next.js `metadata` export.

### Data

```
src/ai-config.tsx
```

Single source of truth for AI page content. Shape:

```ts
type AIConfig = {
  hero: {
    title: string
    intro: string | JSX.Element
    heroImage: string  // path under /public
  }
  videos: {
    title: string
    channel: string
    duration: string
    url: string
    tldwUrl?: string
    tags: VideoTag[]
    description?: string
  }[]
  podcasts: {
    title: string
    host: string
    description: string
    url: string
    coverImage?: string
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

type VideoTag =
  | 'Fundamentals'
  | 'Product'
  | 'Founder Interview'
  | 'Research'
  | 'Tools'
  // Extendable by editing this union
```

Placeholder data copied from https://zara.faces.site/ai; user will replace after implementation.

### Components

New directory: `src/components/ai/`

| File | Responsibility | Client/Server |
|------|---------------|---------------|
| `ai-hero.tsx` | Hero image + title + intro | Server |
| `video-table.tsx` | Wraps filter + table; holds selected tags state | Client |
| `video-filter.tsx` | Tag toggle group (controlled) | Client |
| `podcast-grid.tsx` | Podcast cards | Server |
| `people-grid.tsx` | People cards grid | Server |
| `newsletter-list.tsx` | Newsletter list | Server |
| `product-grid.tsx` | Product cards | Server |
| `prompt-accordion.tsx` | Accordion with copy buttons | Client (for clipboard) |
| `skills-grid.tsx` | Skills cards | Server |

**Boundaries:**
- Only `video-table`, `video-filter`, `prompt-accordion` need `'use client'`
- Others are pure presentational server components — receive data via props from `page.tsx`

### shadcn components to add

Run `npx shadcn@latest add <name>` for each:
- `accordion`
- `table`
- `toggle-group`

Already present: `avatar`, `badge`, `breadcrumb`, `button`, `card`, `tooltip`.

### Styling / radix-nova

`radix-nova` is the newer shadcn style variant with higher-contrast theme tokens.

**Plan:**
- Update `components.json`:
  - `"style": "radix-nova"`
  - Keep `"rsc": true` (project uses RSC — user-provided schema had `false`, but that conflicts with the actual setup)
  - Keep `"css": "src/app/globals.css"` (user-provided schema had `"src/global.css"`, but that is not the actual path)
- New shadcn components added after the config change will pick up `radix-nova` automatically (e.g., tokens like `bg-card`, `text-foreground` will resolve against whichever variables are active)

**Homepage-isolation strategy:**

CSS variables are runtime, not compile-time. If we overwrite the existing `:root` / `.dark` variables with radix-nova values, the homepage colors would also change — which violates the "keep homepage visually untouched" goal.

Approach: scope radix-nova variables under a wrapper class.

- In `globals.css`, keep existing `:root` / `.dark` variable sets as-is
- Add a new scoped block: `.theme-radix-nova { --background: ...; --foreground: ...; ... }` (and `.theme-radix-nova.dark` for dark-mode overrides)
- Wrap the `/ai` page in `<div className="theme-radix-nova">...</div>` at `src/app/ai/page.tsx`
- This way, only `/ai` descendants resolve radix-nova variables; homepage keeps current theme

The wrapper sits inside `<main>` from `RootLayout`, so `<Contact />` (rendered by layout outside `{children}`) continues to use the default theme — which is what we want for the shared footer.

## Homepage Edits

- `src/config.tsx`:
  - `name: 'Samuel Zhang'` → `'Chauncey Lee'`
  - Socials: leave URLs (user will update later — noted as known follow-up)
  - Avatar: leave `/images/headshot.png` path, same follow-up
- `src/app/page.tsx`:
  - Add `<Button variant="link" asChild><Link href="/ai">Check out my AI learning library <Icons.arrowUpRight /></Link></Button>` after description, before "Featured Projects"
- `src/app/layout.tsx`:
  - Metadata title/description automatically derive from `CONFIG` — no direct edit needed
- `src/app/projects/page.tsx`:
  - Audit for any hardcoded "Samuel" strings — update if present

## Error Handling

- Empty filter result in videos: show `"No videos match the selected tags."`
- Missing cover image in podcasts: fall back to a text-only card (no placeholder image)
- Clipboard copy in prompts: on failure, show a `"Copy failed"` state via `tooltip`
- Broken external links: no runtime handling — links open in new tab with `rel="noopener noreferrer"`
- Missing `AI_CONFIG` fields: TypeScript catches at build time; fields are strictly required per shape above

## Testing

Project currently has no test suite. Verification is manual:

1. `npm run dev` — both `/` and `/ai` load without console errors
2. Homepage shows "Chauncey Lee", AI link renders and navigates correctly
3. `/ai` page: every section renders with placeholder content
4. Video filter: selecting one tag hides non-matching rows; deselecting restores
5. Prompt accordion: expands, collapses, copy button writes to clipboard
6. Mobile viewport (≤ 640 px): all grids collapse to 1 column, nothing overflows
7. `npm run build` succeeds with no new lint errors
8. Toggle dark/light theme — both themes render correctly on `/ai`

## Files Changed (Final List)

**Added:**
```
src/app/ai/page.tsx
src/ai-config.tsx
src/components/ai/ai-hero.tsx
src/components/ai/video-table.tsx
src/components/ai/video-filter.tsx
src/components/ai/podcast-grid.tsx
src/components/ai/people-grid.tsx
src/components/ai/newsletter-list.tsx
src/components/ai/product-grid.tsx
src/components/ai/prompt-accordion.tsx
src/components/ai/skills-grid.tsx
src/components/ui/accordion.tsx       (shadcn add)
src/components/ui/table.tsx           (shadcn add)
src/components/ui/toggle-group.tsx    (shadcn add)
public/images/ai-hero.jpg             (placeholder)
docs/superpowers/specs/2026-04-17-ai-learning-library-design.md
```

**Modified:**
```
src/config.tsx                        (rename Samuel Zhang → Chauncey Lee)
src/app/page.tsx                      (add AI library link)
src/app/projects/page.tsx             (audit for owner name)
components.json                       (style → radix-nova)
src/app/globals.css                   (merge radix-nova CSS variables)
```

## Open Items / Follow-ups

- Socials URLs and avatar image are still Samuel's — user will update separately
- Hero image `/images/ai-hero.jpg` — user to provide; placeholder used initially
- Placeholder AI content copied from Zara's page — user to curate their own

## Out of Scope

- Search
- Tag filter on sections other than videos
- Pagination
- Dynamic content sources (RSS, YouTube API, etc.)
- Admin/editing UI

"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage, useAIConfig } from "@/components/language-provider";
import { WIKI_TERMS, WIKI_COURSE, WIKI_JOBS, WIKI_UI } from "@/content/wiki";
import { cn } from "@/lib/utils";

export type WikiDomain = "sources" | "vibe" | "course" | "jobs";
export type SourceCat = "podcasts" | "newsletters" | "people" | "products";
const SOURCE_CATS: SourceCat[] = ["podcasts", "newsletters", "people", "products"];

type BrowseItem = { title: string; desc: string; url: string };

function BrowseCard({ item, openLabel }: { item: BrowseItem; openLabel: string }) {
  return (
    <article className="rounded-lg border p-3 transition-colors hover:border-accent">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-sm font-semibold leading-tight">{item.title}</h4>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs text-accent transition-colors hover:border-accent"
          >
            {openLabel}
            <ArrowUpRight className="size-3" />
          </a>
        ) : null}
      </div>
      {item.desc ? (
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.desc}</p>
      ) : null}
      {item.url ? (
        <span className="mt-2 inline-block font-mono text-xs text-muted-foreground/70">
          {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
      ) : null}
    </article>
  );
}

export default function WikiBrowse({
  domain,
  sourceCat,
  onSourceCat,
}: {
  domain: WikiDomain;
  sourceCat: SourceCat;
  onSourceCat: (c: SourceCat) => void;
}) {
  const { language } = useLanguage();
  const ai = useAIConfig();
  const ui = WIKI_UI[language];

  // ---- AI 知识源 (live from AI_CONFIG) ----
  if (domain === "sources") {
    const dedupe = (arr: BrowseItem[]) => {
      const seen = new Set<string>();
      return arr.filter((x) => (seen.has(x.title) ? false : (seen.add(x.title), true)));
    };
    const catItems: Record<SourceCat, BrowseItem[]> = {
      podcasts: dedupe(ai.podcasts.map((p) => ({ title: p.title, desc: p.description, url: p.url }))),
      newsletters: dedupe(ai.newsletters.map((n) => ({ title: n.title, desc: n.description, url: n.url }))),
      people: dedupe(ai.people.map((p) => ({ title: p.name, desc: p.role, url: p.url }))),
      products: dedupe(ai.products.map((p) => ({ title: p.name, desc: p.description, url: p.url }))),
    };
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {SOURCE_CATS.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={c === sourceCat}
              onClick={() => onSourceCat(c)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors",
                c === sourceCat
                  ? "border-accent bg-accent/10 font-medium text-accent"
                  : "bg-muted/40 text-muted-foreground hover:border-accent",
              )}
            >
              {ui.sourceCats[c]}
              <span className="ml-1.5 font-mono text-xs opacity-70">
                {catItems[c].length}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4">
          {catItems[sourceCat].map((item) => (
            <BrowseCard key={item.title} item={item} openLabel={ui.open} />
          ))}
        </div>
      </div>
    );
  }

  // ---- Vibe Hub ----
  if (domain === "vibe") {
    return (
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4">
        {WIKI_TERMS.map((t) => (
          <article key={t.term} className="rounded-lg border border-l-2 border-l-accent p-3">
            <h4 className="font-mono text-sm font-medium text-accent"># {t.term}</h4>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.def[language]}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {t.rel.map(([tag, name]) => (
                <span key={tag + name} className="rounded-full border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {tag} · <b className="font-medium text-accent">{name}</b>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  // ---- AI Native 招聘 (jobs) ----
  if (domain === "jobs") {
    return (
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4">
        {WIKI_JOBS.map((j) => (
          <article key={j.company} className="rounded-lg border p-3 transition-colors hover:border-accent">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-sm font-semibold leading-tight">{j.company}</h4>
              <a
                href={j.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs text-accent transition-colors hover:border-accent"
              >
                {ui.open}
                <ArrowUpRight className="size-3" />
              </a>
            </div>
            <span className="mt-1 inline-block rounded-full border border-accent bg-accent/10 px-2 py-0.5 text-xs text-accent">
              {j.role}
            </span>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{j.desc[language]}</p>
            <span className="mt-2 inline-block font-mono text-xs text-muted-foreground/70">
              {j.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
            </span>
          </article>
        ))}
      </div>
    );
  }

  // ---- 闭环学院 (course) ----
  const c = WIKI_COURSE;
  const pct = Math.round((c.done / c.total) * 100);
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{c.eyebrow}</p>
        <h3 className="mt-1 text-lg font-bold tracking-tight">{c.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
      </div>
      <div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-xs text-muted-foreground">
          {c.done} / {c.total} {ui.progress} · {ui.progressEcho}
        </p>
      </div>
      {c.chapters.map((ch) => (
        <div key={ch.num} className="rounded-xl border p-3.5">
          <div className="font-mono text-xs text-accent">{ch.num}</div>
          <h4 className="mt-0.5 text-base font-bold">{ch.title}</h4>
          <p className="mb-2.5 mt-0.5 text-sm text-muted-foreground">{ch.sub}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ch.lessons.map((l) => (
              <div
                key={l.no}
                className={cn(
                  "rounded-lg border border-l-2 bg-muted/40 p-2.5",
                  l.done ? "border-l-accent" : "border-l-border",
                )}
              >
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="font-mono text-xs text-muted-foreground">{l.no}</span>
                  <span className="rounded-full border border-accent px-1.5 text-[0.62rem] text-accent">
                    {l.type}
                  </span>
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      l.done ? "text-accent" : "text-muted-foreground/60",
                    )}
                  >
                    {l.done ? ui.done : ui.todo}
                  </span>
                </div>
                <div className="text-sm font-medium leading-tight">{l.title}</div>
                <div className="mt-1 font-mono text-[0.66rem] text-muted-foreground/60">
                  {ui.minutesPrefix} {l.min} {ui.minutesSuffix}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2.5 rounded-lg border border-dashed border-accent bg-accent/5 px-3 py-2 text-sm">
            🚩 {ui.milestone}：<b className="text-accent">{ch.milestone}</b>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-dashed px-3 py-3 text-center font-mono text-xs text-muted-foreground/70">
        {c.rest}
      </div>
    </div>
  );
}

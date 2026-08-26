"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage, useAIConfig } from "@/components/language-provider";
import { WIKI_TERMS, WIKI_COURSE, WIKI_JOBS, WIKI_UI } from "@/content/wiki";
import { VIBE_GROUPS, VIBE_TERM_COUNT } from "@/content/wiki-vibe-terms";
import { COURSE_CHAPTERS, COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import { getCompleted } from "@/lib/wiki-progress";
import { clearProfile, getProfile, getTraits, type WikiProfile } from "@/lib/wiki-profile";
import WikiOnboarding from "@/components/wiki/wiki-onboarding";
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

  // Loop-completion progress (localStorage) — read after mount to stay
  // hydration-safe on the static export.
  const [done, setDone] = useState<Set<string>>(new Set());
  // Learner profile: undefined = not yet read, null = needs onboarding.
  const [profile, setProfileState] = useState<WikiProfile | null | undefined>(undefined);
  const [traits, setTraits] = useState<Record<string, number>>({});
  useEffect(() => {
    setDone(getCompleted());
    setProfileState(getProfile());
    setTraits(getTraits());
  }, []);

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
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {/* core AI terms (with cross-domain links) */}
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {language === "zh" ? "核心 · AI" : "Core · AI"}
        </p>
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

        {/* real glossary from vibe-hub.org */}
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 border-t pt-3">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {language === "zh" ? `vibe coding 术语 · ${VIBE_TERM_COUNT}` : `Vibe coding terms · ${VIBE_TERM_COUNT}`}
          </p>
          <a
            href="https://vibe-hub.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            vibe-hub.org ↗
          </a>
        </div>
        <p className="-mt-1 text-xs text-muted-foreground/70">
          {language === "zh"
            ? "另有 Backend / Product / 技术栈 / AI / Git / Design 约 144 词，待接入。"
            : "Backend / Product / Tech Stack / AI / Git / Design (~144 more) pending import."}
        </p>
        {VIBE_GROUPS.map((g) => (
          <div key={g.cat.en}>
            <h4 className="mb-1.5 text-sm font-semibold">{g.cat[language]}</h4>
            <dl className="grid gap-1.5">
              {g.terms.map((term) => (
                <div key={term.t} className="rounded-md border bg-muted/30 px-2.5 py-1.5">
                  <dt className="font-mono text-xs font-medium text-accent">{term.t}</dt>
                  <dd className="text-xs leading-5 text-muted-foreground">{term.d}</dd>
                </div>
              ))}
            </dl>
          </div>
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

  // ---- 闭环学院 (course) — Loop Academy look ----
  const c = WIKI_COURSE;
  const doneCount = done.size;
  const pct = Math.round((doneCount / COURSE_TOTAL_LOOPS) * 100);
  if (profile === null) {
    return (
      <div className="theme-loop -mx-4 -mb-4 flex flex-1 flex-col overflow-y-auto px-6 py-5">
        <WikiOnboarding onDone={(p) => setProfileState(p)} />
      </div>
    );
  }
  const mapTitle = `${profile?.name ?? "…"}：从 Vibe Coder 到 Product Builder`;
  return (
    <div className="theme-loop -mx-4 -mb-4 flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
      <div>
        <p className="mb-2 flex items-baseline gap-2">
          <span
            className="text-base font-bold"
            style={{ fontFamily: "var(--loop-font-display)" }}
          >
            闭环学院
          </span>
          <span
            className="text-[0.62rem] uppercase"
            style={{ color: "var(--loop-ink-3)", letterSpacing: "0.24em" }}
          >
            Loop Academy
          </span>
          {profile ? (
            <span className="ml-auto flex items-baseline gap-2 text-xs" style={{ color: "var(--loop-ink-3)" }}>
              {profile.name}
              <button
                type="button"
                className="underline"
                onClick={() => {
                  clearProfile();
                  setProfileState(null);
                }}
              >
                退出
              </button>
            </span>
          ) : null}
        </p>
        <p className="loop-map-eyebrow">{c.eyebrow}</p>
        <h3 className="loop-map-title font-bold">{mapTitle}</h3>
        <p className="mt-1.5 text-sm leading-6" style={{ color: "var(--loop-ink-2)" }}>
          {c.desc}
        </p>
      </div>
      <div className="loop-echo-card">
        <span aria-hidden="true">🔁</span>
        <span>
          {ui.progress.replace("{done}", String(doneCount)).replace("{total}", String(COURSE_TOTAL_LOOPS))}
          。{ui.progressEcho}
        </span>
      </div>
      <div
        className="-mt-2 h-1.5 overflow-hidden rounded-full"
        style={{ background: "var(--loop-raised)", border: "1px solid var(--loop-line)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: "var(--loop-green)" }}
        />
      </div>
      {Object.keys(traits).length ? (
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-xs font-semibold" style={{ color: "var(--loop-ink-3)" }}>
            判断力画像
          </span>
          {Object.entries(traits).map(([dim, n]) => (
            <span
              key={dim}
              className="rounded-full px-2 py-0.5 text-xs"
              style={{ background: "var(--loop-blue-wash)", color: "var(--loop-blue-deep)" }}
            >
              {dim} ×{n}
            </span>
          ))}
        </div>
      ) : null}
      {COURSE_CHAPTERS.map((ch) => (
        <div key={ch.id} className="loop-pillar !mt-0">
          <div className="flex items-baseline gap-3.5">
            <span className="loop-pillar-no">第 {ch.index} 章</span>
            <h4 className="loop-pillar-title font-bold">{ch.title}</h4>
          </div>
          <p className="loop-pillar-sub mt-0.5">{ch.tagline}</p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {ch.nodes.map((l, i) => {
              const isDone = done.has(l.lessonId);
              return (
                <Link
                  key={l.id}
                  href={`/wiki/course/${l.lessonId}/`}
                  className="loop-card block p-3 transition-shadow hover:shadow-md"
                  style={{
                    background: "var(--loop-raised)",
                    border: "1px solid var(--loop-line)",
                    borderLeft: `3px solid ${isDone ? "var(--loop-green)" : "var(--loop-line)"}`,
                    borderRadius: "var(--loop-radius)",
                  }}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-xs font-semibold"
                      style={{ background: "var(--loop-blue-wash)", color: "var(--loop-blue)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="rounded-full px-1.5 text-[0.66rem]"
                      style={{ border: "1px solid var(--loop-blue)", color: "var(--loop-blue)" }}
                    >
                      {l.type}
                    </span>
                    {isDone ? (
                      <span
                        className="inline-flex items-center gap-0.5 text-xs"
                        style={{ color: "var(--loop-green)" }}
                      >
                        <Check className="size-3" /> {language === "zh" ? "已完成" : "Done"}
                      </span>
                    ) : null}
                  </div>
                  <div className="text-sm font-semibold leading-tight">{l.title}</div>
                  <div className="mt-1 text-xs leading-5" style={{ color: "var(--loop-ink-2)" }}>
                    {l.hook}
                  </div>
                  <div className="mt-1.5 text-[0.68rem]" style={{ color: "var(--loop-ink-3)" }}>
                    {ui.minutesPrefix} {l.minutes} {ui.minutesSuffix}
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className="mt-3 flex items-start gap-1.5 px-3 py-2 text-sm"
            style={{
              border: "1px dashed var(--loop-line)",
              borderRadius: "var(--loop-radius)",
              color: "var(--loop-ink-2)",
            }}
          >
            <span aria-hidden="true">🚩</span>
            <span>{ch.milestone}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

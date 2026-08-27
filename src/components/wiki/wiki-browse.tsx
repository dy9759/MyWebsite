"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_COURSE, WIKI_JOBS, WIKI_UI } from "@/content/wiki";
import { COURSE_CHAPTERS, COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import WikiVibe from "@/components/wiki/wiki-vibe";
import { getCompleted } from "@/lib/wiki-progress";
import { clearProfile, getProfile, getTraits, type WikiProfile } from "@/lib/wiki-profile";
import WikiOnboarding from "@/components/wiki/wiki-onboarding";
import AIPageBody from "@/components/ai/ai-page-body";
import SectionRailNav from "@/components/section-rail-nav";

export type WikiDomain = "sources" | "vibe" | "course" | "jobs";

export default function WikiBrowse({ domain }: { domain: WikiDomain }) {
  const { language } = useLanguage();
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
    // Full AI Sense Sources page, embedded as the AI 知识源 domain.
    return (
      <div className="min-w-0 flex-1 py-2">
        <AIPageBody embedded />
      </div>
    );
  }

  // ---- Vibe Hub ----
  if (domain === "vibe") {
    return <WikiVibe />;
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
    <div className="theme-loop -mx-4 -mb-4 grid gap-4 overflow-y-auto px-6 py-5 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start">
      <SectionRailNav
        ariaLabel="课程章节导航"
        label="闭环学院"
        items={COURSE_CHAPTERS.map((ch) => ({
          href: `#course-ch${ch.index}`,
          label: `第 ${ch.index} 章 ${ch.title}`,
        }))}
      />
      <div className="flex min-w-0 flex-col gap-4">
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
        <div key={ch.id} id={`course-ch${ch.index}`} className="loop-pillar !mt-0 scroll-mt-28">
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
    </div>
  );
}

"use client";

// 建造者学院 · FDE 认证篇 (第 9–12 章). Each lesson card starts a practice set
// for that lesson; the chapter button practises the whole chapter. A single
// WikiFde instance docks inside whichever chapter is being practised (default:
// the last one, which also hosts the mock exam / wrong-answer book / stats).
// Moving it remounts it — the attempt lives in localStorage, so it resumes.
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import {
  FDE_CHAPTERS,
  FDE_LAST_CHAPTER,
  FDE_SOURCE,
  chapterCount,
  chapterOfLesson,
  lessonInfo,
} from "@/content/fde-course";
import { loadSession, saveSession } from "@/lib/fde-store";
import { useStoredState } from "@/lib/use-hydrated";
import type { FdeTarget } from "@/components/wiki/wiki-fde";

// The runner carries the ~165 KB question bank — load it only when the academy
// actually renders it, not with the /wiki page.
const WikiFde = dynamic(() => import("@/components/wiki/wiki-fde"), {
  ssr: false,
  loading: () => <p className="py-6 text-center text-sm text-muted-foreground">…</p>,
});

// Resume where an unfinished lesson attempt was started.
function resumeChapter() {
  const lesson = loadSession()?.lessons?.[0];
  return (lesson && chapterOfLesson(lesson)?.id) || FDE_LAST_CHAPTER;
}

const DISCARD = {
  zh: "还有一份未完成的作答，开始新的练习会放弃它，确定吗？",
  en: "You have an unfinished attempt. Starting a new practice discards it — continue?",
};

export default function WikiFdeChapters({
  target,
  onLive,
  onTargetUsed,
}: {
  target?: { id: string; ts: number } | null; // search hit from the wiki header
  onLive?: (live: boolean) => void;
  onTargetUsed?: () => void;
}) {
  const { language } = useLanguage();
  const [at, setAt] = useStoredState(resumeChapter, FDE_LAST_CHAPTER);
  const [request, setRequest] = useState<FdeTarget | null>(null);
  // Each request remounts the runner, which starts from it on mount.
  const [runKey, setRunKey] = useState(0);

  // A search hit docks the runner in that question's chapter (the bank is
  // fetched on demand to look the lesson up — same chunk the runner uses).
  // Clear the parent's target only once the lookup lands: clearing it changes
  // target?.ts, and the cleanup would cancel the lookup before it resolves.
  useEffect(() => {
    if (!target) return;
    let alive = true;
    import("@/lib/fde-bank").then(({ FDE_QUESTIONS }) => {
      if (!alive) return;
      onTargetUsed?.();
      const lesson = FDE_QUESTIONS.find((q) => q.id === target.id)?.lesson;
      setAt((lesson && chapterOfLesson(lesson)?.id) || FDE_LAST_CHAPTER);
      setRunKey((k) => k + 1);
      setRequest({ id: target.id });
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.ts]);

  const practise = (chapterId: string, lessons: string[]) => {
    // Ask before moving anything, so "cancel" leaves the attempt where it is.
    if (loadSession()) {
      if (!window.confirm(language === "zh" ? DISCARD.zh : DISCARD.en)) return;
      saveSession(null);
    }
    setAt(chapterId);
    setRunKey((k) => k + 1);
    setRequest({ lessons });
    requestAnimationFrame(() =>
      document.getElementById(`course-${chapterId}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <>
      <div
        id="course-fde"
        className="scroll-mt-28 px-3 py-2.5 text-sm"
        style={{ border: "1px solid var(--loop-line)", borderRadius: "var(--loop-radius)", background: "var(--loop-raised)" }}
      >
        <p className="font-bold" style={{ fontFamily: "var(--loop-font-display)" }}>
          FDE 认证篇 · 第 9–12 章
        </p>
        <p className="mt-0.5 leading-6" style={{ color: "var(--loop-ink-2)" }}>
          腾讯云智能体开发平台 FDE 认证备考：四章对应官方课程的四个模块，每个课时一组练习，第 12 章收尾全真模拟。
        </p>
        {FDE_SOURCE ? (
          <a
            href={FDE_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-0.5 text-xs underline"
            style={{ color: "var(--loop-ink-3)" }}
          >
            题目来源：{FDE_SOURCE.title}
            <ArrowUpRight className="size-3" />
          </a>
        ) : null}
      </div>

      {FDE_CHAPTERS.map((ch) => (
        <div key={ch.id} id={`course-${ch.id}`} className="loop-pillar !mt-0 scroll-mt-28">
          <div className="flex items-baseline gap-3.5">
            <span className="loop-pillar-no">第 {ch.index} 章</span>
            <h4 className="loop-pillar-title font-bold">{ch.title}</h4>
            <button type="button" className="loop-ch-practice" onClick={() => practise(ch.id, ch.lessons)}>
              ✍️ 本章练习 · {chapterCount(ch)} 题
            </button>
          </div>
          <p className="loop-pillar-sub mt-0.5">{ch.tagline}</p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {ch.lessons.map((lesson) => {
              const info = lessonInfo(lesson, language);
              return (
                <button
                  key={lesson}
                  type="button"
                  onClick={() => practise(ch.id, [lesson])}
                  className="loop-card block p-3 text-left transition-shadow hover:shadow-md"
                  style={{
                    background: "var(--loop-raised)",
                    border: "1px solid var(--loop-line)",
                    borderLeft: "3px solid var(--loop-line)",
                    borderRadius: "var(--loop-radius)",
                  }}
                >
                  <span className="mb-1.5 flex items-center gap-1.5">
                    <span className="loop-no">{lesson}</span>
                    <span className="loop-type">练习</span>
                  </span>
                  <span className="block text-sm font-semibold leading-tight">课时 {lesson}</span>
                  <span className="mt-1 block text-xs leading-5" style={{ color: "var(--loop-ink-2)" }}>
                    {info.domains.join(" · ")}
                  </span>
                  <span className="mt-1.5 block text-[0.68rem]" style={{ color: "var(--loop-ink-3)" }}>
                    {info.count} 题
                  </span>
                </button>
              );
            })}
          </div>
          {at === ch.id ? (
            <div className="mt-3 rounded-xl border bg-background px-4">
              <WikiFde
                key={runKey}
                target={request}
                onLive={onLive}
                onTargetUsed={() => setRequest(null)}
                onHome={() => setAt(FDE_LAST_CHAPTER)}
              />
            </div>
          ) : null}
          <div
            className="mt-3 flex items-start gap-1.5 px-3 py-2 text-sm"
            style={{ border: "1px dashed var(--loop-line)", borderRadius: "var(--loop-radius)", color: "var(--loop-ink-2)" }}
          >
            <span aria-hidden="true">🚩</span>
            <span>{ch.milestone}</span>
          </div>
        </div>
      ))}
    </>
  );
}

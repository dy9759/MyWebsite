"use client";

// 建造者学院 · FDE 认证篇 (第 9–12 章). Each lesson card starts a practice set
// for that lesson; the chapter button practises the whole chapter. A single
// WikiFde instance docks inside whichever chapter is being practised (default:
// the last one, which also hosts the mock exam / wrong-answer book / stats).
// Moving it remounts it — the attempt lives in localStorage, so it resumes.
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import WikiFde from "@/components/wiki/wiki-fde";
import {
  FDE_CHAPTERS,
  FDE_LAST_CHAPTER,
  chapterCount,
  chapterOfLesson,
  chapterOfQuestion,
  lessonInfo,
} from "@/content/fde-course";
import { FDE_ATTRIBUTION } from "@/lib/fde-exam";
import { loadSession, saveSession } from "@/lib/fde-store";

type Request = { ts: number; id?: string; lessons?: string[] };

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
  const [at, setAt] = useState(FDE_LAST_CHAPTER);
  const [request, setRequest] = useState<Request | null>(null);

  // Resume where an unfinished lesson attempt was started.
  useEffect(() => {
    const lesson = loadSession()?.lessons?.[0];
    const ch = lesson ? chapterOfLesson(lesson) : undefined;
    if (ch) setAt(ch.id);
  }, []);

  // A search hit docks the runner in that question's chapter.
  useEffect(() => {
    if (!target) return;
    setAt(chapterOfQuestion(target.id)?.id ?? FDE_LAST_CHAPTER);
    setRequest({ ts: target.ts, id: target.id });
    onTargetUsed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.ts]);

  const practise = (chapterId: string, lessons: string[]) => {
    // Ask before moving anything, so "cancel" leaves the attempt where it is.
    if (loadSession()) {
      if (!window.confirm(language === "zh" ? DISCARD.zh : DISCARD.en)) return;
      saveSession(null);
    }
    setAt(chapterId);
    setRequest({ ts: Date.now(), lessons });
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
        {FDE_ATTRIBUTION ? (
          <a
            href={FDE_ATTRIBUTION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-0.5 text-xs underline"
            style={{ color: "var(--loop-ink-3)" }}
          >
            题目来源：{FDE_ATTRIBUTION.title}
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

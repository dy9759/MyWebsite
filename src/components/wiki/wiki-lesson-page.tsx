"use client";

// Full-page lesson view for one 闭环学院 loop, replicating the original flow:
// a step rail (in-lesson map nav) on top, one step per screen with 上一步 /
// 下一步 paging, interactive steps gating the continue button, and a tutor
// rail on the right. Completion records progress and hands off to the next
// loop.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Flag } from "lucide-react";
import WikiLesson, { type Lesson } from "@/components/wiki/wiki-lesson";
import WikiChat, { type WikiMsg } from "@/components/wiki/wiki-chat";
import type { CourseNode } from "@/content/wiki-course";
import { useLanguage } from "@/components/language-provider";
import { wikiDemoReply } from "@/content/wiki";
import { getCompleted, markCompleted } from "@/lib/wiki-progress";
import { DEFAULT_PROFILE, deepPersonalize, getProfile } from "@/lib/wiki-profile";
import conceptMap from "@/content/concept-map.json";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// loopId → mapped termIds (strong links first; curated P3 mentions before auto mentions).
const LOOP_TERMS = new Map<string, { termId: string; strength: string; via?: string }[]>();
for (const l of conceptMap.links as { termId: string; loopId: string; strength: string; via?: string }[]) {
  if (!LOOP_TERMS.has(l.loopId)) LOOP_TERMS.set(l.loopId, []);
  LOOP_TERMS.get(l.loopId)!.push({ termId: l.termId, strength: l.strength, via: l.via });
}
const STRENGTH_RANK: Record<string, number> = { identity: 0, glossary: 1, mention: 2 };
const linkRank = (l: { strength: string; via?: string }) =>
  (STRENGTH_RANK[l.strength] ?? 9) - (l.strength === "mention" && l.via === "p3-extension" ? 0.5 : 0);

type TermMeta = { id: string; topic: string; title: string; en: string };
type EchoQ = {
  id: string;
  q: string;
  options: { label: string; feedback: string; correct: boolean }[];
  term: { title: string };
};

type LoopLink = { lessonId: string; title: string } | null;

// Short kind labels for the step rail + full eyebrow labels (original UI).
const RAIL_LABEL: Record<string, string> = {
  intro: "引入",
  glossary: "装备",
  whynow: "为何学",
  explain: "讲解",
  quiz: "快测",
  judgment: "判断",
  codereview: "找茬",
  theater: "剧场",
  curation: "经典",
  outro: "回声",
  decision: "决策",
  estimate: "估算",
  sim: "看见",
  diagram: "看见",
  timeline: "故事",
};
const EYEBROW: Record<string, string> = {
  intro: "引入 · 带着问题出发",
  timeline: "故事 · 一场史诗事故",
  glossary: "装备 · 本课词汇",
  whynow: "为什么 AI 时代仍要学",
  sim: "看见 · 亲手玩出定律",
  diagram: "看见 · 结构可视化",
  explain: "讲解 · 知识骨架",
  quiz: "快测 · 诊断误解",
  estimate: "估算 · 校准直觉",
  decision: "判断 · 决策模拟",
  codereview: "判断 · 验收找茬",
  judgment: "判断 · 专家对照",
  theater: "判断 · 剧场推演",
  curation: "经典 · 大师原文",
  outro: "回声 · 回路收束",
};
// Interactive kinds gate the continue button (sim has no engine here).
const INTERACTIVE = new Set(["glossary", "quiz", "estimate", "decision", "codereview", "judgment", "theater"]);
// Judge-type steps flip the tutor into Socratic mode.
const JUDGE = new Set(["decision", "codereview", "judgment", "theater"]);

const raised = {
  background: "var(--loop-raised)",
  border: "1px solid var(--loop-line)",
  borderRadius: "var(--loop-radius)",
  boxShadow: "var(--loop-shadow)",
} as const;

export default function WikiLessonPage({
  lesson,
  chapterIndex,
  chapterTitle,
  milestone,
  isChapterEnd,
  loopNumber,
  loopTotal,
  node,
  prev,
  next,
}: {
  lesson: Lesson;
  chapterIndex: number;
  chapterTitle: string;
  milestone: string;
  isChapterEnd: boolean;
  loopNumber: number;
  loopTotal: number;
  node: CourseNode;
  prev: LoopLink;
  next: LoopLink;
}) {
  const router = useRouter();
  const { language } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [stepProgress, setStepProgress] = useState<Record<number, { answered: number; total: number }>>({});
  const [convo, setConvo] = useState<WikiMsg[]>([]);
  const [tutorOpen, setTutorOpen] = useState(false);
  // Personalize {{project}}: server render uses the default anchor, the stored
  // profile applies after mount (keeps hydration deterministic).
  const [lessonP, setLessonP] = useState<Lesson>(() =>
    deepPersonalize(lesson, DEFAULT_PROFILE.project),
  );
  useEffect(() => {
    const project = getProfile()?.project ?? DEFAULT_PROFILE.project;
    setLessonP(deepPersonalize(lesson, project));
  }, [lesson]);
  // 问这句 — select any lesson text to ask the tutor about it.
  const mainRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState<{ text: string; x: number; y: number } | null>(null);
  useEffect(() => {
    const onSelect = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? "";
      if (!text || text.length < 4 || !sel || sel.rangeCount === 0 || !mainRef.current) {
        setQuote(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (!mainRef.current.contains(range.commonAncestorContainer)) {
        setQuote(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setQuote({ text: text.slice(0, 120), x: rect.left + rect.width / 2, y: rect.top - 38 });
    };
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, []);
  const total = lessonP.steps.length;
  const step = lessonP.steps[idx];
  const last = idx === total - 1;
  // 装备 step gates the continue button until every card is flipped.
  const prog = stepProgress[idx];
  const stepDone = prog != null && prog.answered >= prog.total;
  // sims gate too, except peoplenet (free-play, original counts it done).
  const simGates = step.kind === "sim" && step.sim !== "peoplenet";
  const gated = (INTERACTIVE.has(step.kind) || simGates) && !stepDone && !finished;
  const gateLabel =
    (step.kind === "quiz" || step.kind === "estimate") && prog
      ? `作答 ${prog.answered}/${prog.total}`
      : "完成互动后继续";

  useEffect(() => {
    setFinished(getCompleted().has(node.lessonId));
  }, [node.lessonId]);

  // P1: related terms (chips) + 回声加餐 practice questions for this loop.
  const [relTerms, setRelTerms] = useState<TermMeta[]>([]);
  const [echoQs, setEchoQs] = useState<EchoQ[]>([]);
  const [echoPicked, setEchoPicked] = useState<Record<number, number>>({});
  useEffect(() => {
    const mapped = (LOOP_TERMS.get(node.lessonId) ?? [])
      .slice()
      .sort((a, b) => linkRank(a) - linkRank(b));
    if (!mapped.length) return;
    const ids = new Set(mapped.map((m) => m.termId));
    fetch(`${BASE_PATH}/wiki/search-index.json?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((idx: (TermMeta & { k: string })[]) => {
        const byId = new Map(idx.filter((e) => e.k === "term").map((e) => [e.id, e]));
        setRelTerms(
          mapped.map((m) => byId.get(m.termId)).filter((x): x is TermMeta & { k: string } => !!x).slice(0, 8),
        );
      })
      .catch(() => {});
    fetch(`${BASE_PATH}/wiki/vibe/practice.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((qs: EchoQ[]) => setEchoQs(qs.filter((q) => ids.has(q.id)).slice(0, 3)))
      .catch(() => {});
  }, [node.lessonId]);

  const go = (n: number) => {
    setIdx(Math.max(0, Math.min(n, total - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const complete = () => {
    markCompleted(node.lessonId);
    setFinished(true);
  };

  const sendChat = (q: string) => {
    setTutorOpen(true);
    setConvo((prevMsgs) => [
      ...prevMsgs,
      { role: "u", text: q },
      { role: "a", data: wikiDemoReply(q, language) },
    ]);
  };

  return (
    <div className="theme-loop -mt-4 min-h-[calc(100vh-4rem)] px-4 pb-10 pt-5">
      <div className="mx-auto" style={{ maxWidth: 780 }}>
        <div className="min-w-0">
          {/* back + chapter context */}
          <nav className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <Link
              href="/wiki"
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ color: "var(--loop-ink-2)" }}
            >
              <ArrowLeft className="size-3.5" />
              返回学习地图
            </Link>
            <span style={{ color: "var(--loop-ink-3)" }}>/</span>
            <span className="text-xs font-semibold tracking-widest" style={{ color: "var(--loop-blue)" }}>
              第 {chapterIndex} 章
            </span>
            <span style={{ color: "var(--loop-ink-2)" }}>{chapterTitle}</span>
          </nav>

          {/* step rail — in-lesson map nav */}
          <div className="overflow-x-auto rounded-full px-4 py-2.5" style={raised}>
            <ol className="flex min-w-max items-start">
              {lesson.steps.map((s, i) => {
                const state = i < idx ? "done" : i === idx ? "current" : "todo";
                return (
                  <li key={i} className="flex items-start">
                    {i > 0 ? (
                      <span
                        aria-hidden="true"
                        className="mt-[7px] block h-0.5 w-7 sm:w-10"
                        style={{ background: state === "todo" ? "var(--loop-line)" : "var(--loop-green)" }}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => go(i)}
                      className="flex flex-col items-center gap-1 px-0.5"
                      aria-current={state === "current" ? "step" : undefined}
                    >
                      <span
                        className="block size-4 rounded-full"
                        style={
                          state === "done"
                            ? { background: "var(--loop-green)", border: "2px solid var(--loop-green)" }
                            : state === "current"
                              ? { background: "var(--loop-raised)", border: "5px solid var(--loop-blue)" }
                              : { background: "var(--loop-raised)", border: "2px solid var(--loop-line)" }
                        }
                      />
                      <span
                        className="text-xs"
                        style={{
                          color: state === "current" ? "var(--loop-ink)" : "var(--loop-ink-3)",
                          fontWeight: state === "current" ? 700 : 400,
                        }}
                      >
                        {RAIL_LABEL[s.kind] ?? s.kind}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* lesson header */}
          <header className="mt-4 p-5" style={raised}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded px-1.5 py-0.5 font-mono text-xs font-semibold"
                style={{ background: "var(--loop-blue-wash)", color: "var(--loop-blue)" }}
              >
                {String(loopNumber).padStart(2, "0")} / {loopTotal}
              </span>
              <span
                className="rounded-full px-1.5 text-[0.66rem]"
                style={{ border: "1px solid var(--loop-blue)", color: "var(--loop-blue)" }}
              >
                {node.type}
              </span>
              <span className="text-xs" style={{ color: "var(--loop-ink-3)" }}>
                约 {node.minutes} 分钟
              </span>
              {finished ? (
                <span
                  className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                  style={{ background: "var(--loop-green-wash)", color: "var(--loop-green)" }}
                >
                  <Check className="size-3" /> 已完成
                </span>
              ) : null}
            </div>
            <h1 className="loop-lesson-title mt-2 font-bold">{node.title}</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--loop-ink-2)" }}>
              {node.hook}
            </p>
            {relTerms.length ? (
              <p className="mt-2.5 flex flex-wrap items-baseline gap-1.5 text-xs" style={{ color: "var(--loop-ink-3)" }}>
                相关术语：
                {relTerms.map((t) => (
                  <Link
                    key={t.id}
                    href={`/wiki?vibe=${t.topic}:${t.id}`}
                    className="rounded-full px-2 py-0.5"
                    style={{ background: "var(--loop-blue-wash)", color: "var(--loop-blue-deep)" }}
                  >
                    {t.title}
                  </Link>
                ))}
              </p>
            ) : null}
          </header>

          {/* current step */}
          <article ref={mainRef} className="loop-step-card mt-4">
            <p className="loop-step-kicker">{EYEBROW[step.kind] ?? step.kind}</p>
            {step.title ? <h2 className="loop-step-title font-bold">{step.title}</h2> : null}
            <WikiLesson
              lesson={{ ...lessonP, steps: [{ ...step, title: undefined }] }}
              onProgress={(answered, totalCount) =>
                setStepProgress((prevMap) => ({ ...prevMap, [idx]: { answered, total: totalCount } }))
              }
            />

            {last ? (
              <div className="mt-6 flex flex-col gap-3">
                {!finished ? (
                  <button
                    type="button"
                    onClick={complete}
                    className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--loop-blue)" }}
                  >
                    ✓ 完成回路
                  </button>
                ) : (
                  <>
                    {echoQs.length ? (
                      <div
                        className="px-3.5 py-3"
                        style={{
                          border: "1px solid var(--loop-line)",
                          borderRadius: "var(--loop-radius)",
                          background: "var(--loop-raised)",
                        }}
                      >
                        <p className="mb-2 text-xs font-semibold tracking-widest" style={{ color: "var(--loop-green)" }}>
                          🔁 回声加餐 · 用术语库的题再巩固一遍
                        </p>
                        {echoQs.map((q, qi) => {
                          const sel = echoPicked[qi];
                          return (
                            <div key={q.id} className="mb-3 last:mb-0">
                              <p className="mb-1.5 text-sm font-semibold leading-6">{q.q}</p>
                              {q.options.map((o, oi) => (
                                <button
                                  key={oi}
                                  type="button"
                                  disabled={sel != null}
                                  onClick={() => setEchoPicked((prev) => ({ ...prev, [qi]: oi }))}
                                  className={`loop-opt${sel === oi ? (o.correct ? " picked-right" : " picked-wrong") : sel != null && o.correct ? " picked-right" : ""}`}
                                  style={{ marginBottom: 6 }}
                                >
                                  {o.label}
                                  {sel === oi ? <span className="loop-opt-fb block">{o.feedback}</span> : null}
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    {isChapterEnd ? (
                      <div
                        className="flex items-start gap-2 px-3 py-2.5 text-sm"
                        style={{
                          border: "1px dashed var(--loop-orange)",
                          background: "var(--loop-orange-wash)",
                          borderRadius: "var(--loop-radius)",
                          color: "var(--loop-orange)",
                        }}
                      >
                        <Flag className="mt-0.5 size-4 shrink-0" />
                        <span>{milestone}</span>
                      </div>
                    ) : null}
                    {next ? (
                      <Link
                        href={`/wiki/course/${next.lessonId}/`}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "var(--loop-blue)" }}
                      >
                        下一回路：{next.title}
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : (
                      <Link
                        href="/wiki"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ background: "var(--loop-green)" }}
                      >
                        🎓 全部回路完成 · 返回学习地图
                      </Link>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </article>

          {/* step pager — [返回地图|上一步] · N / M · [下一步 / 完成互动后继续] */}
          <footer className="flex items-center justify-between gap-3" style={{ marginTop: 26 }}>
            <button
              type="button"
              onClick={() => (idx === 0 ? router.push("/wiki") : go(idx - 1))}
              className="rounded-lg px-3.5 py-2 text-sm transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--loop-line)",
                background: "var(--loop-raised)",
                color: "var(--loop-ink-2)",
              }}
            >
              {idx === 0 ? "返回地图" : "上一步"}
            </button>
            <span className="font-mono text-xs" style={{ color: "var(--loop-ink-3)" }}>
              {idx + 1} / {total}
            </span>
            {!last ? (
              <button
                type="button"
                onClick={() => go(idx + 1)}
                disabled={gated}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{
                  background: gated ? "var(--loop-ink-3)" : "var(--loop-blue)",
                  opacity: gated ? 0.8 : 1,
                }}
              >
                {gated ? gateLabel : "继续 →"}
              </button>
            ) : prev || next ? (
              <div className="flex gap-2">
                {prev ? (
                  <Link
                    href={`/wiki/course/${prev.lessonId}/`}
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{ border: "1px solid var(--loop-line)", background: "var(--loop-raised)", color: "var(--loop-ink-2)" }}
                  >
                    ← 上一回路
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/wiki/course/${next.lessonId}/`}
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{ border: "1px solid var(--loop-line)", background: "var(--loop-raised)", color: "var(--loop-ink-2)" }}
                  >
                    下一回路 →
                  </Link>
                ) : null}
              </div>
            ) : (
              <span />
            )}
          </footer>
        </div>

      </div>

      {/* tutor — floating window, bottom-right */}
      {tutorOpen ? (
        <aside
          className="fixed bottom-24 right-4 z-40 flex flex-col overflow-hidden"
          style={{
            ...raised,
            width: "min(370px, calc(100vw - 2rem))",
            height: "min(480px, calc(100vh - 8rem))",
          }}
          aria-label="随行导师"
        >
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--loop-line)" }}>
            <b className="text-sm">随行导师</b>
            <span
              className="truncate rounded-full px-2 py-0.5 text-xs"
              style={{ background: "var(--loop-blue-wash)", color: "var(--loop-blue)" }}
            >
              {node.title}
            </span>
            <button
              type="button"
              aria-label="收起随行导师"
              onClick={() => setTutorOpen(false)}
              className="ml-auto text-base leading-none"
              style={{ color: "var(--loop-ink-3)" }}
            >
              ×
            </button>
          </div>
          <WikiChat
            convo={convo}
            onSend={sendChat}
            showHeader={false}
            chips={
              JUDGE.has(step.kind)
                ? ["给我一点提示，但别告诉我答案", "这道题考的是哪个概念?", "我卡住了，帮我理一下思路"]
                : [
                    `“${step.title ?? node.title}”里没看懂的地方能再讲一遍吗?`,
                    "用我自己的产品再举一个例子",
                    "这个知识在我和工程师开会时怎么用?",
                  ]
            }
            placeholder={
              JUDGE.has(step.kind)
                ? "练习环节：我会给你线索，但不会直接给答案…"
                : "这里没看懂 / 帮我再举个例子 / 为什么…"
            }
            footnote={
              JUDGE.has(step.kind) ? (
                <>
                  当前是<b style={{ color: "var(--loop-orange)" }}>苏格拉底模式</b>
                  ：判断/练习环节导师只给线索不给答案——被引导着想出来的，才是你的。
                </>
              ) : (
                "导师了解你的进度与产品背景 · 回答可能附带一道验证小题"
              )
            }
          />
        </aside>
      ) : null}

      {/* tutor FAB */}
      <button
        type="button"
        aria-label={tutorOpen ? "收起随行导师" : "打开随行导师"}
        onClick={() => setTutorOpen((o) => !o)}
        className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
        style={{ background: "var(--loop-blue)" }}
      >
        <span
          aria-hidden="true"
          className="inline-block size-2 rounded-full"
          style={{ background: "var(--loop-green)" }}
        />
        随行导师
      </button>

      {/* 问这句 floating action on text selection */}
      {quote ? (
        <button
          type="button"
          className="loop-quote-ask"
          style={{ left: quote.x, top: Math.max(8, quote.y), transform: "translateX(-50%)" }}
          onClick={() => {
            sendChat(`问这句：「${quote.text}」`);
            window.getSelection()?.removeAllRanges();
            setQuote(null);
          }}
        >
          问这句 ↗
        </button>
      ) : null}
    </div>
  );
}

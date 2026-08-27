"use client";

// Renders one 闭环学院 lesson (fetched from public/wiki/lessons/*.json).
// Handles all 15 step kinds; interactive answers/feedback use <details> so the
// full content ships while quiz answers stay unspoiled until opened.
import { Fragment, useState } from "react";
import {
  QuizGame,
  JudgmentGame,
  CodereviewGame,
  EstimateGame,
  TheaterGame,
  DecisionGame,
  TimelineBlock,
} from "@/components/wiki/wiki-lesson-games";
import { DiagramFrontback, PeoplenetSim, RaceSim } from "@/components/wiki/wiki-lesson-sims";
import { CommanderSim, GitTimelineSim } from "@/components/wiki/wiki-lesson-sims2";

type Block = {
  kind: string;
  text?: string;
  html?: string;
  title?: string;
  tone?: string;
  items?: string[];
  lang?: string;
  code?: string;
  caption?: string;
  blocks?: Block[];
};

export type LessonStep = {
  kind: string;
  diagram?: string;
  sim?: string;
  title?: string;
  paragraphs?: string[];
  question?: string;
  brief?: string[] | string;
  cards?: { term: string; en: string; plain: string; example: string }[];
  taken?: string;
  left?: string;
  cost?: string;
  blocks?: Block[];
  questions?: {
    stem: string;
    options: { text: string; misconception?: string; correct?: boolean }[];
    explain?: string;
  }[];
  scenario?: string[] | string;
  prompt?: string;
  choices?: { label: string; dimension?: string; feedback?: string }[];
  takeaway?: string;
  summary?: string[];
  applications?: { when: string; action: string }[];
  pmLens?: string;
  further?: { label: string }[];
  debrief?: string[] | string;
  lang?: string;
  minFinds?: number;
  lines?: { code: string; flaw?: { label: string; severity: string; explain: string } }[];
  meters?: Record<string, number>;
  meterLabels?: Record<string, string>;
  endingLabels?: { good?: string; bad?: string };
  stages?: {
    situation?: string[];
    prompt?: string;
    choices?: {
      label: string;
      detail?: string;
      consequence?: string[];
      effects?: Record<string, number>;
      expertNote?: string;
    }[];
  }[];
  finale?:
    | string
    | {
        goodEnding?: string[];
        badEnding?: string[];
        threshold?: number;
        expertDebrief?: string[];
      };
  items?: { stem: string; options: string[]; answerIndex: number; reveal?: string }[];
  counterWho?: string;
  trait?: string;
  moves?: {
    label: string;
    dimension?: string;
    counter?: string;
    responses?: { label: string; feedback?: string }[];
  }[];
  intro?: string[] | string;
  events?: { year: string; label: string; detail: string }[];
  slips?: (string | { at: string; promised: string; note: string })[];
  punchline?: string;
  quotes?: { text: string; source: string; note?: string }[];
  video?: { title: string; url: string };
};

export type Lesson = { id: string; title: string; type: string; steps: LessonStep[] };

// **bold** → <b>; everything else stays plain text.
function Md({ text }: { text: string }) {
  const parts = String(text ?? "").split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? <b key={i}>{p}</b> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

// Render helper handed to the game components.
const md = (text: string) => <Md text={text} />;

function P({ text }: { text: string }) {
  // Inherits the theme-loop base type (16px / 1.75, ink).
  return (
    <p>
      <Md text={text} />
    </p>
  );
}

// 深潜 collapsible (original: dashed blue box, 深潜 badge, 展开▼/收起▲).
function DeepBlock({ b }: { b: Block }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="loop-deep">
      <button type="button" className="loop-deep-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="loop-deep-badge">深潜</span>
        <span className="loop-deep-title">{b.title}</span>
        <span className="loop-deep-arrow">{open ? "收起 ▲" : "展开 ▼"}</span>
      </button>
      {open ? (
        <div className="loop-deep-body">
          <Blocks blocks={b.blocks ?? []} />
        </div>
      ) : null}
    </div>
  );
}

const CALLOUT_ICON: Record<string, string> = { law: "⚖", trap: "⚠", pm: "◎" };

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((b, i) => {
        if (b.kind === "h")
          return (
            <h6 key={i} className="mt-2 text-base font-bold">
              {b.text}
            </h6>
          );
        if (b.kind === "p") return <P key={i} text={b.text ?? ""} />;
        if (b.kind === "html")
          // Raw visualization HTML from the lesson data; viz-* classes are
          // ported to globals.css under .theme-loop.
          return (
            <div key={i}>
              <div dangerouslySetInnerHTML={{ __html: String(b.html ?? b.text ?? "") }} />
              {b.caption ? <p className="loop-codecaption mt-1">{b.caption}</p> : null}
            </div>
          );
        if (b.kind === "callout") {
          const tone = b.tone && CALLOUT_ICON[b.tone] ? b.tone : "pm";
          return (
            <div key={i} className={`loop-callout ${tone}`}>
              <div className="loop-callout-title">
                {CALLOUT_ICON[tone]} {b.title}
              </div>
              <p className="text-sm leading-7">
                <Md text={b.text ?? ""} />
              </p>
            </div>
          );
        }
        if (b.kind === "list")
          return (
            <ul key={i} className="flex flex-col gap-2">
              {(b.items ?? []).map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden="true" style={{ color: "var(--loop-ink-3)" }}>
                    —
                  </span>
                  <span>
                    <Md text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        if (b.kind === "code")
          return (
            <div key={i}>
              <pre className="loop-codeblock">{b.code}</pre>
              {b.caption ? <p className="loop-codecaption">{b.caption}</p> : null}
            </div>
          );
        if (b.kind === "deep") return <DeepBlock key={i} b={b} />;
        return <P key={i} text={b.text ?? ""} />;
      })}
    </div>
  );
}

function asList(v?: string[] | string): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// 3D flip cards for glossary steps (original: front = term/en/点击翻面, back =
// blue-wash plain + example; progress gates the 下一步 button).
function GlossaryCards({
  cards,
  onProgress,
}: {
  cards: NonNullable<LessonStep["cards"]>;
  onProgress?: (flipped: number, total: number) => void;
}) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const flip = (i: number) => {
    setFlipped((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(i)) nextSet.delete(i);
      else nextSet.add(i);
      onProgress?.(nextSet.size, cards.length);
      return nextSet;
    });
  };
  const allDone = flipped.size >= cards.length;
  return (
    <>
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {cards.map((c, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={c.term}
              type="button"
              onClick={() => flip(i)}
              className="text-left"
              style={{ perspective: 900, height: 168, background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span
                className="relative block h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform .5s",
                  transform: isFlipped ? "rotateY(180deg)" : "none",
                }}
              >
                {/* front */}
                <span
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center"
                  style={{
                    backfaceVisibility: "hidden",
                    borderRadius: "var(--loop-radius, 10px)",
                    border: "1px solid var(--loop-line, #d7dfe8)",
                    background: "var(--loop-raised, #fff)",
                    padding: "16px 18px",
                  }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--loop-blue, #2456a6)", fontFamily: "var(--loop-font-display, serif)" }}
                  >
                    {c.term}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--loop-ink-3, #7b8b9c)" }}>
                    {c.en}
                  </span>
                  <span className="mt-1 text-xs" style={{ color: "var(--loop-ink-3, #7b8b9c)" }}>
                    点击翻面 ↻
                  </span>
                </span>
                {/* back */}
                <span
                  className="absolute inset-0 flex flex-col gap-1.5 overflow-y-auto"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "var(--loop-radius, 10px)",
                    border: "1px solid #c4d5ee",
                    background: "var(--loop-blue-wash, #e3ecf7)",
                    padding: "16px 18px",
                  }}
                >
                  <span className="text-sm leading-6">
                    <Md text={c.plain} />
                  </span>
                  <span className="text-xs leading-5" style={{ color: "var(--loop-ink-2, #43566a)" }}>
                    例：<Md text={c.example} />
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm" style={{ color: "var(--loop-ink-3, #7b8b9c)" }}>
        已翻看 {flipped.size} / {cards.length} 张
        {allDone ? " ✓ 词汇装备完成" : " —— 全部翻完再继续"}
      </p>
    </>
  );
}

// Several fields (brief/debrief/intro/…) are string in some lessons and
// string[] in others — render every element as a paragraph.
function Paras({ v }: { v?: string[] | string }) {
  return (
    <>
      {asList(v).map((p, i) => (
        <P key={i} text={p} />
      ))}
    </>
  );
}

function Step({
  s,
  onProgress,
}: {
  s: LessonStep;
  onProgress?: (answered: number, total: number) => void;
}) {
  const body = (() => {
    switch (s.kind) {
      case "intro":
        return (
          <>
            {(s.paragraphs ?? []).map((p, i) => (
              <P key={i} text={p} />
            ))}
            {s.question ? (
              <p className="text-sm font-medium text-accent">
                <Md text={s.question} />
              </p>
            ) : null}
          </>
        );
      case "glossary":
        return (
          <>
            <Paras v={s.brief} />
            <GlossaryCards cards={s.cards ?? []} onProgress={onProgress} />
          </>
        );
      case "whynow":
        return (
          <div className="loop-whynow">
            {s.taken ? (
              <div className="loop-whynow-cell loop-whynow-taken">
                <h5>AI 拿走了什么</h5>
                <p>
                  <Md text={s.taken} />
                </p>
              </div>
            ) : null}
            {s.left ? (
              <div className="loop-whynow-cell loop-whynow-left">
                <h5>留给你的是什么</h5>
                <p>
                  <Md text={s.left} />
                </p>
              </div>
            ) : null}
            {s.cost ? (
              <div className="loop-whynow-cell loop-whynow-cost">
                <h5>不学的代价（真实事故）</h5>
                <p>
                  <Md text={s.cost} />
                </p>
              </div>
            ) : null}
          </div>
        );
      case "explain":
        return <Blocks blocks={s.blocks ?? []} />;
      case "quiz":
        return <QuizGame s={s} md={md} onProgress={(a, t) => onProgress?.(a, t)} />;
      case "judgment":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            <JudgmentGame s={s} md={md} onDone={() => onProgress?.(1, 1)} />
          </>
        );
      case "outro":
        return (
          <>
            {(s.summary ?? []).map((p, i) => (
              <P key={i} text={p} />
            ))}
            {s.applications?.length ? (
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-muted-foreground">
                {s.applications.map((a, i) => (
                  <li key={i}>
                    <b>{a.when}</b> — <Md text={a.action} />
                  </li>
                ))}
              </ul>
            ) : null}
            {s.pmLens ? (
              <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                <div className="text-xs font-semibold text-accent">PM 视角</div>
                <P text={s.pmLens} />
              </div>
            ) : null}
            {s.further?.length ? (
              <ul className="flex flex-col gap-0.5 font-mono text-xs text-muted-foreground/80">
                {s.further.map((f, i) => (
                  <li key={i}>→ {f.label}</li>
                ))}
              </ul>
            ) : null}
          </>
        );
      case "codereview":
        return (
          <>
            <Paras v={s.brief} />
            <CodereviewGame s={s} md={md} onDone={() => onProgress?.(1, 1)} />
          </>
        );
      case "decision":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            <DecisionGame s={s} md={md} onDone={() => onProgress?.(1, 1)} />
          </>
        );
      case "estimate":
        return <EstimateGame s={s} md={md} onProgress={(a, t) => onProgress?.(a, t)} />;
      case "theater":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            <TheaterGame s={s} md={md} onDone={() => onProgress?.(1, 1)} />
          </>
        );
      case "timeline":
        return (
          <>
            <Paras v={s.intro} />
            <TimelineBlock s={s} md={md} />
          </>
        );
      case "curation":
        return (
          <>
            <Paras v={s.intro} />
            {(s.quotes ?? []).map((q, i) => (
              <blockquote key={i} className="border-l-2 border-accent/40 pl-3">
                <P text={q.text} />
                <p className="mt-0.5 font-mono text-xs text-muted-foreground/70">— {q.source}</p>
                {q.note ? <P text={q.note} /> : null}
              </blockquote>
            ))}
            {s.video ? (
              <a
                href={s.video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:underline"
              >
                ▶ {s.video.title}
              </a>
            ) : null}
          </>
        );
      case "diagram":
        return (
          <>
            <Paras v={s.brief} />
            {s.diagram === "frontback" ? <DiagramFrontback /> : null}
            <Paras v={s.debrief} />
          </>
        );
      case "sim":
        return (
          <>
            <Paras v={s.brief} />
            {s.sim === "peoplenet" ? <PeoplenetSim /> : null}
            {s.sim === "race" ? <RaceSim onFinished={() => onProgress?.(1, 1)} /> : null}
            {s.sim === "commander" ? <CommanderSim onFinished={() => onProgress?.(1, 1)} /> : null}
            {s.sim === "gittimeline" ? <GitTimelineSim onFinished={() => onProgress?.(1, 1)} /> : null}
            <Paras v={s.debrief} />
          </>
        );
      default:
        return (s.paragraphs ?? []).map((p, i) => <P key={i} text={p} />);
    }
  })();

  return (
    <section className="flex flex-col gap-2">
      {s.title ? <h5 className="text-sm font-semibold">{s.title}</h5> : null}
      {body}
    </section>
  );
}

export default function WikiLesson({
  lesson,
  onProgress,
}: {
  lesson: Lesson;
  onProgress?: (answered: number, total: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-t pt-3">
      {lesson.steps.map((s, i) => (
        <Step key={i} s={s} onProgress={onProgress} />
      ))}
    </div>
  );
}

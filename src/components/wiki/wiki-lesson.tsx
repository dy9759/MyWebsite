"use client";

// Renders one 闭环学院 lesson (fetched from public/wiki/lessons/*.json).
// Handles all 15 step kinds; interactive answers/feedback use <details> so the
// full content ships while quiz answers stay unspoiled until opened.
import { Fragment } from "react";

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
    options: { text: string; misconception?: string }[];
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
  lines?: { code: string }[];
  stages?: {
    situation?: string[];
    prompt?: string;
    choices?: { label: string; detail?: string; consequence?: string[] }[];
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
  moves?: {
    label: string;
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

function P({ text }: { text: string }) {
  return (
    <p className="text-sm leading-6 text-muted-foreground">
      <Md text={text} />
    </p>
  );
}

function Reveal({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="mt-1 rounded-md border bg-muted/30 px-2.5 py-1.5">
      <summary className="cursor-pointer text-xs font-medium text-accent">{label}</summary>
      <div className="mt-1.5 flex flex-col gap-1.5">{children}</div>
    </details>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((b, i) => {
        if (b.kind === "h")
          return (
            <h6 key={i} className="mt-1 text-sm font-semibold">
              {b.text}
            </h6>
          );
        if (b.kind === "p") return <P key={i} text={b.text ?? ""} />;
        if (b.kind === "html") {
          // Original site renders styled visualization HTML; we keep its text.
          const stripped = String(b.html ?? b.text ?? "")
            .replace(/<[^>]+>/g, " · ")
            .replace(/(\s*·\s*)+/g, " · ")
            .replace(/^\s*·\s*|\s*·\s*$/g, "")
            .trim();
          return (
            <div key={i} className="rounded-md border border-dashed px-3 py-2">
              <p className="text-sm leading-6 text-muted-foreground">{stripped}</p>
              {b.caption ? (
                <p className="mt-1 font-mono text-xs text-muted-foreground/70">{b.caption}</p>
              ) : null}
            </div>
          );
        }
        if (b.kind === "callout")
          return (
            <div key={i} className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
              {b.title ? <div className="text-xs font-semibold text-accent">{b.title}</div> : null}
              <P text={b.text ?? ""} />
            </div>
          );
        if (b.kind === "list")
          return (
            <ul key={i} className="flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-muted-foreground">
              {(b.items ?? []).map((item, j) => (
                <li key={j}>
                  <Md text={item} />
                </li>
              ))}
            </ul>
          );
        if (b.kind === "code")
          return (
            <div key={i}>
              <pre className="overflow-x-auto rounded-md border bg-muted/40 p-2.5 font-mono text-xs leading-5">
                {b.code}
              </pre>
              {b.caption ? (
                <p className="mt-1 font-mono text-xs text-muted-foreground/70">{b.caption}</p>
              ) : null}
            </div>
          );
        if (b.kind === "deep")
          return (
            <Reveal key={i} label={`深入 · ${b.title ?? ""}`}>
              <Blocks blocks={b.blocks ?? []} />
            </Reveal>
          );
        return <P key={i} text={b.text ?? ""} />;
      })}
    </div>
  );
}

function asList(v?: string[] | string): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
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

function Step({ s }: { s: LessonStep }) {
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
            <div className="grid gap-2 sm:grid-cols-2">
              {(s.cards ?? []).map((c) => (
                <div key={c.term} className="rounded-md border px-2.5 py-2">
                  <div className="font-mono text-xs font-semibold text-accent">
                    {c.term} <span className="font-normal text-muted-foreground">{c.en}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    <Md text={c.plain} />
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground/70">
                    例：<Md text={c.example} />
                  </p>
                </div>
              ))}
            </div>
          </>
        );
      case "whynow":
        return (
          <>
            {s.taken ? <P text={s.taken} /> : null}
            {s.left ? <P text={s.left} /> : null}
            {s.cost ? (
              <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                <P text={s.cost} />
              </div>
            ) : null}
          </>
        );
      case "explain":
        return <Blocks blocks={s.blocks ?? []} />;
      case "quiz":
        return (
          <>
            {(s.questions ?? []).map((q, i) => (
              <div key={i} className="rounded-md border px-3 py-2">
                <p className="text-sm font-medium">
                  <Md text={q.stem} />
                </p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {q.options.map((o, j) => (
                    <li key={j} className="text-sm leading-6 text-muted-foreground">
                      {String.fromCharCode(65 + j)}. <Md text={o.text} />
                      {o.misconception ? (
                        <Reveal label="为什么不对">
                          <P text={o.misconception} />
                        </Reveal>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {q.explain ? (
                  <Reveal label="解析">
                    <P text={q.explain} />
                  </Reveal>
                ) : null}
              </div>
            ))}
          </>
        );
      case "judgment":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            {s.prompt ? <p className="text-sm font-medium text-accent">{s.prompt}</p> : null}
            {(s.choices ?? []).map((c, i) => (
              <div key={i} className="rounded-md border px-3 py-2">
                <p className="text-sm font-medium">
                  <Md text={c.label} />
                </p>
                {c.feedback ? (
                  <Reveal label={c.dimension ? `反馈 · ${c.dimension}` : "反馈"}>
                    <P text={c.feedback} />
                  </Reveal>
                ) : null}
              </div>
            ))}
            {s.takeaway ? (
              <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                <P text={s.takeaway} />
              </div>
            ) : null}
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
            <pre className="overflow-x-auto rounded-md border bg-muted/40 p-2.5 font-mono text-xs leading-5">
              {(s.lines ?? []).map((l) => l.code).join("\n")}
            </pre>
            {s.debrief ? (
              <Reveal label="复盘">
                <Paras v={s.debrief} />
              </Reveal>
            ) : null}
          </>
        );
      case "decision":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            {(s.stages ?? []).map((st, i) => (
              <div key={i} className="rounded-md border px-3 py-2">
                {(st.situation ?? []).map((p, j) => (
                  <P key={j} text={p} />
                ))}
                {st.prompt ? <p className="mt-1 text-sm font-medium text-accent">{st.prompt}</p> : null}
                {(st.choices ?? []).map((c, j) => (
                  <div key={j} className="mt-1.5">
                    <p className="text-sm font-medium">
                      <Md text={c.label} />
                    </p>
                    {c.detail ? <P text={c.detail} /> : null}
                    {c.consequence?.length ? (
                      <Reveal label="后果">
                        {c.consequence.map((p, k) => (
                          <P key={k} text={p} />
                        ))}
                      </Reveal>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            {s.finale ? (
              typeof s.finale === "string" ? (
                <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                  <P text={s.finale} />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {s.finale.goodEnding?.length ? (
                    <Reveal label="好结局">
                      {s.finale.goodEnding.map((p, i) => (
                        <P key={i} text={p} />
                      ))}
                    </Reveal>
                  ) : null}
                  {s.finale.badEnding?.length ? (
                    <Reveal label="坏结局">
                      {s.finale.badEnding.map((p, i) => (
                        <P key={i} text={p} />
                      ))}
                    </Reveal>
                  ) : null}
                  {s.finale.expertDebrief?.length ? (
                    <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                      <div className="text-xs font-semibold text-accent">专家复盘</div>
                      {s.finale.expertDebrief.map((p, i) => (
                        <P key={i} text={p} />
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            ) : null}
          </>
        );
      case "estimate":
        return (
          <>
            {(s.items ?? []).map((it, i) => (
              <div key={i} className="rounded-md border px-3 py-2">
                <p className="text-sm font-medium">
                  <Md text={it.stem} />
                </p>
                <ul className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
                  {it.options.map((o, j) => (
                    <li key={j}>
                      {String.fromCharCode(65 + j)}. <Md text={o} />
                    </li>
                  ))}
                </ul>
                <Reveal label="答案">
                  <p className="text-sm font-medium text-accent">
                    {String.fromCharCode(65 + it.answerIndex)}
                  </p>
                  {it.reveal ? <P text={it.reveal} /> : null}
                </Reveal>
              </div>
            ))}
          </>
        );
      case "theater":
        return (
          <>
            {asList(s.scenario).map((p, i) => (
              <P key={i} text={p} />
            ))}
            {s.prompt ? <p className="text-sm font-medium text-accent">{s.prompt}</p> : null}
            {(s.moves ?? []).map((m, i) => (
              <div key={i} className="rounded-md border px-3 py-2">
                <p className="text-sm font-medium">
                  <Md text={m.label} />
                </p>
                {m.counter ? <P text={m.counter} /> : null}
                {(m.responses ?? []).map((r, j) => (
                  <Reveal key={j} label={r.label}>
                    {r.feedback ? <P text={r.feedback} /> : null}
                  </Reveal>
                ))}
              </div>
            ))}
            {s.takeaway ? (
              <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                <P text={s.takeaway} />
              </div>
            ) : null}
          </>
        );
      case "timeline":
        return (
          <>
            <Paras v={s.intro} />
            <ul className="flex flex-col gap-1.5 border-l-2 border-accent/40 pl-3">
              {(s.events ?? []).map((e, i) => (
                <li key={i} className="text-sm leading-6 text-muted-foreground">
                  <b className="font-mono text-xs text-accent">{e.year}</b> {e.label} —{" "}
                  <Md text={e.detail} />
                </li>
              ))}
            </ul>
            {(s.slips ?? []).map((p, i) =>
              typeof p === "string" ? (
                <P key={i} text={p} />
              ) : (
                <p key={i} className="text-sm leading-6 text-muted-foreground">
                  <b className="font-mono text-xs text-accent">{p.at}</b> {p.promised}
                  <span className="text-muted-foreground/70">（{p.note}）</span>
                </p>
              ),
            )}
            {s.punchline ? (
              <div className="rounded-md border border-accent/50 bg-accent/5 px-3 py-2">
                <P text={s.punchline} />
              </div>
            ) : null}
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
      case "sim":
        return (
          <>
            <Paras v={s.brief} />
            <p className="font-mono text-xs text-muted-foreground/60">
              （原课为互动{s.kind === "sim" ? "模拟器" : "图解"}，此处收录文字内容）
            </p>
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

export default function WikiLesson({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col gap-4 border-t pt-3">
      {lesson.steps.map((s, i) => (
        <Step key={i} s={s} />
      ))}
    </div>
  );
}

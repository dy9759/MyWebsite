"use client";

// Interactive step engines for 闭环学院 lessons, replicating the original
// games: quiz (答题), judgment (选择+画像), codereview (点行找茬), estimate,
// theater (剧场推演), decision (决策模拟 with meters). Each reports progress
// so the pager can gate 继续.
import { useEffect, useState } from "react";
import type { LessonStep } from "@/components/wiki/wiki-lesson";
import { markTrait } from "@/lib/wiki-profile";

type Md = (text: string) => React.ReactNode;

function TraitToast({ trait, onGone }: { trait: string; onGone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onGone, 3000);
    return () => clearTimeout(t);
  }, [onGone]);
  return (
    <div className="loop-trait-toast" role="status">
      判断力画像 · <b>{trait} +1</b>
    </div>
  );
}

export function QuizGame({
  s,
  md,
  onProgress,
}: {
  s: LessonStep;
  md: Md;
  onProgress: (answered: number, total: number) => void;
}) {
  const questions = s.questions ?? [];
  const [picked, setPicked] = useState<Record<number, number>>({});
  const pick = (qi: number, oi: number) => {
    if (picked[qi] != null) return;
    const next = { ...picked, [qi]: oi };
    setPicked(next);
    onProgress(Object.keys(next).length, questions.length);
  };
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, qi) => {
        const sel = picked[qi];
        const answered = sel != null;
        const correctIdx = q.options.findIndex((o) => o.correct);
        const right = answered && sel === correctIdx;
        return (
          <div key={qi}>
            <div className="loop-quiz-stem">{md(q.stem)}</div>
            <div className="loop-quiz-opts">
              {q.options.map((o, oi) => {
                let cls = "loop-quiz-opt";
                if (answered) cls += oi === correctIdx ? " right" : oi === sel ? " wrong" : " dim";
                return (
                  <button key={oi} type="button" disabled={answered} className={cls} onClick={() => pick(qi, oi)}>
                    {md(o.text)}
                  </button>
                );
              })}
            </div>
            {answered ? (
              right ? (
                <div className="loop-quiz-feedback good">
                  <b>✓ 正确</b>
                  {q.explain ? md(q.explain) : null}
                </div>
              ) : (
                <div className="loop-quiz-feedback miss">
                  <b>✗ 这个选项暴露了一个常见误解</b>
                  {md(q.options[sel!]?.misconception ?? "再想想为什么。")}
                  {q.explain ? (
                    <p style={{ marginTop: 8 }}>
                      <b style={{ display: "inline" }}>正确理解：</b>
                      {md(q.explain)}
                    </p>
                  ) : null}
                </div>
              )
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function JudgmentGame({
  s,
  md,
  onDone,
}: {
  s: LessonStep;
  md: Md;
  onDone: () => void;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const choices = s.choices ?? [];
  const pick = (i: number) => {
    if (sel != null) return;
    setSel(i);
    const dim = choices[i]?.dimension;
    if (dim) {
      setToast(dim);
      markTrait(dim);
    }
    onDone();
  };
  return (
    <div>
      {s.prompt ? <div className="loop-decision-prompt">{md(s.prompt)}</div> : null}
      {sel == null ? (
        choices.map((c, i) => (
          <button key={i} type="button" className="loop-decision-choice" onClick={() => pick(i)}>
            <b>{md(c.label)}</b>
          </button>
        ))
      ) : (
        <>
          <div className="loop-decision-choice" style={{ borderColor: "var(--loop-orange)", cursor: "default" }}>
            <b>你的判断：{md(choices[sel].label)}</b>
            {choices[sel].dimension ? <span>考察维度 · {choices[sel].dimension}</span> : null}
          </div>
          {choices[sel].feedback ? (
            <div className="loop-expert-note">
              <b>专家对照</b>　{md(choices[sel].feedback!)}
            </div>
          ) : null}
          {s.takeaway ? (
            <div className="loop-pm-lens" style={{ marginTop: 14 }}>
              <b>带走这句话：</b>
              {md(s.takeaway)}
            </div>
          ) : null}
        </>
      )}
      {toast ? <TraitToast trait={toast} onGone={() => setToast(null)} /> : null}
    </div>
  );
}

export function CodereviewGame({
  s,
  md,
  onDone,
}: {
  s: LessonStep;
  md: Md;
  onDone: () => void;
}) {
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const lines = s.lines ?? [];
  const flaws = lines
    .map((l, i) => ({ ...l, i }))
    .filter((l) => l.flaw);
  const toggle = (i: number) => {
    if (revealed) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const reveal = () => {
    setRevealed(true);
    onDone();
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="loop-cr-code">
        {lines.map((l, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={
              "loop-cr-line" +
              (marked.has(i) ? " marked" : "") +
              (revealed && l.flaw ? " flawed" : "")
            }
          >
            <span className="loop-cr-lineno">{i + 1}</span>
            <span className="loop-cr-linetext">{l.code || " "}</span>
          </button>
        ))}
      </div>
      {!revealed ? (
        <>
          <p className="loop-cr-status">
            已标记 {marked.size} 行 · 这段代码里埋着 {flaws.length} 处缺陷，至少找出 {s.minFinds ?? 3} 处再揭晓
          </p>
          <div>
            <button type="button" className="loop-btn-judge" disabled={marked.size === 0} onClick={reveal}>
              揭晓答案
            </button>
          </div>
        </>
      ) : (
        <div className="mt-2">
          <p className="loop-cr-status">
            你的战绩：命中 <b>{flaws.filter((f) => marked.has(f.i)).length}</b> / {flaws.length} 处缺陷
            {(() => {
              const falsePos = Array.from(marked).filter((i) => !lines[i]?.flaw).length;
              return falsePos > 0 ? `，误报 ${falsePos} 处（误报不丢人——过度警觉好过盲目放行）` : null;
            })()}
          </p>
          {flaws.map((f) => (
            <div key={f.i} className="loop-flaw-card">
              <b>
                第 {f.i + 1} 行 · {f.flaw!.label}
              </b>
              <span className="loop-sev">{f.flaw!.severity}</span>
              {marked.has(f.i) ? " ✓ 你找到了" : " — 你漏掉了这处"}
              <p className="mt-1.5 text-sm leading-6">{md(f.flaw!.explain)}</p>
            </div>
          ))}
          {s.debrief ? (
            <div className="loop-expert-note">
              <b>验收总结</b>
              {(Array.isArray(s.debrief) ? s.debrief : [s.debrief]).map((p, i) => (
                <p key={i} style={{ marginTop: 8 }}>
                  {md(p)}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function EstimateGame({
  s,
  md,
  onProgress,
}: {
  s: LessonStep;
  md: Md;
  onProgress: (answered: number, total: number) => void;
}) {
  const items = s.items ?? [];
  const [picked, setPicked] = useState<Record<number, number>>({});
  const pick = (ii: number, oi: number) => {
    if (picked[ii] != null) return;
    const next = { ...picked, [ii]: oi };
    setPicked(next);
    onProgress(Object.keys(next).length, items.length);
  };
  return (
    <div className="flex flex-col gap-4">
      {items.map((it, ii) => {
        const sel = picked[ii];
        return (
          <div key={ii}>
            <p className="mb-2 text-sm font-semibold leading-6">{md(it.stem)}</p>
            <div className="grid gap-2">
              {it.options.map((o, oi) => {
                const answered = sel != null;
                const cls =
                  answered && oi === it.answerIndex
                    ? "loop-opt picked-right"
                    : sel === oi
                      ? "loop-opt picked-wrong"
                      : "loop-opt";
                return (
                  <button key={oi} type="button" disabled={answered} className={cls} onClick={() => pick(ii, oi)}>
                    {md(o)}
                  </button>
                );
              })}
            </div>
            {sel != null && it.reveal ? (
              <div className="loop-callout law mt-2">
                <div className="loop-callout-title">◎ 校准</div>
                <p className="text-sm leading-6">{md(it.reveal)}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function TheaterGame({
  s,
  md,
  onDone,
}: {
  s: LessonStep;
  md: Md;
  onDone: () => void;
}) {
  const [move, setMove] = useState<number | null>(null);
  const [resp, setResp] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const moves = s.moves ?? [];
  const m = move != null ? moves[move] : null;
  const pickMove = (i: number) => {
    if (move != null) return;
    setMove(i);
    const dim = moves[i]?.dimension;
    if (dim) {
      setToast(dim);
      markTrait(dim);
    }
  };
  const pickResp = (i: number) => {
    if (resp != null) return;
    setResp(i);
    onDone();
  };
  return (
    <div className="flex flex-col gap-2">
      {s.prompt ? <p className="text-sm font-semibold" style={{ color: "var(--loop-blue)" }}>{s.prompt}</p> : null}
      {moves.map((mv, i) => (
        <button
          key={i}
          type="button"
          disabled={move != null}
          className={move === i ? "loop-opt picked" : "loop-opt"}
          onClick={() => pickMove(i)}
        >
          {md(mv.label)}
        </button>
      ))}
      {m?.counter ? (
        <div className="loop-callout trap">
          <div className="loop-callout-title">⚠ 对方的回合{s.counterWho ? ` · ${s.counterWho}` : ""}</div>
          <p className="text-sm leading-6">{md(m.counter)}</p>
        </div>
      ) : null}
      {m
        ? (m.responses ?? []).map((r, i) => (
            <button
              key={i}
              type="button"
              disabled={resp != null}
              className={resp === i ? "loop-opt picked" : "loop-opt"}
              onClick={() => pickResp(i)}
            >
              {md(r.label)}
              {resp === i && r.feedback ? <span className="loop-opt-fb block">{md(r.feedback)}</span> : null}
            </button>
          ))
        : null}
      {resp != null && s.takeaway ? (
        <div className="loop-callout pm mt-1">
          <div className="loop-callout-title">◎ 带走这句</div>
          <p className="text-sm leading-6">{md(s.takeaway)}</p>
        </div>
      ) : null}
      {toast ? <TraitToast trait={toast} onGone={() => setToast(null)} /> : null}
    </div>
  );
}

export function DecisionGame({
  s,
  md,
  onDone,
}: {
  s: LessonStep;
  md: Md;
  onDone: () => void;
}) {
  const stages = s.stages ?? [];
  const meters0 = (s.meters as Record<string, number> | undefined) ?? {};
  const labels = (s.meterLabels as Record<string, string> | undefined) ?? {};
  const endings = (s.endingLabels as { good?: string; bad?: string } | undefined) ?? {};
  const [meters, setMeters] = useState<Record<string, number>>(meters0);
  const [stage, setStage] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);
  const cur = stages[stage];
  const finale = typeof s.finale === "object" && s.finale ? s.finale : undefined;
  const threshold = finale?.threshold ?? 50;
  const good = (meters.health ?? 0) >= threshold;

  const pick = (i: number) => {
    if (sel != null) return;
    setSel(i);
    const eff = (cur?.choices?.[i] as { effects?: Record<string, number> } | undefined)?.effects;
    if (eff) {
      setMeters((prev) => {
        const next = { ...prev };
        for (const [k, dv] of Object.entries(eff)) next[k] = Math.max(0, Math.min(100, (next[k] ?? 0) + dv));
        return next;
      });
    }
  };
  const advance = () => {
    if (stage + 1 < stages.length) {
      setStage(stage + 1);
      setSel(null);
    } else {
      setEnded(true);
      onDone();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* meters */}
      <div className="grid gap-2 sm:grid-cols-3">
        {Object.entries(meters).map(([k, v]) => (
          <div key={k} className="loop-meter">
            <span className="text-xs" style={{ color: "var(--loop-ink-2)" }}>
              {labels[k] ?? k} · {v}
            </span>
            <div className="loop-meter-bar">
              <div className="loop-meter-fill" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>

      {!ended && cur ? (
        <>
          {(cur.situation ?? []).map((p, i) => (
            <p key={i} className="text-sm leading-7">{md(p)}</p>
          ))}
          {cur.prompt ? <p className="text-sm font-semibold" style={{ color: "var(--loop-blue)" }}>{cur.prompt}</p> : null}
          {(cur.choices ?? []).map((c, i) => (
            <button
              key={i}
              type="button"
              disabled={sel != null}
              className={sel === i ? "loop-opt picked" : "loop-opt"}
              onClick={() => pick(i)}
            >
              <b>{md(c.label)}</b>
              {c.detail ? <span className="mt-1 block text-sm" style={{ color: "var(--loop-ink-2)" }}>{md(c.detail)}</span> : null}
            </button>
          ))}
          {sel != null ? (
            <>
              {(cur.choices?.[sel]?.consequence ?? []).map((p, i) => (
                <p key={i} className="text-sm leading-7" style={{ color: "var(--loop-ink-2)" }}>{md(p)}</p>
              ))}
              <div>
                <button type="button" className="loop-btn-judge" onClick={advance}>
                  {stage + 1 < stages.length ? "下一幕 →" : "看结局"}
                </button>
              </div>
            </>
          ) : null}
        </>
      ) : null}

      {ended ? (
        <div className={good ? "loop-callout law" : "loop-callout trap"}>
          <div className="loop-callout-title">{good ? `◎ ${endings.good ?? "结局"}` : `⚠ ${endings.bad ?? "结局"}`}</div>
          {(good ? finale?.goodEnding : finale?.badEnding)?.map((p, i) => (
            <p key={i} className="text-sm leading-7">{md(p)}</p>
          ))}
          {finale?.expertDebrief?.length ? (
            <div className="mt-2 border-t pt-2" style={{ borderColor: "var(--loop-line)" }}>
              <b className="text-sm">专家复盘</b>
              {finale.expertDebrief.map((p, i) => (
                <p key={i} className="mt-1 text-sm leading-7">{md(p)}</p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function TimelineBlock({
  s,
  md,
}: {
  s: LessonStep;
  md: Md;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const events = s.events ?? [];
  const slips = (s.slips ?? []).filter(
    (x): x is { at: string; promised: string; note: string } => typeof x !== "string",
  );
  const slipStrings = (s.slips ?? []).filter((x): x is string => typeof x === "string");
  const isDelivery = slips.some((x) => x.promised.includes("交付"));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="loop-tl-wrap">
      <div className="loop-tl-events">
        {events.map((e, i) => (
          <div
            key={i}
            className={`loop-tl-event${open.has(i) ? " open" : ""}`}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") toggle(i);
            }}
          >
            <span className="loop-tl-dot" aria-hidden="true" />
            <span className="loop-tl-year">{e.year}</span>
            <span className="loop-tl-label">{e.label}</span>
            {open.has(i) ? <div className="loop-tl-detail">{md(e.detail)}</div> : null}
          </div>
        ))}
      </div>
      {slips.length ? (
        <div>
          {isDelivery ? <div className="loop-tl-slips-title">承诺的交付日期，一推再推 ▼</div> : null}
          {slips.map((sl, i) => (
            <div key={i} className="loop-tl-slip-row">
              <span className="loop-tl-slip-at">{sl.at}</span>
              <span className="loop-tl-slip-bar">
                <span
                  className="loop-tl-slip-fill"
                  style={{ width: `${Math.min(72, 34 + i * 16)}%` }}
                />
                <b style={{ whiteSpace: "nowrap" }}>{sl.promised}</b>
                <span className="loop-tl-slip-note">{sl.note}</span>
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {slipStrings.map((p, i) => (
        <p key={i} className="loop-tl-detail">{md(p)}</p>
      ))}
      {s.punchline ? <div className="loop-tl-punch" style={{ marginTop: 16 }}>{md(s.punchline)}</div> : null}
    </div>
  );
}

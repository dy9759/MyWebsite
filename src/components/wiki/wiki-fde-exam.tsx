"use client";

// FDE 能力测试 — the answering view. Full mode hides answers until submit and
// runs a countdown; practice / wrong modes reveal the answer per question.
import { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { FDE_DOMAIN_LABELS, isCorrect } from "@/lib/fde-exam";
import type { FdeSession } from "@/lib/fde-store";
import { cn } from "@/lib/utils";

const UI = {
  zh: {
    single: "单选",
    multiple: "多选",
    prev: "上一题",
    next: "下一题",
    mark: "标记",
    marked: "已标记",
    check: "查看解析",
    submit: "交卷",
    finish: "结束练习",
    card: "答题卡",
    legend: "实底：已答 · 橙框：已标记",
    correct: "回答正确",
    wrong: "回答错误，正确答案：",
    trap: "易错点",
    confirm: "还有 {n} 题未作答，确定交卷？",
  },
  en: {
    single: "Single",
    multiple: "Multiple",
    prev: "Prev",
    next: "Next",
    mark: "Mark",
    marked: "Marked",
    check: "Check",
    submit: "Submit",
    finish: "Finish",
    card: "Answer sheet",
    legend: "Filled: answered · Orange: marked",
    correct: "Correct",
    wrong: "Wrong — answer: ",
    trap: "Trap",
    confirm: "{n} unanswered. Submit anyway?",
  },
};

const LETTERS = "ABCDEFGH";

function useCountdown(deadline: number | null, onExpire: () => void) {
  const [left, setLeft] = useState(() => (deadline ? deadline - Date.now() : 0));
  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const ms = deadline - Date.now();
      setLeft(ms);
      if (ms <= 0) onExpire();
    };
    tick();
    const h = window.setInterval(tick, 1000);
    return () => window.clearInterval(h);
  }, [deadline, onExpire]);
  const s = Math.max(0, Math.ceil(left / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function WikiFdeExam({
  session,
  onChange,
  onCheck,
  onSubmit,
}: {
  session: FdeSession;
  onChange: (s: FdeSession) => void;
  onCheck: (id: string, correct: boolean) => void;
  onSubmit: () => void;
}) {
  const { language } = useLanguage();
  const t = UI[language];
  const { questions, answers, marks, checked, index, mode } = session;
  const q = questions[index];
  const selected = answers[q.id] ?? [];
  const revealed = mode !== "full" && checked.includes(q.id);
  const timer = useCountdown(session.deadline, onSubmit);

  const choose = (i: number) => {
    if (revealed) return;
    const next = q.type === "single" ? [i] : selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i].sort();
    onChange({ ...session, answers: { ...answers, [q.id]: next } });
  };
  const go = (i: number) => onChange({ ...session, index: Math.max(0, Math.min(questions.length - 1, i)) });
  const toggleMark = () =>
    onChange({ ...session, marks: marks.includes(q.id) ? marks.filter((m) => m !== q.id) : [...marks, q.id] });
  const check = () => {
    onChange({ ...session, checked: [...checked, q.id] });
    onCheck(q.id, isCorrect(q, selected));
  };
  const submit = () => {
    const blank = questions.filter((x) => !(answers[x.id]?.length)).length;
    if (mode === "full" && blank > 0 && !window.confirm(t.confirm.replace("{n}", String(blank)))) return;
    onSubmit();
  };

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start">
      <article className="rounded-xl border p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">
            {index + 1} / {questions.length}
          </span>
          <span className="rounded-full border border-accent bg-accent/10 px-2 py-0.5 text-accent">
            {q.type === "single" ? t.single : t.multiple}
          </span>
          <span>{FDE_DOMAIN_LABELS[language][q.domain]}</span>
          {session.deadline ? <span className="ml-auto font-mono text-base font-bold text-accent">{timer}</span> : null}
        </div>
        <h3 className="mt-3 text-base font-semibold leading-7">{q.stem}</h3>

        <div className="mt-3 flex flex-col gap-2">
          {q.options.map((opt, i) => {
            const on = selected.includes(i);
            const right = revealed && q.answer.includes(i);
            const bad = revealed && on && !q.answer.includes(i);
            return (
              <button
                key={i}
                type="button"
                role={q.type === "single" ? "radio" : "checkbox"}
                aria-checked={on}
                disabled={revealed}
                onClick={() => choose(i)}
                className={cn(
                  "flex gap-3 rounded-lg border px-3 py-2.5 text-left text-sm leading-6 transition-colors",
                  on ? "border-accent bg-accent/10" : "hover:border-accent",
                  right && "border-green-600 bg-green-600/10",
                  bad && "border-red-600 bg-red-600/10",
                )}
              >
                <span className="font-mono font-semibold">{LETTERS[i]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm leading-6">
            <p className={cn("font-semibold", isCorrect(q, selected) ? "text-green-600" : "text-red-600")}>
              {isCorrect(q, selected) ? t.correct : t.wrong + q.answer.map((a) => LETTERS[a]).join("")}
            </p>
            <p className="mt-1">{q.explanation}</p>
            {q.trap ? (
              <p className="mt-1 text-muted-foreground">
                <b>{t.trap}：</b>
                {q.trap}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">
            {t.prev}
          </button>
          <button
            type="button"
            onClick={toggleMark}
            className={cn("inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm", marks.includes(q.id) && "border-orange-500 text-orange-500")}
          >
            <Flag className="size-3.5" />
            {marks.includes(q.id) ? t.marked : t.mark}
          </button>
          {mode !== "full" && !revealed ? (
            <button type="button" onClick={check} disabled={!selected.length} className="rounded-lg border border-accent px-3 py-1.5 text-sm text-accent disabled:opacity-40">
              {t.check}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === questions.length - 1}
            className="ml-auto rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
          >
            {t.next}
          </button>
        </div>
      </article>

      <aside className="rounded-xl border p-4">
        <p className="text-sm font-semibold">{t.card}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{t.legend}</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {questions.map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn(
                "h-8 rounded-md border font-mono text-xs",
                answers[x.id]?.length ? "border-accent bg-accent text-accent-foreground" : "bg-muted/40",
                marks.includes(x.id) && "ring-2 ring-orange-500",
                i === index && "outline outline-2 outline-offset-1 outline-foreground",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button type="button" onClick={submit} className="mt-4 w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
          {mode === "full" ? t.submit : t.finish}
        </button>
      </aside>
    </div>
  );
}

"use client";

// FDE 能力测试 — progress panel on the home view: recent mock-exam scores
// against the pass line, and per-domain mastery (weakest first) aggregated
// over every finished attempt, each with a shortcut into domain practice.
import { useLanguage } from "@/components/language-provider";
import { EXAM_CONFIG, FDE_DOMAIN_LABELS, domainMastery, type FdeDomain } from "@/lib/fde-exam";
import type { FdeRecord } from "@/lib/fde-store";
import { cn } from "@/lib/utils";

const UI = {
  zh: {
    scores: "全真模拟成绩",
    recent: "最近 {n} 次",
    latest: "最近",
    best: "最佳",
    passed: "通过 {p} / {n} 次",
    noExam: "还没有完成过全真模拟。",
    mastery: "知识域掌握度",
    masteryNote: "汇总全部模拟与练习，最弱的排在最前",
    practise: "去练",
  },
  en: {
    scores: "Mock exam scores",
    recent: "Last {n}",
    latest: "Latest",
    best: "Best",
    passed: "Passed {p} / {n}",
    noExam: "No mock exam finished yet.",
    mastery: "Domain mastery",
    masteryNote: "Across all exams and practice, weakest first",
    practise: "Practise",
  },
};

const RECENT = 10;

export default function WikiFdeStats({ history, onPractise }: { history: FdeRecord[]; onPractise: (d: FdeDomain) => void }) {
  const { language } = useLanguage();
  const t = UI[language];
  const labels = FDE_DOMAIN_LABELS[language];
  const exams = history.filter((r) => r.mode === "full");
  const recent = exams.slice(-RECENT);
  const mastery = domainMastery(history);
  const pct = (r: FdeRecord) => (r.max ? (r.score / r.max) * 100 : 0);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <section className="rounded-xl border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold">{t.scores}</h3>
          {recent.length ? (
            <span className="font-mono text-xs text-muted-foreground">{t.recent.replace("{n}", String(recent.length))}</span>
          ) : null}
        </div>
        {recent.length ? (
          <>
            <div className="relative mt-3 flex h-24 items-end gap-1.5 border-b">
              <span
                className="pointer-events-none absolute inset-x-0 border-t border-dashed border-orange-500/70"
                style={{ bottom: `${EXAM_CONFIG.passScore}%` }}
                aria-hidden
              />
              {recent.map((r) => (
                <span
                  key={r.at}
                  title={`${new Date(r.at).toLocaleDateString()} · ${r.score}`}
                  className={cn("flex-1 rounded-t", r.passed ? "bg-accent" : "bg-muted-foreground/40")}
                  style={{ height: `${Math.max(pct(r), 2)}%` }}
                />
              ))}
            </div>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
              <span>
                {t.latest} {recent[recent.length - 1].score}
              </span>
              <span>
                {t.best} {Math.max(...exams.map((r) => r.score))}
              </span>
              <span>
                {t.passed.replace("{p}", String(exams.filter((r) => r.passed).length)).replace("{n}", String(exams.length))}
              </span>
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">{t.noExam}</p>
        )}
      </section>

      <section className="rounded-xl border p-4">
        <h3 className="text-sm font-semibold">{t.mastery}</h3>
        <p className="text-xs text-muted-foreground">{t.masteryNote}</p>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm">
          {mastery.map((m) => (
            <li key={m.domain} className="grid grid-cols-[7.5rem_minmax(0,1fr)_2.75rem_auto] items-center gap-2">
              <span className="truncate">{labels[m.domain]}</span>
              <span className="h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn("block h-full", m.rate < EXAM_CONFIG.passScore / 100 ? "bg-orange-500" : "bg-accent")}
                  style={{ width: `${m.rate * 100}%` }}
                />
              </span>
              <span className="text-right font-mono text-xs">{Math.round(m.rate * 100)}%</span>
              <button type="button" onClick={() => onPractise(m.domain)} className="rounded-md border px-1.5 py-0.5 text-xs text-accent hover:border-accent">
                {t.practise}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

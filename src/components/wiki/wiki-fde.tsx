"use client";

// FDE 能力测试 domain — home (全真模拟 / 专项练习 / 错题重练), the exam runner and
// the result page. The question bank lives in src/content/fde-questions.json;
// until the original author's bank is imported (scripts/import-fde.mjs, with
// permission) it holds a few self-written placeholder questions.
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import WikiFdeExam from "@/components/wiki/wiki-fde-exam";
import {
  EXAM_CONFIG,
  FDE_ATTRIBUTION,
  FDE_DOMAINS,
  FDE_DOMAIN_LABELS,
  FDE_QUESTIONS,
  buildExam,
  calculateResult,
  examReady,
  shuffle,
  shuffleOptions,
  type FdeDomain,
  type FdeResult,
} from "@/lib/fde-exam";
import { getWrong, loadSession, saveSession, updateWrong, type FdeMode, type FdeSession } from "@/lib/fde-store";

export const FDE_TOTAL = FDE_QUESTIONS.length;

const UI = {
  zh: {
    title: "FDE 能力测试",
    intro: "智能体开发平台 FDE 认证备考：按正式结构组卷的全真模拟、按知识域的专项练习，以及自动收集的错题本。",
    format: "正式结构：40 单选 + 20 多选 · 90 分钟 · 满分 100 · 70 分通过",
    placeholder: "题库待导入：当前仅 {n} 道占位题，全真模拟需导入完整题库后开放。",
    source: "题目来源",
    full: ["全真模拟", "按各知识域配额随机组卷，交卷前不显示答案，支持标记与倒计时。", "开始 90 分钟考试"],
    practice: ["专项练习", "选一个知识域逐题作答，每题可立即查看解析与易错点。", "开始练习"],
    wrong: ["错题重练", "自动收集答错的题，再次答对即移出错题本。", "进入错题本"],
    all: "全部知识域",
    count: "{n} 题",
    resume: "已恢复上次未完成的作答",
    score: "得分",
    pass: "通过",
    fail: "未通过",
    practiced: "已作答 {n} 题，答对 {c} 题",
    byDomain: "各知识域",
    review: "错题回顾",
    retry: "再来一次",
    home: "返回",
  },
  en: {
    title: "FDE Study",
    intro: "Prep for the agent-platform FDE certification: full mock exams in the official format, per-domain practice and an auto-collected wrong-answer book.",
    format: "Official format: 40 single + 20 multiple · 90 min · 100 points · pass at 70",
    placeholder: "Question bank pending import: {n} placeholder questions only; the mock exam unlocks once the full bank is imported.",
    source: "Questions from",
    full: ["Mock exam", "Random paper by domain quota; answers hidden until submit, with marks and a countdown.", "Start 90-min exam"],
    practice: ["Domain practice", "Pick a domain and answer one by one, with instant explanations and traps.", "Start practice"],
    wrong: ["Wrong-answer book", "Collects what you got wrong; answer it right again to clear it.", "Open book"],
    all: "All domains",
    count: "{n} Qs",
    resume: "Restored your unfinished attempt",
    score: "Score",
    pass: "Passed",
    fail: "Not passed",
    practiced: "{n} answered, {c} correct",
    byDomain: "By domain",
    review: "Review",
    retry: "Try again",
    home: "Back",
  },
};

type Done = { session: FdeSession; result: FdeResult };

function newSession(mode: FdeMode, domain: FdeDomain | null, firstId?: string): FdeSession | null {
  let questions;
  if (mode === "full") questions = buildExam(FDE_QUESTIONS);
  else if (mode === "wrong") {
    const ids = new Set(getWrong());
    questions = shuffle(FDE_QUESTIONS.filter((q) => ids.has(q.id))).map((q) => shuffleOptions(q));
  } else {
    questions = shuffle(FDE_QUESTIONS.filter((q) => !domain || q.domain === domain)).map((q) => shuffleOptions(q));
  }
  if (!questions.length) return null;
  // Search jump: put the chosen question first.
  if (firstId) questions = [...questions.filter((q) => q.id === firstId), ...questions.filter((q) => q.id !== firstId)];
  const deadline = mode === "full" ? Date.now() + EXAM_CONFIG.durationSeconds * 1000 : null;
  return { mode, domain, questions, answers: {}, marks: [], checked: [], index: 0, deadline };
}

function ModeCard({ copy, onStart, disabled, children }: { copy: string[]; onStart: () => void; disabled?: boolean; children?: React.ReactNode }) {
  return (
    <article className="flex flex-col rounded-xl border p-4">
      <h3 className="font-semibold">{copy[0]}</h3>
      <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">{copy[1]}</p>
      {children}
      <button
        type="button"
        onClick={onStart}
        disabled={disabled}
        className="mt-3 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-40"
      >
        {copy[2]}
      </button>
    </article>
  );
}

function ResultView({ done, onRetry, onHome }: { done: Done; onRetry: () => void; onHome: () => void }) {
  const { language } = useLanguage();
  const t = UI[language];
  const labels = FDE_DOMAIN_LABELS[language];
  const { session: s, result } = done;
  const wrong = s.questions.filter((q) => result.wrongIds.includes(q.id));
  const correct = Object.values(result.byDomain).reduce((a, r) => a + (r?.correct ?? 0), 0);
  return (
    <div className="flex flex-col gap-4 py-2">
      <section className="rounded-xl border p-5">
        <p className="text-sm text-muted-foreground">{t.score}</p>
        <p className="mt-1 text-3xl font-bold">
          {result.score}
          <span className="text-base font-normal text-muted-foreground"> / {result.max}</span>
          {s.mode === "full" ? (
            <span className={result.passed ? "ml-3 text-base text-green-600" : "ml-3 text-base text-red-600"}>
              {result.passed ? t.pass : t.fail}
            </span>
          ) : null}
        </p>
        {s.mode !== "full" ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {t.practiced.replace("{n}", String(s.checked.length)).replace("{c}", String(correct))}
          </p>
        ) : null}
        <p className="mt-4 text-sm font-semibold">{t.byDomain}</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm">
          {FDE_DOMAINS.filter((d) => result.byDomain[d]).map((d) => {
            const r = result.byDomain[d]!;
            return (
              <li key={d} className="grid grid-cols-[9rem_minmax(0,1fr)_3.5rem] items-center gap-2">
                <span className="truncate">{labels[d]}</span>
                <span className="h-2 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full bg-accent" style={{ width: `${(r.correct / r.total) * 100}%` }} />
                </span>
                <span className="text-right font-mono text-xs">
                  {r.correct}/{r.total}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onRetry} className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
            {t.retry}
          </button>
          <button type="button" onClick={onHome} className="rounded-lg border px-3 py-1.5 text-sm">
            {t.home}
          </button>
        </div>
      </section>
      {wrong.length ? (
        <section className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{t.review}</p>
          {wrong.map((q) => (
            <article key={q.id} className="rounded-lg border p-3 text-sm leading-6">
              <p className="font-semibold">{q.stem}</p>
              <p className="mt-1 text-green-600">{q.answer.map((a) => q.options[a]).join(" / ")}</p>
              <p className="mt-1 text-muted-foreground">{q.explanation}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default function WikiFde({
  target = null,
  onLive,
}: {
  target?: { id: string; ts: number } | null;
  onLive?: (live: boolean) => void;
}) {
  const { language } = useLanguage();
  const t = UI[language];
  const labels = FDE_DOMAIN_LABELS[language];
  const ready = examReady(FDE_QUESTIONS);

  const [session, setSession] = useState<FdeSession | null>(null);
  const sessionRef = useRef<FdeSession | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [domain, setDomain] = useState<FdeDomain | "">("");
  const [wrongCount, setWrongCount] = useState(0);
  const [resumed, setResumed] = useState(false);

  const update = (s: FdeSession | null) => {
    sessionRef.current = s;
    setSession(s);
    saveSession(s);
    onLive?.(!!s);
  };

  // Read storage after mount (hydration-safe on the static export).
  useEffect(() => {
    setWrongCount(getWrong().length);
    const saved = loadSession();
    if (saved?.questions?.length) {
      sessionRef.current = saved;
      setSession(saved);
      setResumed(true);
    }
  }, []);

  const start = (mode: FdeMode, d: FdeDomain | null = null, firstId?: string) => {
    setDone(null);
    setResumed(false);
    update(newSession(mode, d, firstId));
  };

  // Search hit → practise that question's domain starting from it. Never
  // clobbers an attempt in progress (the session restore runs first).
  useEffect(() => {
    if (!target || sessionRef.current || loadSession()) return;
    const q = FDE_QUESTIONS.find((x) => x.id === target.id);
    if (q) start("practice", q.domain, q.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.ts]);

  const onCheck = (id: string, correct: boolean) => {
    setWrongCount((correct ? updateWrong([], [id]) : updateWrong([id])).length);
  };

  // Stable identity: the countdown effect depends on it.
  const submit = useCallback(() => {
    const s = sessionRef.current;
    if (!s) return;
    // Practice / wrong modes grade only the questions actually checked.
    const graded = s.mode === "full" ? s.questions : s.questions.filter((q) => s.checked.includes(q.id));
    const result = calculateResult(graded, s.answers);
    if (s.mode === "full") {
      const right = graded.filter((q) => !result.wrongIds.includes(q.id)).map((q) => q.id);
      setWrongCount(updateWrong(result.wrongIds, right).length);
    }
    sessionRef.current = null;
    saveSession(null);
    setSession(null);
    onLive?.(false);
    setDone(graded.length ? { session: s, result } : null);
  }, [onLive]);

  if (session) {
    return (
      <div className="py-2">
        {resumed ? <p className="mb-2 text-xs text-muted-foreground">{t.resume}</p> : null}
        <WikiFdeExam session={session} onChange={update} onCheck={onCheck} onSubmit={submit} />
      </div>
    );
  }

  if (done) {
    return <ResultView done={done} onRetry={() => start(done.session.mode, done.session.domain)} onHome={() => setDone(null)} />;
  }

  const domainCount = (d: FdeDomain | "") => FDE_QUESTIONS.filter((q) => !d || q.domain === d).length;
  return (
    <div className="flex flex-col gap-4 py-2">
      <header>
        <h2 className="text-xl font-bold">{t.title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{t.intro}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground/80">{t.format}</p>
        {FDE_ATTRIBUTION ? (
          <a
            href={FDE_ATTRIBUTION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-0.5 text-xs text-accent underline"
          >
            {t.source}：{FDE_ATTRIBUTION.title}
            <ArrowUpRight className="size-3" />
          </a>
        ) : (
          <p className="mt-2 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
            {t.placeholder.replace("{n}", String(FDE_TOTAL))}
          </p>
        )}
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        <ModeCard copy={t.full} onStart={() => start("full")} disabled={!ready} />
        <ModeCard copy={t.practice} onStart={() => start("practice", domain || null)}>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as FdeDomain | "")}
            className="mt-2 rounded-lg border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">
              {t.all} · {t.count.replace("{n}", String(domainCount("")))}
            </option>
            {FDE_DOMAINS.filter((d) => domainCount(d)).map((d) => (
              <option key={d} value={d}>
                {labels[d]} · {t.count.replace("{n}", String(domainCount(d)))}
              </option>
            ))}
          </select>
        </ModeCard>
        <ModeCard copy={t.wrong} onStart={() => start("wrong")} disabled={!wrongCount}>
          <p className="mt-2 font-mono text-xs text-muted-foreground">{t.count.replace("{n}", String(wrongCount))}</p>
        </ModeCard>
      </div>
    </div>
  );
}

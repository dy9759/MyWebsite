"use client";

// VibeHub 练习 replica: question left, locked term-detail right; a correct
// answer reveals the term. Questions come from the harvested lessonPractice
// data (owner-authorized import), shuffled per visit.
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type PracticeQ = {
  id: string;
  q: string;
  options: { label: string; feedback: string; correct: boolean }[];
  term: {
    title: string;
    secondaryTitle?: string | null;
    tagline: string;
    description?: string | null;
    url?: string;
  };
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WikiVibePractice() {
  const [deck, setDeck] = useState<PracticeQ[] | "loading" | "error">("loading");
  const [idx, setIdx] = useState(0);
  const [tried, setTried] = useState<Record<number, boolean>>({});
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    fetch(`${BASE_PATH}/wiki/vibe/practice.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: PracticeQ[]) => setDeck(shuffle(data)))
      .catch(() => setDeck("error"));
  }, []);

  if (deck === "loading")
    return <p className="mt-6 animate-pulse text-sm" style={{ color: "var(--vh-text-3)" }}>加载中…</p>;
  if (deck === "error")
    return <p className="mt-6 text-sm" style={{ color: "var(--vh-red)" }}>加载失败，刷新重试。</p>;

  const cur = deck[idx % deck.length];

  const pick = (oi: number) => {
    if (solved || tried[oi]) return;
    setTried((prev) => ({ ...prev, [oi]: true }));
    if (cur.options[oi].correct) setSolved(true);
  };

  const next = () => {
    setIdx((n) => n + 1);
    setTried({});
    setSolved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="vh-practice">
      {/* left: question + options */}
      <div>
        <h2 className="vh-pq">{cur.q}</h2>
        {cur.options.map((o, oi) => {
          const state = tried[oi] ? (o.correct ? "right" : "wrong") : "";
          return (
            <div key={oi}>
              <button
                type="button"
                className={`vh-popt ${state}`}
                disabled={solved}
                onClick={() => pick(oi)}
              >
                <span className="vh-pletter">{String.fromCharCode(65 + oi)}</span>
                {o.label}
              </button>
              {tried[oi] ? (
                <div className={`vh-pfb ${o.correct ? "good" : "miss"}`}>{o.feedback}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* right: locked / revealed term detail */}
      <div>
        <p className="vh-plabel">第 {idx + 1} 题</p>
        {!solved ? (
          <div className="vh-plock">
            <span className="vh-peye" aria-hidden="true">🚫👁</span>
            答对后查看完整术语详情
          </div>
        ) : (
          <div className="vh-preveal">
            <h3 style={{ fontSize: 22, fontWeight: 700 }}>
              {cur.term.title}
              {cur.term.secondaryTitle ? (
                <span className="vh-en" style={{ marginLeft: 8 }}>{cur.term.secondaryTitle}</span>
              ) : null}
            </h3>
            <p className="vh-tagline-q" style={{ marginTop: 10 }}>{cur.term.tagline}</p>
            {cur.term.description ? (
              <p style={{ fontSize: 14.5, lineHeight: 1.8, marginTop: 14 }}>{cur.term.description}</p>
            ) : null}
            <img
              src={`${BASE_PATH}/wiki/vibe/previews/${cur.id}.png?v=2`}
              alt=""
              loading="lazy"
              className="vh-thumb"
              style={{ marginTop: 16 }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {cur.term.url ? (
              <p style={{ marginTop: 14 }}>
                <a href={cur.term.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--vh-brand)", fontSize: 13 }}>
                  在 vibe-hub.org 查看原文 ↗
                </a>
              </p>
            ) : null}
            <button type="button" className="vh-pnext" onClick={next}>
              下一题 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

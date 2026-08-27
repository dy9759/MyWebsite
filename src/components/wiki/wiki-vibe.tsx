"use client";

// Vibe Hub domain — the full VibeHub glossary (280 lessons, 7 topics),
// imported via the site's official agent API with the owner's authorization
// (MIT-licensed vibe-hub-skill). Data lazy-loads per topic from
// public/wiki/vibe/{topic}.json; layout follows the original design tokens.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WikiVibePractice from "@/components/wiki/wiki-vibe-practice";
import { COURSE_CHAPTERS } from "@/content/wiki-course";
import conceptMap from "@/content/concept-map.json";

// termId → loops that teach/mention it (strong links first).
const LOOP_META = new Map<string, { chapter: number; title: string }>();
for (const ch of COURSE_CHAPTERS)
  for (const n of ch.nodes) LOOP_META.set(n.lessonId, { chapter: ch.index, title: n.title });
const TERM_LOOPS = new Map<string, { loopId: string; strength: string }[]>();
for (const l of conceptMap.links as { termId: string; loopId: string; strength: string }[]) {
  if (!TERM_LOOPS.has(l.termId)) TERM_LOOPS.set(l.termId, []);
  TERM_LOOPS.get(l.termId)!.push({ loopId: l.loopId, strength: l.strength });
}
const RANK: Record<string, number> = { identity: 0, glossary: 1, mention: 2 };

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const VIBE_TOPICS = [
  { id: "frontend", title: "前端", count: 138 },
  { id: "backend", title: "后端", count: 63 },
  { id: "product", title: "产品", count: 18 },
  { id: "technology", title: "技术栈", count: 31 },
  { id: "ai", title: "AI", count: 38 },
  { id: "git", title: "Git", count: 13 },
  { id: "design", title: "设计风格", count: 24 },
] as const;
export const VIBE_TOTAL = 325;

type Lesson = {
  id: string;
  title: string;
  secondaryTitle?: string | null;
  category: string;
  tagline: string;
  hook?: string;
  source?: string;
  aliases?: string[];
  url?: string;
  description?: string | null;
  prerequisiteLessons?: { id: string; title: string; url?: string }[];
  distinctions?: { id?: string; title?: string; summary?: string }[];
  usage?: { use?: string[]; avoid?: string[]; scenarios?: string[] } | null;
};

export type VibeTarget = { topic: string; id: string; ts: number };

export default function WikiVibe({ target = null }: { target?: VibeTarget | null }) {
  const [topic, setTopic] = useState<string>("frontend");
  const [cache, setCache] = useState<Record<string, Lesson[] | "loading" | "error">>({});
  const [openId, setOpenId] = useState<string | null>(null);

  // Search jump: switch topic, open the term, scroll to it once data is in.
  useEffect(() => {
    if (target) setTopic(target.topic);
  }, [target]);
  useEffect(() => {
    if (!target || topic !== target.topic || !Array.isArray(cache[topic])) return;
    setOpenId(target.id);
    requestAnimationFrame(() => {
      document.getElementById(`vh-term-${target.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, topic, cache[topic]]);

  useEffect(() => {
    setOpenId(null);
    if (topic === "practice" || cache[topic]) return;
    setCache((prev) => ({ ...prev, [topic]: "loading" }));
    fetch(`${BASE_PATH}/wiki/vibe/${topic}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Lesson[]) => setCache((prev) => ({ ...prev, [topic]: data })))
      .catch(() => setCache((prev) => ({ ...prev, [topic]: "error" })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const lessons = cache[topic];
  const groups = useMemo(() => {
    if (!Array.isArray(lessons)) return [];
    const byCat = new Map<string, Lesson[]>();
    for (const l of lessons) {
      if (!byCat.has(l.category)) byCat.set(l.category, []);
      byCat.get(l.category)!.push(l);
    }
    return Array.from(byCat.entries());
  }, [lessons]);

  return (
    <div className="theme-vibe -mx-4 -mb-4 rounded-none px-4 pb-6 pt-4 md:px-6">
      <div className="grid gap-6 md:grid-cols-[9rem_minmax(0,1fr)] md:items-start">
        {/* left rail: topics as primary nav, active topic's categories nested */}
        <nav aria-label="术语主题与分类导航" className="sticky top-28 z-40 hidden self-start md:block">
          <span
            className="mb-1 block px-2 text-[10px] font-medium uppercase tracking-wide"
            style={{ color: "var(--vh-text-3)" }}
          >
            Vibe Hub
          </span>
          <button
            type="button"
            onClick={() => setTopic("practice")}
            className="w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors"
            style={
              topic === "practice"
                ? { background: "var(--vh-brand-light)", color: "var(--vh-brand)", fontWeight: 600 }
                : { color: "var(--vh-text-2)" }
            }
          >
            练习
            <span className="vh-count">254</span>
          </button>
          {VIBE_TOPICS.map((t) => (
            <div key={t.id}>
              <button
                type="button"
                onClick={() => setTopic(t.id)}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors"
                style={
                  topic === t.id
                    ? { background: "var(--vh-brand-light)", color: "var(--vh-brand)", fontWeight: 600 }
                    : { color: "var(--vh-text-2)" }
                }
              >
                {t.title}
                <span className="vh-count">{t.count}</span>
              </button>
              {topic === t.id
                ? groups.map(([cat], i) => (
                    <a
                      key={cat}
                      href={`#vh-c${i}`}
                      className="block rounded-md py-1 pl-5 pr-2 text-xs transition-colors hover:underline"
                      style={{ color: "var(--vh-text-3)" }}
                    >
                      {cat}
                    </a>
                  ))
                : null}
            </div>
          ))}
        </nav>
        <div className="min-w-0">
          {/* mobile topic switcher (rail is desktop-only) */}
          <div className="flex flex-wrap gap-1 md:hidden">
            <button
              type="button"
              className={`vh-topic${topic === "practice" ? " on" : ""}`}
              onClick={() => setTopic("practice")}
            >
              练习
            </button>
            {VIBE_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`vh-topic${topic === t.id ? " on" : ""}`}
                onClick={() => setTopic(t.id)}
              >
                {t.title}
                <span className="vh-count">{t.count}</span>
              </button>
            ))}
          </div>
          {topic === "practice" ? (
            <WikiVibePractice />
          ) : (
            <>
          <h2 className="vh-page-title !mt-0">
            {VIBE_TOPICS.find((t) => t.id === topic)?.title} VibeCoding 术语
          </h2>

          {lessons === "loading" || !lessons ? (
            <p className="mt-6 animate-pulse text-sm" style={{ color: "var(--vh-text-3)" }}>
              加载中…
            </p>
          ) : lessons === "error" ? (
            <p className="mt-6 text-sm" style={{ color: "var(--vh-red)" }}>
              加载失败，切换重试。
            </p>
          ) : (
            groups.map(([cat, items], gi) => (
              <section key={cat} id={`vh-c${gi}`} className="scroll-mt-28">
                <h3 className="vh-cat-title">
                  {cat}
                  <span className="vh-count">{items.length} 个条目</span>
                </h3>
                <div className="vh-grid">
                  {items.map((l) => (
                    <VibeCard
                      key={l.id}
                      l={l}
                      open={openId === l.id}
                      onToggle={() => setOpenId(openId === l.id ? null : l.id)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}

          <p className="vh-credit">
            内容与版式来自{" "}
            <a href="https://vibe-hub.org/" target="_blank" rel="noopener noreferrer">
              vibe-hub.org
            </a>{" "}
            （作者 oil-oil · 经站主授权 ·{" "}
            <a href="https://github.com/oil-oil/vibe-hub-skill" target="_blank" rel="noopener noreferrer">
              vibe-hub-skill
            </a>{" "}
            MIT）
          </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function VibeCard({ l, open, onToggle }: { l: Lesson; open: boolean; onToggle: () => void }) {
  // v2 = compact card demos (replaced the detail-page captures)
  const preview = `${BASE_PATH}/wiki/vibe/previews/${l.id}.png?v=2`;
  return (
    <>
      <button
        type="button"
        id={`vh-term-${l.id}`}
        className={`vh-card${open ? " on" : ""}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="vh-title-row">
          <h4>{l.title}</h4>
          {l.secondaryTitle ? <span className="vh-en">{l.secondaryTitle}</span> : null}
          {l.source === "course" ? (
            <span
              className="rounded-full px-1.5 text-[0.62rem]"
              style={{ background: "var(--vh-brand-light)", color: "var(--vh-brand)" }}
            >
              闭环学院
            </span>
          ) : null}
          <span className="vh-star" aria-hidden="true">
            ☆
          </span>
        </span>
        <span className="vh-tagline-q">{l.hook ?? l.tagline}</span>
        {/* live-demo capture from the original site; hides itself if absent */}
        <img
          src={preview}
          alt=""
          loading="lazy"
          className="vh-thumb"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </button>
      {open ? (
        <div className="vh-detail">
          <h3>
            {l.title}
            {l.secondaryTitle ? <span className="vh-en">{l.secondaryTitle}</span> : null}
          </h3>
          <p className="vh-tagline">{l.tagline}</p>
          {l.description ? <p className="vh-desc">{l.description}</p> : null}
          {l.usage?.use?.length || l.usage?.avoid?.length ? (
            <div className="vh-usage">
              {l.usage?.use?.length ? (
                <ul className="vh-use">
                  <b>✓ 建议这样用</b>
                  {l.usage.use.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              ) : null}
              {l.usage?.avoid?.length ? (
                <ul className="vh-avoid">
                  <b>✗ 避免这样用</b>
                  {l.usage.avoid.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          {l.usage?.scenarios?.length ? (
            <p className="vh-scenes">出现场景：{l.usage.scenarios.join(" · ")}</p>
          ) : null}
          {l.prerequisiteLessons?.length ? (
            <p style={{ marginTop: 12, fontSize: 13 }}>
              前置：
              {l.prerequisiteLessons.map((p) => (
                <span key={p.id} className="vh-chip">
                  {p.title}
                </span>
              ))}
            </p>
          ) : null}
          {(() => {
            const loops = (TERM_LOOPS.get(l.id) ?? [])
              .slice()
              .sort((a, b) => (RANK[a.strength] ?? 9) - (RANK[b.strength] ?? 9))
              .slice(0, 3);
            return loops.length ? (
              <p style={{ marginTop: 12, fontSize: 13 }}>
                在闭环学院学这个：
                {loops.map(({ loopId }) => {
                  const meta = LOOP_META.get(loopId);
                  if (!meta) return null;
                  return (
                    <Link
                      key={loopId}
                      href={`/wiki/course/${loopId}/`}
                      className="vh-chip"
                      style={{ color: "var(--vh-brand)" }}
                    >
                      第 {meta.chapter} 章 · {meta.title}
                    </Link>
                  );
                })}
              </p>
            ) : null;
          })()}
          {l.url ? (
            <p style={{ marginTop: 12 }}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--vh-brand)", fontSize: 13 }}>
                在 vibe-hub.org 查看原文 ↗
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

"use client";

// Vibe Hub domain — the full VibeHub glossary (280 lessons, 7 topics),
// imported via the site's official agent API with the owner's authorization
// (MIT-licensed vibe-hub-skill). Data lazy-loads per topic from
// public/wiki/vibe/{topic}.json; layout follows the original design tokens.
import { useEffect, useMemo, useState } from "react";
import SectionRailNav from "@/components/section-rail-nav";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const VIBE_TOPICS = [
  { id: "frontend", title: "前端", count: 136 },
  { id: "backend", title: "后端", count: 40 },
  { id: "product", title: "产品", count: 17 },
  { id: "technology", title: "技术栈", count: 26 },
  { id: "ai", title: "AI", count: 25 },
  { id: "git", title: "Git", count: 12 },
  { id: "design", title: "设计风格", count: 24 },
] as const;
export const VIBE_TOTAL = 280;

type Lesson = {
  id: string;
  title: string;
  secondaryTitle?: string | null;
  category: string;
  tagline: string;
  hook?: string;
  aliases?: string[];
  url?: string;
  description?: string | null;
  prerequisiteLessons?: { id: string; title: string; url?: string }[];
  distinctions?: { id?: string; title?: string; summary?: string }[];
  usage?: { use?: string[]; avoid?: string[]; scenarios?: string[] } | null;
};

export default function WikiVibe() {
  const [topic, setTopic] = useState<string>("frontend");
  const [cache, setCache] = useState<Record<string, Lesson[] | "loading" | "error">>({});
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setOpenId(null);
    if (cache[topic]) return;
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
      <div className="grid gap-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start">
        <SectionRailNav
          ariaLabel="术语分类导航"
          label="Vibe Hub"
          items={groups.map(([cat], i) => ({ href: `#vh-c${i}`, label: cat }))}
          className="theme-vibe"
        />
        <div className="min-w-0">
          {/* topic tabs */}
          <div className="flex flex-wrap gap-1">
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
          <h2 className="vh-page-title">
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
      <button type="button" className={`vh-card${open ? " on" : ""}`} onClick={onToggle} aria-expanded={open}>
        <span className="vh-title-row">
          <h4>{l.title}</h4>
          {l.secondaryTitle ? <span className="vh-en">{l.secondaryTitle}</span> : null}
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

"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

// "Core idea × case" cards under a chapter note. Book cases pair the
// chapter's key sentence with a concrete case (both short verbatim passages)
// and a note on how the case shows the idea; as many as matter, ranked by
// importance (3 core, 2 important, 1 optional, folded away). Outside cases
// come from verified articles, talks and interviews, linked to their source.

export type ChapterCase = { point: string; core: string; caseTitle: string; case: string; explain: string; importance?: number };
export type OutsideSource = {
  title: string;
  url: string;
  source: string;
  date: string;
  kind: string;
  summary: string;
  case: string;
  point: string;
  chapter: string;
};

const IMPORTANCE_LABEL: Record<number, string> = { 3: "核心", 2: "重要", 1: "可选" };

export default function NoteCases({ cases, outside }: { cases: ChapterCase[]; outside: OutsideSource[] }) {
  const [showOptional, setShowOptional] = useState(false);
  const main = cases.filter((c) => (c.importance ?? 2) >= 2);
  const optional = cases.filter((c) => (c.importance ?? 2) < 2);
  if (!cases.length && !outside.length) return null;
  return (
    <div className="mt-5 space-y-4">
      {[...main, ...(showOptional ? optional : [])].map((c, i) => (
        <BookCase key={i} c={c} />
      ))}
      {optional.length > 0 && (
        <button type="button" onClick={() => setShowOptional((v) => !v)} className="text-xs text-muted-foreground underline-offset-4 hover:underline">
          {showOptional ? "收起可选案例" : `展开 ${optional.length} 条可选案例`}
        </button>
      )}
      {outside.map((s) => (
        <div key={s.url} className="rounded-lg border border-dashed p-3 text-sm">
          <div className="text-xs font-medium text-primary">外部案例 · {s.point}</div>
          <p className="mt-1 leading-6">{s.case || s.summary}</p>
          <SourceLink s={s} />
        </div>
      ))}
    </div>
  );
}

function BookCase({ c }: { c: ChapterCase }) {
  return (
    <div className="rounded-lg border bg-muted/20 p-3 text-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-primary">
        核心观点
        {c.importance && <span className="rounded bg-primary/10 px-1.5 font-normal">{IMPORTANCE_LABEL[c.importance]}</span>}
      </div>
      <p className="mt-1 font-medium">{c.point}</p>
      <blockquote className="mt-2 border-l-2 border-primary/60 pl-3 leading-6 text-muted-foreground">{c.core}</blockquote>
      <div className="mt-3 text-xs font-medium text-primary">案例 · {c.caseTitle}</div>
      <blockquote className="mt-1 border-l-2 border-muted-foreground/30 pl-3 leading-6 text-muted-foreground">{c.case}</blockquote>
      <p className="mt-2 leading-6">
        <span className="mr-1 text-xs font-medium text-primary">怎么说明观点</span>
        {c.explain}
      </p>
    </div>
  );
}

function SourceLink({ s }: { s: OutsideSource }) {
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline">
      {s.kind} · {s.source}
      {s.date && ` · ${s.date}`} · {s.title} <ExternalLink className="h-3 w-3 shrink-0" />
    </a>
  );
}

// Book-end list: every outside source, with what it adds to the book.
export function NoteSources({ items }: { items: OutsideSource[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">延伸阅读与外部案例</h2>
      <p className="mt-1 text-xs text-muted-foreground">作者访谈、文章、演讲等书外来源，均已打开原页面核对；内容为中文概述，详情请看原文。</p>
      <ul className="mt-4 space-y-4">
        {items.map((s) => (
          <li key={s.url} className="text-sm">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline">
              {s.title} <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            <div className="text-xs text-muted-foreground">
              {s.kind} · {s.source}
              {s.date && ` · ${s.date}`}
            </div>
            <p className="mt-1 leading-6">{s.summary}</p>
            {s.case && <p className="mt-1 leading-6 text-muted-foreground">案例：{s.case}</p>}
            <p className="mt-1 text-xs text-primary">印证：{s.point}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

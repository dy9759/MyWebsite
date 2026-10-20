"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type ChapterExcerpt = { quote: string; text: string };

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Marks the quote inside its excerpt; whitespace may differ between the
// note and the book text.
function highlight(text: string, quote: string) {
  const re = new RegExp(escapeRe(quote.trim()).replace(/\s+/g, "\\s*"));
  const m = re.exec(text);
  if (!m) return <>{text}</>;
  return (
    <>
      {text.slice(0, m.index)}
      <mark className="rounded-sm bg-yellow-200/70 px-0.5 text-foreground dark:bg-yellow-500/30">{m[0]}</mark>
      {text.slice(m.index + m[0].length)}
    </>
  );
}

type Props = {
  title: string;
  excerpts: ChapterExcerpt[];
  focus: { quote: string; seq: number } | null;
};

// Short original passages behind one chapter's quotes. A quote click in the
// note scrolls its passage into view and flashes it.
export default function NoteExcerpts({ title, excerpts, focus }: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!focus) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-quote="${CSS.escape(focus.quote)}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [focus]);

  return (
    <div className="p-4">
      <div className="text-xs text-muted-foreground">原书章节</div>
      <h4 className="mt-0.5 font-semibold">{title}</h4>
      {excerpts.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">这一章的笔记没有引用原文。</p>
      ) : (
        <ol ref={listRef} className="mt-4 space-y-4">
          {excerpts.map((e) => (
            <li
              key={e.quote}
              data-quote={e.quote}
              className={cn(
                "rounded-md border-l-2 bg-muted/30 px-3 py-2 text-sm leading-7 transition-colors",
                focus?.quote === e.quote ? "border-primary bg-primary/5" : "border-muted-foreground/30",
              )}
            >
              {highlight(e.text, e.quote)}
            </li>
          ))}
        </ol>
      )}
      <p className="mt-6 text-xs text-muted-foreground">
        片段只摘取笔记引文所在的一两句话，供对照阅读；完整内容请阅读正版，或导入你自己的电子书。
      </p>
    </div>
  );
}

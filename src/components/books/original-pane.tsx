"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { getChapterText } from "@/lib/books/chapter-text";
import { openNoteTarget } from "@/lib/books/cite-nav";
import { openBookFile, type FoliateView } from "@/lib/books/foliate";
import { readerCss } from "@/lib/books/reader-css";
import { getBook } from "@/lib/books/store";

export type PaneTarget = { label: string; quote?: string; seq: number };

type Status = "loading" | "ready" | "error";

// The visitor's own copy of the book, embedded next to the note (wide
// screens). Follows the note: a chapter or quote click scrolls it there and
// selects the quoted sentence.
export default function OriginalPane({ bookId, target }: { bookId: string; target: PaneTarget | null }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<FoliateView | null>(null);
  const fileRef = useRef<File | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [fixed, setFixed] = useState(false);
  const [where, setWhere] = useState("");
  const [miss, setMiss] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let view: FoliateView | null = null;
    (async () => {
      const stored = await getBook(bookId);
      if (!stored) throw new Error("not on shelf");
      const file = new File([stored.file], stored.name, { type: stored.file.type });
      const book = await openBookFile(file);
      if (cancelled) return book.destroy?.();
      fileRef.current = file;
      view = document.createElement("foliate-view") as FoliateView;
      view.style.cssText = "display:block;width:100%;height:100%";
      hostRef.current?.replaceChildren(view);
      viewRef.current = view;
      const isFixed = book.rendition?.layout === "pre-paginated";
      if (isFixed) book.rendition = { ...book.rendition, spread: "none" };
      await view.open(book);
      if (isFixed) view.renderer.setAttribute("zoom", "fit-width");
      else {
        // A narrow column reads better as one scrolling page.
        view.renderer.setAttribute("flow", "scrolled");
        view.renderer.setAttribute("margin", "20px");
        view.renderer.setAttribute("max-column-count", "1");
      }
      view.addEventListener("relocate", (e) => setWhere((e as CustomEvent).detail.tocItem?.label ?? ""));
      await view.init({ showTextStart: true });
      if (cancelled) return;
      setFixed(isFixed);
      setStatus("ready");
    })().catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
      view?.close();
      view?.book?.destroy?.();
      view?.remove();
      viewRef.current = null;
    };
  }, [bookId]);

  useEffect(() => {
    if (status === "ready" && !fixed) viewRef.current?.renderer?.setStyles?.(readerCss(dark, 100));
  }, [dark, fixed, status]);

  useEffect(() => {
    const view = viewRef.current;
    const file = fileRef.current;
    if (status !== "ready" || !target || !view || !file) return;
    let alive = true;
    void openNoteTarget(view, file, target.label, target.quote ?? null, (href, section) => getChapterText(view.book, file, href, section), () => {})
      .then((ok) => alive && setMiss(!ok))
      .catch(() => alive && setMiss(true));
    return () => {
      alive = false;
    };
  }, [status, target]);

  const fullHref = `/books/read/?${new URLSearchParams({ id: bookId, ...(target ? { toc: target.label } : {}), ...(target?.quote ? { q: target.quote } : {}) })}`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b px-3 py-2 text-xs">
        <span className="min-w-0 flex-1 truncate text-muted-foreground" title={where}>
          {status === "ready" ? where || "原文" : status === "loading" ? "正在打开你的电子书…" : "打不开这本电子书"}
        </span>
        <button type="button" aria-label="上一页" disabled={status !== "ready"} onClick={() => viewRef.current?.goLeft()} className="rounded p-1 hover:bg-accent/10 disabled:opacity-40">
          <ChevronUp className="h-4 w-4" />
        </button>
        <button type="button" aria-label="下一页" disabled={status !== "ready"} onClick={() => viewRef.current?.goRight()} className="rounded p-1 hover:bg-accent/10 disabled:opacity-40">
          <ChevronDown className="h-4 w-4" />
        </button>
        <Link href={fullHref} className="inline-flex items-center gap-1 rounded px-1.5 py-1 hover:bg-accent/10" title="在阅读器中打开">
          <Maximize2 className="h-3.5 w-3.5" /> 阅读器
        </Link>
      </div>
      {miss && <p className="border-b bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">没在你的版本里找到这一处（版本可能不同），已停在最近的位置。</p>}
      <div ref={hostRef} className="min-h-0 flex-1" />
    </div>
  );
}

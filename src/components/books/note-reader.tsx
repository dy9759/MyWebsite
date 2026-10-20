"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookOpen, ExternalLink, Upload } from "lucide-react";
import NoteExcerpts, { type ChapterExcerpt } from "@/components/books/note-excerpts";
import OriginalPane, { type PaneTarget } from "@/components/books/original-pane";
import { titleMatches } from "@/lib/books/catalog";
import { readCitation } from "@/lib/books/citations";
import { ACCEPTED_EXTENSIONS } from "@/lib/books/formats";
import { importBookFile } from "@/lib/books/import-book";
import { listBooks } from "@/lib/books/store";
import { cn } from "@/lib/utils";

export type RenderedChapter = { label: string; display?: string; heading: string; html: string; excerpts: ChapterExcerpt[] };

type Props = {
  catalogId?: string;
  // Books outside the catalog are found on the shelf by title instead.
  matchTitle?: string;
  officialUrl?: string; // author / publisher page — where the full book lives
  introHtml: string;
  chapters: RenderedChapter[];
  outroHtml: string;
};

export const proseClass = cn(
  "leading-7 [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
  "[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-semibold",
  "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1",
  "[&_.book-cite]:cursor-pointer [&_.book-cite]:text-left [&_.book-cite]:text-primary [&_.book-cite]:underline [&_.book-cite]:decoration-dotted [&_.book-cite]:underline-offset-4 hover:[&_.book-cite]:bg-primary/10",
);

const chapterName = (c: RenderedChapter) => c.display ?? c.label.replace(/\s+#\d+$/, "");
const WIDE = "(min-width: 1280px)"; // Tailwind xl: the three-column layout

type Tab = "excerpts" | "book";

// Note-first reading. Wide screens: contents | note | original, where the
// original is the site's short excerpts or, once imported, the visitor's own
// copy of the book (never hosted here). Narrow screens: quotes expand their
// excerpt inline and chapters open in the full reader.
export default function NoteReader({ catalogId, matchTitle, officialUrl, introHtml, chapters, outroHtml }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const seq = useRef(0);
  const [shelfId, setShelfId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("excerpts");
  const [active, setActive] = useState(0);
  const [target, setTarget] = useState<PaneTarget | null>(null);
  const [focus, setFocus] = useState<{ quote: string; seq: number } | null>(null);
  const [inline, setInline] = useState<{ chapter: number; quote?: string } | null>(null); // narrow screens
  const [importError, setImportError] = useState("");

  const linkable = Boolean(catalogId || matchTitle);

  useEffect(() => {
    if (!catalogId && !matchTitle) return;
    let alive = true;
    listBooks()
      .then((books) => {
        const hit = catalogId
          ? books.find((b) => b.catalogId === catalogId)
          : books.find((b) => titleMatches(b.title, matchTitle!) || titleMatches(b.name, matchTitle!));
        if (!alive || !hit) return;
        setShelfId(hit.id);
        setTab("book");
        if (chapters.length) setTarget({ label: chapters[0].label, seq: ++seq.current });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [catalogId, matchTitle, chapters]);

  // The original column follows the chapter being read.
  useEffect(() => {
    const sections = chapters.map((_, i) => document.getElementById(`ch-${i + 1}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(Number(hit.target.id.slice(3)) - 1);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  const open = (i: number, quote?: string) => {
    if (!window.matchMedia(WIDE).matches) {
      if (shelfId) {
        const q = new URLSearchParams({ id: shelfId, toc: chapters[i].label });
        if (quote) q.set("q", quote);
        return router.push(`/books/read/?${q}`);
      }
      return setInline({ chapter: i, quote });
    }
    setActive(i);
    const n = ++seq.current;
    if (shelfId) setTarget({ label: chapters[i].label, quote, seq: n });
    setFocus(quote ? { quote, seq: n } : null);
  };

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    setImportError("");
    const res = await importBookFile(file, catalogId);
    if (fileRef.current) fileRef.current.value = "";
    if (!res.ok && res.reason === "unsupported") return setImportError(`不支持的格式：${file.name}`);
    setShelfId(res.id);
    setTab("book");
    setTarget({ label: chapters[active].label, seq: ++seq.current });
  };

  const current = chapters[active];

  return (
    <div className="mt-6 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[11rem_minmax(0,1fr)_minmax(0,0.9fr)] xl:gap-6">
      {chapters.length > 0 && (
        <nav aria-label="章节" className="mb-6 lg:sticky lg:top-20 lg:mb-0 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
          <div className="text-xs font-medium text-muted-foreground">章节笔记 · {chapters.length}</div>
          <ol className="mt-2 flex gap-1 overflow-x-auto text-sm lg:block lg:space-y-1">
            {chapters.map((c, i) => (
              <li key={c.label} className="shrink-0">
                <a
                  href={`#ch-${i + 1}`}
                  onClick={() => window.matchMedia(WIDE).matches && open(i)}
                  className={cn(
                    "block rounded px-2 py-1 hover:bg-accent/10 hover:text-foreground",
                    i === active ? "bg-accent/10 font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {c.heading.replace(/（.*）$/, "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-3 text-sm">
          <BookOpen className="h-4 w-4 shrink-0" />
          {shelfId ? (
            <>
              <span>你的书架里有这本书：点章节的「查看原文」或任一「引文」，会直接跳到对应位置。</span>
              <Link href={`/books/read/?id=${shelfId}`} className="font-medium underline-offset-4 hover:underline">
                打开全书 →
              </Link>
            </>
          ) : (
            <span className="text-muted-foreground">
              本站提供读书笔记与引文所在的原文片段，不提供全书原文。
              {officialUrl && (
                <>
                  {" "}
                  <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline">
                    官方页面 / 试读 <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
              {linkable && " · 导入你自己的电子书后，章节和引文能直接跳到原文。"}
            </span>
          )}
        </div>

        <div className={proseClass} dangerouslySetInnerHTML={{ __html: introHtml }} />

        {chapters.map((c, i) => (
          <section
            key={c.label}
            id={`ch-${i + 1}`}
            className={cn("mt-8 scroll-mt-20 rounded-lg border p-4", i === active && "xl:border-primary/40")}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{c.heading}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">原书章节：{chapterName(c)}</p>
              </div>
              {linkable && (
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 text-xs hover:bg-accent/10"
                >
                  <BookOpen className="h-3.5 w-3.5" /> 查看原文
                </button>
              )}
            </div>
            <div
              className={proseClass}
              onClick={(e) => {
                const cite = readCitation(e.target as HTMLElement);
                if (cite?.quote) open(i, cite.quote);
              }}
              dangerouslySetInnerHTML={{ __html: c.html }}
            />
            {inline?.chapter === i && (
              <div className="mt-3 rounded-md bg-muted px-3 py-2 text-xs xl:hidden">
                {inline.quote && c.excerpts.some((e) => e.quote === inline.quote) && (
                  <blockquote className="mb-2 border-l-2 border-primary pl-3 text-sm leading-6">
                    {c.excerpts.find((e) => e.quote === inline.quote)!.text}
                  </blockquote>
                )}
                本站不提供全书原文：
                {officialUrl && (
                  <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="mx-1 underline underline-offset-4">
                    去官方页面了解或试读
                  </a>
                )}
                ，或在 <Link href="/books/#shelf" className="underline underline-offset-4">读书页</Link> 导入你自己的电子书，之后点这里会直接跳到「{chapterName(c)}」。
              </div>
            )}
          </section>
        ))}

        {outroHtml && <div className={cn(proseClass, "mt-8")} dangerouslySetInnerHTML={{ __html: outroHtml }} />}
      </div>

      {current && (
        <aside aria-label="原文" className="hidden xl:sticky xl:top-20 xl:flex xl:h-[calc(100vh-6rem)] xl:flex-col xl:self-start xl:overflow-hidden xl:rounded-lg xl:border">
          <div className="flex items-center gap-1 border-b bg-muted/30 p-1.5 text-xs">
            {(["excerpts", "book"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn("rounded px-2.5 py-1", tab === t ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {t === "excerpts" ? "原文片段" : "我的电子书"}
              </button>
            ))}
          </div>
          <div className={cn("min-h-0 flex-1 overflow-y-auto", tab !== "excerpts" && "hidden")}>
            <NoteExcerpts title={chapterName(current)} excerpts={current.excerpts} focus={focus} />
          </div>
          {/* Kept mounted while hidden, so switching tabs does not reopen the book. */}
          <div className={cn("min-h-0 flex-1", tab !== "book" && "hidden")}>
            {shelfId ? (
              <OriginalPane bookId={shelfId} target={target} />
            ) : (
              <div className="p-4 text-sm">
                <p className="text-muted-foreground">
                  导入你自己的电子书（只存在这个浏览器里，不会上传），这里就会显示完整原文，并随笔记的章节和引文跳转。
                </p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent/10"
                >
                  <Upload className="h-4 w-4" /> 导入电子书
                </button>
                <input ref={fileRef} type="file" hidden accept={ACCEPTED_EXTENSIONS.join(",")} onChange={(e) => onImport(e.target.files?.[0])} />
                {importError && <p className="mt-2 text-xs text-destructive">{importError}</p>}
                {officialUrl && (
                  <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline">
                    没有电子书？官方页面 / 试读 <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

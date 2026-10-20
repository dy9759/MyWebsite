"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { titleMatches } from "@/lib/books/catalog";
import { readCitation } from "@/lib/books/citations";
import { listBooks } from "@/lib/books/store";
import { cn } from "@/lib/utils";

export type RenderedChapter = { label: string; display?: string; heading: string; html: string };

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

// Note-first reading: chapters of the note, each able to open the same
// chapter (or the quoted sentence) in the visitor's own copy of the book.
// The site never hosts the book; without a local copy we point to the
// official page instead.
export default function NoteReader({ catalogId, matchTitle, officialUrl, introHtml, chapters, outroHtml }: Props) {
  const router = useRouter();
  const [shelfId, setShelfId] = useState<string | null>(null);
  const [askFor, setAskFor] = useState<number | null>(null); // chapter showing the "no local copy" hint

  const linkable = Boolean(catalogId || matchTitle);

  useEffect(() => {
    if (!catalogId && !matchTitle) return;
    let alive = true;
    listBooks()
      .then((books) => {
        const hit = catalogId
          ? books.find((b) => b.catalogId === catalogId)
          : books.find((b) => titleMatches(b.title, matchTitle!) || titleMatches(b.name, matchTitle!));
        if (alive) setShelfId(hit?.id ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [catalogId, matchTitle]);

  const open = (i: number, quote?: string) => {
    if (!shelfId) return setAskFor(i);
    const q = new URLSearchParams({ id: shelfId, toc: chapters[i].label });
    if (quote) q.set("q", quote);
    router.push(`/books/read/?${q}`);
  };

  return (
    <div className="mt-6 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
      {chapters.length > 0 && (
        <nav aria-label="章节" className="mb-6 lg:sticky lg:top-20 lg:mb-0 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
          <div className="text-xs font-medium text-muted-foreground">章节笔记 · {chapters.length}</div>
          <ol className="mt-2 flex gap-1 overflow-x-auto text-sm lg:block lg:space-y-1">
            {chapters.map((c, i) => (
              <li key={c.label} className="shrink-0">
                <a href={`#ch-${i + 1}`} className="block rounded px-2 py-1 text-muted-foreground hover:bg-accent/10 hover:text-foreground">
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
              本站只提供读书笔记与简短引文，不提供全书原文。
              {officialUrl && (
                <>
                  {" "}
                  <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline">
                    官方页面 / 试读 <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
              {linkable && " · 在「读书」页导入你自己的电子书后，这里的章节和引文就能直接跳到原文。"}
            </span>
          )}
        </div>

        <div className={proseClass} dangerouslySetInnerHTML={{ __html: introHtml }} />

        {chapters.map((c, i) => (
          <section key={c.label} id={`ch-${i + 1}`} className="mt-8 scroll-mt-20 rounded-lg border p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{c.heading}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">原书章节：{c.display ?? c.label.replace(/\s+#\d+$/, "")}</p>
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
            {askFor === i && (
              <p className="mt-3 rounded-md bg-muted px-3 py-2 text-xs">
                这个浏览器的书架里还没有这本书。本站不提供全书原文：
                {officialUrl && (
                  <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="mx-1 underline underline-offset-4">
                    去官方页面了解或试读
                  </a>
                )}
                ，或在 <Link href="/books/#shelf" className="underline underline-offset-4">读书页</Link> 导入你自己的电子书，之后点这里会直接跳到「{c.display ?? c.label.replace(/\s+#\d+$/, "")}」。
              </p>
            )}
          </section>
        ))}

        {outroHtml && <div className={cn(proseClass, "mt-8")} dangerouslySetInnerHTML={{ __html: outroHtml }} />}
      </div>
    </div>
  );
}

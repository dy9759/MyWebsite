import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import NoteReader, { proseClass } from "@/components/books/note-reader";
import { CATALOG_BY_ID } from "@/lib/books/catalog";
import { linkifyCitations } from "@/lib/books/citations";
import { getAllNotes, getExcerpts, getNote, quotesIn, renderNote, splitNote } from "@/lib/books/notes";

// Note markdown is first-party repo content; 「quotes」 become clickable
// buttons that open the original in the visitor's own copy of the book.
const md = (s: string) => linkifyCitations(marked.parse(s, { async: false, gfm: true }), { pages: false });

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return { title: `${note.title} · 读书笔记`, description: note.summary };
}

export default async function BookNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const parts = splitNote(note.markdown);
  const excerpts = getExcerpts(note.slug);

  return (
    // Chapter-mapped notes get a third column (the original) on wide screens.
    <article className={`mx-auto max-w-5xl px-4 ${parts.chapters.length ? "xl:max-w-[96rem]" : ""}`}>
      <Link href="/books/" className="text-sm text-muted-foreground hover:text-foreground">
        ← 读书
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{note.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        《{note.book}》· {note.author} · {note.date}
        {note.draft && " · 草稿"}
        {" · "}
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/books/notes/${note.slug}/note.md`} className="underline-offset-4 hover:underline">
          Markdown
        </a>
      </p>
      {note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((t) => (
            <span key={t} className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      )}
      {(() => {
        const entry = note.catalogId ? CATALOG_BY_ID.get(note.catalogId) : undefined;
        if (!parts.chapters.length) {
          return <div className={`mt-6 ${proseClass}`} dangerouslySetInnerHTML={{ __html: renderNote(note) }} />;
        }
        return (
          <>
            {entry && (
              <p className="mt-3 text-xs text-muted-foreground">
                书目 <Link href={`/books/catalog/#${entry.id}`} className="underline-offset-4 hover:underline">{entry.id} · {entry.priority} · ★{entry.score.toFixed(1)}</Link>
                {" · "}期望产出：{entry.output}
              </p>
            )}
            <NoteReader
              catalogId={note.catalogId}
              matchTitle={note.catalogId ? undefined : note.title}
              officialUrl={entry?.url ?? note.sourceUrl}
              introHtml={md(parts.intro)}
              chapters={parts.chapters.map((c) => ({
                label: c.label,
                display: c.display,
                heading: c.heading,
                html: md(c.markdown),
                excerpts: quotesIn(c.markdown).flatMap((quote) => {
                  const text = excerpts.get(quote);
                  return text ? [{ quote, text }] : [];
                }),
              }))}
              outroHtml={md(parts.outro)}
            />
          </>
        );
      })()}
    </article>
  );
}

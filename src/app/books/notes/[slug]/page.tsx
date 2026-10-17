import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNote, renderNote } from "@/lib/books/notes";

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

  return (
    <article className="mx-auto max-w-3xl px-4">
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
      <div
        className={[
          "mt-6 leading-7",
          "[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold",
          "[&_h3]:mt-6 [&_h3]:font-semibold",
          "[&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
          "[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: renderNote(note) }}
      />
    </article>
  );
}

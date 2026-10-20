"use client";

import Link from "next/link";
import { useSiteCopy } from "@/components/language-provider";
import PageBreadcrumb from "@/components/page-breadcrumb";
import LocalShelf from "@/components/books/local-shelf";
import type { BookNote } from "@/lib/books/notes";
import { CATALOG, CATALOG_BY_ID, sortCatalog } from "@/lib/books/catalog";

const READ_FIRST = sortCatalog(CATALOG, "priority").slice(0, 5);

type NoteMeta = Omit<BookNote, "markdown"> & { chapterCount: number };

export default function BooksPageContent({ notes }: { notes: NoteMeta[] }) {
  const copy = useSiteCopy().books;
  return (
    <div className="px-4">
      <PageBreadcrumb current={copy.title} />
      <h1 className="mt-4 text-2xl font-bold">{copy.title}</h1>
      <p className="mt-2 text-muted-foreground">{copy.intro}</p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">{copy.notesHeading}</h2>
        {notes.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{copy.notesEmpty}</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/books/notes/${n.slug}/`}
                  className="block h-full rounded-lg border p-4 transition-colors hover:bg-accent/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{n.title}</span>
                    {n.draft && (
                      <span className="rounded border px-1.5 text-xs text-muted-foreground">
                        {copy.draft}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {n.author} · {n.date}
                    {n.chapterCount > 0 && ` · ${n.chapterCount} 章笔记`}
                    {n.catalogId && CATALOG_BY_ID.get(n.catalogId) && ` · ${CATALOG_BY_ID.get(n.catalogId)!.priority} ★${CATALOG_BY_ID.get(n.catalogId)!.score.toFixed(1)}`}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 rounded-lg border p-4">
        <h2 className="text-lg font-semibold">{copy.catalogHeading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{copy.catalogIntro}</p>
        <p className="mt-3 text-xs font-medium text-muted-foreground">{copy.catalogNow}</p>
        <ul className="mt-1 flex flex-wrap gap-2 text-sm">
          {READ_FIRST.map((e) => (
            <li key={e.id}>
              <Link href={`/books/catalog/#${e.id}`} className="rounded border px-2 py-0.5 hover:bg-accent/10">
                {e.title.replace(/[（(].*$/, "")}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/books/catalog/" className="mt-3 inline-block text-sm font-medium underline-offset-4 hover:underline">
          {copy.catalogCta} →
        </Link>
      </section>

      <LocalShelf />
    </div>
  );
}

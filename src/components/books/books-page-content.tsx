"use client";

import Link from "next/link";
import { useSiteCopy } from "@/components/language-provider";
import PageBreadcrumb from "@/components/page-breadcrumb";
import LocalShelf from "@/components/books/local-shelf";
import type { BookNote } from "@/lib/books/notes";

type NoteMeta = Omit<BookNote, "markdown">;

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
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
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
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <LocalShelf />
    </div>
  );
}

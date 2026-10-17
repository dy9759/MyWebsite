"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSiteCopy } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ACCEPTED_EXTENSIONS, detectFormat, titleFromFileName } from "@/lib/books/formats";
import {
  bookIdFor,
  deleteBook,
  getBook,
  listBooks,
  listProgress,
  putBook,
  type BookMeta,
} from "@/lib/books/store";

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export default function LocalShelf() {
  const copy = useSiteCopy().books;
  const inputRef = useRef<HTMLInputElement>(null);
  const [books, setBooks] = useState<BookMeta[] | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState("");

  const refresh = async () => {
    const [list, prog] = await Promise.all([listBooks(), listProgress()]);
    setBooks(list);
    setProgress(Object.fromEntries(prog.map((p) => [p.id, p.fraction])));
  };

  useEffect(() => {
    let alive = true;
    Promise.all([listBooks(), listProgress()])
      .then(([list, prog]) => {
        if (!alive) return;
        setBooks(list);
        setProgress(Object.fromEntries(prog.map((p) => [p.id, p.fraction])));
      })
      .catch(() => alive && setBooks([]));
    return () => {
      alive = false;
    };
  }, []);

  const onFiles = async (files: FileList | null) => {
    setError("");
    for (const file of Array.from(files ?? [])) {
      const format = detectFormat(file.name);
      if (!format) {
        setError(`${copy.unsupported}: ${file.name}`);
        continue;
      }
      const id = await bookIdFor(file);
      if (await getBook(id)) {
        setError(`${copy.duplicate}: ${file.name}`);
        continue;
      }
      await putBook({
        id,
        name: file.name,
        title: titleFromFileName(file.name),
        format,
        size: file.size,
        addedAt: Date.now(),
        file,
      });
    }
    if (inputRef.current) inputRef.current.value = "";
    await refresh();
  };

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">{copy.shelfHeading}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{copy.shelfHint}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button onClick={() => inputRef.current?.click()}>{copy.upload}</Button>
        <span className="text-xs text-muted-foreground">{copy.formats}</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept={ACCEPTED_EXTENSIONS.join(",")}
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {books && books.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">{copy.shelfEmpty}</p>
      )}
      {books && books.length > 0 && (
        <ul className="mt-4 divide-y rounded-lg border">
          {books.map((b) => (
            <li key={b.id} className="flex items-center gap-3 p-3">
              <span className="w-12 shrink-0 rounded bg-muted px-1 py-0.5 text-center text-xs uppercase">
                {b.format}
              </span>
              <Link href={`/books/read/?id=${b.id}`} className="min-w-0 flex-1 hover:underline">
                <div className="truncate font-medium">{b.title}</div>
                <div className="text-xs text-muted-foreground">
                  {formatSize(b.size)}
                  {progress[b.id] != null && ` · ${Math.round(progress[b.id] * 100)}%`}
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await deleteBook(b.id);
                  await refresh();
                }}
              >
                {copy.remove}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

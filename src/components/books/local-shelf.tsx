"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSiteCopy } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ACCEPTED_EXTENSIONS } from "@/lib/books/formats";
import { preloadReader } from "@/lib/books/foliate";
import { importBookFile } from "@/lib/books/import-book";
import { LIBRARIES, fetchLibraryBook, listLibrary, type LibraryBook, type LibrarySource } from "@/lib/books/local-library";
import { deleteBook, listBooks, listProgress, type BookMeta } from "@/lib/books/store";

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export default function LocalShelf() {
  const copy = useSiteCopy().books;
  const inputRef = useRef<HTMLInputElement>(null);
  const [books, setBooks] = useState<BookMeta[] | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  // The owner's libraries that answer here (cloud after sign-in, local server).
  const [libraries, setLibraries] = useState<{ src: LibrarySource; books: LibraryBook[] }[]>([]);
  const [importing, setImporting] = useState("");

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
        // Warm the reader's code while the visitor looks at the shelf, so
        // opening a book does not start with downloading the reader.
        if (list.length) {
          const formats = [...new Set(list.map((b) => b.format))];
          const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
          idle(() => preloadReader(formats));
        }
        setProgress(Object.fromEntries(prog.map((p) => [p.id, p.fraction])));
      })
      .catch(() => alive && setBooks([]));
    Promise.all(LIBRARIES.map(async (src) => ({ src, books: await listLibrary(src) }))).then(
      (found) => alive && setLibraries(found.filter((l): l is { src: LibrarySource; books: LibraryBook[] } => l.books !== null)),
    );
    return () => {
      alive = false;
    };
  }, []);

  const onFiles = async (files: FileList | null) => {
    setError("");
    for (const file of Array.from(files ?? [])) {
      const res = await importBookFile(file);
      if (!res.ok) setError(`${res.reason === "unsupported" ? copy.unsupported : copy.duplicate}: ${file.name}`);
    }
    if (inputRef.current) inputRef.current.value = "";
    await refresh();
  };

  const onShelf = new Set((books ?? []).map((b) => b.name));

  const importLibrary = async (src: LibrarySource, pending: LibraryBook[]) => {
    setError("");
    for (const [i, b] of pending.entries()) {
      setImporting(`${i + 1}/${pending.length} ${b.name}`);
      try {
        await importBookFile(await fetchLibraryBook(src, b.name));
      } catch {
        setError(`导入失败：${b.name}`);
      }
    }
    setImporting("");
    await refresh();
  };

  return (
    <section id="shelf" className="mt-10 scroll-mt-20">
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
      {libraries.map(({ src, books: lib }) => {
        const pending = lib.filter((b) => !onShelf.has(b.name));
        return (
          <div key={src.id} className="mt-3 rounded-md bg-muted/40 px-3 py-2 text-sm">
            {src.label}：{lib.length} 本{pending.length > 0 ? `，${pending.length} 本未导入` : "，已全部导入"}
            {pending.length > 0 && !importing && (
              <Button size="sm" variant="outline" className="ml-3" onClick={() => importLibrary(src, pending)}>
                全部导入
              </Button>
            )}
            {importing && <span className="ml-3 text-xs text-muted-foreground">正在导入 {importing}</span>}
            <p className="mt-1 text-xs text-muted-foreground">
              {src.id === "cloud" ? "只有你登录后可见；导入后书存在这个浏览器里。" : "书只在这台电脑和这个浏览器里，不会上传到网站。"}
            </p>
          </div>
        );
      })}
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

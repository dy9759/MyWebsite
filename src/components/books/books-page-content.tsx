"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, FileText, Library, ListTree } from "lucide-react";
import { useSiteCopy } from "@/components/language-provider";
import PageBreadcrumb from "@/components/page-breadcrumb";
import BooksLevelList, { shortTitle, type NoteLink } from "@/components/books/books-level-list";
import LocalShelf from "@/components/books/local-shelf";
import { READING_ROUTES } from "@/content/books/reading-routes";
import type { BookNote } from "@/lib/books/notes";
import { CATALOG, CATALOG_BY_ID } from "@/lib/books/catalog";
import { levelOf } from "@/lib/books/home";
import { readRecentNotes } from "@/lib/books/recent";
import { useReadingStatus } from "@/lib/books/reading-status";
import { listBooks, listProgress } from "@/lib/books/store";
import { cn } from "@/lib/utils";

type NoteMeta = Omit<BookNote, "markdown"> & { chapterCount: number };
type Recent = { key: string; kind: "note" | "book"; title: string; sub: string; href: string; at: number };

const L1_TOTAL = CATALOG.filter((e) => levelOf(e) === "L1").length;

// Recently read notes (with the chapter reached) and local e-books (with
// progress), newest first. Both live only in this browser.
function useRecent() {
  const [items, setItems] = useState<Recent[] | null>(null);
  useEffect(() => {
    let alive = true;
    Promise.all([listBooks().catch(() => []), listProgress().catch(() => [])]).then(([books, progress]) => {
      if (!alive) return;
      const byId = new Map(books.map((b) => [b.id, b]));
      const fromBooks: Recent[] = progress.flatMap((p) => {
        const b = byId.get(p.id);
        return b ? [{ key: `b-${p.id}`, kind: "book" as const, title: b.title, sub: `电子书 · 读到 ${Math.round(p.fraction * 100)}%`, href: `/books/read/?id=${p.id}`, at: p.updatedAt }] : [];
      });
      const fromNotes: Recent[] = readRecentNotes().map((n) => ({
        key: `n-${n.slug}`,
        kind: "note",
        title: n.title,
        sub: `笔记 · ${n.chapterTitle}`,
        href: `/books/notes/${n.slug}/#ch-${n.chapter + 1}`,
        at: n.at,
      }));
      setItems([...fromNotes, ...fromBooks].sort((a, b) => b.at - a.at).slice(0, 4));
    });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

export default function BooksPageContent({ notes }: { notes: NoteMeta[] }) {
  const copy = useSiteCopy().books;
  const { statusOf, setStatus, map } = useReadingStatus();
  const recent = useRecent();
  const [routeId, setRouteId] = useState(READING_ROUTES[0].id);
  const route = READING_ROUTES.find((r) => r.id === routeId)!;
  const shelfRef = useRef<HTMLDetailsElement>(null);

  // Links to /books/#shelf (e.g. from a note page) open the collapsed shelf.
  useEffect(() => {
    if (location.hash === "#shelf" && shelfRef.current) {
      shelfRef.current.open = true;
      shelfRef.current.scrollIntoView();
    }
  }, []);

  const noteByCatalog: Record<string, NoteLink> = {};
  for (const n of notes) if (n.catalogId) noteByCatalog[n.catalogId] = { slug: n.slug, chapterCount: n.chapterCount };
  const outside = notes.filter((n) => !n.catalogId || !CATALOG_BY_ID.has(n.catalogId));
  const done = Object.values(map).filter((s) => s === "done").length;
  const l1Done = CATALOG.filter((e) => levelOf(e) === "L1" && map[e.id] === "done").length;
  const firstPick = CATALOG.filter((e) => levelOf(e) === "L1" && noteByCatalog[e.id]).sort((a, b) => b.score - a.score)[0];
  const stepHref = (id: string) => (noteByCatalog[id] ? `/books/notes/${noteByCatalog[id].slug}/` : `#${id}`);

  return (
    <div className="px-4">
      <PageBreadcrumb current={copy.title} />
      <h1 className="mt-4 text-2xl font-bold">{copy.title}</h1>
      <p className="mt-2 text-muted-foreground">
        AI 产品经理的分级书单：先读 L1，再按方向进阶。{notes.length} 本有按章节整理的读书笔记，可从笔记跳到原文。
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-md bg-muted px-2.5 py-1">已读 {done} / {CATALOG.length}</span>
        <span className="rounded-md bg-muted px-2.5 py-1">L1 进度 {l1Done} / {L1_TOTAL}</span>
      </div>

      <section className="mt-6" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="text-sm font-medium text-muted-foreground">最近阅读</h2>
        {recent === null ? (
          <div className="mt-2 h-16" />
        ) : recent.length === 0 ? (
          <p className="mt-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            还没有阅读记录。
            {firstPick && noteByCatalog[firstPick.id] && (
              <>
                {" "}从 L1 的第一本开始：
                <Link href={`/books/notes/${noteByCatalog[firstPick.id].slug}/`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {shortTitle(firstPick.title)} →
                </Link>
              </>
            )}
          </p>
        ) : (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((r) => (
              <li key={r.key}>
                <Link href={r.href} className="flex h-full items-start gap-2 rounded-lg border p-3 hover:bg-accent/10">
                  {r.kind === "note" ? <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.sub}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10" aria-labelledby="goal-heading">
        <h2 id="goal-heading" className="text-lg font-semibold">你想读什么？</h2>
        <p className="mt-1 text-sm text-muted-foreground">选一个当前的工作目标，按顺序读这条路线；同时最多再开一本人物 / 产业史并行读。</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {READING_ROUTES.map((r) => {
            const n = r.steps.filter((id) => statusOf(id) === "done").length;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRouteId(r.id)}
                aria-pressed={r.id === routeId}
                className={cn("rounded-lg border p-3 text-left text-sm hover:bg-accent/10", r.id === routeId && "border-primary ring-1 ring-primary")}
              >
                <span className="block font-medium">{r.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {r.steps.length} 本 · 已读 {n}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">{route.goal}</p>
          <ol className="mt-2 flex flex-wrap items-center gap-1 text-sm">
            {route.steps.map((id, i) => {
              const e = CATALOG_BY_ID.get(id);
              if (!e) return null;
              return (
                <li key={id} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground">{route.parallel ? "／" : "→"}</span>}
                  <Link
                    href={stepHref(id)}
                    className={cn("rounded px-1.5 py-0.5 hover:bg-accent/10", statusOf(id) === "done" && "text-muted-foreground line-through")}
                  >
                    {shortTitle(e.title)}
                    {noteByCatalog[id] && <span className="ml-1 text-xs text-emerald-700 dark:text-emerald-300">笔记</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-2 text-xs">
            <span className="text-muted-foreground">读完留下：</span>
            {route.output}
          </p>
        </div>
      </section>

      <BooksLevelList noteByCatalog={noteByCatalog} statusOf={statusOf} setStatus={setStatus} />

      {outside.length > 0 && (
        <section className="mt-8">
          <h3 className="font-medium">
            书目外的笔记 <span className="text-xs font-normal text-muted-foreground">{outside.length} 本</span>
          </h3>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {outside.map((n) => (
              <li key={n.slug} className="rounded-lg border p-3">
                <Link href={`/books/notes/${n.slug}/`} className="font-medium hover:underline">
                  {n.title}
                </Link>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {n.author} · 笔记 {n.chapterCount} 章
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 grid gap-3 md:grid-cols-2">
        <details ref={shelfRef} className="rounded-lg border p-3 [&_section]:mt-2">
          <summary className="flex cursor-pointer items-center gap-2 font-medium">
            <Library className="h-4 w-4" /> 我的书架（本地电子书）
          </summary>
          <LocalShelf />
        </details>
        <Link href="/books/catalog/" className="flex items-start gap-2 rounded-lg border p-3 hover:bg-accent/10">
          <ListTree className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="block font-medium">完整书目 {CATALOG.length} 本 →</span>
            <span className="block text-xs text-muted-foreground">表格筛选、推荐理由与读法、AI 选书顾问</span>
          </span>
        </Link>
      </section>
    </div>
  );
}

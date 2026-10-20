"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ExternalLink, Search } from "lucide-react";
import { CATALOG, CATALOG_BY_ID, type CatalogEntry, type ReadingStatus } from "@/lib/books/catalog";
import { READING_ROUTES } from "@/content/books/reading-routes";
import { GOALS, LEVELS, groupLevel, levelOf, themeOf, type LevelId } from "@/lib/books/home";
import { cn } from "@/lib/utils";

export type NoteLink = { slug: string; chapterCount: number };

type Props = {
  noteByCatalog: Record<string, NoteLink>;
  statusOf: (id: string) => ReadingStatus;
  setStatus: (id: string, s: ReadingStatus) => void;
};

const NEXT_STATUS: Record<ReadingStatus, ReadingStatus> = { todo: "reading", reading: "done", done: "todo" };
const STATUS_LABEL: Record<ReadingStatus, string> = { todo: "标记在读", reading: "在读 · 标记已读", done: "已读" };

export const shortTitle = (t: string) => t.replace(/[（(].*$/, "").trim();

// The book list in three layers: goal tags (with search), reading level,
// then theme groups of book cards. A goal shows its reading route.
export default function BooksLevelList({ noteByCatalog, statusOf, setStatus }: Props) {
  const [goalId, setGoalId] = useState("all");
  const [level, setLevel] = useState<LevelId>("L1");
  const [notesOnly, setNotesOnly] = useState(false);
  const [hideDone, setHideDone] = useState(false);
  const [query, setQuery] = useState("");
  const searching = query.trim() !== "";
  const goal = GOALS.find((g) => g.id === goalId)!;
  const route = READING_ROUTES.find((r) => r.id === goalId);
  const hasNote = (id: string) => id in noteByCatalog;
  const inGoal = (e: CatalogEntry) => !goal.themes || goal.themes.includes(themeOf(e).id);
  const groups = groupLevel(CATALOG, level, { notesOnly, hideDone, query, themes: goal.themes }, hasNote, statusOf);
  const hits = groups.reduce((n, g) => n + g.entries.length, 0);
  const current = LEVELS.find((l) => l.id === level)!;
  const stepHref = (id: string) => (noteByCatalog[id] ? `/books/notes/${noteByCatalog[id].slug}/` : `#${id}`);

  return (
    <section className="mt-8" aria-labelledby="list-heading">
      <h2 id="list-heading" className="sr-only">书单</h2>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div role="tablist" aria-label="阅读目标" className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {GOALS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={!searching && g.id === goalId}
              onClick={() => {
                setGoalId(g.id);
                setQuery("");
                // Jump to the first level that has books for this goal.
                const has = (l: LevelId) => CATALOG.some((e) => levelOf(e) === l && (!g.themes || g.themes.includes(themeOf(e).id)));
                if (!has(level)) setLevel(LEVELS.find((l) => has(l.id))?.id ?? "L1");
              }}
              className={cn(
                "border-b-2 pb-0.5",
                !searching && g.id === goalId ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        <label className="ml-auto flex min-w-[12rem] flex-1 items-center gap-2 border-b px-1 py-1 text-sm focus-within:border-primary sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索书名、作者、主题或推荐理由"
            aria-label="搜索书单"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70"
          />
        </label>
      </div>

      {route && !searching && (
        <div className="mt-3 text-sm">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <li className="mr-2 text-muted-foreground">{route.goal}，建议顺序：</li>
            {route.steps.map((id, i) => {
              const e = CATALOG_BY_ID.get(id);
              if (!e) return null;
              return (
                <li key={id} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground">{route.parallel ? "／" : "→"}</span>}
                  <Link href={stepHref(id)} className={cn("underline-offset-4 hover:underline", statusOf(id) === "done" && "text-muted-foreground line-through")}>
                    {shortTitle(e.title)}
                    {noteByCatalog[id] && <span className="ml-1 text-xs text-emerald-700 dark:text-emerald-300">笔记</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-1 text-xs text-muted-foreground">读完留下：{route.output}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div role="tablist" aria-label="阅读级别" className="flex gap-1.5 overflow-x-auto">
          {LEVELS.map((l) => {
            const n = CATALOG.filter((e) => levelOf(e) === l.id && inGoal(e)).length;
            return (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={!searching && l.id === level}
                onClick={() => {
                  setLevel(l.id);
                  setQuery("");
                }}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1 text-sm",
                  !searching && l.id === level ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                )}
              >
                {l.label} · {n}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex gap-3 text-xs text-muted-foreground">
          <label className="inline-flex items-center gap-1">
            <input type="checkbox" checked={notesOnly} onChange={(e) => setNotesOnly(e.target.checked)} /> 只看有笔记
          </label>
          <label className="inline-flex items-center gap-1">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> 隐藏已读
          </label>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{searching ? `在全部级别中找到 ${hits} 本` : current.hint}</p>

      {groups.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">{searching ? "没有找到，换个关键词试试。" : "这一级没有符合条件的书，换个级别或目标看看。"}</p>
      )}
      {groups.map(({ theme, entries }) => (
        <div key={theme.id} className="mt-6">
          <h3 className="font-medium">
            {theme.label} <span className="text-xs font-normal text-muted-foreground">{entries.length} 本</span>
          </h3>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {entries.map((e) => (
              <BookCard key={e.id} entry={e} note={noteByCatalog[e.id]} status={statusOf(e.id)} onStatus={(s) => setStatus(e.id, s)} showLevel={searching} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function BookCard({ entry, note, status, onStatus, showLevel }: { entry: CatalogEntry; note?: NoteLink; status: ReadingStatus; onStatus: (s: ReadingStatus) => void; showLevel: boolean }) {
  return (
    <li id={entry.id} className={cn("flex scroll-mt-24 flex-col rounded-lg border p-3", status === "done" && "opacity-70")}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium leading-snug">{shortTitle(entry.title)}</span>
        {note ? (
          <span className="shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs text-emerald-700 dark:text-emerald-300">笔记 {note.chapterCount} 章</span>
        ) : (
          <span className="shrink-0 text-xs text-muted-foreground">暂无笔记</span>
        )}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">
        {showLevel && `${levelOf(entry)} · `}
        {entry.author} · {entry.kind} · ★{entry.score.toFixed(1)}
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{entry.reason}</p>
      <div className="mt-3 flex items-center justify-between gap-2 text-sm">
        {note ? (
          <Link href={`/books/notes/${note.slug}/`} className="font-medium text-primary underline-offset-4 hover:underline">
            读笔记 →
          </Link>
        ) : (
          <a href={entry.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
            官方页面 <ExternalLink className="h-3 w-3" />
          </a>
        )}
        <button
          type="button"
          onClick={() => onStatus(NEXT_STATUS[status])}
          className={cn("rounded px-1.5 py-0.5 text-xs hover:bg-accent/10", status === "done" ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground")}
        >
          {status === "done" && <Check className="mr-0.5 inline h-3 w-3" />}
          {STATUS_LABEL[status]}
        </button>
      </div>
    </li>
  );
}

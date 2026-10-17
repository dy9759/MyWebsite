"use client";

import {
  CATEGORIES,
  IMPORTANCE,
  PRIORITIES,
  categoryLabel,
  type CatalogFilter,
  type CatalogSort,
} from "@/lib/books/catalog";
import { cn } from "@/lib/utils";

type Props = {
  filter: CatalogFilter;
  onFilter: (f: CatalogFilter) => void;
  sort: CatalogSort;
  onSort: (s: CatalogSort) => void;
  shown: number;
  total: number;
};

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const Chip = ({ on, onClick, children, title }: { on: boolean; onClick: () => void; children: React.ReactNode; title?: string }) => (
  <button
    type="button"
    title={title}
    aria-pressed={on}
    onClick={onClick}
    className={cn(
      "rounded-full border px-2.5 py-1 text-xs transition-colors",
      on ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent/10",
    )}
  >
    {children}
  </button>
);

export default function CatalogFilters({ filter: f, onFilter, sort, onSort, shown, total }: Props) {
  const set = (patch: Partial<CatalogFilter>) => onFilter({ ...f, ...patch });
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <input
        type="search"
        value={f.query}
        onChange={(e) => set({ query: e.target.value })}
        placeholder="搜索书名、作者或推荐理由…"
        className="w-full rounded-md border bg-background px-3 py-1.5 text-sm"
      />
      <div className="flex flex-wrap gap-1.5">
        {PRIORITIES.map((p) => (
          <Chip key={p.id} on={f.priorities.includes(p.id)} title={p.hint} onClick={() => set({ priorities: toggle(f.priorities, p.id) })}>
            {p.id} {p.label}
          </Chip>
        ))}
        <span className="mx-1 border-l" />
        {IMPORTANCE.map((i) => (
          <Chip key={i.id} on={f.importance.includes(i.id)} title={i.hint} onClick={() => set({ importance: toggle(f.importance, i.id) })}>
            {i.id} {i.label}
          </Chip>
        ))}
        <span className="mx-1 border-l" />
        <Chip on={f.freeOnly} onClick={() => set({ freeOnly: !f.freeOnly })}>
          可免费读
        </Chip>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <Chip key={c} on={f.categories.includes(c)} onClick={() => set({ categories: toggle(f.categories, c) })}>
            {categoryLabel(c)}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <label className="flex items-center gap-1">
          状态
          <select
            value={f.status}
            onChange={(e) => set({ status: e.target.value as CatalogFilter["status"] })}
            className="rounded border bg-background px-1.5 py-0.5"
          >
            <option value="all">全部</option>
            <option value="todo">待读</option>
            <option value="reading">在读</option>
            <option value="done">已读</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          排序
          <select value={sort} onChange={(e) => onSort(e.target.value as CatalogSort)} className="rounded border bg-background px-1.5 py-0.5">
            <option value="priority">先读什么（优先级）</option>
            <option value="score">推荐指数</option>
            <option value="id">编号</option>
          </select>
        </label>
        <span className="ml-auto tabular-nums">
          {shown} / {total} 项
        </span>
        {shown < total && (
          <button
            type="button"
            className="underline-offset-4 hover:underline"
            onClick={() => onFilter({ query: "", categories: [], priorities: [], importance: [], freeOnly: false, status: "all" })}
          >
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}

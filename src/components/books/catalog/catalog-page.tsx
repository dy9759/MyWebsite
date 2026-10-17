"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { READING_PRINCIPLES } from "@/content/books/reading-routes";
import CatalogAdvisor from "@/components/books/catalog/catalog-advisor";
import CatalogFilters from "@/components/books/catalog/catalog-filters";
import CatalogItem from "@/components/books/catalog/catalog-item";
import CatalogRoutes from "@/components/books/catalog/catalog-routes";
import {
  CATALOG,
  EMPTY_FILTER,
  IMPORTANCE,
  PRIORITIES,
  filterCatalog,
  isRecheckedThisRound,
  sortCatalog,
  type CatalogFilter,
  type CatalogSort,
} from "@/lib/books/catalog";
import { useReadingStatus } from "@/lib/books/reading-status";
import { listBooks } from "@/lib/books/store";

const rechecked = CATALOG.filter(isRecheckedThisRound).length;

export default function CatalogPage() {
  const { statusOf, setStatus, map } = useReadingStatus();
  const [filter, setFilter] = useState<CatalogFilter>(EMPTY_FILTER);
  const [sort, setSort] = useState<CatalogSort>("priority");
  const [shelf, setShelf] = useState<Record<string, string>>({}); // catalogId → bookId

  useEffect(() => {
    let alive = true;
    listBooks()
      .then((books) => {
        if (!alive) return;
        setShelf(Object.fromEntries(books.filter((b) => b.catalogId).map((b) => [b.catalogId!, b.id])));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Arriving with #R046 (from /books or the Wiki): bring the entry into view.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (/^R\d{3}$/.test(id)) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  const shown = useMemo(
    () => sortCatalog(filterCatalog(CATALOG, filter, (id) => map[id] ?? "todo"), sort),
    [filter, sort, map],
  );
  const counts = { reading: Object.values(map).filter((s) => s === "reading").length, done: Object.values(map).filter((s) => s === "done").length };

  // Jump to an entry from a route or the advisor: clear filters so it is
  // rendered, then scroll it into view and highlight it via :target.
  const jump = (id: string) => {
    setFilter(EMPTY_FILTER);
    setTimeout(() => {
      // The hash drives the :target highlight; Next's router does not scroll
      // to it, so scroll explicitly.
      if (location.hash !== `#${id}`) location.hash = id;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 0);
  };

  return (
    <div className="px-4">
      <Link href="/books/" className="text-sm text-muted-foreground hover:text-foreground">
        ← 读书
      </Link>
      <h1 className="mt-4 text-2xl font-bold">AI PM 分级阅读目录</h1>
      <p className="mt-2 text-muted-foreground">
        {CATALOG.length} 项读物，覆盖 AI 产品评测、Agent 工程、技术书、产品与商业方法，以及人物传记、回忆录和科技产业史。每项都有优先级、长期重要性、推荐指数，以及推荐理由、建议读法、阅读产出和取舍提醒。
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        目录由 AI 辅助检索整理、作者审定；所有链接指向作者、出版社或原文页面，本站不提供书籍文件。本轮复核了 {rechecked} 项的公开原文或官方介绍，其余沿用上一版来源（每项「核验状态」可查）。本浏览器的阅读进度：在读 {counts.reading} · 已读 {counts.done}（只保存在这里）。
      </p>

      <details className="mt-4 rounded-lg border p-3 text-sm">
        <summary className="cursor-pointer font-medium">怎么读这份目录</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {READING_PRINCIPLES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <div className="text-xs font-medium text-muted-foreground">阅读优先级：什么时候读</div>
            {PRIORITIES.map((p) => (
              <p key={p.id} className="mt-1 text-xs">
                <b>{p.id} {p.label}</b>：{p.hint}
              </p>
            ))}
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">长期重要性：值不值得建立这方面能力</div>
            {IMPORTANCE.map((i) => (
              <p key={i.id} className="mt-1 text-xs">
                <b>{i.id} {i.label}</b>：{i.hint}
              </p>
            ))}
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">推荐指数：值得投入多少精力（5 分制）</div>
            <p className="mt-1 text-xs">5.0 强烈推荐深入掌握；4.5 高度推荐重点选读；4.0 值得读但看前置知识与机会成本；3.5 补充阅读；3.0 当前可暂缓。</p>
          </div>
        </div>
      </details>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">阅读路线</h2>
        <p className="mt-1 text-sm text-muted-foreground">按工作目标组织；同时只走一条主线 + 一本并行长读。</p>
        <div className="mt-3">
          <CatalogRoutes statusOf={statusOf} onJump={jump} />
        </div>
      </section>

      <section className="mt-6">
        <CatalogAdvisor statusOf={statusOf} onJump={jump} />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">全部读物</h2>
        <div className="mt-3">
          <CatalogFilters filter={filter} onFilter={setFilter} sort={sort} onSort={setSort} shown={shown.length} total={CATALOG.length} />
        </div>
        <ul className="mt-4 space-y-3">
          {shown.map((e) => (
            <CatalogItem key={e.id} entry={e} status={statusOf(e.id)} onStatus={(s) => setStatus(e.id, s)} shelfBookId={shelf[e.id]} />
          ))}
        </ul>
      </section>
    </div>
  );
}

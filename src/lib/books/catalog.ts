import catalogData from "@/content/books/catalog.json";

// The ranked AI-PM reading catalog (src/content/books/catalog.json): books,
// articles and guides, each with why/how/what-to-produce. Every entry keeps
// its outbound links, so it is useful even when no file is on the shelf.

export type Priority = "P0" | "P1" | "P2" | "P3";
export type Importance = "S" | "A" | "B" | "C";

export type CatalogEntry = {
  id: string; // R001…R105
  category: string; // "01 AI产品判断与评测"
  title: string;
  author: string;
  kind: string;
  priority: Priority;
  importance: Importance;
  score: number; // 3.0–5.0, 0.5 steps
  reason: string;
  method: string;
  output: string;
  caveat: string;
  url: string;
  access: string;
  evidence: string;
  evidenceUrl: string | null;
  reviewStatus: string;
  reviewUrl: string | null;
};

export const CATALOG = catalogData as CatalogEntry[];
export const CATALOG_BY_ID = new Map(CATALOG.map((e) => [e.id, e]));

export const CATEGORIES = [...new Set(CATALOG.map((e) => e.category))].sort();
export const categoryLabel = (c: string) => c.replace(/^\d+\s*/, "");

export const PRIORITIES: { id: Priority; label: string; hint: string }[] = [
  { id: "P0", label: "立即读", hint: "直接服务近期的客户、定价、质量、交互或安全问题；不要求整本通读" },
  { id: "P1", label: "下一批", hint: "系统补强能力；人物与产业史可作为并行阅读" },
  { id: "P2", label: "按需读", hint: "遇到具体问题、进入对应职责或有系统学习时间时再读" },
  { id: "P3", label: "收藏/速读", hint: "与当前任务较远、内容重复，或主要提供宏观观点" },
];

export const IMPORTANCE: { id: Importance; label: string; hint: string }[] = [
  { id: "S", label: "核心", hint: "核心框架或关键风险底线" },
  { id: "A", label: "重要", hint: "重要补强" },
  { id: "B", label: "背景", hint: "背景、历史或补充视角" },
  { id: "C", label: "可选", hint: "可选观点参考" },
];

export const isFree = (e: CatalogEntry) => /免费|公开文章|在线阅读入口/.test(e.access);
export const isRecheckedThisRound = (e: CatalogEntry) => !e.reviewStatus.includes("沿用上一版");

export type ReadingStatus = "todo" | "reading" | "done";

export type CatalogFilter = {
  query: string;
  categories: string[];
  priorities: Priority[];
  importance: Importance[];
  freeOnly: boolean;
  status: ReadingStatus | "all";
};

export const EMPTY_FILTER: CatalogFilter = {
  query: "",
  categories: [],
  priorities: [],
  importance: [],
  freeOnly: false,
  status: "all",
};

export type CatalogSort = "priority" | "score" | "id";

const PRIORITY_RANK: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };
const IMPORTANCE_RANK: Record<Importance, number> = { S: 0, A: 1, B: 2, C: 3 };

export function filterCatalog(
  entries: CatalogEntry[],
  f: CatalogFilter,
  statusOf: (id: string) => ReadingStatus,
): CatalogEntry[] {
  const q = f.query.trim().toLowerCase();
  return entries.filter(
    (e) =>
      (!q || `${e.title} ${e.author} ${e.reason} ${e.kind}`.toLowerCase().includes(q)) &&
      (!f.categories.length || f.categories.includes(e.category)) &&
      (!f.priorities.length || f.priorities.includes(e.priority)) &&
      (!f.importance.length || f.importance.includes(e.importance)) &&
      (!f.freeOnly || isFree(e)) &&
      (f.status === "all" || statusOf(e.id) === f.status),
  );
}

// Default order: what to read now first (priority), then how much it is
// worth (importance, score). "score" sorts by recommendation alone.
export function sortCatalog(entries: CatalogEntry[], sort: CatalogSort): CatalogEntry[] {
  const byId = (a: CatalogEntry, b: CatalogEntry) => a.id.localeCompare(b.id);
  const cmp: Record<CatalogSort, (a: CatalogEntry, b: CatalogEntry) => number> = {
    priority: (a, b) =>
      PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
      IMPORTANCE_RANK[a.importance] - IMPORTANCE_RANK[b.importance] ||
      b.score - a.score ||
      byId(a, b),
    score: (a, b) => b.score - a.score || PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || byId(a, b),
    id: byId,
  };
  return [...entries].sort(cmp[sort]);
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\s·・:：,，.。、'’"“”!?！？()（）\[\]【】《》—–\-_/]+/g, "");

// Title variants of an entry: "Crossing the Chasm（跨越鸿沟）" yields both the
// English title and the Chinese title in brackets.
export function titleAliases(title: string): string[] {
  const out = new Set<string>([title]);
  for (const m of title.matchAll(/[（(]([^）)]+)[）)]/g)) out.add(m[1]);
  out.add(title.replace(/[（(][^）)]*[）)]/g, ""));
  out.add(title.split(/[:：]/)[0]);
  return [...out].map(normalize).filter((a) => a.length >= 4);
}

const ALIASES = CATALOG.map((e) => ({ id: e.id, aliases: titleAliases(e.title) }));

// Best-effort link from an uploaded book's title to a catalog entry; the
// reader also lets the visitor pick the entry by hand.
export function matchCatalog(...titles: (string | undefined)[]): CatalogEntry | null {
  const cands = titles.filter(Boolean).map((t) => normalize(t!)).filter((t) => t.length >= 4);
  let best: { id: string; len: number } | null = null;
  for (const { id, aliases } of ALIASES) {
    for (const a of aliases) {
      if (cands.some((c) => c.includes(a) || a.includes(c)) && (!best || a.length > best.len)) {
        best = { id, len: a.length };
      }
    }
  }
  return best ? CATALOG_BY_ID.get(best.id)! : null;
}

// Shelf titles carry edition suffixes ("创新者的窘境（全新修订版）"), so a
// note on a book outside the catalog finds its shelf copy by containment of
// the normalised titles.
export function titleMatches(shelfTitle: string, noteTitle: string): boolean {
  const a = normalize(shelfTitle);
  const b = normalize(noteTitle);
  return b.length >= 4 && a.length >= 4 && (a.includes(b) || b.includes(a));
}

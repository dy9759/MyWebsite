import type { CatalogEntry, Priority, ReadingStatus } from "@/lib/books/catalog";

// /books home: the catalog arranged by reading level (L1 must-read → L3
// extended) and, inside each level, by a handful of broad themes.

export type LevelId = "L1" | "L2" | "L3";

export const LEVELS: { id: LevelId; label: string; hint: string; priorities: Priority[] }[] = [
  { id: "L1", label: "L1 必读", hint: "直接服务当前工作，先读这一层", priorities: ["P0"] },
  { id: "L2", label: "L2 进阶", hint: "系统补强能力，可配一本人物 / 产业史并行", priorities: ["P1"] },
  { id: "L3", label: "L3 拓展", hint: "遇到具体问题或有整段时间时再读", priorities: ["P2", "P3"] },
];

// The catalog's 11 categories, folded into 5 themes (by category number).
export const THEMES: { id: string; label: string; categories: string[] }[] = [
  { id: "ai-product", label: "AI 产品与评测", categories: ["01"] },
  { id: "ai-tech", label: "AI 工程与技术", categories: ["02", "03", "04"] },
  { id: "pm", label: "产品方法", categories: ["05"] },
  { id: "business", label: "商业化与增长", categories: ["06"] },
  { id: "people", label: "人物、历史与社会", categories: ["07", "08", "09", "10", "11"] },
];

export const themeOf = (e: CatalogEntry) => {
  const n = e.category.slice(0, 2);
  return THEMES.find((t) => t.categories.includes(n)) ?? THEMES[THEMES.length - 1];
};

export const levelOf = (e: CatalogEntry): LevelId => LEVELS.find((l) => l.priorities.includes(e.priority))?.id ?? "L3";

export type LevelFilter = { notesOnly: boolean; hideDone: boolean };

// One level's entries grouped by theme (theme order fixed, entries by score,
// books with notes first on ties). Empty themes are dropped.
export function groupLevel(
  entries: CatalogEntry[],
  level: LevelId,
  filter: LevelFilter,
  hasNote: (id: string) => boolean,
  statusOf: (id: string) => ReadingStatus,
) {
  const keep = entries.filter(
    (e) => levelOf(e) === level && (!filter.notesOnly || hasNote(e.id)) && (!filter.hideDone || statusOf(e.id) !== "done"),
  );
  return THEMES.map((t) => ({
    theme: t,
    entries: keep
      .filter((e) => themeOf(e).id === t.id)
      .sort((a, b) => b.score - a.score || Number(hasNote(b.id)) - Number(hasNote(a.id)) || a.id.localeCompare(b.id)),
  })).filter((g) => g.entries.length > 0);
}

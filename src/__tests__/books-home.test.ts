import { describe, expect, it } from "vitest";
import { CATALOG } from "@/lib/books/catalog";
import { LEVELS, THEMES, groupLevel, levelOf, themeOf } from "@/lib/books/home";

const noNote = () => false;
const todo = () => "todo" as const;

describe("books home grouping", () => {
  it("puts every catalog entry in exactly one level and one theme", () => {
    const counts = Object.fromEntries(LEVELS.map((l) => [l.id, 0]));
    for (const e of CATALOG) {
      counts[levelOf(e)]++;
      expect(THEMES.some((t) => t.categories.includes(e.category.slice(0, 2)))).toBe(true);
    }
    expect(counts.L1 + counts.L2 + counts.L3).toBe(CATALOG.length);
    expect(counts.L1).toBe(CATALOG.filter((e) => e.priority === "P0").length);
  });

  it("groups a level by theme, sorted by score", () => {
    const groups = groupLevel(CATALOG, "L1", { notesOnly: false, hideDone: false }, noNote, todo);
    expect(groups.flatMap((g) => g.entries).every((e) => e.priority === "P0")).toBe(true);
    for (const g of groups) {
      expect(g.entries.every((e) => themeOf(e).id === g.theme.id)).toBe(true);
      const scores = g.entries.map((e) => e.score);
      expect(scores).toEqual([...scores].sort((a, b) => b - a));
    }
  });

  it("filters to books with notes and hides finished ones", () => {
    const withNote = new Set(["R046", "R032"]);
    const groups = groupLevel(CATALOG, "L1", { notesOnly: true, hideDone: true }, (id) => withNote.has(id), (id) => (id === "R046" ? "done" : "todo"));
    expect(groups.flatMap((g) => g.entries.map((e) => e.id))).toEqual(CATALOG.find((e) => e.id === "R032")?.priority === "P0" ? ["R032"] : []);
  });
});

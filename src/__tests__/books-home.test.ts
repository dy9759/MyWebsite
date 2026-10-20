import { describe, expect, it } from "vitest";
import { CATALOG } from "@/lib/books/catalog";
import { GOALS, LEVELS, THEMES, groupLevel, levelOf, themeOf } from "@/lib/books/home";
import { READING_ROUTES } from "@/content/books/reading-routes";

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

  it("searches across all levels when a query is set", () => {
    const groups = groupLevel(CATALOG, "L1", { notesOnly: false, hideDone: false, query: "mom test" }, noNote, todo);
    expect(groups.flatMap((g) => g.entries.map((e) => e.id))).toEqual(["R046"]);
    const l3 = CATALOG.find((e) => levelOf(e) === "L3")!;
    const hit = groupLevel(CATALOG, "L1", { notesOnly: false, hideDone: false, query: l3.title }, noNote, todo);
    expect(hit.flatMap((g) => g.entries.map((e) => e.id))).toContain(l3.id);
  });

  it("goal tags narrow the list to their themes and match the reading routes", () => {
    expect(GOALS.filter((g) => g.id !== "all").map((g) => g.id).sort()).toEqual(READING_ROUTES.map((r) => r.id).sort());
    const groups = groupLevel(CATALOG, "L2", { notesOnly: false, hideDone: false, themes: ["people"] }, noNote, todo);
    expect(groups.map((g) => g.theme.id)).toEqual(["people"]);
  });
});

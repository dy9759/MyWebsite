import { describe, expect, it } from "vitest";
import {
  CATALOG,
  CATALOG_BY_ID,
  EMPTY_FILTER,
  filterCatalog,
  isFree,
  matchCatalog,
  sortCatalog,
  titleAliases,
  titleMatches,
} from "@/lib/books/catalog";
import { READING_ROUTES } from "@/content/books/reading-routes";

describe("catalog data", () => {
  it("has 105 entries with unique ids and valid ranks", () => {
    expect(CATALOG).toHaveLength(105);
    expect(new Set(CATALOG.map((e) => e.id)).size).toBe(105);
    for (const e of CATALOG) {
      expect(e.priority).toMatch(/^P[0-3]$/);
      expect(e.importance).toMatch(/^[SABC]$/);
      expect(e.score).toBeGreaterThanOrEqual(3);
      expect(e.score).toBeLessThanOrEqual(5);
      expect(e.url).toMatch(/^https:\/\//);
      expect(e.reason.length).toBeGreaterThan(10);
    }
  });

  it("keeps the public text free of second-person and internal business wording", () => {
    for (const e of CATALOG) {
      const text = `${e.reason}${e.method}${e.output}${e.caveat}`;
      expect(text).not.toMatch(/你|同传|手机厂商|会议SaaS/);
    }
  });

  it("routes only reference existing entries", () => {
    for (const r of READING_ROUTES) for (const id of r.steps) expect(CATALOG_BY_ID.has(id)).toBe(true);
  });
});

describe("filter and sort", () => {
  const all = () => "todo" as const;
  it("filters by priority and free access", () => {
    const p0Free = filterCatalog(CATALOG, { ...EMPTY_FILTER, priorities: ["P0"], freeOnly: true }, all);
    expect(p0Free.length).toBeGreaterThan(0);
    expect(p0Free.every((e) => e.priority === "P0" && isFree(e))).toBe(true);
  });
  it("searches title, author and reason", () => {
    expect(filterCatalog(CATALOG, { ...EMPTY_FILTER, query: "mom test" }, all).map((e) => e.id)).toEqual(["R046"]);
  });
  it("sorts P0/S/5.0 first by default", () => {
    const first = sortCatalog(CATALOG, "priority")[0];
    expect([first.priority, first.importance, first.score]).toEqual(["P0", "S", 5]);
  });
});

describe("matchCatalog", () => {
  it("extracts bracketed Chinese titles as aliases", () => {
    expect(titleAliases("Crossing the Chasm（跨越鸿沟）")).toContain("跨越鸿沟");
  });
  it("links an uploaded Chinese edition to its catalog entry", () => {
    expect(matchCatalog("商业模式新生代（经典重译版）")?.id).toBe("R052");
    expect(matchCatalog("The Mom Test: How to talk to customers")?.id).toBe("R046");
  });
  it("returns null for books outside the catalog", () => {
    expect(matchCatalog("创新者的窘境（全新修订版）")).toBeNull();
    expect(matchCatalog("产品经理装备书")).toBeNull();
  });
});

describe("titleMatches", () => {
  it("finds a shelf copy despite edition suffixes", () => {
    expect(titleMatches("创新者的窘境（全新修订版）", "创新者的窘境")).toBe(true);
    expect(titleMatches("The Innovator's Dilemma", "创新者的窘境")).toBe(false);
    expect(titleMatches("窘境", "创新者的窘境")).toBe(false);
  });
});

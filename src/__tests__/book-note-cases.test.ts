import { describe, expect, it } from "vitest";
import { getAllNotes, getCases, splitNote } from "@/lib/books/notes";

const isCjk = (s: string) => (s.match(/[一-鿿]/g)?.length ?? 0) > s.length / 3;

// "Core idea × case" cards: keyed by the note's own chapter markers, short
// verbatim passages only (checked against the books before they enter the repo).
describe("note cases", () => {
  for (const note of getAllNotes()) {
    const cases = getCases(note.slug);
    if (!Object.keys(cases).length) continue;
    it(`${note.slug}: cases fit the note's chapters and stay short`, () => {
      const labels = new Set(splitNote(note.markdown).chapters.map((c) => c.label));
      let total = 0;
      for (const [label, items] of Object.entries(cases)) {
        expect(labels.has(label), `unknown chapter ${label}`).toBe(true);
        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items.length).toBeLessThanOrEqual(2);
        for (const c of items) {
          for (const k of ["point", "core", "caseTitle", "explain"] as const) expect(c[k].trim()).not.toBe("");
          // An AI-written outside case carries a story instead of book text.
          if (c.external) expect(c.story?.trim()).toBeTruthy();
          else expect(c.case.trim()).not.toBe("");
          expect(c.core.length).toBeLessThanOrEqual(isCjk(c.core) ? 130 : 320);
          expect(c.case.length).toBeLessThanOrEqual(isCjk(c.case) ? 260 : 650);
          total += c.core.length + c.case.length;
        }
      }
      expect(total).toBeLessThanOrEqual(12000);
    });
  }
});

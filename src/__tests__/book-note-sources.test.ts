import { describe, expect, it } from "vitest";
import { getAllNotes, getSources, splitNote } from "@/lib/books/notes";

// Outside sources: links that open over https, Chinese paraphrase kept short,
// and chapter links that point at real chapter markers of the note.
describe("note outside sources", () => {
  for (const note of getAllNotes()) {
    const sources = getSources(note.slug);
    if (!sources.length) continue;
    it(`${note.slug}: sources are well-formed`, () => {
      const labels = new Set(splitNote(note.markdown).chapters.map((c) => c.label));
      expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
      for (const s of sources) {
        expect(s.url).toMatch(/^https:\/\//);
        for (const k of ["title", "source", "kind", "summary", "point"] as const) expect(s[k].trim()).not.toBe("");
        expect(s.summary.length).toBeLessThanOrEqual(90);
        expect(s.case.length).toBeLessThanOrEqual(140);
        if (s.chapter) expect(labels.has(s.chapter), `unknown chapter ${s.chapter}`).toBe(true);
      }
    });
  }
});

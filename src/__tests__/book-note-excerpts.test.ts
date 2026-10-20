import { describe, expect, it } from "vitest";
import { getAllNotes, getExcerpts, quotesIn } from "@/lib/books/notes";

const squash = (s: string) => s.replace(/\s+/g, "");
const isCjk = (s: string) => (s.match(/[一-鿿]/g)?.length ?? 0) > s.length / 3;

// Excerpts are a preview next to the note, never a substitute for the book:
// only passages behind the note's own quotes, each a sentence or three.
describe("note excerpts", () => {
  for (const note of getAllNotes()) {
    const excerpts = getExcerpts(note.slug);
    if (!excerpts.size) continue;
    it(`${note.slug}: excerpts match the note's quotes and stay short`, () => {
      const quotes = new Set(quotesIn(note.markdown));
      for (const [quote, text] of excerpts) {
        expect(quotes.has(quote), `stale excerpt: ${quote}`).toBe(true);
        expect(squash(text)).toContain(squash(quote));
        expect(text.length).toBeLessThanOrEqual(isCjk(text) ? 202 : 422);
      }
      const total = [...excerpts.values()].reduce((n, t) => n + t.length, 0);
      expect(total).toBeLessThan(6000);
    });
  }
});

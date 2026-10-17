import { describe, expect, it } from "vitest";
import { getAllNotes, parseNote } from "@/lib/books/notes";

describe("reading notes", () => {
  it("parses every note in src/content/books/notes", () => {
    const notes = getAllNotes();
    expect(notes.length).toBeGreaterThan(0);
    for (const n of notes) {
      expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(n.markdown.length).toBeGreaterThan(0);
    }
  });

  it("rejects a note without required frontmatter", () => {
    expect(() => parseNote("x", "---\ntitle: A\n---\nbody")).toThrow(/book/);
  });
});

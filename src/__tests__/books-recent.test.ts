// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { readRecentNotes, recordNoteVisit } from "@/lib/books/recent";

describe("recent notes", () => {
  beforeEach(() => localStorage.clear());

  it("keeps one entry per note, newest first", () => {
    recordNoteVisit({ slug: "a", title: "A", chapter: 0, chapterTitle: "c1" }, 1);
    recordNoteVisit({ slug: "b", title: "B", chapter: 2, chapterTitle: "c3" }, 2);
    recordNoteVisit({ slug: "a", title: "A", chapter: 4, chapterTitle: "c5" }, 3);
    expect(readRecentNotes().map((n) => [n.slug, n.chapter])).toEqual([["a", 4], ["b", 2]]);
  });

  it("survives malformed storage", () => {
    localStorage.setItem("books-recent-notes-v1", "{oops");
    expect(readRecentNotes()).toEqual([]);
  });
});

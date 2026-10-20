import { describe, expect, it } from "vitest";
import { CATALOG_BY_ID } from "@/lib/books/catalog";
import { findTocHref } from "@/lib/books/cite-nav";
import { getAllNotes, markersToText, splitNote } from "@/lib/books/notes";

describe("splitNote", () => {
  const md = `## 一句话\nA\n\n## 章节笔记\n\n<!-- chapter: Chapter One -->\n### 第一章（Chapter One）\n- p1\n- 原文：「a quote」\n\n<!-- chapter: Introduction #2 -->\n### 引言二\n- p2\n\n## 读完留下\n- x`;
  it("splits intro, chapters and outro", () => {
    const parts = splitNote(md);
    expect(parts.intro).toContain("## 章节笔记");
    expect(parts.chapters.map((c) => [c.label, c.heading])).toEqual([
      ["Chapter One", "第一章（Chapter One）"],
      ["Introduction #2", "引言二"],
    ]);
    expect(parts.chapters[1].markdown).not.toContain("读完留下");
    expect(parts.outro).toMatch(/^## 读完留下/);
  });
  it("supports a display name after |", () => {
    const [c] = splitNote("<!-- chapter: Book_2020_Experiment | 原书第 61–120 页 -->\n### X\n- a").chapters;
    expect([c.label, c.display]).toEqual(["Book_2020_Experiment", "原书第 61–120 页"]);
    expect(markersToText("<!-- chapter: Book_2020_Experiment | 原书第 61–120 页 -->")).toBe("> 原书章节：原书第 61–120 页");
  });
  it("leaves notes without markers as a single intro", () => {
    expect(splitNote("## A\ntext")).toEqual({ intro: "## A\ntext", chapters: [], outro: "" });
  });
  it("turns markers into readable source lines for AI readers", () => {
    expect(markersToText(md)).toContain("> 原书章节：Chapter One");
  });
});

describe("findTocHref", () => {
  const toc = [
    { label: "Introduction", href: "a" },
    { label: "Part 1", href: "b", subitems: [{ label: "Introduction", href: "c" }, { label: "Chapter One: Start", href: "d" }] },
  ];
  it("matches exact, normalised and nth labels", () => {
    expect(findTocHref(toc, "Introduction")).toBe("a");
    expect(findTocHref(toc, "Introduction #2")).toBe("c");
    expect(findTocHref(toc, "chapter one start")).toBe("d");
    expect(findTocHref(toc, "Missing")).toBeNull();
  });
});

describe("published notes", () => {
  const notes = getAllNotes();
  it("link to real catalog entries and keep quotes short", () => {
    for (const n of notes.filter((x) => x.catalogId)) {
      expect(CATALOG_BY_ID.has(n.catalogId!)).toBe(true);
      const { chapters } = splitNote(n.markdown);
      expect(chapters.length).toBeGreaterThan(5);
      const quotes = [...n.markdown.matchAll(/「([^「」]+)」/g)].map((m) => m[1]);
      expect(quotes.length).toBeLessThanOrEqual(20);
      for (const q of quotes) expect(q.split(/\s+/).length).toBeLessThanOrEqual(25);
      expect(n.markdown).toContain("完整内容请阅读正版");
    }
  });
  it("has one note per catalog entry at most", () => {
    const ids = notes.map((n) => n.catalogId).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

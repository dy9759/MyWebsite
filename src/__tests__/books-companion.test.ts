// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { docText, flattenToc, pickChapter } from "@/lib/books/chapter-text";
import { buildChatMessages, buildRecapMessages, buildSummaryMessages } from "@/lib/books/companion";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";

// Shaped like 产品经理装备书: module → chapter → sections, PDF pages as units.
const PDF_TOC = [
  { label: "前言", href: "pre" },
  {
    label: "模块一",
    href: "m1",
    subitems: [
      {
        label: "第一章",
        href: "c1",
        subitems: [
          { label: "什么是产品", href: "c1a" },
          { label: "什么是管理", href: "c1b" },
        ],
      },
      { label: "第二章", href: "c2" },
    ],
  },
  { label: "模块二", href: "m2" },
];
const STARTS: Record<string, number> = { pre: 8, m1: 22, c1: 25, c1a: 25, c1b: 25, c2: 41, m2: 120 };
const flat = flattenToc(PDF_TOC, (h) => STARTS[h]);
const pages = Array(200).fill(1);

describe("pickChapter", () => {
  it("climbs from a section to its chapter but not to the oversized module", () => {
    const ch = pickChapter(flat, "c1b", 25, pages, 40);
    expect(ch).toMatchObject({ key: "c1", title: "第一章", start: 25, end: 41 });
  });

  it("falls back to the last TOC item before the current section", () => {
    expect(pickChapter(flat, undefined, 50, pages, 40).key).toBe("c2");
  });

  it("uses the bare section when there is no TOC", () => {
    expect(pickChapter([], undefined, 3, pages, 40)).toMatchObject({ key: "s3", start: 3, end: 4 });
  });

  it("keeps the whole module when it fits the budget", () => {
    expect(pickChapter(flat, "c2", 41, pages, 500).key).toBe("m1");
  });
});

describe("docText", () => {
  it("joins block text and skips nested duplicates", () => {
    const doc = new DOMParser().parseFromString(
      "<body><h2>标题</h2><p>第一段  文字</p><blockquote><p>引文</p></blockquote></body>",
      "text/html",
    );
    expect(docText(doc)).toBe("标题\n第一段 文字\n引文");
  });
});

describe("renderSafeMarkdown", () => {
  it("escapes raw HTML echoed by the model", () => {
    const html = renderSafeMarkdown('ok <img src=x onerror="alert(1)"><script>alert(1)</script>');
    expect(html).not.toMatch(/<script|<img/i);
    expect(html).toContain("&lt;script&gt;");
  });

  it("drops javascript: links but keeps https links", () => {
    const html = renderSafeMarkdown("[bad](javascript:alert(1)) [good](https://example.com)");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('href="https://example.com"');
  });
});

describe("prompts", () => {
  const ctx = { bookTitle: "书", chapterTitle: "第一章", text: "正文", truncated: true };

  it("puts the chapter in a fenced block and flags truncation", () => {
    const user = buildSummaryMessages(ctx, "zh")[1].content;
    expect(user).toContain("<chapter>\n正文\n</chapter>");
    expect(user).toContain("截取");
  });

  it("quotes the selection and keeps only recent history", () => {
    const history = Array.from({ length: 12 }, (_, i) => ({
      role: (i % 2 ? "assistant" : "user") as "user" | "assistant",
      content: `m${i}`,
    }));
    const msgs = buildChatMessages(ctx, history, "", "选中的话", "zh");
    expect(msgs.at(-1)!.content).toContain("「选中的话」");
    expect(msgs.some((m) => m.content === "m3")).toBe(false);
    expect(msgs.some((m) => m.content === "m11")).toBe(true);
  });

  it("builds a recap only from the given summaries", () => {
    const msgs = buildRecapMessages("书", [{ title: "第一章", text: "要点" }], "zh");
    expect(msgs[1].content).toContain("### 第一章\n要点");
  });
});

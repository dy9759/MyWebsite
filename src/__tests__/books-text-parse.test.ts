import { describe, expect, it } from "vitest";
import { decodeText, rtfToText, splitMarkdown, splitTxtChapters } from "@/lib/books/text-parse";

const gbk = (hex: string) => new Uint8Array(hex.match(/../g)!.map((h) => parseInt(h, 16))).buffer;

describe("decodeText", () => {
  it("reads UTF-8", () => {
    expect(decodeText(new TextEncoder().encode("创新者").buffer as ArrayBuffer)).toBe("创新者");
  });
  it("falls back to GBK when bytes are not valid UTF-8", () => {
    // "中文" in GBK
    expect(decodeText(gbk("d6d0cec4"))).toBe("中文");
  });
});

describe("splitTxtChapters", () => {
  it("splits on Chinese chapter headings and keeps the preface", () => {
    const txt = "书名\n作者\n\n第一章 开始\n正文一\n\n第二章 继续\n正文二\n第十二回 再会\n正文三";
    const ch = splitTxtChapters(txt);
    expect(ch.map((c) => c.title)).toEqual(["开篇", "第一章 开始", "第二章 继续", "第十二回 再会"]);
    expect(ch[1].body).toBe("正文一");
  });
  it("splits on English chapter headings", () => {
    const ch = splitTxtChapters("Chapter 1 Begin\na\nChapter 2\nb");
    expect(ch.map((c) => c.title)).toEqual(["Chapter 1 Begin", "Chapter 2"]);
  });
  it("does not treat a sentence mentioning 第一章 as a heading", () => {
    const ch = splitTxtChapters("我们在第一章里讨论过这个问题，所以这里不再展开详细的论证过程和所有细节。\n更多");
    expect(ch).toHaveLength(1);
  });
  it("chunks long text without headings", () => {
    const para = "字".repeat(3000);
    const ch = splitTxtChapters(Array(6).fill(para).join("\n"));
    expect(ch.length).toBeGreaterThan(1);
    expect(ch[0].title).toBe("第 1 部分");
  });
});

describe("splitMarkdown", () => {
  it("splits on # headings and ignores code fences", () => {
    const md = "# A\nx\n```\n# not a heading\n```\n# B\ny";
    expect(splitMarkdown(md).map((c) => c.title)).toEqual(["A", "B"]);
  });
  it("uses ## when there is a single # title", () => {
    const md = "# Book\nintro\n## One\na\n## Two\nb";
    expect(splitMarkdown(md).map((c) => c.title)).toEqual(["Book", "One", "Two"]);
  });
});

describe("rtfToText", () => {
  it("drops font tables and keeps paragraphs", () => {
    const rtf = String.raw`{\rtf1\ansi{\fonttbl{\f0 Arial;}}{\*\generator x;}\f0 Hello\par World}`;
    expect(rtfToText(rtf)).toBe("Hello\nWorld");
  });
  it("decodes GBK code-page bytes", () => {
    const rtf = String.raw`{\rtf1\ansi\ansicpg936 \'d6\'d0\'ce\'c4\par}`;
    expect(rtfToText(rtf)).toBe("中文");
  });
  it("decodes \\u escapes and skips the fallback char", () => {
    const rtf = "{\\rtf1\\uc1 \\u21019?\\u26032?}";
    expect(rtfToText(rtf)).toBe("创新");
  });
});

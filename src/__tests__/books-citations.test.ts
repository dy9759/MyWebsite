// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { findQuotePage, linkifyCitations, quoteProbes, readCitation } from "@/lib/books/citations";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";

const render = (md: string) => {
  const div = document.createElement("div");
  div.innerHTML = linkifyCitations(renderSafeMarkdown(md));
  return div;
};

describe("linkifyCitations", () => {
  it("turns quotes and page refs into citation buttons", () => {
    const div = render("书中说「产品总体规划是存放所有产品信息的地方」(p.42)，另见（第 45 页）。");
    const cites = [...div.querySelectorAll<HTMLElement>(".book-cite")].map((b) => readCitation(b));
    expect(cites).toEqual([{ quote: "产品总体规划是存放所有产品信息的地方" }, { page: 42 }, { page: 45 }]);
  });

  it("keeps quotes with quotes/markup characters safe", () => {
    const div = render('「他说"破坏性"不是坏事」');
    expect(readCitation(div.querySelector(".book-cite")!)).toEqual({ quote: '他说"破坏性"不是坏事' });
  });

  it("does not wrap a page ref that sits inside a quote twice", () => {
    const div = render("「见下文 (p.3) 的论证过程」");
    expect(div.querySelectorAll(".book-cite")).toHaveLength(1);
  });

  it("leaves page refs as text for reflowable books", () => {
    const div = document.createElement("div");
    div.innerHTML = linkifyCitations(renderSafeMarkdown("「a real quote」 (p.3)"), { pages: false });
    expect([...div.querySelectorAll<HTMLElement>(".book-cite")].map((b) => readCitation(b))).toEqual([{ quote: "a real quote" }]);
    expect(div.textContent).toContain("(p.3)");
  });

  it("ignores very short brackets", () => {
    expect(render("「是」").querySelector(".book-cite")).toBeNull();
  });
});

describe("quoteProbes", () => {
  it("prefers the longest piece of an elided quote", () => {
    expect(quoteProbes("大企业失败……是因为它们倾听了最好的客户")[0]).toBe("是因为它们倾听了最好的客户");
  });
  it("treats bracketed [...] as an elision, not part of the quote", () => {
    expect(quoteProbes("Bad data gives us false negatives [...] and—more dangerously—false positives")[0]).toBe(
      "and—more dangerously—false positives",
    );
  });
  it("adds head and tail anchors for long quotes", () => {
    const probes = quoteProbes("管理良好的公司之所以失败往往不是因为犯了错误");
    expect(probes).toHaveLength(3);
    expect(probes[1]).toHaveLength(12);
  });
});

describe("findQuotePage", () => {
  const pages = [
    { page: 42, text: "产品总体规划\n是存放 所有产品信息的地方" },
    { page: 43, text: "路线图描述未来" },
  ];
  it("matches across PDF line breaks and spaces", () => {
    expect(findQuotePage(pages, "产品总体规划是存放所有产品信息的地方")).toBe(42);
  });
  it("returns null when the quote is not in the chapter", () => {
    expect(findQuotePage(pages, "完全不存在的一句话")).toBeNull();
  });
});

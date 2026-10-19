// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { clearTranslations, collectBlocks, insertTranslation, TR_CLASS } from "@/lib/books/bilingual";
import {
  BATCH_SIZE,
  buildBatchMessages,
  makeBatches,
  needsTranslation,
  parseBatch,
  resolveTarget,
} from "@/lib/books/translate";

describe("target language", () => {
  it("auto: English → Chinese, Chinese → English", () => {
    expect(resolveTarget("auto", "The Mom Test is about customer interviews.")).toBe("zh");
    expect(resolveTarget("auto", "创新者的窘境讲的是破坏性创新。")).toBe("en");
    expect(resolveTarget("zh", "创新者的窘境")).toBe("zh");
  });
  it("skips paragraphs already in the target language or without letters", () => {
    expect(needsTranslation("Customers lie to be polite.", "zh")).toBe(true);
    expect(needsTranslation("顾客会出于礼貌说谎。", "zh")).toBe(false);
    expect(needsTranslation("— 42 —", "zh")).toBe(false);
  });
});

describe("batching", () => {
  it("splits by count and size", () => {
    const many = Array(BATCH_SIZE + 5).fill("short line");
    expect(makeBatches(many).map((b) => b.length)).toEqual([BATCH_SIZE, 5]);
    const big = ["x".repeat(2000), "y".repeat(2000), "z"];
    expect(makeBatches(big)).toEqual([[0], [1, 2]]);
  });
  it("numbers paragraphs and fences them as data", () => {
    const user = buildBatchMessages(["Hello\n world", "Bye"], "zh")[1].content;
    expect(user).toBe("<paras>\n[1] Hello world\n[2] Bye\n</paras>");
  });
  it("parses numbered replies and tolerates gaps or noise", () => {
    expect(parseBatch("[1] 你好\n说明文字\n[3] 再见\n[9] 多余", 3)).toEqual(["你好", null, "再见"]);
  });
});

describe("bilingual DOM", () => {
  const doc = () =>
    new DOMParser().parseFromString(
      "<body><h2>Title</h2><p>First para.</p><ul><li><p>Nested</p></li></ul><p>  </p></body>",
      "text/html",
    );
  it("collects innermost text blocks only", () => {
    expect(collectBlocks(doc()).map((b) => b.text)).toEqual(["Title", "First para.", "Nested"]);
  });
  it("inserts translations inside the paragraph, so sibling indices do not change", () => {
    const d = doc();
    const p = d.querySelectorAll("p")[0];
    const siblingsBefore = d.body.children.length;
    insertTranslation(p, "<b>第一段</b>", "zh");
    const span = p.querySelector(`.${TR_CLASS}`)!;
    expect(span.textContent).toBe("<b>第一段</b>"); // text, never HTML
    expect(span.querySelector("b")).toBeNull();
    expect(d.body.children.length).toBe(siblingsBefore);
    expect(collectBlocks(d).map((b) => b.text)).not.toContain("First para.");
    clearTranslations(d);
    expect(d.querySelector(`.${TR_CLASS}`)).toBeNull();
  });
});

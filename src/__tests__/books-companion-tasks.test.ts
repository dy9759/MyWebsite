import { describe, expect, it } from "vitest";
import { CATALOG, CATALOG_BY_ID } from "@/lib/books/catalog";
import { buildChatMessages, systemFor } from "@/lib/books/companion";
import {
  buildAdvisorMessages,
  pickRelevant,
  buildNoteMessages,
  buildOutputMessages,
  buildQuizMessages,
  buildRawNote,
  goalFromEntry,
} from "@/lib/books/companion-tasks";

const mom = CATALOG_BY_ID.get("R046")!;
const ctx = { bookTitle: "The Mom Test", chapterTitle: "Ch 1", text: "正文", truncated: false, goal: goalFromEntry(mom, "zh") };

describe("catalog-aware companion", () => {
  it("puts the reading goal into the system prompt of chapter chats", () => {
    const sys = buildChatMessages(ctx, [], "q", "", "zh")[0].content;
    expect(sys).toContain(mom.output);
    expect(sys).toContain("理解检验"); // quiz grading rule rides along
  });

  it("asks for the catalog's reading output with placeholders, not invented data", () => {
    const user = buildOutputMessages(ctx, mom.output, "zh").at(-1)!.content;
    expect(user).toContain(`「${mom.output}」`);
    expect(user).toContain("【待补充】");
  });

  it("quiz asks for questions without answers", () => {
    expect(buildQuizMessages(ctx, "zh").at(-1)!.content).toMatch(/不要给答案/);
  });
});

describe("notes", () => {
  const src = {
    bookTitle: "The Mom Test",
    entry: mom,
    summaries: [{ title: "Ch 1", text: "要点 A" }],
    thread: [
      { role: "user" as const, content: "怎么问？" },
      { role: "assistant" as const, content: "问过去的行为。" },
    ],
    date: "2026-10-17",
  };
  it("raw export contains goal, summaries and Q&A", () => {
    const md = buildRawNote(src);
    expect(md).toContain(mom.output);
    expect(md).toContain("### Ch 1");
    expect(md).toContain("**问：** 怎么问？");
  });
  it("AI note request fences the record and asks for the site's note format", () => {
    const msgs = buildNoteMessages(src, "zh");
    expect(msgs[1].content).toMatch(/^<record>\n[\s\S]*<\/record>/);
    expect(msgs[1].content).toContain("date: 2026-10-17");
  });
});

describe("advisor", () => {
  it("sends the whole catalog with statuses and asks for ids only from it", () => {
    const msgs = buildAdvisorMessages("定价", CATALOG, (id) => (id === "R046" ? "done" : "todo"), "zh");
    const user = msgs[1].content;
    const rows = user.split("\n").filter((l) => /^R\d{3}\|/.test(l));
    expect(rows.length).toBeLessThan(CATALOG.length);
    expect(user).toContain("R046|P0|S|5|已读|The Mom Test");
    expect(user).toContain("已读的不要再推荐");
  });
});

describe("pickRelevant", () => {
  it("keeps goal matches, every P0 item and a few people reads", () => {
    const picked = pickRelevant("给语音 API 定价，找到付费客户", CATALOG);
    const ids = new Set(picked.map((e) => e.id));
    expect(ids.has("R055")).toBe(true); // Monetizing Innovation
    expect(CATALOG.filter((e) => e.priority === "P0").every((e) => ids.has(e.id))).toBe(true);
    expect(picked.some((e) => ["07", "08", "09", "10", "11"].includes(e.category.slice(0, 2)))).toBe(true);
    expect(picked.length).toBeLessThanOrEqual(30 + 12 + 4);
    expect(picked.length).toBeLessThan(CATALOG.length);
  });
});

describe("page rule", () => {
  it("asks for (p.N) only when the chapter has page markers", () => {
    expect(systemFor({ text: "[第 3 页]\n正文" }, "zh")).toContain("(p.N)");
    expect(systemFor({ text: "plain epub text" }, "zh")).not.toContain("(p.N)");
  });
});

import { describe, expect, it } from "vitest";
import { CATALOG, CATALOG_BY_ID } from "@/lib/books/catalog";
import { buildChatMessages } from "@/lib/books/companion";
import {
  buildAdvisorMessages,
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
    expect(user.split("\n").filter((l) => /^R\d{3}\|/.test(l))).toHaveLength(CATALOG.length);
    expect(user).toContain("R046|P0|S|5|已读|The Mom Test");
    expect(user).toContain("已读的不要再推荐");
  });
});

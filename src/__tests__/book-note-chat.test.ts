import { describe, expect, it } from "vitest";
import { buildNoteChatMessages } from "@/lib/books/note-chat";

describe("buildNoteChatMessages", () => {
  const ctx = { title: "7 Powers", author: "Hamilton Helmer", note: "## 一句话\n战略", excerpts: [{ quote: "Power", text: "I refer to these as Power." }] };

  it("grounds the chat in the note and its excerpts", () => {
    const msgs = buildNoteChatMessages(ctx, [], "讲了什么？");
    expect(msgs[0].role).toBe("system");
    expect(msgs[1].content).toContain("《7 Powers》");
    expect(msgs[1].content).toContain("## 一句话");
    expect(msgs[1].content).toContain("上下文：I refer to these as Power.");
    expect(msgs.at(-1)).toEqual({ role: "user", content: "讲了什么？" });
  });

  it("keeps only the recent history", () => {
    const history = Array.from({ length: 12 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: `m${i}` }) as const);
    const msgs = buildNoteChatMessages(ctx, history, "q");
    expect(msgs).toHaveLength(3 + 8 + 1);
    expect(msgs[3].content).toBe("m4");
  });

  it("omits the excerpt section when there are none", () => {
    expect(buildNoteChatMessages({ ...ctx, excerpts: [] }, [], "q")[1].content).not.toContain("原文片段");
  });
});

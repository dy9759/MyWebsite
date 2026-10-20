import type { ChatMessage } from "@/lib/books/companion";

// The AI assistant on a reading-note page answers from the note and the
// short original excerpts the site publishes — never from the full book,
// which the site does not have.

export type NoteContext = {
  title: string; // book title
  author: string;
  note: string; // note markdown, chapter markers already turned into text
  excerpts: { quote: string; text: string }[];
};

export const NOTE_CHIPS = [
  "用三句话概括这本书的核心观点",
  "这本书对做 AI 产品最有用的三个启发是什么？",
  "出 3 道题检验我是否读懂了这份笔记",
  "如果只读一章，应该读哪一章？为什么？",
];

const SYSTEM = `你是读书笔记页上的 AI 阅读助手，帮读者理解这份读书笔记和它对应的书。
规则：
- 依据下面提供的「读书笔记」和「原文片段」回答；它们没有覆盖的内容，可以用你对这本书的一般了解补充，但要明确说明“笔记里没有提到”。
- 不编造原文。只有逐字出现在原文片段或笔记引文里的句子，才能放进「」作为原文引用；其他转述不要用「」。
- 不提供或复述整章原文；读者想看完整内容时，建议阅读正版或导入自己的电子书。
- 默认用简体中文，简洁、有条理；读者用英文提问就用英文回答。`;

export function buildNoteChatMessages(ctx: NoteContext, history: ChatMessage[], question: string): ChatMessage[] {
  const excerpts = ctx.excerpts.map((e) => `- 「${e.quote}」\n  上下文：${e.text}`).join("\n");
  const context = [
    `书：《${ctx.title}》 · ${ctx.author}`,
    `## 读书笔记\n${ctx.note}`,
    excerpts && `## 原文片段（笔记引文所在的句子）\n${excerpts}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return [
    { role: "system", content: SYSTEM },
    { role: "user", content: `这是我正在看的读书笔记。\n\n${context}` },
    { role: "assistant", content: "好的，我已读完这份笔记和原文片段，请提问。" },
    ...history.slice(-8),
    { role: "user", content: question },
  ];
}

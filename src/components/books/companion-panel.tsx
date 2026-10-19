"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Square, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import WikiByokPanel from "@/components/wiki/wiki-byok-panel";
import type { ChapterText } from "@/lib/books/chapter-text";
import { linkifyCitations, readCitation, type Citation } from "@/lib/books/citations";
import {
  buildChatMessages,
  buildRecapMessages,
  buildSummaryMessages,
  hasPageMarkers,
  streamChat,
  type ChatMessage,
} from "@/lib/books/companion";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";
import { CatalogGoal, NoteBlock, downloadText } from "@/components/books/companion-extras";
import type { CatalogEntry } from "@/lib/books/catalog";
import {
  buildNoteMessages,
  buildOutputMessages,
  buildQuizMessages,
  buildRawNote,
  goalFromEntry,
  type NoteSource,
} from "@/lib/books/companion-tasks";
import { getSummary, listSummaries, putSummary } from "@/lib/books/store";
import { useByok } from "@/lib/wiki-byok";

const UI = {
  zh: {
    heading: "AI 陪读",
    chapter: "本章",
    locating: "正在定位本章…",
    summarize: "本章总结",
    resummarize: "重新总结",
    recap: "前情回顾",
    recapEmpty: "前面的章节还没有总结。先在已读章节点「本章总结」，回顾只会用这些总结，不会剧透。",
    selection: "已选中",
    placeholder: "就本章提问，或先在书中选中一段文字…",
    explain: "解释选中的文字",
    noKey: "AI 陪读需要你自己的百炼 Key。",
    privacy: "提问时，本章文字（约 {n} 字）会用你的 Key 发送给阿里云百炼，不经过本站。",
    truncated: "本章较长，只发送前面一部分。",
    scanned: "这一章几乎提取不到文字（可能是扫描版 PDF），AI 无法阅读。",
    cached: "已缓存，不会重复计费",
    stop: "停止",
    citeHint: "点击「引文」或页码可跳回原文。",
    makeOutput: "生成阅读产出",
    quiz: "理解检验",
    quizLabel: "理解检验：出 3 道题",
    note: "整理读书笔记",
    rawNote: "导出阅读记录",
    noteEmpty: "还没有章节总结或问答，先读一读、问一问再整理。",
    citeMiss: "没在本章找到这句原文（模型可能改写了引文）。",
  },
  en: {
    heading: "AI companion",
    chapter: "Chapter",
    locating: "Finding this chapter…",
    summarize: "Summarize chapter",
    resummarize: "Summarize again",
    recap: "Recap so far",
    recapEmpty: "No earlier chapter has a summary yet. Summarize chapters as you read; the recap uses only those, so no spoilers.",
    selection: "Selected",
    placeholder: "Ask about this chapter, or select text in the book first…",
    explain: "Explain the selection",
    noKey: "The AI companion needs your own Bailian key.",
    privacy: "When you ask, this chapter's text (~{n} chars) is sent with your key to Alibaba Cloud Bailian — never to this site.",
    truncated: "This chapter is long; only its first part is sent.",
    scanned: "Almost no text could be extracted (likely a scanned PDF), so the AI cannot read it.",
    cached: "Cached — not billed again",
    stop: "Stop",
    citeHint: "Click a 「quote」 or page ref to jump back to the source.",
    makeOutput: "Draft reading output",
    quiz: "Quiz me",
    quizLabel: "Quiz: 3 questions",
    note: "Write reading note",
    rawNote: "Export reading log",
    noteEmpty: "No summaries or Q&A yet — read and ask a bit first.",
    citeMiss: "Could not find that quote in this chapter (the model may have paraphrased it).",
  },
};

type Props = {
  bookId: string;
  bookTitle: string;
  // Changes whenever the reader moves to a different TOC item / section.
  locationKey: string;
  resolveChapter: () => Promise<ChapterText>;
  selection: string;
  onClearSelection: () => void;
  onClose: () => void;
  // Navigates the reader to a citation inside the given chapter range.
  onCite: (cite: Citation, chapter: ChapterText) => Promise<boolean>;
  // Reading-catalog entry for this book, if any, and a way to (re)link it.
  catalogEntry: CatalogEntry | null;
  onLinkCatalog: (id: string | null) => void;
  author?: string;
};

const proseClass =
  "text-sm leading-6 [&_.book-cite]:cursor-pointer [&_.book-cite]:rounded [&_.book-cite]:text-left [&_.book-cite]:text-primary [&_.book-cite]:underline [&_.book-cite]:decoration-dotted [&_.book-cite]:underline-offset-4 hover:[&_.book-cite]:bg-primary/10 [&_h2]:mt-3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-medium [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_table]:my-2 [&_table]:w-full [&_table]:text-xs [&_td]:border [&_td]:px-1.5 [&_td]:py-1 [&_th]:border [&_th]:bg-muted/50 [&_th]:px-1.5 [&_th]:py-1 [&_th]:text-left";

export default function CompanionPanel(props: Props) {
  const { bookId, bookTitle, locationKey, resolveChapter, selection, onClearSelection, onClose, onCite, catalogEntry, onLinkCatalog, author } = props;
  const { language } = useLanguage();
  const t = UI[language];
  const cfg = useByok();
  const [chapter, setChapter] = useState<ChapterText | null>(null);
  const [summary, setSummary] = useState("");
  const [summaryCached, setSummaryCached] = useState(false);
  const [thread, setThread] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const resolveRef = useRef(resolveChapter);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resolveRef.current = resolveChapter;
  }, [resolveChapter]);

  // Re-resolve the chapter when the reader moves; keep the thread if the
  // chapter itself did not change (e.g. turning pages inside it).
  useEffect(() => {
    let alive = true;
    const timer = setTimeout(async () => {
      try {
        const ch = await resolveRef.current();
        if (!alive) return;
        setChapter((prev) => {
          if (prev?.key !== ch.key) {
            setThread([]);
            setError("");
          }
          return ch;
        });
        const cached = await getSummary(`${bookId}::${ch.key}`);
        if (!alive) return;
        setSummary(cached?.text ?? "");
        setSummaryCached(Boolean(cached));
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      }
    }, 400);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [bookId, locationKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [thread, summary]);

  const ctx = chapter && {
    bookTitle,
    chapterTitle: chapter.title || t.chapter,
    text: chapter.text,
    truncated: chapter.truncated,
    goal: catalogEntry ? goalFromEntry(catalogEntry, language) : undefined,
  };

  const run = async (messages: ChatMessage[], onText: (s: string) => void) => {
    if (!cfg) return "";
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setBusy(true);
    setError("");
    try {
      return await streamChat(cfg, messages, onText, language, ac.signal);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
      return "";
    } finally {
      setBusy(false);
    }
  };

  const summarize = async () => {
    if (!ctx || !chapter || !cfg) return;
    setSummaryCached(false);
    const text = await run(buildSummaryMessages(ctx, language), setSummary);
    if (text) {
      await putSummary({
        key: `${bookId}::${chapter.key}`,
        bookId,
        title: ctx.chapterTitle,
        start: chapter.start,
        text,
        model: cfg.model,
        createdAt: Date.now(),
      });
    }
  };

  const ask = async (question: string) => {
    if (!ctx || (!question.trim() && !selection)) return;
    const history = thread;
    const userText = selection ? `「${selection.slice(0, 200)}${selection.length > 200 ? "…" : ""}」\n${question}` : question;
    setThread([...history, { role: "user", content: userText }, { role: "assistant", content: "" }]);
    setDraft("");
    const messages = buildChatMessages(ctx, history, question.trim(), selection, language);
    onClearSelection();
    await run(messages, (s) =>
      setThread((cur) => [...cur.slice(0, -1), { role: "assistant", content: s }]),
    );
  };

  const recap = async () => {
    if (!chapter) return;
    const earlier = (await listSummaries(bookId)).filter((s) => s.start < chapter.start);
    const label = language === "zh" ? "前情回顾" : "Recap so far";
    if (!earlier.length) {
      setThread((cur) => [...cur, { role: "assistant", content: t.recapEmpty }]);
      return;
    }
    setThread((cur) => [...cur, { role: "user", content: label }, { role: "assistant", content: "" }]);
    await run(buildRecapMessages(bookTitle, earlier, language), (s) =>
      setThread((cur) => [...cur.slice(0, -1), { role: "assistant", content: s }]),
    );
  };

  // Runs a one-off task whose request shows as a labelled turn in the thread,
  // so follow-ups (e.g. answering a quiz) keep it in the chat history.
  const runTask = async (label: string, messages: ChatMessage[]) => {
    setThread((cur) => [...cur, { role: "user", content: label }, { role: "assistant", content: "" }]);
    await run(messages, (s) => setThread((cur) => [...cur.slice(0, -1), { role: "assistant", content: s }]));
  };

  const noteSource = async (): Promise<NoteSource> => ({
    bookTitle,
    author,
    entry: catalogEntry,
    summaries: (await listSummaries(bookId)).map((x) => ({ title: x.title, text: x.text })),
    thread,
    date: new Date().toISOString().slice(0, 10),
  });

  const exportNote = async (withAi: boolean) => {
    const src = await noteSource();
    if (!src.summaries.length && !src.thread.length) {
      setError(t.noteEmpty);
      return;
    }
    const slug = bookTitle.replace(/[\\/:*?"<>|\s]+/g, "-").slice(0, 60);
    if (!withAi) {
      downloadText(`${slug}-reading-log.md`, buildRawNote(src));
      return;
    }
    setNote("");
    const text = await run(buildNoteMessages(src, language), setNote);
    if (!text) setNote("");
  };

  const [citeMsg, setCiteMsg] = useState("");
  const onClickAnswer = async (e: React.MouseEvent) => {
    const cite = readCitation(e.target as HTMLElement);
    if (!cite || !chapter) return;
    const ok = await onCite(cite, chapter);
    setCiteMsg(ok ? "" : t.citeMiss);
  };
  const answerHtml = (md: string) =>
    linkifyCitations(renderSafeMarkdown(md), { pages: !!chapter && hasPageMarkers(chapter.text) });

  const disabled = !cfg || !chapter || busy || chapter.scanned;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-sm font-semibold">{t.heading}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose} aria-label="close">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 text-sm">
        <div className="text-xs text-muted-foreground">
          {chapter ? `${t.chapter}：${chapter.title || "—"}` : t.locating}
        </div>
        {!cfg && (
          <div className="rounded-md border p-2">
            <p className="mb-1 text-xs">{t.noKey}</p>
            <WikiByokPanel />
          </div>
        )}
        {chapter?.scanned && <p className="text-xs text-destructive">{t.scanned}</p>}
        {chapter && !chapter.scanned && (
          <p className="text-xs text-muted-foreground">
            {t.privacy.replace("{n}", chapter.text.length.toLocaleString())}
            {chapter.truncated && ` ${t.truncated}`}
          </p>
        )}

        <CatalogGoal entry={catalogEntry} onLink={onLinkCatalog} />

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" disabled={disabled} onClick={summarize}>
            {summary ? t.resummarize : t.summarize}
          </Button>
          <Button size="sm" variant="outline" disabled={disabled} onClick={recap}>
            {t.recap}
          </Button>
          {catalogEntry && (
            <Button
              size="sm"
              variant="outline"
              disabled={disabled}
              onClick={() => ctx && runTask(`${t.makeOutput}：${catalogEntry.output}`, buildOutputMessages(ctx, catalogEntry.output, language))}
            >
              {t.makeOutput}
            </Button>
          )}
          <Button size="sm" variant="outline" disabled={disabled} onClick={() => ctx && runTask(t.quizLabel, buildQuizMessages(ctx, language))}>
            {t.quiz}
          </Button>
          <Button size="sm" variant="outline" disabled={!cfg || busy} onClick={() => exportNote(true)}>
            {t.note}
          </Button>
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => exportNote(false)}>
            {t.rawNote}
          </Button>
        </div>

        {note && (
          <NoteBlock
            markdown={note}
            filename={`${bookTitle.replace(/[\\/:*?"<>|\s]+/g, "-").slice(0, 60)}.md`}
            onClose={() => setNote("")}
          />
        )}

        {summary && (
          <div className="rounded-md border bg-muted/30 p-3">
            {summaryCached && <div className="mb-1 text-[11px] text-muted-foreground">{t.cached}</div>}
            <div className={proseClass} onClick={onClickAnswer} dangerouslySetInnerHTML={{ __html: answerHtml(summary) }} />
          </div>
        )}

        {thread.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ml-6 whitespace-pre-wrap rounded-md bg-primary/10 p-2">
              {m.content}
            </div>
          ) : (
            <div key={i} className={proseClass}>
              {m.content ? (
                <div onClick={onClickAnswer} dangerouslySetInnerHTML={{ __html: answerHtml(m.content) }} />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          ),
        )}
        {(summary || thread.length > 0) && <p className="text-[11px] text-muted-foreground">{t.citeHint}</p>}
        {citeMsg && <p className="text-xs text-destructive">{citeMsg}</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-2">
        {selection && (
          <div className="mb-2 flex items-start gap-1 rounded bg-muted px-2 py-1 text-xs">
            <span className="shrink-0 text-muted-foreground">{t.selection}：</span>
            <span className="line-clamp-2 flex-1">{selection}</span>
            <button type="button" onClick={onClearSelection} aria-label="clear selection">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void ask(draft);
          }}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void ask(draft);
              }
            }}
            rows={2}
            placeholder={selection ? t.explain : t.placeholder}
            className="min-h-0 flex-1 resize-none rounded-md border bg-background px-2 py-1.5 text-sm"
            disabled={!cfg || !chapter || chapter.scanned}
          />
          {busy ? (
            <Button type="button" size="icon" variant="outline" aria-label={t.stop} onClick={() => abortRef.current?.abort()}>
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={disabled || (!draft.trim() && !selection)}>
              <Send className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

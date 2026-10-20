"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, Square } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import WikiByokPanel from "@/components/wiki/wiki-byok-panel";
import WikiFloatChat from "@/components/wiki/wiki-float-chat";
import { useAiAccess } from "@/lib/books/ai-access";
import { streamChat, type ChatMessage } from "@/lib/books/companion";
import { NOTE_CHIPS, buildNoteChatMessages, type NoteContext } from "@/lib/books/note-chat";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";

// Bottom-right AI assistant on reading-note pages: Q&A about the note and
// its published excerpts (via the site proxy or the visitor's own key).
export default function NoteAssistant({ context }: { context: NoteContext }) {
  const { language } = useLanguage();
  const access = useAiAccess();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Block body: scrollIntoView returns a promise in newer browsers.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history, streaming]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy || !access) return;
    const ac = new AbortController();
    abortRef.current = ac;
    setDraft("");
    setError("");
    setBusy(true);
    setHistory((h) => [...h, { role: "user", content: q }]);
    let answer = "";
    try {
      answer = await streamChat(access, buildNoteChatMessages(context, history, q), (t) => setStreaming((answer = t)), language, ac.signal);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally {
      if (answer) setHistory((h) => [...h, { role: "assistant", content: answer }]);
      setStreaming("");
      setBusy(false);
    }
  };

  return (
    <WikiFloatChat
      open={open}
      onOpenChange={setOpen}
      title={<b className="text-sm font-semibold">AI 阅读助手 · 《{context.title}》</b>}
      closeLabel="关闭"
      windowLabel="AI 阅读助手"
      windowClassName="rounded-2xl border bg-background shadow-xl"
      headerStyle={{ background: "hsl(var(--muted) / 0.4)" }}
      fab={{
        ariaLabel: "打开 AI 阅读助手",
        className: "bg-primary text-primary-foreground",
        label: (
          <>
            <Sparkles className="size-4" /> AI 助手
          </>
        ),
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
          {history.length === 0 && !busy && (
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">基于这份笔记和原文片段回答。可以试试：</p>
              {NOTE_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={!access}
                  onClick={() => ask(c)}
                  className="w-full rounded-lg border px-3 py-1.5 text-left hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {history.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="ml-auto max-w-[88%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                {m.content}
              </div>
            ) : (
              <Answer key={i} text={m.content} />
            ),
          )}
          {busy && (streaming ? <Answer text={streaming} /> : <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />)}
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div ref={endRef} />
        </div>
        {!access && (
          <div className="border-t px-4 py-2 text-xs">
            <WikiByokPanel />
          </div>
        )}
        <form
          className="flex items-center gap-2 border-t px-3 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            void ask(draft);
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="就这本书 / 这份笔记提问…"
            aria-label="提问"
            disabled={!access}
            className="min-w-0 flex-1 rounded-lg border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary disabled:opacity-50"
          />
          {busy ? (
            <button type="button" aria-label="停止" onClick={() => abortRef.current?.abort()} className="rounded-lg border p-2 hover:bg-accent/10">
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" aria-label="发送" disabled={!access || !draft.trim()} className="rounded-lg bg-primary p-2 text-primary-foreground disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          )}
        </form>
        <p className="px-4 pb-2 text-center text-[0.66rem] text-muted-foreground/70">
          {access?.mode === "byok" ? "使用你自己的百炼 Key，直接发送给阿里云百炼。" : "使用本站免费额度（每天有限），代理只转发、不保存内容。"}
        </p>
      </div>
    </WikiFloatChat>
  );
}

function Answer({ text }: { text: string }) {
  return (
    <div
      className="max-w-[95%] rounded-xl rounded-bl-sm border bg-muted/40 px-3 py-2 leading-6 [&_li]:mt-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-1.5 [&_p:first-child]:mt-0 [&_ul]:list-disc [&_ul]:pl-5"
      dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(text) }}
    />
  );
}

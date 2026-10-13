"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_UI, type WikiReply } from "@/content/wiki";
import { cn } from "@/lib/utils";
import { WIKI_CONNECTED } from "@/lib/wiki-data";
import WikiByokPanel from "@/components/wiki/wiki-byok-panel";

export type WikiMsg =
  | { role: "u"; text: string }
  | { role: "a"; data: WikiReply };

function Answer({ data }: { data: WikiReply }) {
  return (
    <div className="max-w-[90%] self-start rounded-xl rounded-bl-sm border bg-muted/40 px-3 py-2 text-sm">
      <span className="mb-1 block font-mono text-xs text-accent">✓ {data.grounded}</span>
      {data.text}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {data.cites.map(([tag, name]) => (
          <span key={tag + name} className="rounded-full border px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {tag} · <b className="font-medium text-accent">{name}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WikiChat({
  convo,
  onSend,
  showHeader = true,
  connected = false,
  pending = false,
  chips,
  placeholder,
  footnote,
}: {
  convo: WikiMsg[];
  onSend: (q: string) => void;
  showHeader?: boolean;
  connected?: boolean;
  pending?: boolean;
  chips?: string[];
  placeholder?: string;
  footnote?: React.ReactNode;
}) {
  const { language } = useLanguage();
  const ui = WIKI_UI[language];
  const [value, setValue] = useState("");

  const submit = () => {
    const q = value.trim();
    if (!q || pending) return;
    onSend(q);
    setValue("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {showHeader ? (
        <div className="px-4 pb-1 pt-3.5">
          <p className="flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
            <span>{ui.chat.title}</span>
            <span
              className={cn(
                "rounded-full border px-1.5 tracking-normal",
                connected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-accent text-accent",
              )}
            >
              {connected ? ui.chat.tagLive : ui.chat.tag}
            </span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{ui.chat.sub}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5 px-4 pt-2.5">
        <p className="text-center text-sm font-semibold">{ui.chat.emptyPrompt}</p>
        <p className="text-center text-xs leading-5 text-muted-foreground">{ui.chat.emptySub}</p>
        {(chips ?? ui.chips).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onSend(c)}
            disabled={pending}
            className="w-full rounded-lg border bg-background px-3 py-1.5 text-left text-sm text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3">
        {convo.map((m, i) =>
          m.role === "u" ? (
            <div
              key={i}
              className="max-w-[90%] self-end rounded-xl rounded-br-sm bg-accent px-3 py-2 text-sm text-accent-foreground"
            >
              {m.text}
            </div>
          ) : (
            <Answer key={i} data={m.data} />
          ),
        )}
        {pending ? (
          <div className="max-w-[90%] animate-pulse self-start rounded-xl rounded-bl-sm border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            …
          </div>
        ) : null}
      </div>

      {/* Public site (no backend): visitors can plug in their own key. */}
      {WIKI_CONNECTED ? null : <WikiByokPanel />}
      <div className="flex items-center gap-2 px-4 pb-4 pt-2">
        <div className="flex flex-1 items-center rounded-lg border bg-background px-2.5 py-1.5">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder={placeholder ?? (connected ? ui.chat.placeholderLive : ui.chat.placeholder)}
            aria-label={ui.chat.title}
            disabled={pending}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {ui.chat.send}
        </button>
      </div>
      <p className="px-4 pb-3 text-center font-mono text-[0.66rem] text-muted-foreground/60">
        {footnote ?? ui.chat.footnote}
      </p>
    </div>
  );
}

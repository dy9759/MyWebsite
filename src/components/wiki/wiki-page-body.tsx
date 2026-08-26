"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_UI, WIKI_TERMS, WIKI_COURSE, WIKI_JOBS, wikiDemoReply } from "@/content/wiki";
import WikiBrowse, { type WikiDomain, type SourceCat } from "@/components/wiki/wiki-browse";
import WikiChat, { type WikiMsg } from "@/components/wiki/wiki-chat";
import { cn } from "@/lib/utils";

const DOMAINS: WikiDomain[] = ["sources", "vibe", "course", "jobs"];

export default function WikiPageBody() {
  const { language } = useLanguage();
  const ui = WIKI_UI[language];

  const [domain, setDomain] = useState<WikiDomain>("sources");
  const [sourceCat, setSourceCat] = useState<SourceCat>("podcasts");
  const [mode, setMode] = useState<"rail" | "float">("rail");
  const [floatOpen, setFloatOpen] = useState(true);
  const seed = ui.chips[2];
  const [convo, setConvo] = useState<WikiMsg[]>([
    { role: "u", text: seed },
    { role: "a", data: wikiDemoReply(seed, language) },
  ]);

  const send = (q: string) => {
    setConvo((prev) => [
      ...prev,
      { role: "u", text: q },
      { role: "a", data: wikiDemoReply(q, language) },
    ]);
    if (mode === "float") setFloatOpen(true);
  };

  const domainCount: Record<WikiDomain, string> = {
    sources: "6",
    vibe: String(WIKI_TERMS.length),
    course: String(WIKI_COURSE.total),
    jobs: String(WIKI_JOBS.length),
  };

  return (
    <div className="px-4">
      <header className="mb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{ui.kicker}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">AI Sense Wiki</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">{ui.intro}</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground/70">※ {ui.protoNote}</p>
      </header>

      <div className="overflow-hidden rounded-xl border shadow-sm">
        {/* toolbar */}
        <div className="flex items-center gap-3 border-b bg-muted/40 px-3 py-2">
          <span className="truncate text-sm font-semibold">{ui.browseTitle}</span>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="flex gap-0.5 rounded-lg border bg-background p-0.5">
              {(["float", "rail"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => {
                    setMode(m);
                    if (m === "float") setFloatOpen(true);
                  }}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs transition-colors",
                    mode === m
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {ui.form[m]}
                </button>
              ))}
            </div>
            <span className="hidden rounded-full border border-accent bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent sm:inline">
              MCP · /sse
            </span>
          </div>
        </div>

        {/* body */}
        <div
          className={cn(
            "relative grid min-h-[560px]",
            mode === "rail" ? "md:grid-cols-[minmax(0,1fr)_360px]" : "grid-cols-1",
          )}
        >
          {/* LEFT: browse */}
          <section
            aria-label="browse"
            className={cn("flex min-w-0 flex-col", mode === "rail" && "md:border-r")}
          >
            <div className="flex flex-wrap gap-2 px-4 pb-1 pt-3">
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={d === domain}
                  onClick={() => setDomain(d)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
                    d === domain
                      ? "border-accent bg-accent/10 text-accent"
                      : "bg-muted/40 text-muted-foreground hover:border-accent",
                  )}
                >
                  {ui.domains[d]}
                  <span className="ml-1.5 font-mono text-xs opacity-70">{domainCount[d]}</span>
                </button>
              ))}
            </div>
            <WikiBrowse domain={domain} sourceCat={sourceCat} onSourceCat={setSourceCat} />
          </section>

          {/* RIGHT: chat rail */}
          {mode === "rail" ? (
            <aside aria-label="companion" className="hidden md:flex md:flex-col">
              <WikiChat convo={convo} onSend={send} />
            </aside>
          ) : null}

          {/* float form: FAB + window */}
          {mode === "float" ? (
            <>
              {floatOpen ? (
                <div className="absolute bottom-20 right-4 z-20 flex h-[min(460px,calc(100%-6rem))] w-[min(360px,calc(100%-2rem))] flex-col overflow-hidden rounded-2xl border bg-background shadow-xl">
                  <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
                    <b className="text-sm font-semibold">{ui.chat.title}</b>
                    <button
                      type="button"
                      aria-label={ui.form.close}
                      onClick={() => setFloatOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <WikiChat convo={convo} onSend={send} showHeader={false} />
                </div>
              ) : null}
              <button
                type="button"
                aria-label={ui.form.open}
                onClick={() => setFloatOpen((o) => !o)}
                className="absolute bottom-4 right-4 z-20 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl"
              >
                <MessageCircle className="size-6" />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* mobile chat (rail mode hides the rail on small screens) */}
      {mode === "rail" ? (
        <div className="mt-4 overflow-hidden rounded-xl border md:hidden">
          <WikiChat convo={convo} onSend={send} />
        </div>
      ) : null}
    </div>
  );
}

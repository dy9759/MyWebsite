"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_UI, WIKI_TERMS, WIKI_JOBS, wikiDemoReply, type WikiReply } from "@/content/wiki";
import { VIBE_TOTAL } from "@/components/wiki/wiki-vibe";
import { COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import WikiBrowse, { type WikiDomain } from "@/components/wiki/wiki-browse";
import WikiChat, { type WikiMsg } from "@/components/wiki/wiki-chat";
import WikiSearch, { type TermJump } from "@/components/wiki/wiki-search";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_WIKI_API_URL;
const CONNECTED = Boolean(API_URL);

const DOMAINS: WikiDomain[] = ["sources", "vibe", "course", "jobs"];

export default function WikiPageBody() {
  const { language } = useLanguage();
  const ui = WIKI_UI[language];

  const [domain, setDomain] = useState<WikiDomain>("sources");
  const [vibeTarget, setVibeTarget] = useState<TermJump | null>(null);

  // Deep link from lesson pages: /wiki?vibe=topic:termId
  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("vibe");
    if (!m) return;
    const [topic, id] = m.split(":");
    if (topic && id) {
      setDomain("vibe");
      setVibeTarget({ topic, id, ts: Date.now() });
    }
  }, []);
  const [chatOpen, setChatOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const seed = ui.chips[2];
  const [convo, setConvo] = useState<WikiMsg[]>([
    { role: "u", text: seed },
    { role: "a", data: wikiDemoReply(seed, language) },
  ]);

  const send = async (q: string) => {
    setChatOpen(true);
    setConvo((prev) => [...prev, { role: "u", text: q }]);
    if (!API_URL) {
      setConvo((prev) => [...prev, { role: "a", data: wikiDemoReply(q, language) }]);
      return;
    }
    setPending(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: q, language }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as WikiReply;
      setConvo((prev) => [...prev, { role: "a", data }]);
    } catch {
      // backend unreachable → graceful demo fallback
      setConvo((prev) => [...prev, { role: "a", data: wikiDemoReply(q, language) }]);
    } finally {
      setPending(false);
    }
  };

  const domainCount: Record<WikiDomain, string> = {
    sources: "6",
    vibe: String(VIBE_TOTAL),
    course: String(COURSE_TOTAL_LOOPS),
    jobs: String(WIKI_JOBS.length),
  };

  return (
    <div className="px-4">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{ui.kicker}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">AI Sense Wiki</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">{ui.intro}</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground/70">
          <span>※ {CONNECTED ? ui.connectedNote : ui.protoNote}</span>
          <span className="rounded-full border border-accent bg-accent/10 px-2 py-0.5 text-accent">
            MCP · /sse
          </span>
        </p>
        <div className="mt-3">
          <WikiSearch
            onTerm={(jump) => {
              setDomain("vibe");
              setVibeTarget(jump);
            }}
          />
        </div>
      </header>

      {/* domain tabs */}
      <div className="mb-2 flex flex-wrap gap-2">
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

      {/* browse — full width, no frame */}
      <section aria-label="browse" className="flex min-w-0 flex-col">
        <WikiBrowse domain={domain} vibeTarget={vibeTarget} />
      </section>

      {/* chat — floating window, bottom-right */}
      {chatOpen ? (
        <div className="fixed bottom-24 right-4 z-40 flex h-[min(480px,calc(100vh-8rem))] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
            <b className="text-sm font-semibold">{ui.chat.title}</b>
            <button
              type="button"
              aria-label={ui.form.close}
              onClick={() => setChatOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <WikiChat convo={convo} onSend={send} showHeader={false} connected={CONNECTED} pending={pending} />
        </div>
      ) : null}
      <button
        type="button"
        aria-label={ui.form.open}
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg"
      >
        <MessageCircle className="size-4" />
        {ui.chat.title}
      </button>
    </div>
  );
}

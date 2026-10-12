"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_UI, WIKI_JOBS, wikiDemoReply } from "@/content/wiki";
import { VIBE_TOPICS, VIBE_TOTAL } from "@/components/wiki/wiki-vibe";
import { SLOP_TOTAL } from "@/components/wiki/wiki-slop";
import { FDE_TOTAL } from "@/components/wiki/wiki-fde";
import { COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import WikiBrowse, { type WikiDomain } from "@/components/wiki/wiki-browse";
import WikiChat, { type WikiMsg } from "@/components/wiki/wiki-chat";
import WikiSearch from "@/components/wiki/wiki-search";
import { askWiki, WIKI_CONNECTED as CONNECTED, type TermJump } from "@/lib/wiki-data";
import { FLOAT_CHAT } from "@/lib/float-chat";
import { loadSession } from "@/lib/fde-store";
import { cn } from "@/lib/utils";

// 三层信息架构：共识（词典/学院/品味）→ 前沿（信号）→ 机会
const DOMAINS: WikiDomain[] = ["vibe", "course", "slop", "fde", "sources", "jobs"];

export default function WikiPageBody() {
  const { language } = useLanguage();
  const ui = WIKI_UI[language];

  const [domain, setDomain] = useState<WikiDomain>("vibe");
  const [vibeTarget, setVibeTarget] = useState<TermJump | null>(null);
  const [fdeTarget, setFdeTarget] = useState<{ id: string; ts: number } | null>(null);
  const [fdeLive, setFdeLive] = useState(false); // unfinished FDE attempt in storage

  // Deep link from lesson pages: /wiki?vibe=topic:termId (allowlisted — the
  // topic feeds a fetch path, so anything unknown is ignored outright).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // /wiki?domain=fde — allowlisted against the tab list.
    const d = params.get("domain");
    if (d && (DOMAINS as string[]).includes(d)) setDomain(d as WikiDomain);
    // An unfinished FDE attempt: mark the tab; a running timed exam takes the
    // user straight back to it unless the URL asked for another domain.
    const s = loadSession();
    if (s) {
      setFdeLive(true);
      if (s.mode === "full" && !d) setDomain("fde");
    }
    const m = params.get("vibe");
    if (!m) return;
    const [topic, id] = m.split(":");
    if (topic && id && VIBE_TOPICS.some((t) => t.id === topic) && /^[a-z0-9-]+$/.test(id)) {
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
    setPending(true);
    const data = await askWiki(q, language); // live backend when configured, demo fallback otherwise
    setConvo((prev) => [...prev, { role: "a", data }]);
    setPending(false);
  };

  const domainCount: Record<WikiDomain, string> = {
    sources: "6",
    vibe: String(VIBE_TOTAL),
    course: String(COURSE_TOTAL_LOOPS),
    slop: String(SLOP_TOTAL),
    fde: String(FDE_TOTAL),
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
            onFde={(id) => {
              setDomain("fde");
              setFdeTarget({ id, ts: Date.now() });
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
            {d === "fde" && fdeLive ? (
              <span className="ml-1.5 rounded-full bg-orange-500/15 px-1.5 text-xs text-orange-600">{ui.inProgress}</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* browse — full width, no frame */}
      <section aria-label="browse" className="flex min-w-0 flex-col">
        <WikiBrowse domain={domain} vibeTarget={vibeTarget} fdeTarget={fdeTarget} onFdeLive={setFdeLive} onFdeTargetUsed={() => setFdeTarget(null)} />
      </section>

      {/* chat — floating window, bottom-right */}
      {chatOpen ? (
        <div
          className={`${FLOAT_CHAT.windowClass} flex flex-col overflow-hidden rounded-2xl border bg-background shadow-xl`}
          style={{ width: FLOAT_CHAT.width, height: FLOAT_CHAT.height }}
        >
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
        className={`${FLOAT_CHAT.fabClass} inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg`}
      >
        <MessageCircle className="size-4" />
        {ui.chat.title}
      </button>
    </div>
  );
}

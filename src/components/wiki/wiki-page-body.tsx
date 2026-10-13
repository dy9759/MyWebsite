"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { WIKI_UI, WIKI_JOBS, wikiDemoReply } from "@/content/wiki";
import { VIBE_TOPICS, VIBE_TOTAL } from "@/components/wiki/wiki-vibe";
import { SLOP_TOTAL } from "@/components/wiki/wiki-slop";
import { COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import WikiBrowse, { type WikiDomain } from "@/components/wiki/wiki-browse";
import WikiChat from "@/components/wiki/wiki-chat";
import WikiFloatChat from "@/components/wiki/wiki-float-chat";
import WikiSearch from "@/components/wiki/wiki-search";
import { useWikiLive, type TermJump } from "@/lib/wiki-data";
import { useWikiChat } from "@/lib/use-wiki-chat";
import { loadSession } from "@/lib/fde-store";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

// 三层信息架构：共识（词典/学院/品味）→ 前沿（信号）→ 机会
const DOMAINS: WikiDomain[] = ["vibe", "course", "slop", "sources", "jobs"];

type Landing = { domain?: WikiDomain; vibeTarget?: TermJump; fdeLive: boolean; scrollFde: boolean };

// Deep link from lesson pages: /wiki?vibe=topic:termId (allowlisted — the
// topic feeds a fetch path, so anything unknown is ignored outright).
function readLanding(): Landing {
  const params = new URLSearchParams(window.location.search);
  const out: Landing = { fdeLive: false, scrollFde: false };
  // /wiki?domain=<tab> — allowlisted against the tab list. "fde" is an alias
  // for the academy's FDE 认证篇 (第 9–12 章).
  const d = params.get("domain");
  const goFde = () => {
    out.domain = "course";
    out.scrollFde = true;
  };
  if (d === "fde") goFde();
  else if (d && (DOMAINS as string[]).includes(d)) out.domain = d as WikiDomain;
  // An unfinished FDE attempt marks the academy tab; a running timed exam
  // takes the user straight back to it unless the URL named another tab.
  const s = loadSession();
  if (s) {
    out.fdeLive = true;
    if (s.mode === "full" && !d) goFde();
  }
  const m = params.get("vibe");
  if (!m) return out;
  const [topic, id] = m.split(":");
  if (topic && id && VIBE_TOPICS.some((t) => t.id === topic) && /^[a-z0-9-]+$/.test(id)) {
    out.domain = "vibe";
    out.vibeTarget = { topic, id };
  }
  return out;
}

export default function WikiPageBody() {
  const { language } = useLanguage();
  const ui = WIKI_UI[language];
  const live = useWikiLive();

  const [domain, setDomain] = useState<WikiDomain>("vibe");
  const [vibeTarget, setVibeTarget] = useState<TermJump | null>(null);
  const [fdeTarget, setFdeTarget] = useState<{ id: string; ts: number } | null>(null);
  const [fdeLive, setFdeLive] = useState(false); // unfinished FDE attempt in storage

  // URL + storage are read once on the client, during render (the static
  // export renders the defaults above).
  const hydrated = useHydrated();
  const [landing, setLanding] = useState<Landing | null>(null);
  if (hydrated && !landing) {
    const l = readLanding();
    setLanding(l);
    if (l.domain) setDomain(l.domain);
    if (l.vibeTarget) setVibeTarget(l.vibeTarget);
    setFdeLive(l.fdeLive);
  }
  useEffect(() => {
    if (!landing?.scrollFde) return;
    const t = setTimeout(() => document.getElementById("course-fde")?.scrollIntoView({ block: "start" }), 300);
    return () => clearTimeout(t);
  }, [landing]);
  const onTabKey = (e: React.KeyboardEvent) => {
    const i = DOMAINS.indexOf(domain);
    const next =
      e.key === "ArrowRight" ? DOMAINS[(i + 1) % DOMAINS.length]
      : e.key === "ArrowLeft" ? DOMAINS[(i - 1 + DOMAINS.length) % DOMAINS.length]
      : e.key === "Home" ? DOMAINS[0]
      : e.key === "End" ? DOMAINS[DOMAINS.length - 1]
      : null;
    if (!next) return;
    e.preventDefault();
    setDomain(next);
    document.getElementById(`wiki-tab-${next}`)?.focus();
  };

  const seed = ui.chips[2];
  const chat = useWikiChat(language, [
    { role: "u", text: seed },
    { role: "a", data: wikiDemoReply(seed, language) },
  ]);

  const domainCount: Record<WikiDomain, string> = {
    sources: "6",
    vibe: String(VIBE_TOTAL),
    course: String(COURSE_TOTAL_LOOPS),
    slop: String(SLOP_TOTAL),
    jobs: String(WIKI_JOBS.length),
  };

  return (
    <div className="px-4">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{ui.kicker}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">AI Sense Wiki</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">{ui.intro}</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground/70">
          <span>※ {live === "backend" ? ui.connectedNote : live === "byok" ? ui.byokNote : ui.protoNote}</span>
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
              setDomain("course");
              setFdeTarget({ id, ts: Date.now() });
            }}
          />
        </div>
      </header>

      {/* domain tabs — roving tabindex, arrow keys move between tabs */}
      <div role="tablist" aria-label="AI Sense Wiki" className="mb-2 flex flex-wrap gap-2" onKeyDown={onTabKey}>
        {DOMAINS.map((d) => (
          <button
            key={d}
            id={`wiki-tab-${d}`}
            type="button"
            role="tab"
            aria-selected={d === domain}
            aria-controls="wiki-panel"
            tabIndex={d === domain ? 0 : -1}
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
            {d === "course" && fdeLive ? (
              <span className="ml-1.5 rounded-full bg-orange-500/15 px-1.5 text-xs text-orange-600">{ui.inProgress}</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* browse — full width, no frame */}
      <section id="wiki-panel" role="tabpanel" aria-labelledby={`wiki-tab-${domain}`} className="flex min-w-0 flex-col">
        <WikiBrowse domain={domain} vibeTarget={vibeTarget} onVibeTargetUsed={() => setVibeTarget(null)} fdeTarget={fdeTarget} onFdeLive={setFdeLive} onFdeTargetUsed={() => setFdeTarget(null)} />
      </section>

      {/* chat — floating window, bottom-right */}
      <WikiFloatChat
        open={chat.open}
        onOpenChange={chat.setOpen}
        title={<b className="text-sm font-semibold">{ui.chat.title}</b>}
        closeLabel={ui.form.close}
        windowLabel={ui.chat.title}
        windowClassName="rounded-2xl border bg-background shadow-xl"
        headerStyle={{ background: "hsl(var(--muted) / 0.4)" }}
        fab={{
          ariaLabel: ui.form.open,
          className: "bg-accent text-accent-foreground",
          label: (
            <>
              <MessageCircle className="size-4" />
              {ui.chat.title}
            </>
          ),
        }}
      >
        <WikiChat convo={chat.convo} onSend={chat.send} showHeader={false} connected={Boolean(live)} pending={chat.pending} />
      </WikiFloatChat>
    </div>
  );
}

"use client";

// Unified wiki search over VibeHub terms + course loops + course steps.
// Index is a small static JSON, lazy-loaded on first focus.
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Entry = {
  k: "term" | "loop" | "step";
  id: string;
  topic?: string;
  title: string;
  en?: string;
  al?: string;
  tag?: string;
  cat?: string;
  ch?: number;
  chT?: string;
  step?: number;
};

export type TermJump = { topic: string; id: string; ts: number };

const KIND_LABEL: Record<Entry["k"], string> = { term: "术语", loop: "回路", step: "小节" };

function rank(e: Entry, q: string): number {
  const t = e.title.toLowerCase();
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  if (t.includes(q)) return 2;
  if (e.en?.toLowerCase().includes(q)) return 3;
  if (e.al?.toLowerCase().includes(q)) return 4;
  if (e.tag?.toLowerCase().includes(q)) return 5;
  return 9;
}

export default function WikiSearch({ onTerm }: { onTerm: (jump: TermJump) => void }) {
  const router = useRouter();
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const load = () => {
    if (index) return;
    // cache-bust: the index is regenerated whenever content batches land
    fetch(`${BASE_PATH}/wiki/search-index.json?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setIndex)
      .catch(() => setIndex([]));
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const ql = q.trim().toLowerCase();
  const results =
    index && ql
      ? index
          .map((e) => ({ e, r: rank(e, ql) }))
          .filter((x) => x.r < 9)
          .sort((a, b) => a.r - b.r || (a.e.k === "term" ? -1 : 1))
          .slice(0, 10)
          .map((x) => x.e)
      : [];

  const go = (e: Entry) => {
    setOpen(false);
    setQ("");
    if (e.k === "term") onTerm({ topic: e.topic ?? "frontend", id: e.id, ts: Date.now() });
    else router.push(`/wiki/course/${e.id}/`);
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5">
        <Search className="size-4 shrink-0 text-muted-foreground/60" />
        <input
          type="text"
          value={q}
          onFocus={() => {
            load();
            setOpen(true);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          placeholder="搜索术语：试试「契约」「部署」「幂等」…"
          aria-label="搜索知识库"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
        />
      </div>
      {open && ql && index ? (
        <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border bg-background shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">没有匹配「{q}」的条目。</p>
          ) : (
            results.map((e, i) => (
              <button
                key={`${e.k}-${e.id}-${e.step ?? ""}-${i}`}
                type="button"
                onClick={() => go(e)}
                className="flex w-full items-baseline gap-2 border-b px-4 py-2.5 text-left text-sm transition-colors last:border-b-0 hover:bg-accent/10"
              >
                <span className="shrink-0 rounded-full border border-accent px-1.5 text-[0.62rem] text-accent">
                  {KIND_LABEL[e.k]}
                </span>
                <span className="font-medium">{e.title}</span>
                {e.en ? <span className="font-mono text-xs text-muted-foreground">{e.en}</span> : null}
                <span className="ml-auto truncate pl-2 text-xs text-muted-foreground/70">
                  {e.k === "term" ? e.cat : e.k === "loop" ? `第 ${e.ch} 章` : `第 ${e.ch} 章 · ${e.tag}`}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

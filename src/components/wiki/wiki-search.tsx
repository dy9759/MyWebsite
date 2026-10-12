"use client";

// Unified wiki search over VibeHub terms + course loops + course steps.
// Index loads via the shared module-level cache on first focus.
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { loadSearchIndex, type SearchEntry, type TermJump } from "@/lib/wiki-data";

export type { TermJump };

const KIND_LABEL: Record<SearchEntry["k"], string> = { term: "术语", loop: "回路", step: "小节", fde: "FDE 题" };
const KIND_RANK: Record<SearchEntry["k"], number> = { term: 0, loop: 1, step: 2, fde: 3 };

function rank(e: SearchEntry, q: string): number {
  const t = e.title.toLowerCase();
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  if (t.includes(q)) return 2;
  if (e.en?.toLowerCase().includes(q)) return 3;
  if (e.al?.toLowerCase().includes(q)) return 4;
  if (e.tag?.toLowerCase().includes(q)) return 5;
  return 9;
}

export default function WikiSearch({ onTerm, onFde }: { onTerm: (jump: TermJump) => void; onFde: (id: string) => void }) {
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[] | "loading" | "error" | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const load = () => {
    if (Array.isArray(index) || index === "loading") return;
    setIndex("loading");
    loadSearchIndex()
      .then(setIndex)
      .catch(() => setIndex("error"));
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
    Array.isArray(index) && ql
      ? index
          .map((e) => ({ e, r: rank(e, ql) }))
          .filter((x) => x.r < 9)
          .sort((a, b) => a.r - b.r || KIND_RANK[a.e.k] - KIND_RANK[b.e.k])
          .slice(0, 10)
          .map((x) => x.e)
      : [];

  const go = (e: SearchEntry) => {
    setOpen(false);
    setQ("");
    if (e.k === "term") onTerm({ topic: e.topic ?? "frontend", id: e.id, ts: Date.now() });
    else if (e.k === "fde") onFde(e.id);
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
      {open && ql && index && index !== "loading" ? (
        <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border bg-background shadow-xl">
          {index === "error" ? (
            <button
              type="button"
              onClick={load}
              className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-accent/10"
            >
              索引加载失败——点击重试。
            </button>
          ) : results.length === 0 ? (
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
                <span className={e.k === "fde" ? "line-clamp-1 font-medium" : "font-medium"}>{e.title}</span>
                {e.en ? <span className="font-mono text-xs text-muted-foreground">{e.en}</span> : null}
                <span className="ml-auto truncate pl-2 text-xs text-muted-foreground/70">
                  {e.k === "term" || e.k === "fde" ? e.cat : e.k === "loop" ? `第 ${e.ch} 章` : `第 ${e.ch} 章 · ${e.tag}`}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

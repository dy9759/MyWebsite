"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowDownToLine, ArrowUpToLine, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Right column of the wide note layout: two stacked panes of tabs. Tabs can
// be dragged (or moved with the arrow button) between the panes, and the
// divider resizes them. The arrangement is remembered per browser.

export type PaneTab = "excerpts" | "book" | "ai";
type Pane = "top" | "bottom";
type Layout = { top: PaneTab[]; bottom: PaneTab[]; active: Record<Pane, PaneTab | null>; split: number };

const KEY = "books.notePanes.v1";
const ALL: PaneTab[] = ["excerpts", "book", "ai"];
const DEFAULT: Layout = { top: ["excerpts", "book"], bottom: ["ai"], active: { top: "excerpts", bottom: "ai" }, split: 0.55 };
const DRAG_TYPE = "application/x-note-pane-tab";

function parseLayout(raw: string | null): Layout {
  try {
    const l = JSON.parse(raw ?? "") as Layout;
    const tabs = [...l.top, ...l.bottom];
    if (tabs.length === ALL.length && ALL.every((t) => tabs.includes(t))) return l;
  } catch {}
  return DEFAULT;
}

// The saved layout, read after hydration (the page is static HTML).
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const readSaved = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const other = (p: Pane): Pane => (p === "top" ? "bottom" : "top");

type Props = {
  labels: Record<PaneTab, string>;
  render: (tab: PaneTab) => React.ReactNode;
  // Bumped by the note (e.g. a quote click) to bring a tab to the front.
  reveal: { tab: PaneTab; seq: number } | null;
};

export default function NoteSidePanes({ labels, render, reveal }: Props) {
  const saved = useSyncExternalStore(subscribe, readSaved, () => null);
  const [local, setLocal] = useState<Layout | null>(null);
  const layout = local ?? parseLayout(saved);
  const [dragging, setDragging] = useState(false);
  const [seenReveal, setSeenReveal] = useState(reveal);
  const boxRef = useRef<HTMLDivElement>(null);

  const save = (next: Layout) => {
    setLocal(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const update = (fn: (l: Layout) => Layout) => save(fn(layout));

  const paneOf = (l: Layout, t: PaneTab): Pane => (l.top.includes(t) ? "top" : "bottom");
  const withActive = (l: Layout, t: PaneTab): Layout => ({ ...l, active: { ...l.active, [paneOf(l, t)]: t } });
  const activate = (t: PaneTab) => update((l) => withActive(l, t));

  // A new reveal from the note brings its tab to the front (adjusting state
  // during render, so no extra effect pass).
  if (reveal !== seenReveal) {
    setSeenReveal(reveal);
    if (reveal) setLocal(withActive(layout, reveal.tab));
  }

  const move = (t: PaneTab, to: Pane) =>
    update((l) => {
      const from = paneOf(l, t);
      if (from === to) return { ...l, active: { ...l.active, [to]: t } };
      const rest = l[from].filter((x) => x !== t);
      return { ...l, [from]: rest, [to]: [...l[to], t], active: { [from]: rest[0] ?? null, [to]: t } as Layout["active"] };
    });

  const onDividerDown = (e: React.PointerEvent) => {
    const box = boxRef.current;
    if (!box) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    let last = layout;
    const onMove = (ev: PointerEvent) => {
      const r = box.getBoundingClientRect();
      last = { ...last, split: Math.min(0.8, Math.max(0.2, (ev.clientY - r.top) / r.height)) };
      setLocal(last);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      save(last);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const dropProps = (p: Pane) => ({
    onDragOver: (e: React.DragEvent) => {
      if (e.dataTransfer.types.includes(DRAG_TYPE)) e.preventDefault();
    },
    onDrop: (e: React.DragEvent) => {
      const t = e.dataTransfer.getData(DRAG_TYPE) as PaneTab;
      if (ALL.includes(t)) move(t, p);
      setDragging(false);
    },
  });

  const renderPane = (p: Pane, grow: number) => {
    const tabs = layout[p];
    if (!tabs.length) {
      return dragging ? (
        <div {...dropProps(p)} className="m-1.5 grid h-16 shrink-0 place-items-center rounded-md border-2 border-dashed text-xs text-muted-foreground">
          拖到这里，分成上下两栏
        </div>
      ) : null;
    }
    const active = layout.active[p] ?? tabs[0];
    return (
      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border" style={{ flexGrow: grow, flexBasis: 0 }}>
        <div {...dropProps(p)} className="flex shrink-0 items-center gap-1 border-b bg-muted/30 p-1.5 text-xs">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(DRAG_TYPE, t);
                e.dataTransfer.effectAllowed = "move";
                setDragging(true);
              }}
              onDragEnd={() => setDragging(false)}
              onClick={() => activate(t)}
              title="可拖到另一栏"
              className={cn("cursor-grab rounded px-2.5 py-1", t === active ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              {labels[t]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => move(active, other(p))}
            aria-label={p === "top" ? "移到下方" : "移到上方"}
            title={p === "top" ? "把当前标签移到下方" : "把当前标签移到上方"}
            className="ml-auto rounded p-1 text-muted-foreground hover:bg-accent/10 hover:text-foreground"
          >
            {p === "top" ? <ArrowDownToLine className="h-3.5 w-3.5" /> : <ArrowUpToLine className="h-3.5 w-3.5" />}
          </button>
        </div>
        {tabs.map((t) => (
          // Inactive tabs stay mounted (the open book, the chat).
          <div key={t} className={cn("min-h-0 flex-1", t === active ? "flex flex-col" : "hidden")}>
            {render(t)}
          </div>
        ))}
      </section>
    );
  };

  const both = layout.top.length > 0 && layout.bottom.length > 0;
  return (
    <div ref={boxRef} className="flex h-full flex-col">
      {renderPane("top", both ? layout.split : 1)}
      {both && (
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="拖动调整上下高度"
          onPointerDown={onDividerDown}
          className="group flex h-3 shrink-0 cursor-row-resize touch-none items-center justify-center"
        >
          <GripHorizontal className="h-3 w-3 text-muted-foreground/50 group-hover:text-foreground" />
        </div>
      )}
      {renderPane("bottom", both ? 1 - layout.split : 1)}
    </div>
  );
}

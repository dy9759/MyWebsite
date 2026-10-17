"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { categoryLabel, isFree, type CatalogEntry, type ReadingStatus } from "@/lib/books/catalog";
import { cn } from "@/lib/utils";

const PRIORITY_STYLE: Record<string, string> = {
  P0: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
  P1: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  P2: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  P3: "border-border text-muted-foreground",
};

const STATUS_OPTIONS: { id: ReadingStatus; label: string }[] = [
  { id: "todo", label: "待读" },
  { id: "reading", label: "在读" },
  { id: "done", label: "已读" },
];

type Props = {
  entry: CatalogEntry;
  status: ReadingStatus;
  onStatus: (s: ReadingStatus) => void;
  shelfBookId?: string; // a matching file on this browser's shelf
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-0.5 sm:grid-cols-[5rem_1fr] sm:gap-3">
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="text-sm">{children}</dd>
  </div>
);

const OutLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
    {children}
    <ExternalLink className="h-3 w-3 shrink-0" />
  </a>
);

export default function CatalogItem({ entry: e, status, onStatus, shelfBookId }: Props) {
  return (
    <li id={e.id} className="scroll-mt-24 rounded-lg border p-4 target:ring-2 target:ring-primary">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-muted-foreground">{e.id}</span>
        <span className={cn("rounded border px-1.5 py-0.5 font-medium", PRIORITY_STYLE[e.priority])}>{e.priority}</span>
        <span className="rounded border px-1.5 py-0.5" title="长期重要性">重要性 {e.importance}</span>
        <span className="rounded border px-1.5 py-0.5 tabular-nums" title="推荐指数">★ {e.score.toFixed(1)}</span>
        <span className="text-muted-foreground">{categoryLabel(e.category)} · {e.kind}</span>
        {isFree(e) && <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-300">可免费读</span>}
      </div>

      <h3 className="mt-2 font-semibold leading-snug">
        <OutLink href={e.url}>{e.title}</OutLink>
      </h3>
      <p className="mt-0.5 text-sm text-muted-foreground">{e.author}</p>
      <p className="mt-2 text-sm">{e.reason}</p>

      <details className="group mt-3">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">读法、产出与出处</summary>
        <dl className="mt-3 space-y-2">
          <Field label="建议读法">{e.method}</Field>
          <Field label="阅读产出">{e.output}</Field>
          <Field label="取舍提醒">{e.caveat}</Field>
          <Field label="获取方式">
            {e.access} · <OutLink href={e.url}>打开原文 / 介绍页</OutLink>
          </Field>
          <Field label="推荐出处">
            {e.evidenceUrl ? <OutLink href={e.evidenceUrl}>{e.evidence}</OutLink> : e.evidence}
          </Field>
          <Field label="核验状态">
            {e.reviewUrl ? <OutLink href={e.reviewUrl}>{e.reviewStatus}</OutLink> : e.reviewStatus}
          </Field>
        </dl>
      </details>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="阅读状态" className="inline-flex overflow-hidden rounded-md border text-xs">
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={status === o.id}
              onClick={() => onStatus(o.id)}
              className={cn("px-2.5 py-1", status === o.id ? "bg-primary text-primary-foreground" : "hover:bg-accent/10")}
            >
              {o.label}
            </button>
          ))}
        </div>
        {shelfBookId && (
          <Link href={`/books/read/?id=${shelfBookId}`} className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent/10">
            在书架打开 · AI 陪读
          </Link>
        )}
      </div>
    </li>
  );
}

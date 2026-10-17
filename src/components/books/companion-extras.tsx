"use client";

import Link from "next/link";
import { useState } from "react";
import { BookMarked, Copy, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATALOG, type CatalogEntry } from "@/lib/books/catalog";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";

// Pieces of the AI companion tied to the reading catalog and note export.

export function downloadText(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type GoalProps = {
  entry: CatalogEntry | null;
  onLink: (id: string | null) => void;
};

// Shows why this book is on the reading list (or lets the reader link it
// to a catalog entry by hand when the title did not match).
export function CatalogGoal({ entry, onLink }: GoalProps) {
  const [editing, setEditing] = useState(false);
  if (!entry || editing) {
    return (
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookMarked className="h-3.5 w-3.5 shrink-0" />
        <select
          value={entry?.id ?? ""}
          onChange={(e) => {
            onLink(e.target.value || null);
            setEditing(false);
          }}
          className="min-w-0 flex-1 rounded border bg-background px-1.5 py-1"
        >
          <option value="">关联阅读目录中的条目（可选）</option>
          {CATALOG.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id} · {c.priority} · {c.title}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <div className="rounded-md border border-primary/30 bg-primary/5 p-2 text-xs">
      <div className="flex items-center gap-1.5">
        <BookMarked className="h-3.5 w-3.5 shrink-0" />
        <Link href={`/books/catalog/#${entry.id}`} className="font-medium underline-offset-4 hover:underline">
          {entry.id} · {entry.priority} · ★{entry.score.toFixed(1)}
        </Link>
        <button type="button" className="ml-auto text-muted-foreground hover:text-foreground" onClick={() => setEditing(true)}>
          更换
        </button>
      </div>
      <p className="mt-1">
        <span className="text-muted-foreground">期望产出：</span>
        {entry.output}
      </p>
      <p className="mt-0.5 text-muted-foreground">{entry.method} · {entry.caveat}</p>
    </div>
  );
}

type NoteProps = { markdown: string; filename: string; onClose: () => void };

export function NoteBlock({ markdown, filename, onClose }: NoteProps) {
  const [copied, setCopied] = useState(false);
  // Show the body only; the frontmatter is for the downloaded file.
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");
  return (
    <div className="rounded-md border p-3">
      <div className="mb-2 flex items-center gap-1">
        <span className="text-xs font-medium">读书笔记草稿</span>
        <span className="flex-1" />
        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => downloadText(filename, markdown)}>
          <Download className="mr-1 h-3.5 w-3.5" /> .md
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2"
          onClick={() => {
            void navigator.clipboard?.writeText(markdown).then(() => setCopied(true));
          }}
        >
          <Copy className="mr-1 h-3.5 w-3.5" /> {copied ? "已复制" : "复制"}
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onClose} aria-label="close note">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div
        className="text-sm leading-6 [&_h2]:mt-3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-medium [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_table]:my-2 [&_table]:w-full [&_table]:text-xs [&_td]:border [&_td]:px-1.5 [&_td]:py-1 [&_th]:border [&_th]:bg-muted/50 [&_th]:px-1.5 [&_th]:py-1 [&_th]:text-left"
        dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(body) }}
      />
    </div>
  );
}

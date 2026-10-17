"use client";

import { READING_ROUTES } from "@/content/books/reading-routes";
import { CATALOG_BY_ID, type ReadingStatus } from "@/lib/books/catalog";
import { cn } from "@/lib/utils";

type Props = {
  statusOf: (id: string) => ReadingStatus;
  onJump: (id: string) => void;
};

export default function CatalogRoutes({ statusOf, onJump }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {READING_ROUTES.map((r) => {
        const done = r.steps.filter((id) => statusOf(id) === "done").length;
        return (
          <div key={r.id} className="rounded-lg border p-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-medium">{r.title}</h3>
              <span className="text-xs tabular-nums text-muted-foreground">
                {done}/{r.steps.length} 已读
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{r.goal}</p>
            <ol className="mt-2 flex flex-wrap items-center gap-1 text-sm">
              {r.steps.map((id, i) => (
                <li key={id} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground">{r.parallel ? "／" : "→"}</span>}
                  <button
                    type="button"
                    onClick={() => onJump(id)}
                    className={cn(
                      "rounded px-1.5 py-0.5 text-left hover:bg-accent/10",
                      statusOf(id) === "done" && "text-muted-foreground line-through",
                    )}
                  >
                    {CATALOG_BY_ID.get(id)?.title.replace(/[（(].*$/, "")}
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs">
              <span className="text-muted-foreground">读完留下：</span>
              {r.output}
            </p>
          </div>
        );
      })}
    </div>
  );
}

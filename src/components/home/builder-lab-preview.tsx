"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowUpRight, Box } from "lucide-react";
import Link from "next/link";

export default function BuilderLabPreview() {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <section id="builder-lab" className="scroll-mt-28 px-4">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight">
            {copy.lab.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {copy.lab.intro}
          </p>
        </div>
        <Button asChild variant="link" className="h-auto self-start px-0">
          <Link href="/lab/">
            {copy.lab.viewAll}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>

      <div className="border-y">
        {copy.lab.items.slice(0, 4).map((item, index) => (
          <article
            key={item.id}
            className={`grid items-start gap-3 py-4 sm:grid-cols-[2rem_12rem_minmax(0,1fr)_auto] sm:gap-5 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <Box
              className="mt-0.5 size-5 text-muted-foreground"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 text-xs text-accent">{item.status}</p>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {item.summary}
            </p>
            {item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm hover:text-accent"
              >
                {item.urlLabel ?? copy.lab.open}
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            ) : (
              <span className="text-xs text-muted-foreground">
                {copy.lab.unavailable}
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

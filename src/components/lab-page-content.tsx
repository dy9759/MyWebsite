"use client";

import { useLanguage } from "@/components/language-provider";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowUpRight, Box, CircleDashed } from "lucide-react";
import Link from "next/link";

export default function LabPageContent() {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <div className="px-4 pb-8 pt-4">
      <PageBreadcrumb current={copy.lab.heading} />

      <header className="max-w-3xl pb-10 pt-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.lab.heading}
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground">
          {copy.lab.intro}
        </p>
      </header>

      <div className="border-y">
        {copy.lab.items.map((item, index) => (
          <article
            id={item.id}
            key={item.id}
            className={`grid gap-5 py-7 md:grid-cols-[2.5rem_14rem_minmax(0,1fr)_12rem] md:gap-7 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <Box
              className="size-6 text-accent"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <Badge variant="outline" className="mt-3 text-accent">
                {item.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm leading-7">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tag) => (
                  <span
                    key={tag}
                    className="border px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.needed.length > 0 ? (
                <div className="mt-5 flex gap-2 text-xs leading-5 text-muted-foreground">
                  <CircleDashed className="mt-0.5 size-4 shrink-0" />
                  <span>
                    {copy.casePage.needed}: {item.needed.join(" · ")}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="md:text-right">
              {item.url ? (
                <Button asChild variant="link" className="h-auto px-0">
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.urlLabel ?? copy.lab.open}
                    <ArrowUpRight className="ml-1 size-4" />
                  </Link>
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {copy.lab.unavailable}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCaseStudies({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <section
      id="selected-cases"
      className={`scroll-mt-28 ${showHeading ? "px-4" : ""}`}
    >
      {showHeading ? (
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight">
            {copy.cases.heading}
          </h2>
          <Button asChild variant="link" size="sm" className="h-auto px-0">
            <Link href="/projects/">
              {copy.cases.viewAll}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden border">
        {copy.cases.items.map((item, index) => (
          <article
            key={item.id}
            className={`flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-6 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-accent">
                  {item.number}
                </span>
                <h3 className="text-base font-semibold leading-tight">
                  {item.title}
                </h3>
                <span className="rounded-full border border-accent/60 px-2 py-0.5 text-xs text-accent">
                  {item.status}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {item.summary}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.role} · {item.period}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-6">
              <dl className="flex gap-5">
                {item.evidence.slice(0, 2).map((evidence) => (
                  <div key={evidence.label}>
                    <dd
                      className={
                        evidence.placeholder
                          ? "text-sm font-medium text-muted-foreground"
                          : "font-semibold text-accent"
                      }
                    >
                      {evidence.value}
                    </dd>
                    <dt className="mt-0.5 max-w-[8rem] text-xs leading-4 text-muted-foreground">
                      {evidence.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <Button asChild variant="link" className="h-auto px-0">
                <Link href={`/projects/${item.slug}/`}>
                  {copy.cases.viewCase}
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

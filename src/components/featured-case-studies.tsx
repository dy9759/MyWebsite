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
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {copy.cases.heading}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {copy.cases.intro}
            </p>
          </div>
          <Button asChild variant="link" className="h-auto self-start px-0">
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
            className={`grid gap-6 p-6 lg:grid-cols-[11rem_12rem_minmax(0,1fr)_13rem_7rem] lg:gap-7 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <div>
              <span className="text-xs font-medium text-accent">
                {item.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold leading-tight">
                {item.title}
              </h3>
              <span className="mt-4 inline-flex rounded-full border border-accent/60 px-3 py-1 text-xs text-accent">
                {item.status}
              </span>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {item.summary}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {copy.cases.labels.role}
              </p>
              <p className="mt-3 text-sm leading-6">{item.role}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {item.period}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {copy.cases.labels.problem}
                </p>
                <p className="mt-3 text-sm leading-6">{item.problems[0]}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {copy.cases.labels.decision}
                </p>
                <p className="mt-3 text-sm leading-6">{item.decision}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {copy.cases.labels.evidence}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
                {item.evidence.slice(0, 4).map((evidence) => (
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
                    <dt className="mt-1 text-xs leading-4 text-muted-foreground">
                      {evidence.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-start lg:justify-end">
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

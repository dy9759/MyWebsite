"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ResearchEducationSummary() {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <section id="research-summary" className="scroll-mt-28 px-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight">
          {copy.research.heading}
        </h2>
        <Button asChild variant="link" size="sm" className="h-auto px-0">
          <Link href="/research/">
            {copy.research.viewAll}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>
      <ul className="grid gap-x-8 gap-y-5 border-t py-5 md:grid-cols-2">
        {copy.research.education.map((edu) => (
          <li key={`${edu.school}-${edu.duration}`}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">{edu.school}</p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {edu.duration}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {edu.field} · {edu.degree}
            </p>
            {edu.detail ? (
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {edu.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <ul className="mt-4 grid gap-1.5 text-sm leading-6 text-muted-foreground">
        {copy.research.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

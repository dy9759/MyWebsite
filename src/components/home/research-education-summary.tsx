"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function ResearchEducationSummary() {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <section id="research-summary" className="scroll-mt-28 px-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="border-l-2 border-accent pl-3 text-2xl font-semibold tracking-tight">
          {copy.research.heading}
        </h2>
        <Button asChild variant="link" className="h-auto px-0">
          <Link href="/research/">
            {copy.research.viewAll}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 border-y py-7 md:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="flex items-start gap-4">
          <GraduationCap
            className="size-8 shrink-0 text-accent"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="font-medium leading-7">{copy.research.summary}</p>
        </div>
        <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
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
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {copy.research.education.map((edu) => (
          <li key={`${edu.school}-${edu.duration}`} className="border-t pt-4">
            <p className="text-xs text-muted-foreground">{edu.duration}</p>
            <p className="mt-1 font-semibold">{edu.school}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {edu.field} · {edu.degree}
            </p>
            {edu.detail ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {edu.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

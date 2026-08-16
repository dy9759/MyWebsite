"use client";

import { useLanguage, useSiteConfig } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { ArrowDownRight } from "lucide-react";

export default function ResearchIntro() {
  const { language } = useLanguage();
  const config = useSiteConfig();
  const copy = PORTFOLIO_COPY[language].research;
  const publicationCount = config.research?.publications?.length ?? 0;
  const conferenceCount = config.research?.conferences?.length ?? 0;
  const labels =
    language === "zh"
      ? ["期刊论文", "会议成果"]
      : ["Journal papers", "Conference papers"];

  return (
    <section id="research-overview" className="scroll-mt-28 px-4 pb-10 pt-4">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.heading}
        </h1>
        <p className="mt-5 text-lg leading-8">{copy.summary}</p>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          {copy.intro}
        </p>
      </div>

      <div className="mt-8 grid border-y sm:grid-cols-[12rem_12rem_minmax(0,1fr)]">
        {[publicationCount, conferenceCount].map((count, index) => (
          <div
            key={labels[index]}
            className={`py-5 sm:px-5 ${index > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}
          >
            <p className="text-2xl font-semibold">{count}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {labels[index]}
            </p>
          </div>
        ))}
        <div className="border-t py-5 sm:border-l sm:border-t-0 sm:px-5">
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
            {copy.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <ArrowDownRight
                  className="mt-1 size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">
        {copy.verificationNote}
      </p>
    </section>
  );
}

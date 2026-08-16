"use client";

import { useLanguage } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";

export default function HomeExperience() {
  const { language } = useLanguage();
  const { heading, company, role, duration, highlights } =
    PORTFOLIO_COPY[language].experience;

  return (
    <section id="experience" className="scroll-mt-28 px-4">
      <div className="mb-6">
        <h2 className="border-l-2 border-accent pl-3 text-2xl font-semibold tracking-tight">
          {heading}
        </h2>
      </div>

      <div className="border-y">
        <article className="grid gap-3 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
          <p className="text-sm text-muted-foreground">{duration}</p>
          <div>
            <h3 className="font-semibold">{company}</h3>
            <p className="mt-1 text-sm">{role}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground lg:grid-cols-3">
              {highlights.map((highlight) => (
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
        </article>
      </div>
    </section>
  );
}

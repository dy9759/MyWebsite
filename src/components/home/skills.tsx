"use client";

import { useLanguage } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";

export default function Skills() {
  const { language } = useLanguage();
  const { heading, groups } = PORTFOLIO_COPY[language].skills;

  return (
    <section id="skills" className="scroll-mt-28 px-4">
      <div className="mb-6">
        <h2 className="border-l-2 border-accent pl-3 text-2xl font-semibold tracking-tight">
          {heading}
        </h2>
      </div>
      <dl className="grid gap-6 border-y py-7">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6"
          >
            <dt className="text-sm font-semibold">{group.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border bg-muted/40 px-2 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

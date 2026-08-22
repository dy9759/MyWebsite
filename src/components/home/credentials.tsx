"use client";

import { useLanguage } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";

export default function Credentials() {
  const { language } = useLanguage();
  const { heading, groups } = PORTFOLIO_COPY[language].credentials;

  return (
    <section id="credentials" className="scroll-mt-28 px-4">
      <div className="mb-4">
        <h2 className="border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight">
          {heading}
        </h2>
      </div>
      <dl className="grid gap-6 border-y py-5 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-3">
            <dt className="text-sm font-semibold">{group.label}</dt>
            <dd>
              <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

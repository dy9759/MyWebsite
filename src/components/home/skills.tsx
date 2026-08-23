"use client";

import { useLanguage } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";

export default function Skills() {
  const { language } = useLanguage();
  const { skills, credentials } = PORTFOLIO_COPY[language];
  const heading = language === "zh" ? "技能与荣誉" : "Skills & Credentials";

  return (
    <section id="skills" className="scroll-mt-28 px-4">
      <div className="mb-4">
        <h2 className="border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight">
          {heading}
        </h2>
      </div>
      <dl className="grid gap-6 border-t py-5">
        {skills.groups.map((group) => (
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
      <dl className="grid gap-6 border-t py-5 md:grid-cols-2">
        {credentials.groups.map((group) => (
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

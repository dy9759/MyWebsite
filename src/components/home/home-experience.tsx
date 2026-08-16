"use client";

import { useLanguage, useSiteConfig } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";

export default function HomeExperience() {
  const { language } = useLanguage();
  const config = useSiteConfig();
  const copy = PORTFOLIO_COPY[language];
  // Historical entries in the legacy config are not surfaced until the owner
  // verifies them. Only the confirmed current role is shown on the homepage.
  const positions = config.workExperience?.positions?.slice(0, 1) ?? [];

  return (
    <section id="experience" className="scroll-mt-28 px-4">
      <div className="mb-6">
        <h2 className="border-l-2 border-accent pl-3 text-2xl font-semibold tracking-tight">
          {copy.experience.heading}
        </h2>
      </div>

      <div className="border-y">
        {positions.map((position, index) => (
          <article
            key={`${position.company}-${position.duration}`}
            className={`grid gap-3 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <p className="text-sm text-muted-foreground">{position.duration}</p>
            <div>
              <h3 className="font-semibold">{position.company}</h3>
              <p className="mt-1 text-sm">{position.role}</p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground lg:grid-cols-3">
                {(index === 0
                  ? copy.experience.highlights
                  : (position.descriptionSegments
                      ?.slice(0, 2)
                      .map((segment) =>
                        typeof segment === "string" ? segment : segment.content,
                      ) ?? [])
                ).map((highlight) => (
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
        ))}
      </div>
    </section>
  );
}

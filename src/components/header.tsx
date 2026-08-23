"use client";

import { Icons } from "@/components/icons";
import { useLanguage, useSiteConfig } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { MapPin } from "lucide-react";

const Header = () => {
  const config = useSiteConfig();
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <header
      id="profile"
      className="scroll-mt-28 animate-slide-from-down-and-fade-1 px-4 pt-6 md:pt-10"
    >
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.hero.name}
        </h1>
        <p className="mt-1.5 text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl">
          {copy.hero.title}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {copy.hero.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden="true" />
            {copy.hero.location}
          </span>
          {config.contactMethods
            ?.filter((method) => method.href)
            .map((method) => {
              const Icon = Icons[method.icon];
              return (
                <a
                  key={method.value}
                  href={method.href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <Icon className="size-4" data-icon="true" aria-hidden="true" />
                  {method.value}
                </a>
              );
            })}
          {config.socials?.map((social) => {
            const Icon = Icons[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Icon className="size-4" data-icon="true" aria-hidden="true" />
                {social.url.replace(/^https?:\/\//, "")}
              </a>
            );
          })}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 border-y md:grid-cols-4">
        {copy.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`py-4 md:px-6 ${
              index % 2 === 1 ? "border-l" : ""
            } ${index > 1 ? "border-t md:border-t-0" : ""} ${
              index > 0 ? "md:border-l" : ""
            }`}
          >
            <dd className="text-xl font-semibold tracking-tight sm:text-2xl">
              {metric.value}
            </dd>
            <dt className="mt-0.5 text-xs leading-5 text-muted-foreground">
              {metric.label}
            </dt>
          </div>
        ))}
      </dl>
    </header>
  );
};

export default Header;

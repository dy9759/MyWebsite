"use client";

import { useLanguage, useSiteConfig } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const config = useSiteConfig();
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];
  const primaryEmail = config.contactMethods?.find((method) =>
    method.href?.startsWith("mailto:"),
  );

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
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {copy.hero.location}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects/">{copy.hero.primaryCta}</Link>
          </Button>
          {primaryEmail?.href ? (
            <Button asChild variant="outline">
              <Link href={primaryEmail.href}>{copy.hero.secondaryCta}</Link>
            </Button>
          ) : null}
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

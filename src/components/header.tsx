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
      className="scroll-mt-28 animate-slide-from-down-and-fade-1 px-4 pt-8 md:pt-14"
    >
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {copy.hero.name}
        </h1>
        <p className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          {copy.hero.title}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {copy.hero.summary}
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {copy.hero.location}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/projects/">{copy.hero.primaryCta}</Link>
          </Button>
          {primaryEmail?.href ? (
            <Button asChild size="lg" variant="outline">
              <Link href={primaryEmail.href}>{copy.hero.secondaryCta}</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-2 border-y md:grid-cols-4">
        {copy.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`py-6 md:px-6 ${
              index % 2 === 1 ? "border-l" : ""
            } ${index > 1 ? "border-t md:border-t-0" : ""} ${
              index > 0 ? "md:border-l" : ""
            }`}
          >
            <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {metric.value}
            </dd>
            <dt className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              {metric.label}
            </dt>
          </div>
        ))}
      </dl>
    </header>
  );
};

export default Header;

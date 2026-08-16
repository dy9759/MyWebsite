"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY, getCaseStudy } from "@/content/portfolio";
import { ArrowLeft, ArrowUpRight, CircleDashed } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function CaseSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="grid gap-4 border-t py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className="mt-3 size-1 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];
  const item = getCaseStudy(language, slug);
  if (!item) notFound();

  const sections = [
    [copy.casePage.challenge, item.sections.challenge],
    [copy.casePage.ownership, item.sections.ownership],
    [copy.casePage.decisions, item.sections.decisions],
    [copy.casePage.system, item.sections.system],
    [copy.casePage.results, item.sections.results],
    [copy.casePage.reflection, item.sections.reflection],
    [copy.casePage.next, item.sections.next],
  ] as const;

  return (
    <article className="px-4 pb-8 pt-4">
      <Button
        asChild
        variant="link"
        className="h-auto px-0 text-muted-foreground"
      >
        <Link href="/projects/">
          <ArrowLeft className="mr-1 size-4" />
          {copy.casePage.back}
        </Link>
      </Button>

      <header className="grid gap-8 pb-12 pt-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-accent">
              {item.number}
            </span>
            <span className="rounded-full border border-accent/60 px-3 py-1 text-xs text-accent">
              {item.status}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            {item.summary}
          </p>
        </div>
        <dl className="border-l-2 border-accent pl-6">
          <div>
            <dt className="text-xs text-muted-foreground">
              {copy.cases.labels.role}
            </dt>
            <dd className="mt-2 text-sm leading-6">{item.role}</dd>
          </div>
          <div className="mt-5">
            <dt className="text-xs text-muted-foreground">Period</dt>
            <dd className="mt-2 text-sm">{item.period}</dd>
          </div>
        </dl>
      </header>

      <section className="border-y py-8">
        <h2 className="text-lg font-semibold">{copy.casePage.evidence}</h2>
        <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {item.evidence.map((evidence) => (
            <div key={evidence.label}>
              <dd
                className={
                  evidence.placeholder
                    ? "text-lg font-semibold text-muted-foreground"
                    : "text-2xl font-semibold text-accent"
                }
              >
                {evidence.value}
              </dd>
              <dt className="mt-2 text-xs leading-5 text-muted-foreground">
                {evidence.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <div>
        {sections.map(([title, items]) => (
          <CaseSection key={title} title={title} items={[...items]} />
        ))}
      </div>

      {item.links.length > 0 ? (
        <section className="grid gap-4 border-t py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
          <h2 className="text-lg font-semibold">{copy.casePage.links}</h2>
          <div className="flex flex-wrap gap-3">
            {item.links.map((link) => (
              <Button key={link.url} asChild variant="outline">
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="flex gap-3 border border-dashed p-5 text-sm text-muted-foreground">
        <CircleDashed className="mt-0.5 size-4 shrink-0" />
        <div>
          <h2 className="font-medium text-foreground">
            {copy.casePage.needed}
          </h2>
          <p className="mt-1 leading-6">{item.needed.join(" · ")}</p>
        </div>
      </section>
    </article>
  );
}

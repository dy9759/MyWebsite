"use client";

import FeaturedCaseStudies from "@/components/featured-case-studies";
import { useLanguage, useSiteCopy } from "@/components/language-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import Link from "next/link";

export default function ProjectsPageContent() {
  const { language } = useLanguage();
  const siteCopy = useSiteCopy();
  const copy = PORTFOLIO_COPY[language];
  const note =
    language === "zh"
      ? "旧版项目档案中的历史条目正在逐项核验，未经确认的经历不在此展示。"
      : "Legacy project entries are being verified individually. Unconfirmed experience is not published here.";

  return (
    <div className="px-4 pb-8 pt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{siteCopy.nav.home}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{copy.cases.heading}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-3xl pb-10 pt-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.cases.heading}
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground">
          {copy.cases.intro}
        </p>
      </header>

      <FeaturedCaseStudies showHeading={false} />

      <p className="mt-10 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">
        {note}
      </p>
    </div>
  );
}

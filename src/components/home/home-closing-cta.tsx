"use client";

import { useLanguage, useSiteConfig } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";

export default function HomeClosingCta() {
  const { language } = useLanguage();
  const config = useSiteConfig();
  const copy = PORTFOLIO_COPY[language];
  const primaryEmail = config.contactMethods?.find((method) =>
    method.href?.startsWith("mailto:"),
  );

  return (
    <section className="px-4">
      <div className="flex flex-col justify-between gap-6 border border-accent px-6 py-7 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold leading-8">
            {copy.closing.text}
          </h2>
          <p className="mt-2 text-xs text-muted-foreground">
            {copy.closing.resumeNote}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" disabled title={copy.closing.resumeNote}>
            <FileText className="mr-2 size-4" />
            {copy.closing.resume}
          </Button>
          {primaryEmail?.href ? (
            <Button asChild>
              <Link href={primaryEmail.href}>
                <Mail className="mr-2 size-4" />
                {copy.closing.email}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

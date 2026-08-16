"use client";

import { useLanguage } from "@/components/language-provider";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { BarChart3, Box, TrendingUp } from "lucide-react";

const CAPABILITY_ICONS = {
  product: Box,
  evaluation: BarChart3,
  growth: TrendingUp,
} as const;

export default function Capabilities() {
  const { language } = useLanguage();
  const copy = PORTFOLIO_COPY[language];

  return (
    <section id="capabilities" className="scroll-mt-28 px-4">
      <h2 className="text-2xl font-semibold tracking-tight">
        {language === "zh" ? "我能解决什么" : "What I bring"}
      </h2>
      <div className="mt-6 grid border sm:grid-cols-3">
        {copy.capabilities.map((item, index) => {
          const Icon =
            CAPABILITY_ICONS[item.id as keyof typeof CAPABILITY_ICONS];
          return (
            <article
              key={item.id}
              className={`p-6 ${
                index > 0 ? "border-t sm:border-l sm:border-t-0" : ""
              }`}
            >
              <Icon
                className="size-7 text-accent"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <h3 className="mt-5 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import CaseStudyPage from "@/components/case-study-page";
import { CASE_SLUGS, getCaseStudy } from "@/content/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const caseStudy = getCaseStudy("zh", params.slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
  };
}

export default function ProjectCasePage({
  params,
}: {
  params: { slug: string };
}) {
  if (!CASE_SLUGS.includes(params.slug)) notFound();
  return <CaseStudyPage slug={params.slug} />;
}

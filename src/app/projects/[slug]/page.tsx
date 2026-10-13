import CaseStudyPage from "@/components/case-study-page";
import { CASE_SLUGS, getCaseStudy } from "@/content/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy("zh", slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!CASE_SLUGS.includes(slug)) notFound();
  return <CaseStudyPage slug={slug} />;
}

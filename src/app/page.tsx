import FeaturedCaseStudies from "@/components/featured-case-studies";
import Header from "@/components/header";
import BuilderLabPreview from "@/components/home/builder-lab-preview";
import Capabilities from "@/components/home/capabilities";
import HomeClosingCta from "@/components/home/home-closing-cta";
import HomeExperience from "@/components/home/home-experience";
import ResearchEducationSummary from "@/components/home/research-education-summary";

export default function Home() {
  return (
    <div className="flex min-w-0 flex-col gap-20 pb-8 md:gap-24">
      <Header />
      <Capabilities />
      <FeaturedCaseStudies />
      <HomeExperience />
      <BuilderLabPreview />
      <ResearchEducationSummary />
      <HomeClosingCta />
    </div>
  );
}

import FeaturedCaseStudies from "@/components/featured-case-studies";
import Header from "@/components/header";
import HomeExperience from "@/components/home/home-experience";
import ResearchEducationSummary from "@/components/home/research-education-summary";
import Skills from "@/components/home/skills";

export default function Home() {
  return (
    <div className="flex min-w-0 flex-col gap-8 pb-10 md:gap-10">
      <Header />
      <HomeExperience />
      <FeaturedCaseStudies />
      <Skills />
      <ResearchEducationSummary />
    </div>
  );
}

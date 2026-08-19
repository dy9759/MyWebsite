import { describe, expect, it } from "vitest";
import { CASE_SLUGS, PORTFOLIO_COPY } from "@/content/portfolio";

describe("portfolio content", () => {
  it("keeps the verified Wuhan University field of study", () => {
    expect(PORTFOLIO_COPY.zh.research.summary).toContain("武汉大学");
    expect(PORTFOLIO_COPY.zh.research.summary).toContain("建筑学（建筑技术科学）");
    expect(PORTFOLIO_COPY.en.research.summary).toContain(
      "Architecture (Architectural Technology Science)",
    );

    const educationCopy = `${PORTFOLIO_COPY.zh.research.summary} ${PORTFOLIO_COPY.en.research.summary}`;
    expect(educationCopy).not.toMatch(/计算机学院|Computer Science/i);
  });

  it("does not present legacy 2021–2025 work as featured case studies", () => {
    const featuredPeriods = PORTFOLIO_COPY.zh.cases.items.map(
      (item) => item.period,
    );

    expect(featuredPeriods).not.toContain("2021—2025");
    expect(featuredPeriods).not.toContain("2022.9—2025.6");
    expect(PORTFOLIO_COPY.zh.experience.heading).toBe("工作经验");
  });

  it("does not include the fictional timeline from the discarded visual concept", () => {
    const workCopy = JSON.stringify({ portfolio: PORTFOLIO_COPY });

    expect(workCopy).not.toMatch(/2021\.7\s*[-—–]\s*2023\.2/);
    expect(workCopy).not.toMatch(/2023\.3\s*[-—–]\s*2025\.6/);
    expect(workCopy).not.toMatch(/某\s*AI\s*创业公司|某\s*互联网公司/);
  });

  it("uses unique case slugs", () => {
    expect(new Set(CASE_SLUGS).size).toBe(CASE_SLUGS.length);
  });

  it("keeps case ids and slugs aligned across languages", () => {
    const zh = PORTFOLIO_COPY.zh.cases.items.map(({ id, slug }) => ({
      id,
      slug,
    }));
    const en = PORTFOLIO_COPY.en.cases.items.map(({ id, slug }) => ({
      id,
      slug,
    }));

    expect(en).toEqual(zh);
  });

  it("marks unknown evidence as placeholders instead of numbers", () => {
    for (const item of PORTFOLIO_COPY.zh.cases.items.slice(1)) {
      const unknownEvidence = item.evidence.filter(
        (evidence) => evidence.value === "待补充",
      );
      expect(unknownEvidence.length).toBeGreaterThan(0);
      expect(unknownEvidence.every((evidence) => evidence.placeholder)).toBe(
        true,
      );
    }
  });

  it("provides a visible asset checklist for every case and lab project", () => {
    for (const language of ["zh", "en"] as const) {
      expect(
        PORTFOLIO_COPY[language].cases.items.every(
          (item) => item.needed.length > 0,
        ),
      ).toBe(true);
      expect(
        PORTFOLIO_COPY[language].lab.items.every(
          (item) => item.needed.length > 0,
        ),
      ).toBe(true);
    }
  });
});

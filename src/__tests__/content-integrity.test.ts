import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AI_CONFIG } from "@/ai-config";
import { AI_CONFIG_EN } from "@/ai-config-en";
import { CONFIG, CONFIG_EN } from "@/config";
import { PORTFOLIO_COPY } from "@/content/portfolio";
import { hasUsableUrl } from "@/lib/content";

const requiredUrlCollections = (config: typeof AI_CONFIG) => [
  config.videos,
  config.podcasts,
  config.people,
  config.newsletters,
  config.products,
];

describe("public content integrity", () => {
  it("keeps the verified current role period aligned with the flagship case", () => {
    expect(CONFIG.workExperience?.positions).toHaveLength(1);
    expect(CONFIG_EN.workExperience?.positions).toHaveLength(1);
    expect(CONFIG.workExperience?.positions?.[0].duration).toContain("2025.7");
    expect(PORTFOLIO_COPY.zh.cases.items[0].period).toBe("2025.7—至今");
    expect(PORTFOLIO_COPY.en.cases.items[0].period).toBe("Jul 2025—Present");
  });

  it("does not publish the legacy lab timeline as employment experience", () => {
    expect(CONFIG.research?.grants).toEqual([]);
    expect(CONFIG_EN.research?.grants).toEqual([]);

    const publicExperience = JSON.stringify({
      zh: CONFIG.workExperience,
      en: CONFIG_EN.workExperience,
      grantsZh: CONFIG.research?.grants,
      grantsEn: CONFIG_EN.research?.grants,
    });
    expect(publicExperience).not.toMatch(/2023\.1\s*[-—–]\s*2025\.6/);
    expect(publicExperience).not.toMatch(/Jan 2023\s*[-—–]\s*Jun 2025/i);
  });

  it("keeps all primary AI resource links usable", () => {
    for (const config of [AI_CONFIG, AI_CONFIG_EN]) {
      for (const collection of requiredUrlCollections(config)) {
        expect(collection.every(hasUsableUrl)).toBe(true);
      }
    }
  });

  it("documents the roadmap and evidence gaps in git", () => {
    const roadmap = readFileSync(
      resolve(process.cwd(), "docs/portfolio-roadmap.md"),
      "utf8",
    );
    const gaps = readFileSync(
      resolve(process.cwd(), "docs/content-gap-checklist.md"),
      "utf8",
    );

    expect(roadmap).toContain("2026-08-31");
    expect(roadmap).toContain("AI Product Lead / AI Systems Architect");
    expect(gaps).toContain("P50 / P95 首字延迟");
    expect(gaps).toContain("中文简历 PDF");
  });
});

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  EXAM_CONFIG,
  FDE_DOMAINS,
  FDE_QUESTIONS,
  buildExam,
  calculateResult,
  domainMastery,
  examReady,
  scoreQuestion,
  shuffleOptions,
  type FdeQuestion,
} from "@/lib/fde-exam";

// Deterministic rng (mulberry32) so shuffles are reproducible.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Synthetic bank: exactly quota concepts per domain, 3 variants each.
function syntheticBank(): FdeQuestion[] {
  const out: FdeQuestion[] = [];
  for (const domain of FDE_DOMAINS) {
    for (let c = 0; c < EXAM_CONFIG.domainQuota[domain]; c++) {
      for (let v = 1; v <= 3; v++) {
        const concept = `${domain}-${c}`;
        out.push({
          id: `${concept}-v${v}`,
          concept,
          variant: v,
          domain,
          lesson: "1.1",
          type: c % 3 === 0 ? "multiple" : "single",
          stem: `stem ${concept} ${v}`,
          options: ["A", "B", "C", "D"],
          answer: c % 3 === 0 ? [0, 2] : [1],
          explanation: "",
          trap: "",
        });
      }
    }
  }
  return out;
}

describe("fde exam", () => {
  it("bank entries are well-formed", () => {
    for (const q of FDE_QUESTIONS) {
      expect(FDE_DOMAINS).toContain(q.domain);
      expect(q.answer.length).toBeGreaterThan(0);
      expect(q.answer.every((a) => a >= 0 && a < q.options.length)).toBe(true);
      if (q.type === "single") expect(q.answer).toHaveLength(1);
    }
    expect(new Set(FDE_QUESTIONS.map((q) => q.id)).size).toBe(FDE_QUESTIONS.length);
  });

  // Only meaningful once the full bank is imported; placeholders can't fill quotas.
  it.skipIf(!examReady(FDE_QUESTIONS))("real bank yields the official 40 single + 20 multiple / 100-point paper", () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const exam = buildExam(FDE_QUESTIONS, seeded(seed));
      expect(exam.filter((q) => q.type === "single")).toHaveLength(40);
      expect(exam.filter((q) => q.type === "multiple")).toHaveLength(20);
      expect(calculateResult(exam, {}).max).toBe(100);
    }
  });

  it("search index carries exactly the bank's questions (run scripts/build-fde-index.mjs)", () => {
    const idx = JSON.parse(readFileSync(join(process.cwd(), "public/wiki/search-index.json"), "utf8")) as { k: string; id: string }[];
    const fde = idx.filter((e) => e.k === "fde").map((e) => e.id).sort();
    expect(fde).toEqual(FDE_QUESTIONS.map((q) => q.id).sort());
  });

  it("builds one variant per concept and fills every domain quota", () => {
    const exam = buildExam(syntheticBank(), seeded(1));
    const total = Object.values(EXAM_CONFIG.domainQuota).reduce((a, b) => a + b, 0);
    expect(exam).toHaveLength(total);
    expect(new Set(exam.map((q) => q.concept)).size).toBe(total);
    for (const d of FDE_DOMAINS) {
      expect(exam.filter((q) => q.domain === d)).toHaveLength(EXAM_CONFIG.domainQuota[d]);
    }
  });

  it("refuses a full exam when a domain is short of concepts", () => {
    const bank = syntheticBank().filter((q) => q.concept !== "safety-0");
    expect(examReady(bank)).toBe(false);
    expect(() => buildExam(bank)).toThrow(/safety/);
    expect(examReady(syntheticBank())).toBe(true);
  });

  it("keeps answers pointing at the same option text after shuffling", () => {
    const q = syntheticBank()[0];
    const mixed = shuffleOptions(q, seeded(7));
    expect(mixed.answer.map((i) => mixed.options[i]).sort()).toEqual(q.answer.map((i) => q.options[i]).sort());
  });

  it("scores single/multiple with no partial credit", () => {
    const [multi] = syntheticBank();
    expect(scoreQuestion(multi, [2, 0])).toBe(EXAM_CONFIG.multiplePoints);
    expect(scoreQuestion(multi, [0])).toBe(0);
    const single = syntheticBank()[3];
    expect(scoreQuestion(single, [1])).toBe(EXAM_CONFIG.singlePoints);
    expect(scoreQuestion(single, [])).toBe(0);
  });

  it("applies the pass line and collects wrong ids", () => {
    const exam = buildExam(syntheticBank(), seeded(3));
    const all = Object.fromEntries(exam.map((q) => [q.id, q.answer]));
    const perfect = calculateResult(exam, all);
    expect(perfect.score).toBe(perfect.max);
    expect(perfect.passed).toBe(true);
    expect(perfect.wrongIds).toEqual([]);

    const none = calculateResult(exam, {});
    expect(none.score).toBe(0);
    expect(none.passed).toBe(false);
    expect(none.wrongIds).toHaveLength(exam.length);
  });

  it("aggregates domain mastery across attempts, weakest first", () => {
    const m = domainMastery([
      { byDomain: { ai: { correct: 3, total: 4 }, safety: { correct: 1, total: 4 } } },
      { byDomain: { ai: { correct: 1, total: 4 }, core: { correct: 2, total: 2 } } },
    ]);
    expect(m.map((x) => x.domain)).toEqual(["safety", "ai", "core"]);
    expect(m[1]).toMatchObject({ correct: 4, total: 8, rate: 0.5 });
    expect(domainMastery([])).toEqual([]);
  });
});

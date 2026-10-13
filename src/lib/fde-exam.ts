// FDE 能力测试 — pure exam logic (组卷 / 计分), kept framework-free so it is
// unit-testable. Every function takes an optional rng so tests can pin a seed.
// The question bank itself lives in fde-bank.ts (imported only where needed).
import DOMAIN_LABELS from "@/content/fde-domains.json";

export type FdeDomain = "ai" | "positioning" | "core" | "solution" | "industry" | "delivery" | "safety";

export type FdeQuestion = {
  id: string;
  concept: string;
  variant: number;
  domain: FdeDomain;
  lesson: string;
  type: "single" | "multiple";
  stem: string;
  options: string[];
  answer: number[];
  explanation: string;
  trap: string;
  order?: number[]; // after shuffleOptions: order[i] = original index of option i
};

export type FdeAttribution = { title: string; url: string; importedAt: string } | null;


export const FDE_DOMAINS: FdeDomain[] = ["ai", "positioning", "core", "solution", "industry", "delivery", "safety"];

// Single source for domain labels, shared with scripts/build-fde-index.mjs.
export const FDE_DOMAIN_LABELS: Record<"zh" | "en", Record<FdeDomain, string>> = {
  zh: Object.fromEntries(FDE_DOMAINS.map((d) => [d, DOMAIN_LABELS[d].zh])) as Record<FdeDomain, string>,
  en: Object.fromEntries(FDE_DOMAINS.map((d) => [d, DOMAIN_LABELS[d].en])) as Record<FdeDomain, string>,
};

// Official format: 60 questions (40 single + 20 multiple), 90 min, 70 to pass.
export const EXAM_CONFIG = {
  durationSeconds: 90 * 60,
  passScore: 70,
  singlePoints: 1.5,
  multiplePoints: 2,
  domainQuota: { ai: 6, positioning: 4, core: 13, solution: 15, industry: 9, delivery: 7, safety: 6 } as Record<FdeDomain, number>,
};

export type Rng = () => number;

export function shuffle<T>(items: T[], rng: Rng = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Shuffle options and remap the answer indexes to the new order.
export function shuffleOptions(q: FdeQuestion, rng: Rng = Math.random): FdeQuestion {
  return applyOrder(q, shuffle(q.options.map((_, i) => i), rng));
}

// Re-present a bank question with its options in `order` (indexes into the
// original options), remapping the answer. Returns null if `order` is not a
// permutation of the question's options.
export function applyOrder(q: FdeQuestion, order: number[]): FdeQuestion;
export function applyOrder(q: FdeQuestion, order: unknown): FdeQuestion | null;
export function applyOrder(q: FdeQuestion, order: unknown): FdeQuestion | null {
  const n = q.options.length;
  if (!Array.isArray(order) || order.length !== n || new Set(order).size !== n || !order.every((i) => Number.isInteger(i) && i >= 0 && i < n))
    return null;
  const ord = order as number[];
  return {
    ...q,
    options: ord.map((i) => q.options[i]),
    answer: q.answer.map((old) => ord.indexOf(old)).sort((a, b) => a - b),
    order: ord,
  };
}

function conceptsByDomain(questions: FdeQuestion[]): Record<string, FdeQuestion[][]> {
  const byConcept = new Map<string, FdeQuestion[]>();
  for (const q of questions) byConcept.set(q.concept, [...(byConcept.get(q.concept) ?? []), q]);
  const out: Record<string, FdeQuestion[][]> = {};
  for (const variants of Array.from(byConcept.values())) (out[variants[0].domain] ??= []).push(variants);
  return out;
}

// A full mock exam needs enough distinct concepts in every domain.
export function examReady(questions: FdeQuestion[]): boolean {
  const byDomain = conceptsByDomain(questions);
  return FDE_DOMAINS.every((d) => (byDomain[d]?.length ?? 0) >= EXAM_CONFIG.domainQuota[d]);
}

// One random variant per concept, `quota` concepts per domain, shuffled.
export function buildExam(questions: FdeQuestion[], rng: Rng = Math.random): FdeQuestion[] {
  const byDomain = conceptsByDomain(questions);
  const picked: FdeQuestion[] = [];
  for (const d of FDE_DOMAINS) {
    const concepts = byDomain[d] ?? [];
    const quota = EXAM_CONFIG.domainQuota[d];
    if (concepts.length < quota) throw new Error(`域 ${d} 需要 ${quota} 个考点，题库只有 ${concepts.length}`);
    for (const variants of shuffle(concepts, rng).slice(0, quota)) {
      picked.push(variants[Math.floor(rng() * variants.length)]);
    }
  }
  return shuffle(picked.map((q) => shuffleOptions(q, rng)), rng);
}

export function isCorrect(q: FdeQuestion, selected: number[] = []): boolean {
  const a = [...selected].sort((x, y) => x - y);
  const e = [...q.answer].sort((x, y) => x - y);
  return a.length === e.length && a.every((v, i) => v === e[i]);
}

export function scoreQuestion(q: FdeQuestion, selected: number[] = []): number {
  if (!isCorrect(q, selected)) return 0;
  return q.type === "single" ? EXAM_CONFIG.singlePoints : EXAM_CONFIG.multiplePoints;
}

export type FdeResult = {
  score: number;
  max: number;
  passed: boolean;
  wrongIds: string[];
  byDomain: Partial<Record<FdeDomain, { correct: number; total: number }>>;
};

export function calculateResult(questions: FdeQuestion[], answers: Record<string, number[]>): FdeResult {
  let score = 0;
  let max = 0;
  const wrongIds: string[] = [];
  const byDomain: FdeResult["byDomain"] = {};
  for (const q of questions) {
    const pts = scoreQuestion(q, answers[q.id]);
    score += pts;
    max += q.type === "single" ? EXAM_CONFIG.singlePoints : EXAM_CONFIG.multiplePoints;
    const row = (byDomain[q.domain] ??= { correct: 0, total: 0 });
    row.total += 1;
    if (pts > 0) row.correct += 1;
    else wrongIds.push(q.id);
  }
  score = Number(score.toFixed(1));
  return { score, max, passed: score >= EXAM_CONFIG.passScore, wrongIds, byDomain };
}

export type DomainMastery = { domain: FdeDomain; correct: number; total: number; rate: number };

// Aggregate per-domain accuracy across attempts, weakest first; untouched
// domains are omitted.
export function domainMastery(attempts: { byDomain: FdeResult["byDomain"] }[]): DomainMastery[] {
  const out: DomainMastery[] = [];
  for (const domain of FDE_DOMAINS) {
    let correct = 0;
    let total = 0;
    for (const a of attempts) {
      correct += a.byDomain[domain]?.correct ?? 0;
      total += a.byDomain[domain]?.total ?? 0;
    }
    if (total) out.push({ domain, correct, total, rate: correct / total });
  }
  return out.sort((a, b) => a.rate - b.rate || b.total - a.total);
}

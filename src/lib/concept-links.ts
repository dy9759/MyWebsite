// Single home for the concept-map link graph (term ↔ loop), so the JSON
// shape and the strength ranking are asserted in exactly one place.
import conceptMap from "@/content/concept-map.json";

export type ConceptLink = { termId: string; loopId: string; strength: string; via?: string };

const LINKS = conceptMap.links as ConceptLink[];

const STRENGTH_RANK: Record<string, number> = { identity: 0, glossary: 1, mention: 2 };

// Curated P3 mentions rank just above auto mentions — in both directions.
export const linkRank = (l: { strength: string; via?: string }) =>
  (STRENGTH_RANK[l.strength] ?? 9) - (l.strength === "mention" && l.via === "p3-extension" ? 0.5 : 0);

// termId → loops that teach/mention it.
export const TERM_LOOPS = new Map<string, ConceptLink[]>();
// loopId → mapped terms.
export const LOOP_TERMS = new Map<string, ConceptLink[]>();
for (const l of LINKS) {
  if (!TERM_LOOPS.has(l.termId)) TERM_LOOPS.set(l.termId, []);
  TERM_LOOPS.get(l.termId)!.push(l);
  if (!LOOP_TERMS.has(l.loopId)) LOOP_TERMS.set(l.loopId, []);
  LOOP_TERMS.get(l.loopId)!.push(l);
}

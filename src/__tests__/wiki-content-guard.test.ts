// Guards for hand-synced wiki content counts and cross-file data contracts
// (issues #60/#61: hardcoded counts, lesson-kind/engine contract, decision
// meter convention). Fails loudly when data and UI constants drift.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { VIBE_TOPICS, VIBE_TOTAL } from "@/components/wiki/wiki-vibe";
import { COURSE_CHAPTERS, COURSE_TOTAL_LOOPS } from "@/content/wiki-course";
import conceptMap from "@/content/concept-map.json";
import practiceChapters from "@/content/practice-chapters.json";

const PUB = join(process.cwd(), "public", "wiki");
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

describe("vibe topic counts", () => {
  it("VIBE_TOPICS counts match the JSON files and VIBE_TOTAL is their sum", () => {
    let sum = 0;
    for (const t of VIBE_TOPICS) {
      const arr = readJson(join(PUB, "vibe", `${t.id}.json`)) as unknown[];
      expect(arr.length, `count for ${t.id}`).toBe(t.count);
      sum += arr.length;
    }
    expect(VIBE_TOTAL).toBe(sum);
  });
});

describe("practice deck", () => {
  const practice = readJson(join(PUB, "vibe", "practice.json")) as { id: string }[];

  it("the 254-question literal in the course UI matches practice.json", () => {
    // wiki-browse.tsx renders the deck size as a literal — keep them in sync.
    const browse = readFileSync(join(process.cwd(), "src", "components", "wiki", "wiki-browse.tsx"), "utf8");
    expect(browse).toContain(`${practice.length} 题`);
  });

  it("practice-chapters.json counts are derivable from concept-map + practice", () => {
    const loopTerms = new Map<string, Set<string>>();
    for (const l of conceptMap.links as { termId: string; loopId: string }[]) {
      if (!loopTerms.has(l.loopId)) loopTerms.set(l.loopId, new Set());
      loopTerms.get(l.loopId)!.add(l.termId);
    }
    for (const ch of COURSE_CHAPTERS) {
      const terms = new Set<string>();
      for (const n of ch.nodes) for (const t of Array.from(loopTerms.get(n.lessonId) ?? [])) terms.add(t);
      const expected = practice.filter((q) => terms.has(q.id)).length;
      const stored = (practiceChapters as Record<string, { count: number }>)[String(ch.index)];
      expect(stored?.count, `chapter ${ch.index}`).toBe(expected);
    }
  });
});

describe("lesson data contract", () => {
  const lessonsDir = join(PUB, "lessons");
  const files = readdirSync(lessonsDir).filter((f) => f.endsWith(".json"));

  it("every course loop has a lesson file and vice versa", () => {
    const loopIds = new Set(COURSE_CHAPTERS.flatMap((c) => c.nodes.map((n) => n.lessonId)));
    expect(loopIds.size).toBe(COURSE_TOTAL_LOOPS);
    for (const id of Array.from(loopIds)) expect(files, `lesson file for ${id}`).toContain(`${id}.json`);
    for (const f of files) expect(loopIds.has(f.replace(".json", "")), `loop for ${f}`).toBe(true);
  });

  it("every step kind has a renderer and every sim id has an engine", () => {
    // Mirror of the renderer contract in wiki-lesson.tsx / wiki-lesson-page.tsx:
    // an unknown kind falls back to paragraphs but must never GATE the step.
    const KNOWN_KINDS = new Set([
      "intro", "glossary", "whynow", "explain", "quiz", "judgment", "codereview",
      "theater", "curation", "outro", "decision", "estimate", "sim", "diagram", "timeline",
    ]);
    const KNOWN_SIMS = new Set(["peoplenet", "race", "commander", "gittimeline"]);
    for (const f of files) {
      const lesson = readJson(join(lessonsDir, f)) as { steps: { kind: string; sim?: string }[] };
      for (const s of lesson.steps) {
        expect(KNOWN_KINDS.has(s.kind), `${f}: unknown kind ${s.kind}`).toBe(true);
        if (s.kind === "sim" && s.sim) expect(KNOWN_SIMS.has(s.sim), `${f}: unknown sim ${s.sim}`).toBe(true);
      }
    }
  });

  it("every decision game's deciding meter exists in its meters", () => {
    for (const f of files) {
      const lesson = readJson(join(lessonsDir, f)) as {
        steps: { kind: string; meters?: Record<string, number>; finale?: { meterKey?: string } }[];
      };
      for (const s of lesson.steps) {
        if (s.kind !== "decision" || !s.meters) continue;
        const key = s.finale?.meterKey ?? "health";
        expect(Object.keys(s.meters), `${f}: decision meter ${key}`).toContain(key);
      }
    }
  });
});

describe("search index", () => {
  it("has one term entry per vibe entry", () => {
    const idx = readJson(join(PUB, "search-index.json")) as { k: string; id: string }[];
    const terms = idx.filter((e) => e.k === "term");
    expect(terms.length).toBe(VIBE_TOTAL);
  });
});

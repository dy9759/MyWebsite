import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { AI_CONFIG } from "@/ai-config";
import { AI_CONFIG_EN } from "@/ai-config-en";
import { stablePinSlug } from "@/lib/use-pinned-items";
import { deepPersonalize } from "@/lib/wiki-profile";

type Item = { url?: string; title?: string; name?: string };
const COLLECTIONS = ["podcasts", "newsletters", "people", "products", "videos", "skills", "prompts"] as const;
const list = (cfg: unknown, k: string) => ((cfg as Record<string, Item[] | undefined>)[k] ?? []) as Item[];
const keys = (cfg: unknown, k: string) => list(cfg, k).map((x) => stablePinSlug(x.url, x.title ?? x.name ?? ""));

describe("AI page pin keys (#90, #91)", () => {
  for (const k of COLLECTIONS) {
    it(`${k}: urls and pin keys are unique`, () => {
      const urls = list(AI_CONFIG, k).map((x) => x.url).filter(Boolean);
      expect(new Set(urls).size).toBe(urls.length);
      const ks = keys(AI_CONFIG, k);
      expect(new Set(ks).size).toBe(ks.length);
    });
    it(`${k}: pin keys are identical in zh and en`, () => {
      expect(keys(AI_CONFIG_EN, k)).toEqual(keys(AI_CONFIG, k));
    });
  }
});

describe("lesson personalization escaping (#98)", () => {
  const evil = `<img src=x onerror="alert(1)">'&`;

  it("escapes the project string inside html fields", () => {
    const out = deepPersonalize({ kind: "html", html: "<b>{{project}}</b>" }, evil);
    expect(out.html).toBe("<b>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&#39;&amp;</b>");
    expect(out.html).not.toContain("<img");
  });

  it("escapes nested html fields, leaves text fields raw (React escapes them)", () => {
    const out = deepPersonalize({ blocks: [{ html: "{{project}}" }, { text: "{{project}}" }] }, evil);
    expect(out.blocks[0].html).not.toContain("<");
    expect(out.blocks[1].text).toBe(evil);
  });

  it("every html-kind block in the lessons carries an html field", () => {
    const dir = join(process.cwd(), "public/wiki/lessons");
    const bad: string[] = [];
    const walk = (v: unknown, file: string) => {
      if (Array.isArray(v)) v.forEach((x) => walk(x, file));
      else if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;
        if (o.kind === "html" && typeof o.html !== "string") bad.push(file);
        Object.values(o).forEach((x) => walk(x, file));
      }
    };
    for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) walk(JSON.parse(readFileSync(join(dir, f), "utf8")), f);
    expect(bad).toEqual([]);
  });
});

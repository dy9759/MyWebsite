#!/usr/bin/env node
// Sync FDE questions into public/wiki/search-index.json as k:"fde" entries so
// the site search box and the MCP search_wiki tool can find them. Idempotent:
// drops existing fde entries, re-appends from src/content/fde-questions.json,
// then bumps WIKI_DATA_VERSION so browsers refetch the index. Paths resolve
// from this file, so it runs from any directory.
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const at = (p) => new URL(p, root);
const INDEX = at("public/wiki/search-index.json");
const DATA = at("src/lib/wiki-data.ts");

const labels = JSON.parse(fs.readFileSync(at("src/content/fde-domains.json"), "utf8"));
const { questions } = JSON.parse(fs.readFileSync(at("src/content/fde-questions.json"), "utf8"));

const unknown = [...new Set(questions.map((q) => q.domain).filter((d) => !labels[d]))];
if (unknown.length) {
  console.error(`Unknown FDE domain(s): ${unknown.join(", ")} — add them to src/content/fde-domains.json first.`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX, "utf8")).filter((e) => e.k !== "fde");
const entries = questions.map((q) => ({ k: "fde", id: q.id, title: q.stem, tag: q.explanation, cat: labels[q.domain].zh }));
fs.writeFileSync(INDEX, JSON.stringify([...index, ...entries], null, 2) + "\n");

const src = fs.readFileSync(DATA, "utf8");
const m = src.match(/export const WIKI_DATA_VERSION = "(\d+)";/);
if (!m) throw new Error("WIKI_DATA_VERSION not found in src/lib/wiki-data.ts");
const next = String(Number(m[1]) + 1);
fs.writeFileSync(DATA, src.replace(m[0], `export const WIKI_DATA_VERSION = "${next}";`));
console.log(`search index: ${index.length} entries + ${entries.length} fde · WIKI_DATA_VERSION ${m[1]} → ${next}`);

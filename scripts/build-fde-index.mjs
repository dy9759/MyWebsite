#!/usr/bin/env node
// Sync FDE questions into public/wiki/search-index.json as k:"fde" entries so
// the site search box and the MCP search_wiki tool can find them. Idempotent:
// drops existing fde entries, re-appends from src/content/fde-questions.json.
// Re-run after scripts/import-fde.mjs, then bump WIKI_DATA_VERSION.
import fs from "node:fs";

const INDEX = "public/wiki/search-index.json";
const LABELS = {
  ai: "AI 基础",
  positioning: "平台定位与边界",
  core: "平台核心功能",
  solution: "场景与方案设计",
  industry: "行业落地",
  delivery: "交付、评测与运维",
  safety: "安全合规",
};

const { questions } = JSON.parse(fs.readFileSync("src/content/fde-questions.json", "utf8"));
const index = JSON.parse(fs.readFileSync(INDEX, "utf8")).filter((e) => e.k !== "fde");
const entries = questions.map((q) => ({ k: "fde", id: q.id, title: q.stem, tag: q.explanation, cat: LABELS[q.domain] }));
fs.writeFileSync(INDEX, JSON.stringify([...index, ...entries], null, 2) + "\n");
console.log(`search index: ${index.length} entries + ${entries.length} fde`);

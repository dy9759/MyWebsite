#!/usr/bin/env node
// Import the FDE question bank from tencent-fde-ability-test.pages.dev into
// src/content/fde-questions.json. The questions are the site author's original
// work — run this ONLY after the author has granted permission. The --authorized
// flag is the explicit acknowledgement; the UI credits the source from the
// `attribution` field this script writes.
//
//   node scripts/import-fde.mjs --authorized [--out path] [--from file.html]
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const SOURCE_URL = "https://tencent-fde-ability-test.pages.dev/";
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!args.includes("--authorized")) {
  console.error("Refusing to import: pass --authorized once the question author has granted permission.");
  process.exit(1);
}

const out = flag("--out") ?? path.resolve("src/content/fde-questions.json");
const from = flag("--from");
const html = from ? fs.readFileSync(from, "utf8") : await (await fetch(SOURCE_URL)).text();

const bank = html.match(/<script id="question-bank">([\s\S]*?)<\/script>/);
if (!bank) throw new Error("question-bank <script> not found — page structure changed?");

// The bank is plain declarations (QUESTIONS + OPTION_REVISIONS applied in place);
// top-level const is not exposed on the context, so hand it out explicitly.
const ctx = {};
vm.runInNewContext(`${bank[1]}\n;globalThis.__out = QUESTIONS;`, ctx, { timeout: 2000 });
const questions = ctx.__out.map((q) => ({
  id: q.id,
  concept: q.concept,
  variant: q.variant,
  domain: q.domain,
  lesson: q.lesson,
  type: q.type,
  stem: q.stem,
  options: [...q.options],
  answer: [...q.answer],
  explanation: q.explanation,
  trap: q.trap ?? "",
}));

const doc = {
  attribution: { title: "腾讯云 FDE 能力测试", url: SOURCE_URL, importedAt: new Date().toISOString().slice(0, 10) },
  questions,
};
fs.writeFileSync(out, JSON.stringify(doc, null, 1) + "\n");
console.log(`wrote ${questions.length} questions → ${out}`);

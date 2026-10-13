#!/usr/bin/env node
// Import the FDE question bank from tencent-fde-ability-test.pages.dev into
// src/content/fde-questions.json. The questions are the site author's original
// work — run this ONLY with the author's permission. The --authorized flag is
// the explicit acknowledgement; the UI credits the source from `attribution`.
//
//   node scripts/import-fde.mjs --authorized [--out path] [--from file.html]
//
// The bank ships as inline JS, so it has to be evaluated. node:vm is not a
// sandbox, so evaluation happens in a separate Node process with the permission
// model on (no filesystem, no child processes, no workers), an empty
// environment (no secrets to read) and a hard timeout. The permission model
// does not restrict network access, but that process holds nothing worth
// sending. Its output is validated before anything is written.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SOURCE_URL = "https://tencent-fde-ability-test.pages.dev/";
const DOMAINS = new Set(["ai", "positioning", "core", "solution", "industry", "delivery", "safety"]);
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

async function loadHtml() {
  if (from) return fs.readFileSync(from, "utf8");
  const res = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`fetch ${SOURCE_URL} → HTTP ${res.status}`);
  return res.text();
}

// Runs inside the locked-down child: read the bank source on stdin, evaluate
// it in a fresh context, print the QUESTIONS array as JSON on stdout.
const CHILD = `
const vm = require("node:vm");
let src = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (d) => (src += d)).on("end", () => {
  const ctx = {};
  vm.runInNewContext(src + "\\n;globalThis.__out = JSON.stringify(QUESTIONS);", ctx, { timeout: 2000 });
  process.stdout.write(ctx.__out);
});
`;

function evaluateIsolated(code) {
  const r = spawnSync(process.execPath, ["--experimental-permission", "--no-warnings", "-e", CHILD], {
    input: code,
    env: {},
    timeout: 10_000,
    maxBuffer: 16 * 1024 * 1024,
    encoding: "utf8",
  });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`isolated evaluation failed (exit ${r.status}): ${r.stderr.slice(0, 500)}`);
  return JSON.parse(r.stdout);
}

function validate(questions) {
  const errors = [];
  if (!Array.isArray(questions) || questions.length === 0) return ["QUESTIONS is not a non-empty array"];
  const ids = new Set();
  questions.forEach((q, i) => {
    const at = `#${i} (${q?.id ?? "no id"})`;
    const str = (v) => typeof v === "string" && v.trim().length > 0;
    if (!str(q?.id)) errors.push(`${at}: id`);
    else if (ids.has(q.id)) errors.push(`${at}: duplicate id`);
    else ids.add(q.id);
    for (const f of ["concept", "lesson", "stem", "explanation"]) if (!str(q?.[f])) errors.push(`${at}: ${f}`);
    if (!DOMAINS.has(q?.domain)) errors.push(`${at}: domain ${q?.domain}`);
    if (q?.type !== "single" && q?.type !== "multiple") errors.push(`${at}: type ${q?.type}`);
    if (!Array.isArray(q?.options) || q.options.length < 2 || !q.options.every(str)) errors.push(`${at}: options`);
    const n = Array.isArray(q?.options) ? q.options.length : 0;
    if (!Array.isArray(q?.answer) || q.answer.length === 0 || !q.answer.every((a) => Number.isInteger(a) && a >= 0 && a < n))
      errors.push(`${at}: answer`);
    else if (q.type === "single" && q.answer.length !== 1) errors.push(`${at}: single with ${q.answer.length} answers`);
  });
  return errors;
}

const html = await loadHtml();
const bank = html.match(/<script id="question-bank">([\s\S]*?)<\/script>/);
if (!bank) throw new Error("question-bank <script> not found — page structure changed?");

const raw = evaluateIsolated(bank[1]);
const errors = validate(raw);
if (errors.length) {
  console.error(`Validation failed (${errors.length}); ${out} left untouched:\n  ${errors.slice(0, 20).join("\n  ")}`);
  process.exit(1);
}

const questions = raw.map((q) => ({
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
console.log("next: node scripts/build-fde-index.mjs, bump WIKI_DATA_VERSION, update FDE_LESSONS if lessons changed");

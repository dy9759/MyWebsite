import { streamChat, type Lang } from "@/lib/books/companion";
import { getTranslations, putTranslations, translationKey } from "@/lib/books/store";
import {
  buildBatchMessages,
  makeBatches,
  needsTranslation,
  parseBatch,
  resolveTarget,
  type TargetPref,
} from "@/lib/books/translate";
import type { ByokConfig } from "@/lib/wiki-byok";

// Bilingual view: translations are appended *inside* each paragraph as a
// block <span>, never as new siblings, so element indices — and therefore
// saved CFIs and citation jumps — stay valid with the view on or off.

export const TR_CLASS = "sense-tr";
const BLOCKS = "p,li,h1,h2,h3,h4,h5,h6,blockquote,dd,dt,figcaption,td,th";

export const BILINGUAL_CSS = `
  .${TR_CLASS} { display: block; margin-top: .3em; font-size: .92em; font-weight: normal; opacity: .72; text-indent: 0; }
  :is(h1, h2, h3, h4, h5, h6) .${TR_CLASS} { font-size: .6em; }
`;

type Block = { el: Element; text: string };

// Innermost text blocks of a section, skipping ones already translated.
export function collectBlocks(doc: Document): Block[] {
  const out: Block[] = [];
  for (const el of doc.body?.querySelectorAll(BLOCKS) ?? []) {
    if (el.querySelector(BLOCKS) || el.querySelector(`.${TR_CLASS}`)) continue;
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (text) out.push({ el, text });
  }
  return out;
}

export function insertTranslation(el: Element, text: string, lang: string) {
  const span = el.ownerDocument.createElement("span");
  span.className = TR_CLASS;
  span.lang = lang;
  span.textContent = text; // plain text only — model output is never parsed as HTML
  el.append(span);
}

export function clearTranslations(doc: Document) {
  doc.querySelectorAll(`.${TR_CLASS}`).forEach((n) => n.remove());
}

export type Progress = { done: number; total: number };

// Translates one loaded section: cached paragraphs first, then the rest in
// batches, inserting each batch as it arrives. Stops when `signal` aborts.
export async function translateDoc(
  doc: Document,
  opts: { pref: TargetPref; cfg: ByokConfig; uiLang: Lang; signal: AbortSignal; onProgress: (p: Progress) => void },
) {
  const blocks = collectBlocks(doc);
  if (!blocks.length) return;
  const target = resolveTarget(opts.pref, blocks.slice(0, 30).map((b) => b.text).join(" "));
  const todo = blocks.filter((b) => needsTranslation(b.text, target));
  const keys = todo.map((b) => translationKey(target, b.text));
  const cached = await getTranslations(keys);
  if (opts.signal.aborted) return;

  const pending: { block: Block; key: string }[] = [];
  todo.forEach((block, i) => {
    const hit = cached.get(keys[i]);
    if (hit) insertTranslation(block.el, hit, target);
    else pending.push({ block, key: keys[i] });
  });
  let done = todo.length - pending.length;
  opts.onProgress({ done, total: todo.length });

  for (const batch of makeBatches(pending.map((p) => p.block.text))) {
    if (opts.signal.aborted) return;
    const items = batch.map((i) => pending[i]);
    const shown = new Set<number>();
    const fresh: [string, string][] = [];
    // Insert each paragraph as soon as its line is complete (a line is done
    // once the next one has started), instead of waiting for the batch.
    const flush = (text: string, final: boolean) => {
      const complete = final ? text : text.slice(0, text.lastIndexOf("\n") + 1);
      parseBatch(complete, items.length).forEach((tr, i) => {
        if (!tr || shown.has(i) || opts.signal.aborted) return;
        shown.add(i);
        insertTranslation(items[i].block.el, tr, target);
        fresh.push([items[i].key, tr]);
      });
    };
    const reply = await streamChat(
      opts.cfg,
      buildBatchMessages(items.map((p) => p.block.text), target),
      (t) => flush(t, false),
      opts.uiLang,
      opts.signal,
    );
    if (opts.signal.aborted) return;
    flush(reply, true);
    if (fresh.length) await putTranslations(fresh);
    done += items.length;
    opts.onProgress({ done, total: todo.length });
  }
}

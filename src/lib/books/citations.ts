// Turns the companion's citations back into links into the book: verbatim
// quotes in 「…」 and PDF page refs like (p.42). Pure helpers — the reader
// does the actual navigation.

export type Citation = { quote?: string; page?: number };

// One pass, so a page ref inside a quote is never wrapped twice.
// Quotes: 「…」. Pages: (p.42) / [p. 42] / （第42页）.
const CITE_RE =
  /「([^「」<>\n]{4,200})」|[(（[]\s*(?:p\.?\s*(\d{1,4})|第\s*(\d{1,4})\s*页)\s*[)）\]]/gi;

// Runs on already-sanitised HTML (see safe-markdown.ts). Quote text cannot
// contain tags (the pattern excludes < >) and is already HTML-escaped by the
// renderer, so only `"` needs escaping to reuse it in an attribute.
// `pages: false` (reflowable books) leaves page refs as plain text — they
// cannot resolve to anything there.
export function linkifyCitations(html: string, opts: { pages?: boolean } = {}): string {
  const pages = opts.pages ?? true;
  return html.replace(CITE_RE, (m, quote?: string, p1?: string, p2?: string) => {
    if (!quote && !pages) return m;
    if (quote) {
      return `<button type="button" class="book-cite" data-quote="${quote.replace(/"/g, "&quot;")}">「${quote}」</button>`;
    }
    return `<button type="button" class="book-cite" data-page="${Number(p1 ?? p2)}">${m}</button>`;
  });
}

export function readCitation(el: HTMLElement): Citation | null {
  const btn = el.closest<HTMLElement>(".book-cite");
  if (!btn) return null;
  if (btn.dataset.page) return { page: Number(btn.dataset.page) };
  // dataset values are already entity-decoded by the HTML parser.
  if (btn.dataset.quote) return { quote: btn.dataset.quote };
  return null;
}

// Models paraphrase or elide ("……") even when told to quote verbatim, so
// try the longest unbroken piece first, then shorter anchors from it.
export function quoteProbes(quote: string): string[] {
  const pieces = quote
    .split(/[[(（]\s*(?:…+|\.{3,}|⋯+)\s*[\])）]|…+|\.{3,}|⋯+/)
    .map((p) => p.trim().replace(/^[，。、；：,.;:\s]+|[，。、；：,.;:\s]+$/g, ""))
    .filter((p) => p.length >= 4)
    .sort((a, b) => b.length - a.length);
  const main = pieces[0] ?? quote.trim();
  const probes = [main];
  if (main.length > 16) probes.push(main.slice(0, 12), main.slice(-12));
  return [...new Set(probes)];
}

const squash = (s: string) => s.replace(/[\s　]+/g, "");

// PDF text layers break lines and add stray spaces, so compare without
// whitespace. Returns the 1-based page that contains the quote, or null.
export function findQuotePage(pages: { page: number; text: string }[], quote: string): number | null {
  for (const probe of quoteProbes(quote)) {
    const needle = squash(probe);
    if (!needle) continue;
    const hit = pages.find((p) => squash(p.text).includes(needle));
    if (hit) return hit.page;
  }
  return null;
}

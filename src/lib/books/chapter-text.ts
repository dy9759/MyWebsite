import type { FoliateBook } from "@/lib/books/foliate";

// Works out what "this chapter" means at the reader's current position and
// pulls its plain text, so the AI companion always gets a chapter-sized
// context (Karpathy's reader3 idea: the chapter is the unit you hand to an LLM).

export type FlatTocItem = {
  label: string;
  href: string;
  depth: number;
  parent: number; // index into the flat list, -1 for top level
  start: number; // section (or PDF page) index where the item begins
};

export type ChapterRange = { key: string; title: string; start: number; end: number };

type RawToc = { label?: string; href?: string; subitems?: RawToc[] | null };

// Budgets that decide how far up the TOC tree "this chapter" may reach.
// Fixed layout (PDF) counts pages; reflowable books count section bytes.
export const PAGE_BUDGET = 40;
export const BYTE_BUDGET = 150_000;
// Hard cap on the text sent to the model per request (~1 token per CJK char).
export const MAX_CHAPTER_CHARS = 40_000;

export function flattenToc(
  toc: RawToc[],
  startOf: (href: string) => number,
  depth = 0,
  parent = -1,
  out: FlatTocItem[] = [],
): FlatTocItem[] {
  for (const item of toc) {
    if (!item.href) continue;
    const index = out.length;
    out.push({ label: (item.label ?? "").trim(), href: item.href, depth, parent, start: startOf(item.href) });
    if (item.subitems?.length) flattenToc(item.subitems, startOf, depth + 1, index, out);
  }
  return out;
}

function itemRange(flat: FlatTocItem[], i: number, total: number) {
  const { depth, start } = flat[i];
  let end = total;
  for (let j = i + 1; j < flat.length; j++) {
    if (flat[j].depth <= depth && flat[j].start > start) {
      end = flat[j].start;
      break;
    }
  }
  return { start, end: Math.max(end, start + 1) };
}

// Pick the largest TOC node around the current position that still fits the
// budget: a PDF "module" of 120 pages is too much, its 16-page chapter is not.
export function pickChapter(
  flat: FlatTocItem[],
  currentHref: string | undefined,
  currentSection: number,
  sizes: number[],
  budget: number,
): ChapterRange {
  const total = sizes.length;
  let i = currentHref ? flat.findIndex((t) => t.href === currentHref) : -1;
  if (i < 0) {
    for (let j = 0; j < flat.length; j++) if (flat[j].start >= 0 && flat[j].start <= currentSection) i = j;
  }
  if (i < 0 || flat[i].start < 0) {
    return { key: `s${currentSection}`, title: "", start: currentSection, end: currentSection + 1 };
  }
  const cost = ({ start, end }: { start: number; end: number }) =>
    sizes.slice(start, end).reduce((a, b) => a + b, 0);

  let pick = i;
  for (let a = flat[i].parent; a >= 0; a = flat[a].parent) {
    if (flat[a].start < 0 || cost(itemRange(flat, a, total)) > budget) break;
    pick = a;
  }
  const range = itemRange(flat, pick, total);
  return { key: flat[pick].href, title: flat[pick].label, ...range };
}

const BLOCKS = "h1,h2,h3,h4,h5,h6,p,li,blockquote,pre,td,figcaption";

export function docText(doc: Document): string {
  const blocks = doc.body?.querySelectorAll(BLOCKS);
  const parts = blocks?.length
    ? [...blocks].filter((el) => !el.querySelector(BLOCKS)).map((el) => el.textContent ?? "")
    : [doc.body?.textContent ?? ""];
  return parts.map((t) => t.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}

type PdfDoc = {
  getPage(n: number): Promise<{ getTextContent(): Promise<{ items: { str?: string; hasEOL?: boolean }[] }> }>;
};
const pdfDocs = new WeakMap<File, Promise<PdfDoc>>();

function getPdf(file: File): Promise<PdfDoc> {
  let p = pdfDocs.get(file);
  if (!p) {
    // pdf.js is already on the page: foliate-js loaded it to render the book.
    const lib = (globalThis as unknown as { pdfjsLib: { getDocument(o: object): { promise: Promise<PdfDoc> } } }).pdfjsLib;
    p = file.arrayBuffer().then((data) => lib.getDocument({ data, isEvalSupported: false }).promise);
    pdfDocs.set(file, p);
  }
  return p;
}

// Plain text of one PDF page (0-based index) from pdf.js's text layer.
export async function getPdfPageText(file: File, index: number): Promise<string> {
  const page = await (await getPdf(file)).getPage(index + 1);
  const { items } = await page.getTextContent();
  return items.map((it) => (it.str ?? "") + (it.hasEOL ? "\n" : "")).join("").trim();
}

export type ChapterText = ChapterRange & { text: string; truncated: boolean; scanned: boolean };

export async function getChapterText(
  book: FoliateBook,
  file: File,
  currentHref: string | undefined,
  currentSection: number,
): Promise<ChapterText> {
  const fixed = book.rendition?.layout === "pre-paginated";
  const sections: { id: unknown; size?: number; createDocument?: () => Promise<Document> | Document }[] =
    book.sections;
  const idToIndex = new Map(sections.map((s, i) => [s.id, i]));

  const starts = new Map<string, number>();
  const collect = async (items: RawToc[]) => {
    for (const t of items) {
      if (t.href) {
        try {
          const [id] = await book.splitTOCHref(t.href);
          starts.set(t.href, idToIndex.get(id) ?? -1);
        } catch {
          starts.set(t.href, -1);
        }
      }
      if (t.subitems?.length) await collect(t.subitems);
    }
  };
  if (book.splitTOCHref && book.toc?.length) await collect(book.toc);
  const flat = flattenToc(book.toc ?? [], (href) => starts.get(href) ?? -1);

  const sizes = sections.map((s) => (fixed ? 1 : (s.size ?? 0)));
  const range = pickChapter(flat, currentHref, currentSection, sizes, fixed ? PAGE_BUDGET : BYTE_BUDGET);
  const end = fixed ? Math.min(range.end, range.start + PAGE_BUDGET) : range.end;

  const parts: string[] = [];
  let chars = 0;
  for (let i = range.start; i < end && chars < MAX_CHAPTER_CHARS; i++) {
    let text = "";
    if (fixed) {
      text = await getPdfPageText(file, i);
      if (text) text = `[第 ${i + 1} 页]\n${text}`;
    } else if (sections[i]?.createDocument) {
      text = docText(await sections[i].createDocument!());
    }
    if (text) {
      parts.push(text);
      chars += text.length;
    }
  }
  const full = parts.join("\n\n");
  return {
    ...range,
    end,
    text: full.slice(0, MAX_CHAPTER_CHARS),
    truncated: full.length > MAX_CHAPTER_CHARS || end < range.end,
    // Under ~10 extractable chars per page: almost certainly a scanned PDF.
    scanned: fixed && full.replace(/\[第 \d+ 页\]|\s/g, "").length < 10 * (end - range.start),
  };
}

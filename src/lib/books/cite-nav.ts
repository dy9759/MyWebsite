import { getPdfPageText, type ChapterText } from "@/lib/books/chapter-text";
import { findQuotePage, quoteProbes, type Citation } from "@/lib/books/citations";
import type { FoliateView } from "@/lib/books/foliate";

// Jump from an AI citation back into the book. PDFs navigate by page;
// reflowable books search the chapter's sections and select the match.
// `beforeSelect` runs right before the quote gets selected (the reader uses
// it to keep that selection out of the "selected text" chip).
export async function navigateToCitation(
  view: FoliateView,
  file: File,
  cite: Citation,
  chapter: ChapterText,
  beforeSelect: () => void,
): Promise<boolean> {
  const fixed = view.book.rendition?.layout === "pre-paginated";
  if (cite.page) {
    if (!fixed || cite.page < 1 || cite.page > view.book.sections.length) return false;
    await view.goTo(cite.page - 1);
    return true;
  }
  if (!cite.quote) return false;
  if (fixed) {
    const pages = [];
    for (let i = chapter.start; i < chapter.end; i++) {
      pages.push({ page: i + 1, text: await getPdfPageText(file, i) });
    }
    const page = findQuotePage(pages, cite.quote);
    if (page) await view.goTo(page - 1);
    return page != null;
  }
  for (const query of quoteProbes(cite.quote)) {
    for (let index = chapter.start; index < chapter.end; index++) {
      for await (const result of view.search({ query, index })) {
        if (result === "done" || !result.cfi) continue;
        beforeSelect();
        await view.select(result.cfi);
        setTimeout(() => view.clearSearch(), 4000);
        return true;
      }
    }
  }
  return false;
}

type TocNode = { label?: string; href?: string; subitems?: TocNode[] | null };

const normLabel = (s: string) => s.toLowerCase().replace(/[\s　.:：·'’"“”—–-]+/g, "");

// Finds a TOC entry by its label (as written in a reading note's chapter
// marker): exact match first, then a normalised one.
export function findTocHref(toc: TocNode[], label: string): string | null {
  const flat: TocNode[] = [];
  const walk = (items: TocNode[]) =>
    items.forEach((t) => {
      flat.push(t);
      if (t.subitems?.length) walk(t.subitems);
    });
  walk(toc);
  // "Introduction #2" = the second TOC entry with that label (books often
  // repeat labels such as "Introduction" per part).
  const m = /^(.*?)\s+#(\d+)$/.exec(label.trim());
  const want = (m ? m[1] : label).trim();
  const nth = m ? Number(m[2]) : 1;
  const exact = flat.filter((t) => t.label?.trim() === want);
  const loose = flat.filter((t) => t.label && normLabel(t.label) === normLabel(want));
  const hit = (exact.length ? exact : loose)[nth - 1];
  return hit?.href ?? null;
}

// Deep link from a reading note: open the chapter, then (optionally) find
// and select the quoted sentence inside it.
export async function openNoteTarget(
  view: FoliateView,
  file: File,
  label: string,
  quote: string | null,
  getChapter: (href: string, section: number) => Promise<ChapterText>,
  beforeSelect: () => void,
): Promise<boolean> {
  const href = findTocHref(view.book.toc ?? [], label);
  if (!href) return false;
  const resolved = (await view.goTo(href)) as { index?: number } | undefined;
  if (!quote) return true;
  const chapter = await getChapter(href, resolved?.index ?? 0);
  return navigateToCitation(view, file, { quote }, chapter, beforeSelect);
}

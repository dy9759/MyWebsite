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

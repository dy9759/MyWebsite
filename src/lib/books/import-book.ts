import { matchCatalog } from "@/lib/books/catalog";
import { detectFormat, titleFromFileName } from "@/lib/books/formats";
import { bookIdFor, getBook, putBook } from "@/lib/books/store";

export type ImportResult = { ok: true; id: string } | { ok: false; reason: "unsupported" } | { ok: false; reason: "duplicate"; id: string };

// Puts a visitor's own e-book on the local shelf (IndexedDB only). A known
// catalog entry (e.g. imported from that book's note page) wins over the
// file-name guess.
export async function importBookFile(file: File, catalogId?: string): Promise<ImportResult> {
  const format = detectFormat(file.name);
  if (!format) return { ok: false, reason: "unsupported" };
  const id = await bookIdFor(file);
  if (await getBook(id)) return { ok: false, reason: "duplicate", id };
  const title = titleFromFileName(file.name);
  await putBook({
    id,
    name: file.name,
    title,
    format,
    size: file.size,
    addedAt: Date.now(),
    file,
    catalogId: catalogId ?? matchCatalog(title)?.id,
  });
  return { ok: true, id };
}

import type { BookFormat } from "@/lib/books/formats";

// Visitor-uploaded books live only in this browser's IndexedDB — they are
// never sent to the site's server (localStorage is too small for e-books).

export type StoredBook = {
  id: string;
  name: string; // original file name
  title: string;
  author?: string;
  format: BookFormat;
  size: number;
  addedAt: number;
  file: Blob;
  // Reading-catalog entry this file is (auto-matched or picked by hand);
  // "" means the visitor unlinked it on purpose.
  catalogId?: string;
};

export type BookMeta = Omit<StoredBook, "file">;

// `index` (section/page) restores fixed-layout books such as PDFs, where a
// CFI cannot be resolved; reflowable books restore from `cfi`.
export type BookProgress = {
  id: string;
  cfi: string;
  index: number;
  fraction: number;
  updatedAt: number;
};

const DB_NAME = "books";
const FILES = "files";
const PROGRESS = "progress";
const SUMMARIES = "summaries";
const TRANSLATIONS = "translations";

// AI chapter summaries, cached so the same chapter is never paid for twice.
// `key` is `${bookId}::${chapterKey}`; `start` orders chapters for recaps.
export type ChapterSummary = {
  key: string;
  bookId: string;
  title: string;
  start: number;
  text: string;
  model: string;
  createdAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 3);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const [name, keyPath] of [[FILES, "id"], [PROGRESS, "id"], [SUMMARIES, "key"], [TRANSLATIONS, "key"]]) {
        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  try {
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(store, mode).objectStore(store));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

// Content-addressed id: the same file always maps to the same id, so a book
// removed and re-imported keeps its progress and cached AI summaries, and
// importing a duplicate is a no-op.
export async function bookIdFor(file: Blob): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function listBooks(): Promise<BookMeta[]> {
  const all = await run<StoredBook[]>(FILES, "readonly", (s) => s.getAll());
  return all
    .map(({ file: _file, ...meta }) => meta)
    .sort((a, b) => b.addedAt - a.addedAt);
}

export const getBook = (id: string) =>
  run<StoredBook | undefined>(FILES, "readonly", (s) => s.get(id));

export const putBook = (book: StoredBook) => run(FILES, "readwrite", (s) => s.put(book));

// Removes the file only. Progress and AI summaries are keyed by the content
// hash, so they come back if the same file is imported again.
export const deleteBook = (id: string) => run(FILES, "readwrite", (s) => s.delete(id));

export const getProgress = (id: string) =>
  run<BookProgress | undefined>(PROGRESS, "readonly", (s) => s.get(id));

export const listProgress = () => run<BookProgress[]>(PROGRESS, "readonly", (s) => s.getAll());

export const putProgress = (p: BookProgress) => run(PROGRESS, "readwrite", (s) => s.put(p));

export const getSummary = (key: string) =>
  run<ChapterSummary | undefined>(SUMMARIES, "readonly", (s) => s.get(key));

export const putSummary = (summary: ChapterSummary) =>
  run(SUMMARIES, "readwrite", (s) => s.put(summary));

export async function listSummaries(bookId: string): Promise<ChapterSummary[]> {
  const range = IDBKeyRange.bound(`${bookId}::`, `${bookId}::\uffff`);
  const all = await run<ChapterSummary[]>(SUMMARIES, "readonly", (s) => s.getAll(range));
  return all.sort((a, b) => a.start - b.start);
}

// Paragraph translations, keyed by target language + a hash of the source
// text, so the same paragraph is never paid for twice (in any book).
type CachedTranslation = { key: string; text: string };

export function translationKey(target: string, source: string): string {
  // cyrb53: fast 53-bit string hash; collisions are irrelevant at book scale.
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < source.length; i++) {
    const ch = source.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${target}::${(4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)}`;
}

export async function getTranslations(keys: string[]): Promise<Map<string, string>> {
  const db = await openDb();
  try {
    const store = db.transaction(TRANSLATIONS, "readonly").objectStore(TRANSLATIONS);
    const rows = await Promise.all(
      keys.map(
        (k) =>
          new Promise<CachedTranslation | undefined>((resolve) => {
            const req = store.get(k);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(undefined);
          }),
      ),
    );
    return new Map(rows.filter((r): r is CachedTranslation => !!r).map((r) => [r.key, r.text]));
  } finally {
    db.close();
  }
}

export async function putTranslations(entries: [string, string][]) {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(TRANSLATIONS, "readwrite");
      for (const [key, text] of entries) tx.objectStore(TRANSLATIONS).put({ key, text });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

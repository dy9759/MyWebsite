import { readJSON, writeJSON } from "@/lib/safe-storage";

// Recently read reading notes (this browser only), for "最近阅读" on /books.
export type RecentNote = { slug: string; title: string; chapter: number; chapterTitle: string; at: number };

const KEY = "books-recent-notes-v1";
const MAX = 8;

export function readRecentNotes(): RecentNote[] {
  const list = readJSON<RecentNote[]>(KEY, []);
  return Array.isArray(list) ? list.filter((n) => n && typeof n.slug === "string") : [];
}

export function recordNoteVisit(visit: Omit<RecentNote, "at">, now = Date.now()) {
  const rest = readRecentNotes().filter((n) => n.slug !== visit.slug);
  writeJSON(KEY, [{ ...visit, at: now }, ...rest].slice(0, MAX));
}

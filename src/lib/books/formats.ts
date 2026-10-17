import type { TextFormat } from "@/lib/books/text-book";

// Formats the reader accepts. "foliate" formats are parsed by foliate-js
// itself; text formats go through our own parsers (text-parse.ts).
export const ACCEPTED_EXTENSIONS = [
  ".epub", ".pdf", ".mobi", ".azw3", ".azw", ".fb2", ".fbz", ".cbz",
  ".txt", ".md", ".markdown", ".rtf",
] as const;

export type BookFormat = "epub" | "pdf" | "mobi" | "fb2" | "cbz" | TextFormat;

export function detectFormat(name: string): BookFormat | null {
  const n = name.toLowerCase();
  if (n.endsWith(".epub")) return "epub";
  if (n.endsWith(".pdf")) return "pdf";
  if (/\.(mobi|azw3?|prc)$/.test(n)) return "mobi";
  if (/\.(fb2|fbz|fb2\.zip)$/.test(n)) return "fb2";
  if (n.endsWith(".cbz")) return "cbz";
  if (n.endsWith(".txt")) return "txt";
  if (/\.(md|markdown)$/.test(n)) return "md";
  if (n.endsWith(".rtf")) return "rtf";
  return null;
}

export const isTextFormat = (f: BookFormat): f is TextFormat =>
  f === "txt" || f === "md" || f === "rtf";

export const titleFromFileName = (name: string) => name.replace(/\.[^.]+$/, "").trim();

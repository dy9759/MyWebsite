import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

// Reading notes are the public half of the books feature: original notes
// written about a book (never the book itself), stored as Markdown with a
// small `key: value` frontmatter block. Build-time only (reads the fs).

export type BookNote = {
  slug: string;
  title: string; // note title, e.g. the book name
  book: string;
  author: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  draft: boolean;
  markdown: string; // body without frontmatter
};

const NOTES_DIR = join(process.cwd(), "src", "content", "books", "notes");

export function parseNote(slug: string, raw: string): BookNote {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw.replace(/\r\n?/g, "\n"));
  if (!m) throw new Error(`Note ${slug} is missing its frontmatter block`);
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  for (const key of ["title", "book", "author", "date", "summary"]) {
    if (!fm[key]) throw new Error(`Note ${slug} is missing frontmatter "${key}"`);
  }
  return {
    slug,
    title: fm.title,
    book: fm.book,
    author: fm.author,
    date: fm.date,
    summary: fm.summary,
    tags: fm.tags ? fm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    draft: fm.draft === "true",
    markdown: m[2].trim(),
  };
}

export function getAllNotes(): BookNote[] {
  return readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseNote(f.replace(/\.md$/, ""), readFileSync(join(NOTES_DIR, f), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): BookNote | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

export const renderNote = (note: BookNote) =>
  marked.parse(note.markdown, { async: false, gfm: true });

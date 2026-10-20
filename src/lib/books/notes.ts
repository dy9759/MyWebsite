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
  catalogId?: string; // reading-catalog entry (links note ↔ catalog ↔ shelf copy)
  sourceUrl?: string; // official book page, for notes on books outside the catalog
  markdown: string; // body without frontmatter
};

// A note is "chapter-mapped" when its 章节笔记 section uses
// `<!-- chapter: <exact TOC label> -->` markers. Each chapter can then link
// to the same chapter in the reader's own copy of the book.
// `display` comes from `<!-- chapter: <TOC label> | <display name> -->`, for
// books whose TOC labels are unreadable (e.g. PDF bookmarks named after files).
export type NoteChapter = { label: string; display?: string; heading: string; markdown: string };
export type NoteParts = { intro: string; chapters: NoteChapter[]; outro: string };

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
    catalogId: fm.catalogId || undefined,
    sourceUrl: fm.sourceUrl || undefined,
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

const CHAPTER_MARK = /<!--\s*chapter:\s*([\s\S]*?)\s*-->/g;

// Splits a note into intro / chapters / outro. Chapters run from one marker
// to the next marker or the next "## " section; notes without markers are
// all intro.
export function splitNote(markdown: string): NoteParts {
  const marks = [...markdown.matchAll(CHAPTER_MARK)];
  if (!marks.length) return { intro: markdown, chapters: [], outro: "" };
  const intro = markdown.slice(0, marks[0].index).trim();
  const chapters: NoteChapter[] = [];
  let outro = "";
  marks.forEach((m, i) => {
    const start = m.index + m[0].length;
    const nextMark = i + 1 < marks.length ? marks[i + 1].index : markdown.length;
    let body = markdown.slice(start, nextMark);
    const section = /^##\s/m.exec(body); // a new top-level section ends the chapters
    if (section) {
      outro = markdown.slice(start + section.index).trim();
      body = body.slice(0, section.index);
    }
    const heading = /^###\s+(.+)$/m.exec(body);
    const [label, display] = m[1].split(/\s+\|\s+/);
    chapters.push({
      label: label.trim(),
      ...(display ? { display: display.trim() } : {}),
      heading: heading ? heading[1].trim() : m[1].trim(),
      markdown: (heading ? body.replace(heading[0], "") : body).trim(),
    });
  });
  return { intro, chapters, outro };
}

// For AI readers (note.md): turn markers into a visible source line.
export const markersToText = (markdown: string) =>
  markdown.replace(CHAPTER_MARK, (_, raw: string) => `> 原书章节：${(raw.split(/\s+\|\s+/)[1] ?? raw).trim()}`);


// Short original passages around each 「quote」 in a note (the quote's
// sentence plus at most one neighbour each side), keyed by quote. Shown next
// to the note as a preview; never whole chapters.
export type Excerpt = { quote: string; text: string };
const EXCERPTS_DIR = join(process.cwd(), "src", "content", "books", "excerpts");

export function getExcerpts(slug: string): Map<string, string> {
  try {
    return new Map(Object.entries(JSON.parse(readFileSync(join(EXCERPTS_DIR, `${slug}.json`), "utf8")) as Record<string, string>));
  } catch {
    return new Map();
  }
}

export const quotesIn = (markdown: string) => [...new Set([...markdown.matchAll(/「([^「」]+)」/g)].map((m) => m[1]))];

// Per chapter (keyed by marker label): the chapter's core sentence and one
// concrete case from the book, both short verbatim passages, with Chinese
// commentary on how the case shows the idea.
export type NoteCase = { point: string; core: string; caseTitle: string; case: string; explain: string; external?: boolean; story?: string };
const CASES_DIR = join(process.cwd(), "src", "content", "books", "cases");

export function getCases(slug: string): Record<string, NoteCase[]> {
  try {
    return JSON.parse(readFileSync(join(CASES_DIR, `${slug}.json`), "utf8")) as Record<string, NoteCase[]>;
  } catch {
    return {};
  }
}

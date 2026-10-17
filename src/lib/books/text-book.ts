import { marked } from "marked";
import {
  decodeText,
  rtfToText,
  splitMarkdown,
  splitTxtChapters,
  type TextChapter,
} from "@/lib/books/text-parse";

// Wraps TXT / Markdown / RTF chapters into the minimal "book" interface that
// foliate-js renders (sections + toc + resolveHref), so every format goes
// through the same <foliate-view> reader.

export type TextFormat = "txt" | "md" | "rtf";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const plainToHtml = (body: string) =>
  body
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");

function chapterHtml(format: TextFormat, ch: TextChapter): string {
  if (format === "md") {
    // Book markdown is untrusted: drop raw HTML so it cannot inject scripts.
    const html = marked.parse(ch.body, { async: false, gfm: true });
    return html.replace(/<(script|iframe|object|embed)[\s\S]*?<\/\1>/gi, "");
  }
  return `<h2>${escapeHtml(ch.title)}</h2>\n${plainToHtml(ch.body)}`;
}

const wrapDoc = (title: string, body: string) =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body>${body}</body></html>`;

export function chaptersFromFile(format: TextFormat, buf: ArrayBuffer): TextChapter[] {
  const text = decodeText(buf);
  if (format === "md") return splitMarkdown(text);
  if (format === "rtf") return splitTxtChapters(rtfToText(text));
  return splitTxtChapters(text);
}

export function makeTextBook(format: TextFormat, buf: ArrayBuffer, title: string) {
  const chapters = chaptersFromFile(format, buf);
  const docs = chapters.map((ch) => wrapDoc(ch.title, chapterHtml(format, ch)));
  const urls = new Map<number, string>();

  const sections = docs.map((html, i) => ({
    id: i,
    size: new Blob([html]).size,
    load: () => {
      if (!urls.has(i)) urls.set(i, URL.createObjectURL(new Blob([html], { type: "text/html" })));
      return urls.get(i)!;
    },
    unload: () => {
      const url = urls.get(i);
      if (url) URL.revokeObjectURL(url);
      urls.delete(i);
    },
    createDocument: () => new DOMParser().parseFromString(html, "text/html"),
  }));

  return {
    sections,
    dir: "ltr",
    metadata: { title },
    toc: chapters.map((ch, i) => ({ label: ch.title, href: String(i) })),
    resolveHref: (href: string) => ({ index: Number(href), anchor: () => null }),
    splitTOCHref: (href: string) => [Number(href), null],
    getTOCFragment: (doc: Document) => doc.body,
    isExternal: (href: string) => /^\w+:/i.test(href),
    destroy: () => sections.forEach((s) => s.unload()),
  };
}

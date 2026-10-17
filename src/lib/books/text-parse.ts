// Pure parsers for the plain-text formats foliate-js does not read itself
// (TXT, Markdown, RTF). Each turns a file into titled chapters; the reader
// wraps those chapters into a foliate "book" object (see text-book.ts).

export type TextChapter = { title: string; body: string };

// Chinese TXT files are very often GBK. Try strict UTF-8 first (with BOM
// handling), then fall back to gb18030, a superset of GBK/GB2312.
export function decodeText(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder("utf-16le").decode(bytes);
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder("utf-16be").decode(bytes);
  try {
    return new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes);
  } catch {
    return new TextDecoder("gb18030").decode(bytes);
  }
}

const CN_NUM = "0-9零〇一二两三四五六七八九十百千万";
const HEADING_RE = new RegExp(
  `^[ \\t\\u3000]*(` +
    `第[${CN_NUM}]+[章节回卷部篇集].{0,30}` +
    `|(?:chapter|part)\\s+[0-9ivxlc]+\\b.{0,40}` +
    `|(?:序章?|序言|前言|引言|楔子|尾声|后记|附录)(?:[ \\t\\u3000].{0,30})?` +
    `)[ \\t\\u3000]*$`,
  "gim",
);

// Fallback chunk size when a TXT has no recognisable chapter headings.
const CHUNK_CHARS = 8000;

function chunkByLength(text: string, label: (n: number) => string): TextChapter[] {
  const paras = text.split(/\n+/);
  const chapters: TextChapter[] = [];
  let buf: string[] = [];
  let len = 0;
  for (const p of paras) {
    buf.push(p);
    len += p.length;
    if (len >= CHUNK_CHARS) {
      chapters.push({ title: label(chapters.length + 1), body: buf.join("\n") });
      buf = [];
      len = 0;
    }
  }
  if (buf.join("").trim()) chapters.push({ title: label(chapters.length + 1), body: buf.join("\n") });
  return chapters;
}

export function splitTxtChapters(raw: string): TextChapter[] {
  const text = raw.replace(/\r\n?/g, "\n");
  const marks = [...text.matchAll(HEADING_RE)];
  if (marks.length < 2) return chunkByLength(text, (n) => `第 ${n} 部分`);

  const chapters: TextChapter[] = [];
  const preface = text.slice(0, marks[0].index).trim();
  if (preface) chapters.push({ title: "开篇", body: preface });
  marks.forEach((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < marks.length ? marks[i + 1].index : text.length;
    chapters.push({ title: m[1].trim(), body: text.slice(start, end).trim() });
  });
  return chapters;
}

// Split on top-level (#) headings, or on ## when the file has a single #
// title. Fenced code blocks are skipped so "# comment" lines don't split.
export function splitMarkdown(raw: string): TextChapter[] {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  const headings: { line: number; level: number; title: string }[] = [];
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const m = !inFence && /^(#{1,2})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) headings.push({ line: i, level: m[1].length, title: m[2] });
  });
  const h1 = headings.filter((h) => h.level === 1);
  const splitAt = h1.length >= 2 ? h1 : headings.filter((h) => h.level === 2);
  if (splitAt.length === 0) return [{ title: "全文", body: raw }];

  const chapters: TextChapter[] = [];
  const head = lines.slice(0, splitAt[0].line).join("\n").trim();
  if (head) chapters.push({ title: h1[0]?.title ?? "开篇", body: head });
  splitAt.forEach((h, i) => {
    const end = i + 1 < splitAt.length ? splitAt[i + 1].line : lines.length;
    chapters.push({ title: h.title, body: lines.slice(h.line, end).join("\n") });
  });
  return chapters;
}

// RTF destinations whose contents are metadata, not body text.
const SKIP_DESTINATIONS = new Set([
  "fonttbl", "colortbl", "stylesheet", "info", "pict", "header", "footer",
  "headerl", "headerr", "footerl", "footerr", "object", "themedata",
  "datastore", "latentstyles", "listtable", "listoverridetable", "rsidtbl",
  "generator", "xmlnstbl", "mmathPr", "fldinst", "filetbl", "revtbl",
]);

const CODEPAGES: Record<string, string> = {
  "936": "gb18030", "950": "big5", "932": "shift_jis", "949": "euc-kr",
  "1250": "windows-1250", "1251": "windows-1251", "1252": "windows-1252",
  "65001": "utf-8",
};

// Minimal RTF → plain text. Handles groups, ignorable destinations,
// \'hh code-page bytes (incl. GBK), \uN unicode escapes and paragraph marks.
// Formatting is dropped on purpose: the reader only needs the text.
export function rtfToText(rtf: string): string {
  let decoder = new TextDecoder("windows-1252");
  const out: string[] = [];
  let bytes: number[] = [];
  const stack: { skip: boolean; uc: number }[] = [];
  let state = { skip: false, uc: 1 };
  let pendingSkip = 0; // chars to drop after a \uN escape

  const flush = () => {
    if (bytes.length) out.push(decoder.decode(new Uint8Array(bytes)));
    bytes = [];
  };
  const emit = (s: string) => {
    if (state.skip) return;
    flush();
    out.push(s);
  };

  const re = /\\([a-zA-Z]+)(-?\d+)? ?|\\'([0-9a-fA-F]{2})|\\([^a-zA-Z])|([{}])|([^\\{}\r\n]+)|[\r\n]+/g;
  for (const m of rtf.matchAll(re)) {
    const [, word, arg, hex, sym, brace, text] = m;
    if (hex !== undefined) {
      if (pendingSkip > 0) { pendingSkip--; continue; }
      if (!state.skip) bytes.push(parseInt(hex, 16));
      continue;
    }
    if (brace === "{") {
      flush();
      stack.push(state);
      state = { ...state };
      continue;
    }
    if (brace === "}") {
      flush();
      state = stack.pop() ?? { skip: false, uc: 1 };
      continue;
    }
    if (sym !== undefined) {
      if (sym === "*") { state.skip = true; continue; }
      if (sym === "~") emit(" ");
      else if (sym === "\\" || sym === "{" || sym === "}") emit(sym);
      continue;
    }
    if (word !== undefined) {
      if (SKIP_DESTINATIONS.has(word)) { state.skip = true; continue; }
      if (word === "ansicpg" && arg && CODEPAGES[arg]) {
        decoder = new TextDecoder(CODEPAGES[arg]);
      } else if (word === "uc") {
        state.uc = Number(arg ?? 1);
      } else if (word === "u" && arg) {
        const code = Number(arg);
        emit(String.fromCharCode(code < 0 ? code + 65536 : code));
        pendingSkip = state.uc;
      } else if (word === "par" || word === "line" || word === "sect" || word === "page") {
        emit("\n");
      } else if (word === "tab") {
        emit("\t");
      }
      continue;
    }
    if (text !== undefined) {
      let t = text;
      if (pendingSkip > 0) {
        const drop = Math.min(pendingSkip, t.length);
        t = t.slice(drop);
        pendingSkip -= drop;
      }
      if (t) emit(t);
    }
  }
  flush();
  return out.join("").replace(/\n{3,}/g, "\n\n").trim();
}

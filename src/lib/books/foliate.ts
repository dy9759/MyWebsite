import { detectFormat, isTextFormat } from "@/lib/books/formats";
import { makeTextBook } from "@/lib/books/text-book";

// foliate-js is vendored as plain ES modules under public/vendor/foliate-js
// (MIT, see its LICENSE/VERSION). It is loaded at runtime from the site's own
// origin so the bundler never touches it, and only on the reader page.

export type FoliateBook = any;
export type FoliateView = HTMLElement & {
  book: FoliateBook;
  renderer: any;
  lastLocation: any;
  open(book: FoliateBook): Promise<void>;
  init(opts: { lastLocation?: string; showTextStart?: boolean }): Promise<void>;
  goTo(target: string | number): Promise<unknown>;
  select(target: string): Promise<void>;
  search(opts: { query: string; index?: number }): AsyncGenerator<"done" | { cfi?: string; excerpt?: unknown }>;
  clearSearch(): void;
  goToFraction(frac: number): Promise<void>;
  goLeft(): Promise<void>;
  goRight(): Promise<void>;
  close(): void;
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const VIEW_URL = `${base}/vendor/foliate-js/view.js`;

type ViewModule = { makeBook: (file: File) => Promise<FoliateBook> };
let viewModule: Promise<ViewModule> | null = null;

// The reader's module graph, fetched in parallel (otherwise each import
// waits for its parent: a waterfall of round trips, slow on phones).
const CORE_MODULES = ["view.js", "epubcfi.js", "progress.js", "overlayer.js", "text-walker.js", "paginator.js", "search.js"];
const FORMAT_MODULES: Record<string, string[]> = {
  epub: ["epub.js", "vendor/zip.js"],
  pdf: ["pdf.js", "vendor/pdfjs/pdf.mjs", "fixed-layout.js"],
  mobi: ["mobi.js", "epub.js", "vendor/fflate.js"],
};
// pdf.js runs its parser in a worker; prefetch it so it is not fetched only
// after the 800 KB main module has loaded.
const PDF_WORKER = "vendor/pdfjs/pdf.worker.mjs";
const preloaded = new Set<string>();

export function preloadReader(formats: string[] = ["epub"]) {
  if (typeof document === "undefined") return;
  const add = (path: string, rel: "modulepreload" | "prefetch") => {
    if (preloaded.has(path)) return;
    preloaded.add(path);
    const link = document.createElement("link");
    link.rel = rel;
    link.href = `${base}/vendor/foliate-js/${path}`;
    document.head.appendChild(link);
  };
  CORE_MODULES.forEach((m) => add(m, "modulepreload"));
  for (const f of formats) {
    (FORMAT_MODULES[f] ?? FORMAT_MODULES.epub).forEach((m) => add(m, "modulepreload"));
    if (f === "pdf") add(PDF_WORKER, "prefetch");
  }
}

const loadViewModule = () =>
  (viewModule ??= import(/* webpackIgnore: true */ /* turbopackIgnore: true */ VIEW_URL));

const MARKUP = /(x?html|svg|xml)/i;

// E-books may contain JavaScript, and foliate renders sections in same-origin
// iframes, so a hostile file could read this origin's storage (e.g. the BYOK
// key). Refuse script resources and strip inline scripts / event handlers.
export function sanitizeMarkup(markup: string, type: string): string {
  const doc = new DOMParser().parseFromString(markup, type as DOMParserSupportedType);
  if (doc.querySelector("parsererror")) {
    return markup.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/\son\w+\s*=/gi, " data-x=");
  }
  doc.querySelectorAll("script, iframe, object, embed").forEach((el) => el.remove());
  doc.querySelectorAll("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      const v = attr.value.trim().toLowerCase();
      if (attr.name.toLowerCase().startsWith("on") || v.startsWith("javascript:")) {
        el.removeAttribute(attr.name);
      }
    }
  });
  return new XMLSerializer().serializeToString(doc);
}

function hardenBook(book: FoliateBook) {
  const target: EventTarget | undefined = book.transformTarget;
  if (!target) return;
  target.addEventListener("load", (e) => {
    const detail = (e as CustomEvent).detail;
    if (detail.isScript) detail.allow = false;
  });
  target.addEventListener("data", (e) => {
    const detail = (e as CustomEvent).detail;
    if (!MARKUP.test(detail.type)) return;
    const type = /svg/i.test(detail.type)
      ? "image/svg+xml"
      : /xhtml|xml/i.test(detail.type)
        ? "application/xhtml+xml"
        : "text/html";
    detail.data = Promise.resolve(detail.data).then(async (d: string | Blob) =>
      sanitizeMarkup(typeof d === "string" ? d : await d.text(), type),
    );
  });
}

export async function openBookFile(file: File): Promise<FoliateBook> {
  const format = detectFormat(file.name);
  if (format) preloadReader([format]);
  const { makeBook } = await loadViewModule(); // also registers <foliate-view>
  if (format && isTextFormat(format)) {
    return makeTextBook(format, await file.arrayBuffer(), file.name.replace(/\.[^.]+$/, ""));
  }
  const book = await makeBook(file);
  hardenBook(book);
  return book;
}

// Foliate metadata titles/authors can be strings, language maps or arrays.
export function formatContributor(x: unknown): string {
  if (!x) return "";
  if (typeof x === "string") return x;
  if (Array.isArray(x)) return x.map(formatContributor).filter(Boolean).join("、");
  if (typeof x === "object") {
    const o = x as { name?: unknown };
    if (o.name) return formatContributor(o.name);
    return String(Object.values(x)[0] ?? "");
  }
  return String(x);
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, List, Maximize, Minimize, Sparkles } from "lucide-react";
import { useLanguage, useSiteCopy } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import BookToc, { type TocItem } from "@/components/books/book-toc";
import CompanionPanel from "@/components/books/companion-panel";
import PageTurnZone from "@/components/books/page-turn-zone";
import SelectionTranslate from "@/components/books/selection-translate";
import TranslateControls from "@/components/books/translate-controls";
import { BILINGUAL_CSS } from "@/lib/books/bilingual";
import { getChapterText, type ChapterText } from "@/lib/books/chapter-text";
import type { Citation } from "@/lib/books/citations";
import { navigateToCitation, openNoteTarget } from "@/lib/books/cite-nav";
import { useBilingual } from "@/lib/books/use-bilingual";
import { useFullscreen } from "@/lib/books/use-fullscreen";
import { useByok } from "@/lib/wiki-byok";
import { formatContributor, openBookFile, type FoliateView } from "@/lib/books/foliate";
import { FONT_MAX, FONT_MIN, useReaderPrefs } from "@/lib/books/reader-prefs";
import { attachSwipe, type SwipeDir } from "@/lib/books/swipe";
import { CATALOG_BY_ID, matchCatalog, type CatalogEntry } from "@/lib/books/catalog";
import { getBook, getProgress, putBook, putProgress, type StoredBook } from "@/lib/books/store";
import { cn } from "@/lib/utils";

type Status = "loading" | "ready" | "missing" | "error";

const READER_KEYS = new Set(["ArrowLeft", "ArrowRight", "f", "F", "Escape"]);

// Keys typed into the AI box or other text fields must not turn pages.
const isTextEntry = (t: EventTarget | null) =>
  t instanceof HTMLTextAreaElement ||
  (t instanceof HTMLElement && t.isContentEditable) ||
  (t instanceof HTMLInputElement && !["range", "checkbox", "radio", "button"].includes(t.type));

// Swiping left drags the page left, revealing what is to its right.
const turnBySwipe = (view: FoliateView | null, dir: SwipeDir) =>
  void (dir === "left" ? view?.goRight() : view?.goLeft());

const readerCss = (dark: boolean, fontSize: number) => `
  html { color-scheme: ${dark ? "dark" : "light"}; font-size: ${fontSize}% !important; }
  html, body { background: transparent !important; color: ${dark ? "#e5e5e5" : "#1a1a1a"} !important; }
  p, li, blockquote { line-height: 1.8; }
  a:link { color: ${dark ? "#8ab4f8" : "#1a56db"}; }
  img, svg { max-width: 100%; height: auto; }
  pre { white-space: pre-wrap; }
${BILINGUAL_CSS}`;

export default function BookReader() {
  const copy = useSiteCopy().books;
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  // Deep link from a reading note: ?toc=<chapter label>&q=<quote>.
  const deepToc = params.get("toc");
  const deepQuote = params.get("q");
  const [deepMiss, setDeepMiss] = useState(false);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const hostRef = useRef<HTMLDivElement>(null);
  const turnAreaRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<FoliateView | null>(null);
  const fileRef = useRef<File | null>(null);
  const storedRef = useRef<StoredBook | null>(null);
  const [catalogEntry, setCatalogEntry] = useState<CatalogEntry | null>(null);
  const [author, setAuthor] = useState("");
  // Selections made by citation jumps must not land in the "selected" chip.
  const ignoreSelectionUntil = useRef(0);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [currentHref, setCurrentHref] = useState<string>();
  const [fraction, setFraction] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showAi, setShowAi] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [prefs, setPrefs] = useReaderPrefs();
  const { pdfSingle, pdfZoom, fontSize, bilingual, translateTo } = prefs;
  const { rootRef, fullscreen, toggle: toggleFullscreen, exitCss } = useFullscreen();
  const [selection, setSelection] = useState("");
  const { language } = useLanguage();
  const cfg = useByok();
  // Bumped whenever foliate loads a section, so the bilingual view picks it up.
  const [docVersion, setDocVersion] = useState(0);
  const getDocs = useCallback(
    () => ((viewRef.current?.renderer?.getContents?.() ?? []) as { doc: Document }[]).map((c) => c.doc),
    [],
  );
  const { progress: trProgress, error: trError } = useBilingual({
    enabled: bilingual && !fixed && status === "ready",
    pref: translateTo,
    cfg,
    uiLang: language,
    getDocs,
    docVersion,
  });

  useEffect(() => {
    let cancelled = false;
    let view: FoliateView | null = null;
    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    let pendingSave: (() => void) | null = null;

    (async () => {
      const stored = id ? await getBook(id) : undefined;
      if (!stored) return setStatus("missing");
      const file = new File([stored.file], stored.name, { type: stored.file.type });
      fileRef.current = file;
      const book = await openBookFile(file);
      if (cancelled) return book.destroy?.();

      view = document.createElement("foliate-view") as FoliateView;
      view.style.cssText = "display:block;width:100%;height:100%";
      hostRef.current?.replaceChildren(view);
      viewRef.current = view;
      const isFixed = book.rendition?.layout === "pre-paginated";
      // Single-page mode: give every page its own spread (fixed layout only).
      if (isFixed && pdfSingle) book.rendition = { ...book.rendition, spread: "none" };
      await view.open(book);
      setFixed(isFixed);
      if (!isFixed) {
        // Slimmer margins and wider columns than foliate's defaults: more
        // text per page.
        view.renderer.setAttribute("margin", "28px");
        view.renderer.setAttribute("gap", "4%");
        view.renderer.setAttribute("max-inline-size", "780px");
        view.renderer.setAttribute("max-column-count", "2");
      }

      const metaTitle = formatContributor(book.metadata?.title) || stored.title;
      const author = formatContributor(book.metadata?.author);
      setTitle(metaTitle);
      setAuthor(author || stored.author || "");
      setToc(book.toc ?? []);
      // Link to the reading catalog: keep a stored link, else try the
      // embedded title (often better than the file name).
      const catalogId = stored.catalogId ?? matchCatalog(metaTitle, stored.title)?.id;
      setCatalogEntry(catalogId ? (CATALOG_BY_ID.get(catalogId) ?? null) : null);
      const updated = { ...stored, title: metaTitle, author: author || stored.author, catalogId };
      storedRef.current = updated;
      if (metaTitle !== stored.title || updated.author !== stored.author || catalogId !== stored.catalogId) {
        void putBook(updated);
      }

      // Keep the latest non-empty selection in the book for the AI companion.
      view.addEventListener("load", (e) => {
        const doc: Document = (e as CustomEvent).detail.doc;
        doc.addEventListener("selectionchange", () => {
          const text = doc.getSelection()?.toString().replace(/\s+/g, " ").trim() ?? "";
          if (text && Date.now() > ignoreSelectionUntil.current) setSelection(text.slice(0, 1200));
        });
        // Once the reader clicks into the page, keys go to the book's iframe;
        // forward the reader shortcuts so arrows keep turning pages.
        doc.addEventListener("keydown", (ke) => {
          if (!READER_KEYS.has(ke.key) || ke.metaKey || ke.ctrlKey || ke.altKey) return;
          ke.preventDefault();
          window.dispatchEvent(new KeyboardEvent("keydown", { key: ke.key }));
        });
        // foliate's paginator swipes reflowable books itself; fixed-layout
        // pages (PDF) have no touch paging, so add it.
        if (isFixed) attachSwipe(doc, (dir) => turnBySwipe(viewRef.current, dir));
        setDocVersion((v) => v + 1);
      });

      view.addEventListener("relocate", (e) => {
        const loc = (e as CustomEvent).detail;
        setFraction(loc.fraction ?? 0);
        setCurrentHref(loc.tocItem?.href);
        setSectionIndex(loc.section?.current ?? 0);
        clearTimeout(saveTimer);
        pendingSave = () => {
          pendingSave = null;
          void putProgress({
            id,
            cfi: loc.cfi,
            index: loc.section?.current ?? 0,
            fraction: loc.fraction ?? 0,
            updatedAt: Date.now(),
          });
        };
        saveTimer = setTimeout(() => pendingSave?.(), 500);
      });

      const saved = await getProgress(id);
      await view.init({
        lastLocation: saved ? ((isFixed ? saved.index : saved.cfi) as string) : undefined,
        showTextStart: !saved,
      });
      if (!cancelled) setStatus("ready");
    })().catch((e: unknown) => {
      if (cancelled) return;
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    });

    return () => {
      cancelled = true;
      clearTimeout(saveTimer);
      // Flush so a re-open (e.g. switching single/double page) resumes here.
      pendingSave?.();
      view?.close();
      view?.book?.destroy?.();
      view?.remove();
      viewRef.current = null;
    };
  }, [id, pdfSingle]);

  // Touches that start on the edge zones never reach foliate's iframes.
  useEffect(() => {
    if (status !== "ready" || !turnAreaRef.current) return;
    return attachSwipe(turnAreaRef.current, (dir) => turnBySwipe(viewRef.current, dir));
  }, [status]);

  // Re-theme reflowable books when the site theme or font size changes.
  useEffect(() => {
    if (status === "ready") viewRef.current?.renderer?.setStyles?.(readerCss(dark, fontSize));
  }, [dark, fontSize, status]);

  useEffect(() => {
    if (status === "ready" && fixed) viewRef.current?.renderer?.setAttribute("zoom", pdfZoom);
  }, [pdfZoom, fixed, status]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTextEntry(e.target)) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Also when the progress slider has focus: otherwise it eats the
        // arrows and only nudges 0.1%.
        e.preventDefault();
        void (e.key === "ArrowLeft" ? viewRef.current?.goLeft() : viewRef.current?.goRight());
      }
      if ((e.key === "f" || e.key === "F") && !e.metaKey && !e.ctrlKey && !e.altKey) toggleFullscreen();
      if (e.key === "Escape") exitCss();
    };
    // Capture phase, so nothing inside the reader can swallow the keys.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [toggleFullscreen, exitCss]);

  const resolveChapter = useCallback(() => {
    const view = viewRef.current;
    if (!view || !fileRef.current) return Promise.reject(new Error("book not ready"));
    return getChapterText(view.book, fileRef.current, currentHref, sectionIndex);
  }, [currentHref, sectionIndex]);

  const onCite = useCallback(async (cite: Citation, chapter: ChapterText): Promise<boolean> => {
    const view = viewRef.current;
    const file = fileRef.current;
    if (!view || !file) return false;
    return navigateToCitation(view, file, cite, chapter, () => {
      ignoreSelectionUntil.current = Date.now() + 1000;
    });
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    const file = fileRef.current;
    if (status !== "ready" || !deepToc || !view || !file) return;
    void openNoteTarget(
      view,
      file,
      deepToc,
      deepQuote,
      (href, section) => getChapterText(view.book, file, href, section),
      () => {
        ignoreSelectionUntil.current = Date.now() + 1000;
      },
    ).then((ok) => setDeepMiss(!ok));
  }, [status, deepToc, deepQuote]);

  const goTo = (href: string) => {
    void viewRef.current?.goTo(href);
    setShowToc(false);
  };

  // In fullscreen the reading area fills the screen minus the header row and
  // the page controls below it.
  // Phones get a second controls row, so their reading area is a bit shorter.
  const bodyHeight = fullscreen
    ? "h-[calc(100dvh-9.5rem)] md:h-[calc(100dvh-7.5rem)]"
    : "h-[calc(100dvh-15rem)] min-h-[20rem] md:h-[calc(100dvh-13rem)] md:min-h-[24rem]";

  return (
    <div
      ref={rootRef}
      className={cn("px-4", fullscreen && "fixed inset-0 z-[60] flex flex-col bg-background py-3")}
    >
      <div className="flex items-center gap-2">
        <Link href="/books/" className="shrink-0 text-sm text-muted-foreground hover:text-foreground" aria-label={copy.back}>
          ← <span className="hidden sm:inline">{copy.back}</span>
        </Link>
        <span className="min-w-0 flex-1 truncate text-center text-sm font-medium">{title}</span>
        <Button variant={showAi ? "secondary" : "ghost"} size="sm" onClick={() => setShowAi((v) => !v)} disabled={status !== "ready"}>
          <Sparkles className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">AI</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? copy.exitFullscreen : copy.fullscreen}
          title={`${fullscreen ? copy.exitFullscreen : copy.fullscreen} (F)`}
        >
          {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowToc((v) => !v)} disabled={!toc.length} aria-label={copy.toc}>
          <List className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">{copy.toc}</span>
        </Button>
      </div>

      {status === "missing" && <p className="mt-8 text-muted-foreground">{copy.notFound}</p>}
      {status === "error" && <p className="mt-8 text-destructive">{error}</p>}

      <div className="relative mt-3 flex gap-4">
        <aside
          className={cn(
            "w-72 max-w-[85vw] shrink-0 overflow-y-auto rounded-lg border p-2 text-sm",
            "absolute inset-y-0 left-0 z-10 bg-background shadow-lg md:static md:shadow-none",
            bodyHeight,
            !showToc && "hidden",
          )}
        >
          <BookToc items={toc} currentHref={currentHref} onSelect={goTo} />
        </aside>

        <div className="relative min-w-0 flex-1">
          {status === "loading" && (
            <p className="absolute inset-0 grid place-items-center text-muted-foreground">
              {copy.loading}
            </p>
          )}
          <div ref={turnAreaRef} className="relative">
            <div ref={hostRef} className={cn("w-full overflow-hidden rounded-lg border", bodyHeight)} />
            {status === "ready" && (
              <>
                <PageTurnZone side="left" label={copy.prev} onClick={() => viewRef.current?.goLeft()} />
                <PageTurnZone side="right" label={copy.next} onClick={() => viewRef.current?.goRight()} />
              </>
            )}
            {status === "ready" && selection && (
              <SelectionTranslate selection={selection} pref={translateTo} onDismiss={() => setSelection("")} />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Button variant="outline" size="icon" aria-label={copy.prev} onClick={() => viewRef.current?.goLeft()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={fraction}
              aria-label="progress"
              className="min-w-0 flex-1"
              onChange={(e) => {
                const f = Number(e.target.value);
                setFraction(f);
                void viewRef.current?.goToFraction(f);
              }}
            />
            <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
              {Math.round(fraction * 100)}%
            </span>
            {status === "ready" && fixed && (
              <div className="order-last flex w-full justify-center gap-2 md:order-none md:w-auto">
                <Button variant="outline" size="sm" onClick={() => setPrefs({ pdfSingle: !pdfSingle })}>
                  {pdfSingle ? copy.doublePage : copy.singlePage}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrefs({ pdfZoom: pdfZoom === "fit-page" ? "fit-width" : "fit-page" })}
                >
                  {pdfZoom === "fit-page" ? copy.fitWidth : copy.fitPage}
                </Button>
              </div>
            )}
            {status === "ready" && !fixed && (
              <div className="order-last flex w-full items-center justify-center gap-1 md:order-none md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={copy.fontSmaller}
                  disabled={fontSize <= FONT_MIN}
                  onClick={() => setPrefs({ fontSize: fontSize - 10 })}
                >
                  A−
                </Button>
                <span className="w-10 text-center text-xs tabular-nums text-muted-foreground">{fontSize}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={copy.fontLarger}
                  disabled={fontSize >= FONT_MAX}
                  onClick={() => setPrefs({ fontSize: fontSize + 10 })}
                >
                  A+
                </Button>
              </div>
            )}
            {status === "ready" && (
              <div className="order-last flex w-full justify-center md:order-none md:w-auto">
                <TranslateControls
                  canBilingual={!fixed}
                  bilingual={bilingual}
                  onBilingual={(on) => setPrefs({ bilingual: on })}
                  target={translateTo}
                  onTarget={(t) => setPrefs({ translateTo: t })}
                  progress={trProgress}
                  hasKey={!!cfg}
                  zh={language === "zh"}
                />
              </div>
            )}
            <Button variant="outline" size="icon" aria-label={copy.next} onClick={() => viewRef.current?.goRight()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {trError && <p className="mt-1 text-xs text-destructive">{trError}</p>}
          {deepMiss && (
            <p className="mt-1 text-xs text-muted-foreground">
              {language === "zh" ? "没在这本书里找到笔记对应的位置（版本可能不同），请用目录查找。" : "Could not find the note's location in this copy (edition may differ) — use the contents."}
            </p>
          )}
          {bilingual && !fixed && status === "ready" && !cfg && (
            <p className="mt-1 text-xs text-muted-foreground">
              {language === "zh" ? "双语对照需要你的百炼 Key：点右上角 AI 配置。" : "Bilingual view needs your Bailian key — set it in the AI panel."}
            </p>
          )}
        </div>

        {showAi && status === "ready" && (
          <aside
            className={cn(
              // Phones: bottom sheet, so the page stays visible above it.
              "fixed inset-x-0 bottom-0 z-[70] h-[65dvh] rounded-t-2xl border-t bg-background shadow-2xl",
              // Tablets: overlay on the right; desktop: its own column.
              "md:absolute md:inset-x-auto md:bottom-auto md:right-0 md:top-0 md:z-10 md:w-[22rem] md:rounded-lg md:border md:shadow-lg",
              "lg:static lg:shadow-none",
              fullscreen ? "md:h-[calc(100dvh-7.5rem)]" : "md:h-[calc(100dvh-13rem)]",
            )}
          >
            <CompanionPanel
              bookId={id}
              bookTitle={title}
              locationKey={`${currentHref ?? ""}|${sectionIndex}`}
              resolveChapter={resolveChapter}
              selection={selection}
              onClearSelection={() => setSelection("")}
              onClose={() => setShowAi(false)}
              onCite={onCite}
              catalogEntry={catalogEntry}
              author={author}
              onLinkCatalog={(cid) => {
                setCatalogEntry(cid ? (CATALOG_BY_ID.get(cid) ?? null) : null);
                const stored = storedRef.current;
                if (stored) {
                  // "" records an explicit "not in the catalog" so auto-match stays off.
                  storedRef.current = { ...stored, catalogId: cid ?? "" };
                  void putBook(storedRef.current);
                }
              }}
            />
          </aside>
        )}
      </div>
    </div>
  );
}

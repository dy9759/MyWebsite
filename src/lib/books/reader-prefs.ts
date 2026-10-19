import { useState } from "react";
import { readJSON, writeJSON } from "@/lib/safe-storage";
import type { TargetPref } from "@/lib/books/translate";

// Per-browser reading layout preferences, shared by every book.
export type ReaderPrefs = {
  pdfSingle: boolean; // fixed layout: one page at a time instead of spreads
  pdfZoom: "fit-page" | "fit-width";
  fontSize: number; // reflowable: percent of the book's base size
  bilingual: boolean; // reflowable: show a translation under each paragraph
  translateTo: TargetPref;
};

const KEY = "books-reader-prefs-v1";
const DEFAULTS: ReaderPrefs = { pdfSingle: false, pdfZoom: "fit-page", fontSize: 100, bilingual: false, translateTo: "auto" };
export const FONT_MIN = 70;
export const FONT_MAX = 200;

function load(): ReaderPrefs {
  const v = readJSON<Partial<ReaderPrefs>>(KEY, {});
  return {
    pdfSingle: typeof v.pdfSingle === "boolean" ? v.pdfSingle : DEFAULTS.pdfSingle,
    pdfZoom: v.pdfZoom === "fit-width" ? "fit-width" : "fit-page",
    fontSize:
      typeof v.fontSize === "number" ? Math.min(FONT_MAX, Math.max(FONT_MIN, v.fontSize)) : DEFAULTS.fontSize,
    bilingual: v.bilingual === true,
    translateTo: v.translateTo === "zh" || v.translateTo === "en" ? v.translateTo : "auto",
  };
}

// The reader page renders client-side only (?id= lives in the URL), so the
// stored value can seed state directly.
export function useReaderPrefs() {
  const [prefs, setPrefs] = useState<ReaderPrefs>(() =>
    typeof window === "undefined" ? DEFAULTS : load(),
  );
  const update = (patch: Partial<ReaderPrefs>) =>
    setPrefs((cur) => {
      const next = { ...cur, ...patch };
      writeJSON(KEY, next);
      return next;
    });
  return [prefs, update] as const;
}

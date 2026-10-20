import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/books/companion";
import { clearTranslations, translateDoc, type Progress } from "@/lib/books/bilingual";
import type { TargetPref } from "@/lib/books/translate";
import type { AiAccess } from "@/lib/books/ai-access";

type Options = {
  enabled: boolean;
  pref: TargetPref;
  cfg: AiAccess | null;
  uiLang: Lang;
  getDocs: () => Document[]; // sections currently loaded in the reader
  docVersion: number; // bumped by the reader whenever a section loads
};

// Keeps every loaded section translated while the bilingual view is on;
// turning it off (or changing the language) aborts jobs and strips the
// inserted translations.
export function useBilingual({ enabled, pref, cfg, uiLang, getDocs, docVersion }: Options) {
  const jobs = useRef(new Map<Document, { pref: TargetPref; ac: AbortController }>());
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const live = new Set(getDocs());
    for (const [doc, job] of jobs.current) {
      const stale = !live.has(doc) || !enabled || job.pref !== pref;
      if (!stale) continue;
      job.ac.abort();
      jobs.current.delete(doc);
      if (live.has(doc)) clearTranslations(doc);
    }
    if (!enabled || !cfg) return;
    for (const doc of live) {
      if (jobs.current.has(doc)) continue;
      const ac = new AbortController();
      jobs.current.set(doc, { pref, ac });
      translateDoc(doc, { pref, cfg, uiLang, signal: ac.signal, onProgress: setProgress }).catch((e: unknown) => {
        if ((e as Error).name !== "AbortError") setError((e as Error).message);
      });
    }
  }, [enabled, pref, cfg, uiLang, getDocs, docVersion]);

  useEffect(() => {
    const running = jobs.current;
    return () => running.forEach((job) => job.ac.abort());
  }, []);

  return { progress: enabled ? progress : null, error: enabled ? error : "" };
}

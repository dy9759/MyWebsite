"use client";

import { useRef, useState } from "react";
import { Languages, Loader2, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import WikiByokPanel from "@/components/wiki/wiki-byok-panel";
import { streamChat } from "@/lib/books/companion";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";
import { getTranslations, putTranslations, translationKey } from "@/lib/books/store";
import { buildSelectionMessages, resolveTarget, type TargetPref } from "@/lib/books/translate";
import { useAiAccess } from "@/lib/books/ai-access";

type Props = {
  selection: string;
  pref: TargetPref;
  onDismiss: () => void;
};

// Floating bar over the page while text is selected: one click translates
// the selection (plus short term notes). Results are cached per passage.
export default function SelectionTranslate({ selection, pref, onDismiss }: Props) {
  const { language } = useLanguage();
  const cfg = useAiAccess();
  const [result, setResult] = useState<{ source: string; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const shown = result?.source === selection ? result.text : "";

  const translate = async () => {
    if (!cfg) return;
    const target = resolveTarget(pref, selection);
    const key = translationKey(`sel-${target}`, selection);
    const cached = (await getTranslations([key])).get(key);
    if (cached) return setResult({ source: selection, text: cached });
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setBusy(true);
    setError("");
    try {
      const text = await streamChat(
        cfg,
        buildSelectionMessages(selection, target, language),
        (t) => setResult({ source: selection, text: t }),
        language,
        ac.signal,
      );
      if (text) await putTranslations([[key, text]]);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="absolute inset-x-2 bottom-2 z-[3] mx-auto max-w-xl rounded-lg border bg-background/95 p-2 text-sm shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="line-clamp-1 min-w-0 flex-1 text-xs text-muted-foreground">「{selection}」</span>
        <button
          type="button"
          onClick={translate}
          disabled={!cfg || busy}
          className="inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-accent/10 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          {language === "zh" ? "翻译" : "Translate"}
        </button>
        <button type="button" onClick={onDismiss} aria-label="close" className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      {!cfg && (
        <div className="mt-2 text-xs">
          <WikiByokPanel />
        </div>
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      {shown && (
        <div
          className="mt-2 max-h-48 overflow-y-auto leading-6 [&_li]:mt-0.5 [&_p]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-xs [&_ul]:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(shown) }}
        />
      )}
    </div>
  );
}

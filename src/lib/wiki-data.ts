// Shared wiki data-layer: one home for the lazy-fetched JSON types, the
// cache-bust policy, and module-level caches so repeated mounts reuse one
// request instead of refetching per component.
import { WIKI_UI, wikiDemoReply, type WikiReply } from "@/content/wiki";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Deploy-stable content version — bump when regenerating search-index.json,
// practice.json, or the preview PNGs (replaces per-mount Date.now() busters).
export const WIKI_DATA_VERSION = "4";
export const PREVIEW_VERSION = "2";

export const vibePreviewUrl = (id: string) =>
  `${BASE_PATH}/wiki/vibe/previews/${id}.png?v=${PREVIEW_VERSION}`;

// A jump target into the Vibe Hub (from search or a lesson deep link).
export type TermJump = { topic: string; id: string; ts: number };

export type SearchEntry = {
  k: "term" | "loop" | "step" | "fde";
  id: string;
  topic?: string;
  title: string;
  en?: string;
  al?: string;
  tag?: string;
  cat?: string;
  ch?: number;
  chT?: string;
  step?: number;
};

export type PracticeQ = {
  id: string;
  q: string;
  options: { label: string; feedback: string; correct: boolean }[];
  term: {
    title: string;
    secondaryTitle?: string | null;
    tagline: string;
    description?: string | null;
    url?: string;
  };
};

// Module-level promise caches: one in-flight request per file per session.
let searchIndexP: Promise<SearchEntry[]> | null = null;
export const loadSearchIndex = (): Promise<SearchEntry[]> => {
  searchIndexP ??= fetch(`${BASE_PATH}/wiki/search-index.json?v=${WIKI_DATA_VERSION}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch((e) => {
      searchIndexP = null; // allow retry on the next call
      throw e;
    });
  return searchIndexP;
};

let practiceP: Promise<PracticeQ[]> | null = null;
export const loadPractice = (): Promise<PracticeQ[]> => {
  practiceP ??= fetch(`${BASE_PATH}/wiki/vibe/practice.json?v=${WIKI_DATA_VERSION}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch((e) => {
      practiceP = null;
      throw e;
    });
  return practiceP;
};

// One chat-send implementation for the /wiki chat and the lesson tutor:
// POST to the configured backend, graceful demo fallback otherwise.
export const WIKI_API_URL = process.env.NEXT_PUBLIC_WIKI_API_URL;
export const WIKI_CONNECTED = Boolean(WIKI_API_URL);

export async function askWiki(message: string, language: keyof typeof WIKI_UI): Promise<WikiReply> {
  if (!WIKI_API_URL) return wikiDemoReply(message, language);
  try {
    const res = await fetch(WIKI_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, language }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as WikiReply;
  } catch {
    return wikiDemoReply(message, language);
  }
}

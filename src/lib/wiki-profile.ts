// Learner profile for the 建造者学院 domain (original: onboarding writes name /
// role / product; lesson content personalizes on the {{project}} token). Kept
// in localStorage; falls back to the program's original anchors.
import { readJSON, writeJSON } from "@/lib/safe-storage";

export type WikiProfile = { name: string; role: string; project: string };

const KEY = "wiki-course-profile";
const TRAIT_KEY = "wiki-course-traits";

export const DEFAULT_PROFILE: WikiProfile = {
  name: "lsy",
  role: "AI 产品经理",
  project: "语音智能体",
};

export function getProfile(): WikiProfile | null {
  const p = readJSON<Partial<WikiProfile> | null>(KEY, null);
  return p && typeof p.name === "string" && typeof p.project === "string" ? (p as WikiProfile) : null;
}

export function setProfile(p: WikiProfile) {
  writeJSON(KEY, p);
}

export function clearProfile() {
  writeJSON(KEY, null);
}

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

// Replace the personalization token throughout a lesson object. Pure so the
// server render (default project) and the post-mount client render (stored
// profile) stay deterministic. Fields named "html" render via
// dangerouslySetInnerHTML, so the user-typed project string is HTML-escaped
// there (prevents stored self-XSS via the onboarding form).
export function deepPersonalize<T>(value: T, project: string, key?: string): T {
  if (typeof value === "string") {
    const safe = key === "html" ? escapeHtml(project) : project;
    return value.replaceAll("{{project}}", safe) as T;
  }
  if (Array.isArray(value)) return value.map((v) => deepPersonalize(v, project, key)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = deepPersonalize(v, project, k);
    }
    return out as T;
  }
  return value;
}

// 判断力画像 archive — dimension counts accumulated from judge-type games.
export function markTrait(dimension: string): void {
  const counts = getTraits();
  counts[dimension] = (counts[dimension] ?? 0) + 1;
  writeJSON(TRAIT_KEY, counts);
}

export function getTraits(): Record<string, number> {
  const v = readJSON<unknown>(TRAIT_KEY, {});
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, number>) : {};
}

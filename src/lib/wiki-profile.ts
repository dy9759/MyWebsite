// Learner profile for the 闭环学院 domain (original: onboarding writes name /
// role / product; lesson content personalizes on the {{project}} token). Kept
// in localStorage; falls back to the program's original anchors.
export type WikiProfile = { name: string; role: string; project: string };

const KEY = "wiki-course-profile";
const TRAIT_KEY = "wiki-course-traits";

export const DEFAULT_PROFILE: WikiProfile = {
  name: "lsy",
  role: "AI 产品经理",
  project: "语音智能体",
};

export function getProfile(): WikiProfile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as WikiProfile;
  } catch {
    /* storage unavailable */
  }
  return null;
}

export function setProfile(p: WikiProfile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function clearProfile() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

// Replace the personalization token throughout a lesson object. Pure so the
// server render (default project) and the post-mount client render (stored
// profile) stay deterministic.
export function deepPersonalize<T>(value: T, project: string): T {
  if (typeof value === "string") return value.replaceAll("{{project}}", project) as T;
  if (Array.isArray(value)) return value.map((v) => deepPersonalize(v, project)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = deepPersonalize(v, project);
    }
    return out as T;
  }
  return value;
}

// 判断力画像 archive — dimension counts accumulated from judge-type games.
export function markTrait(dimension: string): void {
  try {
    const raw = localStorage.getItem(TRAIT_KEY);
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[dimension] = (counts[dimension] ?? 0) + 1;
    localStorage.setItem(TRAIT_KEY, JSON.stringify(counts));
  } catch {
    /* ignore */
  }
}

export function getTraits(): Record<string, number> {
  try {
    const raw = localStorage.getItem(TRAIT_KEY);
    if (raw) return JSON.parse(raw) as Record<string, number>;
  } catch {
    /* ignore */
  }
  return {};
}

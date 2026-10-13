// One guarded localStorage layer (issue #96). Storage can be unavailable
// (blocked cookies, Safari private mode) or full; every read falls back and
// every write reports failure instead of throwing into the React tree.

export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: string | null): boolean {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// Parsed JSON or the fallback (missing, unreadable or malformed). Callers
// still validate the shape — this only guarantees no throw.
export function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// null removes the key.
export function writeJSON(key: string, value: unknown): boolean {
  return writeRaw(key, value === null ? null : JSON.stringify(value));
}

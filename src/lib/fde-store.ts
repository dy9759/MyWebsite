// FDE 能力测试 persistence — wrong-answer book + in-progress session, kept in
// localStorage so it works on the static export. All access is try/catch'd:
// storage can be unavailable (private mode), in which case nothing persists.
import type { FdeDomain, FdeQuestion, FdeResult } from "@/lib/fde-exam";

const WRONG_KEY = "fde-wrong-v1";
const SESSION_KEY = "fde-session-v1";
const HISTORY_KEY = "fde-history-v1";
const HISTORY_MAX = 50;

export type FdeMode = "full" | "practice" | "wrong";

export type FdeSession = {
  mode: FdeMode;
  domain: FdeDomain | null;
  questions: FdeQuestion[];
  answers: Record<string, number[]>;
  marks: string[];
  checked: string[]; // practice/wrong: questions whose answer has been revealed
  index: number;
  deadline: number | null; // epoch ms, full mode only
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function getWrong(): string[] {
  return read<string[]>(WRONG_KEY, []);
}

// Add ids answered wrong, drop ids answered right; returns the new book.
export function updateWrong(add: string[], remove: string[] = []): string[] {
  const next = new Set(getWrong());
  add.forEach((id) => next.add(id));
  remove.forEach((id) => next.delete(id));
  const list = Array.from(next);
  write(WRONG_KEY, list);
  return list;
}

// Drop ids no longer in the bank (e.g. after a re-import); returns the book.
export function pruneWrong(valid: Set<string>): string[] {
  const all = getWrong();
  const kept = all.filter((id) => valid.has(id));
  if (kept.length !== all.length) write(WRONG_KEY, kept);
  return kept;
}

export type FdeRecord = {
  at: number; // epoch ms
  mode: FdeMode;
  score: number;
  max: number;
  passed: boolean;
  byDomain: FdeResult["byDomain"];
};

export function getHistory(): FdeRecord[] {
  return read<FdeRecord[]>(HISTORY_KEY, []);
}

// Append a finished attempt, keeping the newest HISTORY_MAX.
export function addHistory(r: FdeRecord): FdeRecord[] {
  const list = [...getHistory(), r].slice(-HISTORY_MAX);
  write(HISTORY_KEY, list);
  return list;
}

export function loadSession(): FdeSession | null {
  return read<FdeSession | null>(SESSION_KEY, null);
}

export function saveSession(s: FdeSession | null) {
  write(SESSION_KEY, s);
}

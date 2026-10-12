// FDE 能力测试 persistence — wrong-answer book + in-progress session, kept in
// localStorage so it works on the static export. All access is try/catch'd:
// storage can be unavailable (private mode), in which case nothing persists.
import type { FdeDomain, FdeQuestion } from "@/lib/fde-exam";

const WRONG_KEY = "fde-wrong-v1";
const SESSION_KEY = "fde-session-v1";

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

export function loadSession(): FdeSession | null {
  return read<FdeSession | null>(SESSION_KEY, null);
}

export function saveSession(s: FdeSession | null) {
  write(SESSION_KEY, s);
}

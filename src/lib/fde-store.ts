// FDE 能力测试 persistence — wrong-answer book + in-progress session, kept in
// localStorage so it works on the static export. All access is try/catch'd:
// storage can be unavailable (private mode), in which case nothing persists.
import { applyOrder, type FdeDomain, type FdeQuestion, type FdeResult } from "@/lib/fde-exam";
import { readJSON, writeJSON } from "@/lib/safe-storage";

const WRONG_KEY = "fde-wrong-v1";
const SESSION_KEY = "fde-session-v1";
const HISTORY_KEY = "fde-history-v1";
const HISTORY_MAX = 50;

export type FdeMode = "full" | "practice" | "wrong";

export type FdeSession = {
  mode: FdeMode;
  domain: FdeDomain | null;
  lessons?: string[] | null; // practice scoped to academy lessons (FDE 认证篇)
  questions: FdeQuestion[];
  answers: Record<string, number[]>;
  marks: string[];
  checked: string[]; // practice/wrong: questions whose answer has been revealed
  index: number;
  deadline: number | null; // epoch ms, full mode only
};

const read = readJSON;
const write = writeJSON;

export function getWrong(): string[] {
  const v = read<unknown>(WRONG_KEY, []);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
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
  const v = read<unknown>(HISTORY_KEY, []);
  return Array.isArray(v) ? (v as FdeRecord[]).filter((r) => r && typeof r.score === "number" && r.byDomain) : [];
}

// Append a finished attempt, keeping the newest HISTORY_MAX.
export function addHistory(r: FdeRecord): FdeRecord[] {
  const list = [...getHistory(), r].slice(-HISTORY_MAX);
  write(HISTORY_KEY, list);
  return list;
}

// What is persisted: question ids + their option order, never copies of the
// questions — a re-imported bank must not be graded against stale answers
// (issue #97). `questions` is the pre-#97 format, still read for migration.
export type StoredItem = { id: string; order: number[] };
export type StoredSession = Omit<FdeSession, "questions"> & { items?: StoredItem[]; questions?: FdeQuestion[] };

export function compactSession(s: FdeSession): StoredSession {
  const { questions, ...rest } = s;
  return { ...rest, items: questions.map((q) => ({ id: q.id, order: q.order ?? q.options.map((_, i) => i) })) };
}

// Rebuild a session against the current bank. Questions that no longer exist
// (or whose options changed shape) are dropped along with their answers,
// marks and checks; returns null when nothing usable is left.
export function restoreSession(st: StoredSession, bank: FdeQuestion[]): FdeSession | null {
  const byId = new Map(bank.map((q) => [q.id, q]));
  const fromItems = (st.items ?? []).map(({ id, order }) => {
    const q = byId.get(id);
    return q ? applyOrder(q, order) : null;
  });
  // Legacy copies: recover the order from option text against the bank.
  const fromLegacy = (st.items ? [] : st.questions ?? []).map((old) => {
    const q = byId.get(old.id);
    return q ? applyOrder(q, old.options.map((t) => q.options.indexOf(t))) : null;
  });
  const questions = [...fromItems, ...fromLegacy].filter((q): q is FdeQuestion => q !== null);
  if (!questions.length) return null;
  const keep = new Set(questions.map((q) => q.id));
  const { items: _items, questions: _legacy, ...rest } = st;
  return {
    ...rest,
    questions,
    answers: Object.fromEntries(Object.entries(st.answers ?? {}).filter(([id]) => keep.has(id))),
    marks: (st.marks ?? []).filter((id) => keep.has(id)),
    checked: (st.checked ?? []).filter((id) => keep.has(id)),
    index: Math.min(Math.max(0, st.index ?? 0), questions.length - 1),
  };
}

export function loadSession(): StoredSession | null {
  const v = read<StoredSession | null>(SESSION_KEY, null);
  if (!v || typeof v !== "object" || !v.answers) return null;
  const n = Array.isArray(v.items) ? v.items.length : Array.isArray(v.questions) ? v.questions.length : 0;
  return n ? v : null;
}

export function saveSession(s: FdeSession | null) {
  write(SESSION_KEY, s ? compactSession(s) : null);
}

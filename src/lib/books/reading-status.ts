import { useEffect, useState } from "react";
import type { ReadingStatus } from "@/lib/books/catalog";
import { readJSON, writeJSON } from "@/lib/safe-storage";

// Per-visitor reading status for catalog entries (todo / reading / done),
// kept in this browser only.
const KEY = "books-catalog-status-v1";
const EVENT = "books-catalog-status-change";

type StatusMap = Record<string, ReadingStatus>;

export function useReadingStatus() {
  const [map, setMap] = useState<StatusMap>({});
  useEffect(() => {
    const sync = () => setMap(readJSON<StatusMap>(KEY, {}));
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const statusOf = (id: string): ReadingStatus => map[id] ?? "todo";
  const setStatus = (id: string, status: ReadingStatus) => {
    const next = { ...readJSON<StatusMap>(KEY, {}) };
    if (status === "todo") delete next[id];
    else next[id] = status;
    writeJSON(KEY, next);
    window.dispatchEvent(new Event(EVENT));
  };
  return { statusOf, setStatus, map };
}

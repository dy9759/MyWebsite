// Loop-completion progress for the 建造者学院 domain, kept in localStorage so it
// works on the static export. Seeded with the loops already finished on the
// original program (chapter 0).
import { readJSON, writeJSON } from "@/lib/safe-storage";

const KEY = "wiki-course-progress";
const SEED = ["vibe", "localserver", "url2page"];

export function getCompleted(): Set<string> {
  const v = readJSON<unknown>(KEY, null);
  return Array.isArray(v) ? new Set(v.filter((x): x is string => typeof x === "string")) : new Set(SEED);
}

export function markCompleted(lessonId: string): Set<string> {
  const done = getCompleted();
  done.add(lessonId);
  writeJSON(KEY, Array.from(done));
  return done;
}

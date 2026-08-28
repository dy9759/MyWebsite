// Loop-completion progress for the 建造者学院 domain, kept in localStorage so it
// works on the static export. Seeded with the loops already finished on the
// original program (chapter 0).
const KEY = "wiki-course-progress";
const SEED = ["vibe", "localserver", "url2page"];

export function getCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* storage unavailable → seed only */
  }
  return new Set(SEED);
}

export function markCompleted(lessonId: string): Set<string> {
  const done = getCompleted();
  done.add(lessonId);
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(done)));
  } catch {
    /* ignore */
  }
  return done;
}

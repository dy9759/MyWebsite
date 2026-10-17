// Horizontal swipe detection for page turning. foliate's paginator already
// swipes reflowable books; fixed-layout pages (PDF) and our own edge zones
// need this.

export type SwipeDir = "left" | "right";
type Point = { x: number; y: number; t: number };

const MIN_DISTANCE = 50; // px
const MAX_DURATION = 800; // ms — slower drags are reading/scrolling, not swipes

// A swipe must be mostly horizontal so vertical scrolling inside a
// fit-width PDF page never turns the page.
export function swipeDirection(start: Point, end: Point): SwipeDir | null {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (end.t - start.t > MAX_DURATION) return null;
  if (Math.abs(dx) < MIN_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return dx < 0 ? "left" : "right";
}

export function attachSwipe(target: EventTarget, onSwipe: (dir: SwipeDir) => void): () => void {
  let start: Point | null = null;
  const onStart = (e: Event) => {
    const te = e as TouchEvent;
    // Ignore pinch-zoom and multi-finger gestures.
    start = te.touches.length === 1 ? { x: te.touches[0].clientX, y: te.touches[0].clientY, t: Date.now() } : null;
  };
  const onEnd = (e: Event) => {
    const touch = (e as TouchEvent).changedTouches[0];
    if (!start || !touch) return;
    const dir = swipeDirection(start, { x: touch.clientX, y: touch.clientY, t: Date.now() });
    start = null;
    // A drag that selected text is a selection, not a swipe.
    const doc = (target as Node).ownerDocument ?? (target as Document);
    if (dir && !doc.getSelection?.()?.toString()) onSwipe(dir);
  };
  target.addEventListener("touchstart", onStart, { passive: true });
  target.addEventListener("touchend", onEnd, { passive: true });
  return () => {
    target.removeEventListener("touchstart", onStart);
    target.removeEventListener("touchend", onEnd);
  };
}

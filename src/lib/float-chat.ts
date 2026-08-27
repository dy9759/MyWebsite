// Shared geometry for the bottom-right floating chat window + FAB, used by
// both the /wiki chat (Tailwind arbitrary values) and the lesson tutor
// (inline styles). One source so the two overlays never drift apart.
export const FLOAT_CHAT = {
  width: "min(370px, calc(100vw - 2rem))",
  height: "min(480px, calc(100vh - 8rem))",
  // window offset: bottom-24 right-4 · FAB offset: bottom-6 right-4 (Tailwind scale)
  windowClass: "fixed bottom-24 right-4 z-40",
  fabClass: "fixed bottom-6 right-4 z-40",
} as const;

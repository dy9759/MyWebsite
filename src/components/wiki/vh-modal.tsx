"use client";

// Shared dialog for the Builder Lexicon / Taste term cards (issue #87):
// Escape + backdrop close, body scroll lock, and proper focus management —
// focus moves into the dialog, Tab / Shift+Tab stay inside it, and focus
// returns to the opener on close.
import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function VhModal({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close.current();
      if (e.key !== "Tab" || !dialog.current) return;
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return e.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  return (
    <div className="vh-modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={dialog}
        className="vh-modal theme-vibe"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="vh-modal-close" aria-label="关闭" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

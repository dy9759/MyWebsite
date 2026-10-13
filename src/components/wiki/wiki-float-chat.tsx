"use client";

// Floating companion window + its toggle button (bottom-right), shared by the
// /wiki page and the lesson tutor. Each page supplies its own header, theme
// and the WikiChat body as children.
import { FLOAT_CHAT } from "@/lib/float-chat";
import { cn } from "@/lib/utils";

export default function WikiFloatChat({
  open,
  onOpenChange,
  title,
  closeLabel,
  windowLabel,
  windowClassName,
  windowStyle,
  headerStyle,
  fab,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode; // header content left of the close button
  closeLabel: string;
  windowLabel?: string;
  windowClassName?: string;
  windowStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  fab: { label: React.ReactNode; ariaLabel: string; className?: string; style?: React.CSSProperties };
  children: React.ReactNode;
}) {
  return (
    <>
      {open ? (
        <aside
          aria-label={windowLabel}
          className={cn(FLOAT_CHAT.windowClass, "flex flex-col overflow-hidden", windowClassName)}
          style={{ width: FLOAT_CHAT.width, height: FLOAT_CHAT.height, ...windowStyle }}
        >
          <div className="flex items-center gap-2 border-b px-3 py-2" style={headerStyle}>
            {title}
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => onOpenChange(false)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          {children}
        </aside>
      ) : null}
      <button
        type="button"
        aria-label={fab.ariaLabel}
        onClick={() => onOpenChange(!open)}
        className={cn(FLOAT_CHAT.fabClass, "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg", fab.className)}
        style={fab.style}
      >
        {fab.label}
      </button>
    </>
  );
}

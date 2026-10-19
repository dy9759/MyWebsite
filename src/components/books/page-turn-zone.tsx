import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Click/tap strip along a page edge that turns the page; the arrow shows on
// hover so it stays out of the way of the text.
export default function PageTurnZone({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group absolute inset-y-0 z-[1] flex w-[7%] min-w-10 items-center",
        side === "left" ? "left-0 justify-start pl-1" : "right-0 justify-end pr-1",
      )}
    >
      <span className="rounded-full bg-background/80 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Icon className="h-5 w-5" />
      </span>
    </button>
  );
}

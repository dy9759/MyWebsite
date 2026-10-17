import { cn } from "@/lib/utils";

export type TocItem = { label: string; href: string; subitems?: TocItem[] | null };

type Props = {
  items: TocItem[];
  currentHref?: string;
  onSelect: (href: string) => void;
  depth?: number;
};

export default function BookToc({ items, currentHref, onSelect, depth = 0 }: Props) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={`${item.href}-${i}`}>
          <button
            type="button"
            onClick={() => onSelect(item.href)}
            style={{ paddingLeft: `${0.5 + depth * 0.9}rem` }}
            className={cn(
              "block w-full rounded py-1 pr-2 text-left hover:bg-accent/10",
              item.href === currentHref && "bg-accent/15 font-medium",
            )}
          >
            {item.label.trim()}
          </button>
          {item.subitems?.length ? (
            <BookToc items={item.subitems} currentHref={currentHref} onSelect={onSelect} depth={depth + 1} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

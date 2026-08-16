"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/language-toggle";
import { useSiteCopy } from "@/components/language-provider";
import { ModeToggle } from "@/components/mode-toggle";

const NAV_ITEMS = [
  { href: "/", labelKey: "home" },
  { href: "/projects", labelKey: "projects" },
  { href: "/lab", labelKey: "lab" },
  { href: "/research", labelKey: "research" },
  { href: "/ai", labelKey: "ai" },
] as const;

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

const SiteNav = () => {
  const pathname = usePathname();
  const copy = useSiteCopy();

  return (
    <nav
      aria-label={copy.mainNav}
      className="sticky top-0 z-50 mb-4 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="flex min-h-10 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto pr-2 text-sm sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground",
                  active && "border-foreground text-foreground",
                )}
              >
                {copy.nav[item.labelKey]}
              </Link>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1 border-l pl-2">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;

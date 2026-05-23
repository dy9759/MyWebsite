import { cn } from '@/lib/utils'

export type SectionRailNavItem = {
    href: string
    label: string
}

type SectionRailNavProps = {
    ariaLabel: string
    items: SectionRailNavItem[]
    label?: string
    className?: string
}

const SectionRailNav = ({
    ariaLabel,
    items,
    label,
    className,
}: SectionRailNavProps) => {
    return (
        <nav
            aria-label={ariaLabel}
            className={cn(
                'sticky top-28 z-40 hidden w-32 self-start md:flex',
                className,
            )}
        >
            <div className='flex w-full flex-col pl-3'>
                {label && (
                    <span className='mb-1 px-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground'>
                        {label}
                    </span>
                )}
                {items.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className='rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground'
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export default SectionRailNav

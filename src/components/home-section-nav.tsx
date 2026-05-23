'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'

const SECTION_ITEMS = [
    { href: '#profile', labelKey: 'name' },
    { href: '#contact', labelKey: 'contact' },
    { href: '#about', labelKey: 'about' },
    { href: '#work', labelKey: 'work' },
    { href: '#projects', labelKey: 'projects' },
    { href: '#open-source', labelKey: 'openSource' },
    { href: '#future-work', labelKey: 'futureWork' },
    { href: '#education', labelKey: 'education' },
    { href: '#achievements', labelKey: 'achievements' },
] as const

const HomeSectionNav = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()

    return (
        <nav
            aria-label={copy.sectionNav}
            className='sticky top-28 z-40 hidden w-32 self-start md:flex'
        >
            <div className='flex w-full flex-col border-l border-border/80 pl-3'>
                {SECTION_ITEMS.map((item) => {
                    const label =
                        item.labelKey === 'name'
                            ? config.name
                            : copy.sections[item.labelKey]

                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className='rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground'
                        >
                            {label}
                        </a>
                    )
                })}
            </div>
        </nav>
    )
}

export default HomeSectionNav

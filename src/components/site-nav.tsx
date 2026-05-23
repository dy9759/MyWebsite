'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LanguageToggle } from '@/components/language-toggle'
import { useSiteCopy } from '@/components/language-provider'
import { ModeToggle } from '@/components/mode-toggle'

const NAV_ITEMS = [
    { href: '/', labelKey: 'home' },
    { href: '/projects', labelKey: 'projects' },
    { href: '/ai', labelKey: 'ai' },
] as const

const isActivePath = (pathname: string, href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
}

const SiteNav = () => {
    const pathname = usePathname()
    const copy = useSiteCopy()

    return (
        <nav
            aria-label='主导航'
            className='sticky top-0 z-50 mb-8 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80'
        >
            <div className='relative flex min-h-10 items-center justify-center'>
                <div className='flex items-center justify-center gap-5 text-sm'>
                    {NAV_ITEMS.map((item) => {
                        const active = isActivePath(pathname, item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground',
                                    active &&
                                        'border-foreground text-foreground',
                                )}
                            >
                                {copy.nav[item.labelKey]}
                            </Link>
                        )
                    })}
                </div>
                <div className='absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1'>
                    <LanguageToggle />
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default SiteNav

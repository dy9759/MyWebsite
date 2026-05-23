'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { href: '/', label: '主页' },
    { href: '/projects', label: '项目' },
    { href: '/ai', label: 'AI资源库' },
]

const isActivePath = (pathname: string, href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
}

const SiteNav = () => {
    const pathname = usePathname()

    return (
        <nav
            aria-label='主导航'
            className='sticky top-0 z-50 mb-8 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80'
        >
            <div className='flex items-center gap-5 text-sm'>
                {NAV_ITEMS.map((item) => {
                    const active = isActivePath(pathname, item.href)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                                'border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground',
                                active && 'border-foreground text-foreground'
                            )}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default SiteNav

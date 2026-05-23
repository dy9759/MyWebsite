'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const isDark = resolvedTheme !== 'light'
    const label = isDark ? '切换到日版' : '切换到夜版'

    return (
        <Button
            variant='ghost'
            size='icon'
            aria-label={label}
            title={label}
            className='relative overflow-hidden text-muted-foreground transition-colors duration-200 hover:text-foreground'
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            <Icons.sun
                aria-hidden='true'
                data-icon='true'
                className='size-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0'
            />
            <Icons.moon
                aria-hidden='true'
                data-icon='true'
                className='absolute size-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100'
            />
            <span className='sr-only'>{label}</span>
        </Button>
    )
}

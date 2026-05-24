'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()
    const isChinese = language === 'zh'
    const nextLanguage = isChinese ? 'en' : 'zh'
    const label = isChinese ? 'Switch to English' : '切换到中文'
    const displayLabel = isChinese ? '中' : 'EN'

    return (
        <Button
            variant='ghost'
            size='icon'
            aria-label={label}
            title={label}
            className='text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground'
            onClick={() => setLanguage(nextLanguage)}
        >
            {displayLabel}
        </Button>
    )
}

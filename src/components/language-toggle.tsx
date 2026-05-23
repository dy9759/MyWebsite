'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
    useLanguage,
    useSiteCopy,
    type Language,
} from '@/components/language-provider'

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()
    const copy = useSiteCopy()

    return (
        <ToggleGroup
            type='single'
            value={language}
            onValueChange={(value) => {
                if (value === 'zh' || value === 'en') {
                    setLanguage(value as Language)
                }
            }}
            aria-label={copy.languageToggle}
            className='rounded-md border bg-background/80 p-0.5'
            size='sm'
        >
            <ToggleGroupItem
                value='zh'
                aria-label='切换到中文'
                className='min-w-8 px-2 text-xs'
            >
                中
            </ToggleGroupItem>
            <ToggleGroupItem
                value='en'
                aria-label='Switch to English'
                className='min-w-9 px-2 text-xs'
            >
                EN
            </ToggleGroupItem>
        </ToggleGroup>
    )
}

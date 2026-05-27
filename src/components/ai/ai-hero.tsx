'use client'

import { useAIConfig } from '@/components/language-provider'

const AIHero = () => {
    const aiConfig = useAIConfig()
    return (
        <section className='flex flex-col gap-3 px-4 animate-slide-from-down-and-fade-1'>
            <h1 className='text-3xl font-bold tracking-tight'>
                {aiConfig.hero.title}
            </h1>
            <p className='leading-relaxed text-muted-foreground'>
                {aiConfig.hero.intro}
            </p>
        </section>
    )
}

export default AIHero

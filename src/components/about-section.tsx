'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'

const AboutSection = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()

    return (
        <section
            id='about'
            className='scroll-mt-28 animate-slide-from-down-and-fade-2 space-y-3 px-4'
        >
            <h2 className='font-bold'>{copy.sections.about}</h2>
            <p className='leading-relaxed text-muted-foreground'>
                {config.description}
            </p>
        </section>
    )
}

export default AboutSection

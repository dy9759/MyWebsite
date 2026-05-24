'use client'

import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Card } from '@/components/ui/card'

const Qualifications = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const qualifications = config.qualifications ?? []

    if (qualifications.length === 0) return null

    return (
        <section
            id='qualifications'
            className='scroll-mt-28 animate-slide-from-down-and-fade-4 space-y-4 px-4'
        >
            <h2 className='font-bold'>{copy.sections.qualifications}</h2>
            <div className='grid gap-3 sm:grid-cols-2'>
                {qualifications.map((group, idx) => {
                    const Icon = Icons[group.icon]

                    return (
                        <Card
                            key={idx}
                            className='rounded-lg border border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:bg-accent/10 dark:hover:bg-accent/10'
                        >
                            <div className='flex items-start gap-3'>
                                <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-input bg-muted/40 text-muted-foreground'>
                                    <Icon className='size-4' />
                                </div>
                                <div className='min-w-0 space-y-2'>
                                    <h3 className='font-medium'>
                                        {group.title}
                                    </h3>
                                    <ul className='space-y-1.5 text-sm text-muted-foreground'>
                                        {group.items.map((item, itemIdx) => (
                                            <li
                                                key={itemIdx}
                                                className='flex gap-2 leading-relaxed'
                                            >
                                                <span
                                                    aria-hidden='true'
                                                    className='mt-2 size-1.5 shrink-0 rounded-full bg-accent'
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}

export default Qualifications

'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Card } from '@/components/ui/card'

const Education = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const education = config.education ?? []
    if (education.length === 0) return null

    return (
        <section className='animate-slide-from-down-and-fade-4 space-y-4 px-4'>
            <h2 className='font-bold'>{copy.sections.education}</h2>
            <div className='space-y-0'>
                {education.map((item, idx) => (
                    <Card
                        key={idx}
                        className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                            idx > 0 ? 'border-t-0' : ''
                        }`}
                    >
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex items-start justify-between gap-3'>
                                <div>
                                    <h3 className='font-medium'>
                                        {item.school}
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        {item.degree}
                                    </p>
                                </div>
                                {item.duration && (
                                    <span className='shrink-0 text-xs text-muted-foreground'>
                                        {item.duration}
                                    </span>
                                )}
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {item.field}
                            </p>
                            {item.details && (
                                <p className='text-xs text-muted-foreground'>
                                    {item.details}
                                </p>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Education

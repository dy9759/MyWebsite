'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ResearchProjectsProps = {
    variant?: 'standalone' | 'embedded'
}

const ResearchProjects = ({
    variant = 'standalone',
}: ResearchProjectsProps) => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const grants = config.research?.grants ?? []
    const embedded = variant === 'embedded'

    if (grants.length === 0) return null

    return (
        <section
            id='research-projects'
            className={cn(
                'scroll-mt-28',
                embedded
                    ? 'space-y-2'
                    : 'animate-slide-from-down-and-fade-3 space-y-4 px-4',
            )}
        >
            {embedded ? (
                <h3 className='text-sm font-medium text-muted-foreground'>
                    {copy.sections.researchProjects}
                </h3>
            ) : (
                <h2 className='font-bold'>{copy.sections.researchProjects}</h2>
            )}

            <div className='space-y-0'>
                {grants.map((grant, idx) => (
                    <Card
                        key={idx}
                        className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                            idx > 0 ? 'border-t-0' : ''
                        }`}
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-start justify-between gap-3'>
                                <h4 className='font-medium'>{grant.name}</h4>
                                <span className='shrink-0 text-xs text-muted-foreground'>
                                    {grant.duration}
                                </span>
                            </div>
                            <Badge
                                variant='outline'
                                className='self-start text-[10px]'
                            >
                                {grant.funding}
                            </Badge>
                            <dl className='mt-1 space-y-1.5 text-sm text-muted-foreground'>
                                <div className='flex gap-2'>
                                    <dt className='shrink-0 font-medium text-foreground/80'>
                                        {copy.labels.description}
                                    </dt>
                                    <dd>{grant.overview}</dd>
                                </div>
                                <div className='flex gap-2'>
                                    <dt className='shrink-0 font-medium text-foreground/80'>
                                        {copy.labels.role}
                                    </dt>
                                    <dd>{grant.role}</dd>
                                </div>
                                <div className='flex gap-2'>
                                    <dt className='shrink-0 font-medium text-foreground/80'>
                                        {copy.labels.outcomes}
                                    </dt>
                                    <dd>{grant.outcomes}</dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default ResearchProjects

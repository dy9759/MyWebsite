'use client'

import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import PinnedBadge from '@/components/pinned-badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { filterPinned, sortPinnedFirst } from '@/lib/pin'
import Link from 'next/link'

type OpenSourceProjectsProps = {
    variant?: 'standalone' | 'embedded'
    pinnedOnly?: boolean
}

const OpenSourceProjects = ({
    variant = 'standalone',
    pinnedOnly = false,
}: OpenSourceProjectsProps) => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const allProjects = sortPinnedFirst(config.openSourceProjects ?? [])
    const projects = pinnedOnly ? filterPinned(allProjects) : allProjects
    const embedded = variant === 'embedded'

    if (projects.length === 0) return null

    return (
        <section
            id='open-source'
            className={cn(
                'scroll-mt-28',
                embedded
                    ? 'space-y-2'
                    : 'animate-slide-from-down-and-fade-4 space-y-4 px-4',
            )}
        >
            <div className='flex flex-wrap items-center justify-between gap-3'>
                {embedded ? (
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {copy.sections.openSource}
                    </h3>
                ) : (
                    <h2 className='font-bold'>{copy.sections.openSource}</h2>
                )}
                <Button
                    asChild
                    variant='link'
                    size='sm'
                    className='h-auto px-0 text-muted-foreground underline hover:text-foreground'
                >
                    <Link
                        href='https://github.com/dy9759'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        GitHub
                        <Icons.arrowUpRight className='ml-0.5 size-4' />
                    </Link>
                </Button>
            </div>
            <div className='space-y-0'>
                {projects.map((project, idx) => (
                    <Card
                        key={idx}
                        className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                            idx > 0 ? 'border-t-0' : ''
                        }`}
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-start justify-between gap-3'>
                                <div>
                                    <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                        <h3 className='font-medium'>
                                            {project.name}
                                        </h3>
                                        {project.pinned && <PinnedBadge />}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        {project.repo}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant='ghost'
                                    size='icon'
                                    className='shrink-0'
                                >
                                    <Link
                                        href={project.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label={`${project.name} ${copy.labels.repository}`}
                                    >
                                        <Icons.github className='size-4' />
                                    </Link>
                                </Button>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {project.description}
                            </p>
                            <div className='mt-1 flex flex-wrap gap-1.5'>
                                {project.tags.map((tag, tagIdx) => {
                                    const Icon = Icons[tag.icon]
                                    return (
                                        <div
                                            key={tagIdx}
                                            className='flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground'
                                        >
                                            <Icon className='size-3' />
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default OpenSourceProjects

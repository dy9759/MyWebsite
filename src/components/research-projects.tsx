'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import PinToggle from '@/components/pin-toggle'
import SegmentList from '@/components/segment-list'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { filterPinned, sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

type ResearchProjectsProps = {
    variant?: 'standalone' | 'embedded'
    pinnedOnly?: boolean
}

const ResearchProjects = ({
    variant = 'standalone',
    pinnedOnly = false,
}: ResearchProjectsProps) => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const pinState = usePinnedItems()
    const grantItems = (config.research?.grants ?? []).map((grant, idx) => ({
        ...grant,
        pinKey: createPinKey('research-grant', idx),
    }))
    const allGrants = sortPinnedFirst(grantItems, (grant) =>
        pinState.isPinned(grant.pinKey, grant.pinned),
    )
    const grants = pinnedOnly
        ? filterPinned(allGrants, (grant) =>
              pinState.isPinned(grant.pinKey, grant.pinned),
          )
        : allGrants
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
                                <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                    <h4 className='font-medium'>
                                        {grant.name}
                                    </h4>
                                </div>
                                <div className='flex shrink-0 items-center gap-1'>
                                    <PinToggle
                                        pinned={pinState.isPinned(
                                            grant.pinKey,
                                            grant.pinned,
                                        )}
                                        label={grant.name}
                                        onToggle={() =>
                                            pinState.togglePinned(
                                                grant.pinKey,
                                                grant.pinned,
                                            )
                                        }
                                    />
                                    <span className='text-xs text-muted-foreground'>
                                        {grant.duration}
                                    </span>
                                </div>
                            </div>
                            <Badge
                                variant='outline'
                                className='self-start text-[10px]'
                            >
                                {grant.funding}
                            </Badge>
                            <SegmentList
                                className='mt-1'
                                segments={[
                                    {
                                        title: copy.labels.description,
                                        content: grant.overview,
                                    },
                                    {
                                        title: copy.labels.role,
                                        content: grant.role,
                                    },
                                    {
                                        title: copy.labels.outcomes,
                                        content: grant.outcomes,
                                    },
                                ]}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default ResearchProjects

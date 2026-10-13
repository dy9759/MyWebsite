'use client'

import React from 'react'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import {
    useCountLabel,
    useSiteConfig,
    useSiteCopy,
} from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { filterPinned } from '@/lib/pin'
import PinToggle from '@/components/pin-toggle'
import { usePinnedList } from '@/lib/use-pinned-items'
import { usePinEditMode } from '@/lib/use-pin-edit-mode'
import { byYearDesc } from '@/lib/year-sort'

const SELF_PATTERNS = ['Shengyuan Li', '李盛园']

const highlightSelf = (authors: string): React.ReactNode => {
    const pattern = new RegExp(`(${SELF_PATTERNS.join('|')})`, 'g')
    const parts = authors.split(pattern)
    return parts.map((part, i) =>
        SELF_PATTERNS.includes(part) ? (
            <strong key={i} className='font-semibold text-foreground'>
                {part}
            </strong>
        ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
        ),
    )
}

interface EntryProps {
    authors: string
    title: string
    venue: string
    year: string
    url?: string
    tier?: string
    pinned?: boolean
    onTogglePinned?: () => void
}

const Entry = ({
    authors,
    title,
    venue,
    year,
    url,
    tier,
    pinned,
    onTogglePinned,
}: EntryProps) => {
    const titleNode = url ? (
        <Link
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-start gap-1 font-medium hover:underline'
        >
            {title}
            <Icons.externalLink className='mt-1 size-3 shrink-0 text-muted-foreground group-hover:text-foreground' />
        </Link>
    ) : (
        <span className='font-medium'>{title}</span>
    )

    return (
        <Card className='rounded-none border-none bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10'>
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                        {titleNode}
                    </div>
                    <div className='flex shrink-0 items-center gap-1'>
                        {onTogglePinned && (
                            <PinToggle
                                pinned={pinned === true}
                                label={title}
                                onToggle={onTogglePinned}
                            />
                        )}
                        <span className='text-xs text-muted-foreground'>
                            {year}
                        </span>
                    </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                    {highlightSelf(authors)}
                </p>
                <p className='text-xs italic text-muted-foreground'>{venue}</p>
                {tier && (
                    <div className='mt-1'>
                        <Badge variant='outline' className='text-[10px]'>
                            {tier}
                        </Badge>
                    </div>
                )}
            </div>
        </Card>
    )
}

type AchievementsProps = {
    pinnedOnly?: boolean
}

const Achievements = ({ pinnedOnly = false }: AchievementsProps) => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const { editMode } = usePinEditMode()
    const withCount = useCountLabel()
    // Year-sorted first; usePinnedList then floats pinned items up (stable).
    const pubPins = usePinnedList(
        [...(config.research?.publications ?? [])].sort(byYearDesc),
        'research-publication',
        (publication) => publication.title,
    )
    const confPins = usePinnedList(
        [...(config.research?.conferences ?? [])].sort(byYearDesc),
        'research-conference',
        (conference) => conference.title,
    )
    const pubs = pinnedOnly
        ? filterPinned(pubPins.items, (p) => pubPins.isPinned(p.pinKey, p.pinned))
        : pubPins.items
    const confs = pinnedOnly
        ? filterPinned(confPins.items, (c) => confPins.isPinned(c.pinKey, c.pinned))
        : confPins.items
    // When pinnedOnly (home teaser), keep the header + "view all research"
    // link even with an empty pin set so the section stays discoverable.
    if (pubs.length === 0 && confs.length === 0 && !pinnedOnly) return null

    return (
        <section
            id='achievements'
            className='scroll-mt-28 animate-slide-from-down-and-fade-4 space-y-6 px-4'
        >
            {pinnedOnly && (
                <div className='flex items-center justify-between gap-3'>
                    <h2 className='font-bold'>{copy.sections.achievements}</h2>
                    <Button
                        asChild
                        variant='link'
                        size='sm'
                        className='h-auto px-0 text-muted-foreground underline hover:text-foreground'
                    >
                        <Link href='/research/'>
                            {copy.labels.viewAll}
                            <Icons.arrowUpRight className='ml-0.5 size-4' />
                        </Link>
                    </Button>
                </div>
            )}

            {pubs.length > 0 && (
                <div id='journal-papers' className='scroll-mt-28 space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {pinnedOnly
                            ? copy.sections.journalPapers
                            : withCount(
                                  copy.sections.journalPapers,
                                  pubs.length,
                              )}
                    </h3>
                    <div className='space-y-0'>
                        {pubs.map((p) => (
                            <Entry
                                key={p.pinKey}
                                authors={p.authors}
                                title={p.title}
                                venue={p.venue}
                                year={p.year}
                                url={p.url}
                                tier={p.tier}
                                pinned={pubPins.isPinned(p.pinKey, p.pinned)}
                                onTogglePinned={
                                    editMode
                                        ? () =>
                                              pubPins.togglePinned(p.pinKey, p.pinned)
                                        : undefined
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {confs.length > 0 && (
                <div id='conference-papers' className='scroll-mt-28 space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {pinnedOnly
                            ? copy.sections.conferencePapers
                            : withCount(
                                  copy.sections.conferencePapers,
                                  confs.length,
                              )}
                    </h3>
                    <div className='space-y-0'>
                        {confs.map((c) => (
                            <Entry
                                key={c.pinKey}
                                authors={c.authors}
                                title={c.title}
                                venue={c.venue}
                                year={c.year}
                                url={c.url}
                                pinned={confPins.isPinned(c.pinKey, c.pinned)}
                                onTogglePinned={
                                    editMode
                                        ? () =>
                                              confPins.togglePinned(c.pinKey, c.pinned)
                                        : undefined
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Achievements

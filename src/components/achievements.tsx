'use client'

import React from 'react'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import {
    useLanguage,
    useSiteConfig,
    useSiteCopy,
} from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { filterPinned, sortPinnedFirst } from '@/lib/pin'
import PinToggle from '@/components/pin-toggle'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'
import { usePinEditMode } from '@/lib/use-pin-edit-mode'

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

const EN_MONTHS: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
}

// 录用/Accepted = forthcoming, sorts above dated entries
const yearSortValue = (year: string): number => {
    if (year === '录用' || year === 'Accepted') return Number.MAX_SAFE_INTEGER
    const zh = year.match(/^(\d{4})(?:\.(\d{1,2}))?$/)
    if (zh) return Number(zh[1]) * 100 + Number(zh[2] ?? 0)
    const en = year.match(/^([A-Z][a-z]{2}) (\d{4})$/)
    if (en) return Number(en[2]) * 100 + (EN_MONTHS[en[1]] ?? 0)
    return 0
}

const byYearDesc = <T extends { year: string }>(a: T, b: T) =>
    yearSortValue(b.year) - yearSortValue(a.year)

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
    const { language } = useLanguage()
    const pinState = usePinnedItems()
    const { editMode } = usePinEditMode()
    const withCount = (label: string, count: number) =>
        language === 'zh' ? `${label}（${count}）` : `${label} (${count})`
    const publicationItems = (config.research?.publications ?? [])
        .map((publication, idx) => ({
            ...publication,
            pinKey: createPinKey('research-publication', idx),
        }))
        .sort(byYearDesc)
    const conferenceItems = (config.research?.conferences ?? [])
        .map((conference, idx) => ({
            ...conference,
            pinKey: createPinKey('research-conference', idx),
        }))
        .sort(byYearDesc)
    const allPubs = sortPinnedFirst(publicationItems, (publication) =>
        pinState.isPinned(publication.pinKey, publication.pinned),
    )
    const allConfs = sortPinnedFirst(conferenceItems, (conference) =>
        pinState.isPinned(conference.pinKey, conference.pinned),
    )
    const pubs = pinnedOnly
        ? filterPinned(allPubs, (publication) =>
              pinState.isPinned(publication.pinKey, publication.pinned),
          )
        : allPubs
    const confs = pinnedOnly
        ? filterPinned(allConfs, (conference) =>
              pinState.isPinned(conference.pinKey, conference.pinned),
          )
        : allConfs
    if (pubs.length === 0 && confs.length === 0) return null

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
                        {pubs.map((p, idx) => (
                            <Entry
                                key={idx}
                                authors={p.authors}
                                title={p.title}
                                venue={p.venue}
                                year={p.year}
                                url={p.url}
                                tier={p.tier}
                                pinned={pinState.isPinned(p.pinKey, p.pinned)}
                                onTogglePinned={
                                    editMode
                                        ? () =>
                                              pinState.togglePinned(
                                                  p.pinKey,
                                                  p.pinned,
                                              )
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
                        {confs.map((c, idx) => (
                            <Entry
                                key={idx}
                                authors={c.authors}
                                title={c.title}
                                venue={c.venue}
                                year={c.year}
                                url={c.url}
                                pinned={pinState.isPinned(c.pinKey, c.pinned)}
                                onTogglePinned={
                                    editMode
                                        ? () =>
                                              pinState.togglePinned(
                                                  c.pinKey,
                                                  c.pinned,
                                              )
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

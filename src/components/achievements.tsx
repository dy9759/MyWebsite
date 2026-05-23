'use client'

import React from 'react'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

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
    index: number
}

const Entry = ({
    authors,
    title,
    venue,
    year,
    url,
    tier,
    index,
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
        <Card
            className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                index > 0 ? 'border-t-0' : ''
            }`}
        >
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-start justify-between gap-3'>
                    <div>{titleNode}</div>
                    <span className='shrink-0 text-xs text-muted-foreground'>
                        {year}
                    </span>
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

const Achievements = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const pubs = config.research?.publications ?? []
    const confs = config.research?.conferences ?? []
    if (pubs.length === 0 && confs.length === 0) return null

    return (
        <section className='animate-slide-from-down-and-fade-4 space-y-6 px-4'>
            <h2 className='font-bold'>{copy.sections.achievements}</h2>

            {pubs.length > 0 && (
                <div className='space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {copy.sections.journalPapers}
                    </h3>
                    <div className='space-y-0'>
                        {pubs.map((p, idx) => (
                            <Entry
                                key={idx}
                                index={idx}
                                authors={p.authors}
                                title={p.title}
                                venue={p.venue}
                                year={p.year}
                                url={p.url}
                                tier={p.tier}
                            />
                        ))}
                    </div>
                </div>
            )}

            {confs.length > 0 && (
                <div className='space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {copy.sections.conferencePapers}
                    </h3>
                    <div className='space-y-0'>
                        {confs.map((c, idx) => (
                            <Entry
                                key={idx}
                                index={idx}
                                authors={c.authors}
                                title={c.title}
                                venue={c.venue}
                                year={c.year}
                                url={c.url}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Achievements

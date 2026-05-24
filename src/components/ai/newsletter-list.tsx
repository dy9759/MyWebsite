'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PinToggle from '@/components/pin-toggle'
import PinnedBadge from '@/components/pinned-badge'
import { AI_CONFIG } from '@/ai-config'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const NewsletterList = () => {
    const pinState = usePinnedItems()
    const newsletterItems = AI_CONFIG.newsletters.map((newsletter, idx) => ({
        ...newsletter,
        pinKey: createPinKey('ai-newsletter', idx),
    }))
    const newsletters = sortPinnedFirst(newsletterItems, (newsletter) =>
        pinState.isPinned(newsletter.pinKey, newsletter.pinned),
    )

    return (
        <section
            id='newsletters'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Newsletters & Articles</h2>
                <p className='text-sm text-muted-foreground'>
                    Writers who consistently publish signal over noise.
                </p>
            </div>

            <ul className='flex flex-col divide-y divide-border rounded-lg border'>
                {newsletters.map((n, idx) => (
                    <li
                        key={idx}
                        className='flex items-start justify-between gap-3 p-3 transition-colors hover:bg-accent/10'
                    >
                        <Link
                            href={n.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group min-w-0 flex-1'
                        >
                            <div className='flex min-w-0 flex-col gap-0.5'>
                                <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                    <h3 className='font-medium group-hover:underline'>
                                        {n.title}
                                    </h3>
                                    {pinState.isPinned(n.pinKey, n.pinned) && (
                                        <PinnedBadge />
                                    )}
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    {n.description}
                                </p>
                            </div>
                        </Link>
                        <div className='flex shrink-0 items-center gap-1'>
                            <PinToggle
                                pinned={pinState.isPinned(n.pinKey, n.pinned)}
                                label={n.title}
                                onToggle={() =>
                                    pinState.togglePinned(n.pinKey, n.pinned)
                                }
                            />
                            <ArrowUpRight className='size-4 shrink-0 text-muted-foreground' />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default NewsletterList

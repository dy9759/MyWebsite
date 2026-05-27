'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PinToggle from '@/components/pin-toggle'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const NewsletterList = () => {
    const pinState = usePinnedItems()
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const newsletterItems = aiConfig.newsletters.map((newsletter, idx) => ({
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
                <h2 className='text-xl font-bold'>
                    {copy.ai.newsletters.heading}
                </h2>
                <p className='text-sm text-muted-foreground'>
                    {copy.ai.newsletters.description}
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
                                <h3 className='font-medium group-hover:underline'>
                                    {n.title}
                                </h3>
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

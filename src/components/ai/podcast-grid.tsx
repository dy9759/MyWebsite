'use client'

import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import PinToggle from '@/components/pin-toggle'
import PinnedBadge from '@/components/pinned-badge'
import { AI_CONFIG } from '@/ai-config'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const PodcastGrid = () => {
    const pinState = usePinnedItems()
    const podcastItems = AI_CONFIG.podcasts.map((podcast, idx) => ({
        ...podcast,
        pinKey: createPinKey('ai-podcast', idx),
    }))
    const podcasts = sortPinnedFirst(podcastItems, (podcast) =>
        pinState.isPinned(podcast.pinKey, podcast.pinned),
    )

    return (
        <section
            id='podcasts'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Podcasts</h2>
                <p className='text-sm text-muted-foreground'>
                    Video podcasts I listen to regularly.
                </p>
            </div>

            <div className='overflow-x-auto rounded-lg border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Podcast</TableHead>
                            <TableHead className='hidden sm:table-cell'>
                                Description
                            </TableHead>
                            <TableHead className='w-10 text-right'>
                                Link
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {podcasts.map((podcast, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <div className='flex items-center gap-1.5'>
                                        <Link
                                            href={podcast.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='font-medium hover:underline'
                                        >
                                            {podcast.title}
                                        </Link>
                                        {podcast.featured && (
                                            <Badge
                                                variant='outline'
                                                className='gap-0.5 border-accent/60 text-[10px] text-accent'
                                            >
                                                <Star className='size-2.5 fill-current' />
                                                Rec
                                            </Badge>
                                        )}
                                        {pinState.isPinned(
                                            podcast.pinKey,
                                            podcast.pinned,
                                        ) && <PinnedBadge />}
                                    </div>
                                    <div className='mt-0.5 text-xs text-muted-foreground'>
                                        {podcast.host}
                                    </div>
                                    <div className='mt-1 text-xs text-muted-foreground sm:hidden'>
                                        {podcast.description}
                                    </div>
                                </TableCell>
                                <TableCell className='hidden text-sm text-muted-foreground sm:table-cell'>
                                    {podcast.description}
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-end'>
                                        <PinToggle
                                            pinned={pinState.isPinned(
                                                podcast.pinKey,
                                                podcast.pinned,
                                            )}
                                            label={podcast.title}
                                            onToggle={() =>
                                                pinState.togglePinned(
                                                    podcast.pinKey,
                                                    podcast.pinned,
                                                )
                                            }
                                            className='mr-1'
                                        />
                                        <Link
                                            href={podcast.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={podcast.title}
                                            className='text-muted-foreground hover:text-foreground'
                                        >
                                            <ArrowUpRight className='size-4' />
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default PodcastGrid

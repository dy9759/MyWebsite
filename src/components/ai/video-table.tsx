'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Youtube, FileText } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import VideoFilter from '@/components/ai/video-filter'
import { AI_CONFIG, type VideoTag } from '@/ai-config'

const VideoTable = () => {
    const videos = AI_CONFIG.videos

    const allTags = useMemo<VideoTag[]>(() => {
        const set = new Set<VideoTag>()
        for (const v of videos) for (const t of v.tags) set.add(t)
        return Array.from(set)
    }, [videos])

    const [selected, setSelected] = useState<VideoTag[]>([])

    const filtered = useMemo(() => {
        if (selected.length === 0) return videos
        return videos.filter((v) => v.tags.some((t) => selected.includes(t)))
    }, [videos, selected])

    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-2'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>YouTube Videos</h2>
                <p className='text-sm text-muted-foreground'>
                    Curated videos. Filter by tag.
                </p>
            </div>

            <VideoFilter
                tags={allTags}
                selected={selected}
                onSelectedChange={setSelected}
            />

            {filtered.length === 0 ? (
                <p className='py-6 text-center text-sm text-muted-foreground'>
                    No videos match the selected tags.
                </p>
            ) : (
                <div className='overflow-x-auto rounded-lg border'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className='hidden sm:table-cell'>
                                    Tags
                                </TableHead>
                                <TableHead className='w-20 text-right'>
                                    Links
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((video, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <Link
                                            href={video.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='font-medium hover:underline'
                                        >
                                            {video.title}
                                        </Link>
                                        <div className='mt-0.5 text-xs text-muted-foreground'>
                                            {video.channel} · {video.duration}
                                        </div>
                                        <div className='mt-1 flex flex-wrap gap-1 sm:hidden'>
                                            {video.tags.map((t) => (
                                                <Badge
                                                    key={t}
                                                    variant='outline'
                                                    className='text-[10px]'
                                                >
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className='hidden sm:table-cell'>
                                        <div className='flex flex-wrap gap-1'>
                                            {video.tags.map((t) => (
                                                <Badge
                                                    key={t}
                                                    variant='outline'
                                                >
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex items-center justify-end gap-1'>
                                            <Link
                                                href={video.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label='YouTube'
                                                className='text-muted-foreground hover:text-foreground'
                                            >
                                                <Youtube className='size-4' />
                                            </Link>
                                            {video.tldwUrl && (
                                                <Link
                                                    href={video.tldwUrl}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label='TLDW summary'
                                                    className='text-muted-foreground hover:text-foreground'
                                                >
                                                    <FileText className='size-4' />
                                                </Link>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </section>
    )
}

export default VideoTable

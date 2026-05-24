'use client'

import { Icons } from '@/components/icons'
import { useSiteCopy } from '@/components/language-provider'
import PinToggle from '@/components/pin-toggle'
import { ReadMore } from '@/components/read-more'
import SegmentList, { type SegmentListItem } from '@/components/segment-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectProps {
    name: string
    icon?: keyof typeof Icons
    description: string
    descriptionSegments?: SegmentListItem[]
    image?: string
    duration?: string
    url: string
    links?: {
        label: string
        url: string
    }[]
    tags: {
        name: string
        icon: keyof typeof Icons
    }[]
    testimonial?: string
    github?: string
    pinned?: boolean
    onTogglePinned?: () => void
    index?: number
}

const Project = ({
    name,
    icon,
    description,
    descriptionSegments,
    image,
    duration,
    url,
    links = [],
    tags,
    testimonial,
    github,
    pinned,
    onTogglePinned,
    index = 0,
}: ProjectProps) => {
    const Icon = icon ? Icons[icon] : undefined
    const copy = useSiteCopy()
    const hasHeaderActions = Boolean(onTogglePinned || github || url)
    const hasFooter = Boolean(tags.length || links.length)

    return (
        <Card
            className={`group rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background hover:bg-accent/10 dark:hover:bg-accent/10 hover:rounded-xl transition-all duration-300 p-4 ${
                index > 0 ? 'border-t-0' : ''
            }`}
        >
            <div className='flex flex-col gap-2'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex min-w-0 items-start gap-2'>
                        {Icon && (
                            <Icon className='h-12 w-12 shrink-0 transition-all saturate-100' />
                        )}
                        {image && (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt={`${name} icon`}
                                className='h-12 w-auto shrink-0 transition-all saturate-100'
                            />
                        )}
                        <div className='min-w-0'>
                            <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                <h3 className='font-medium'>{name}</h3>
                                {duration && (
                                    <span className='text-xs text-muted-foreground'>
                                        {duration}
                                    </span>
                                )}
                            </div>
                            {descriptionSegments?.length ? (
                                <SegmentList
                                    segments={descriptionSegments}
                                    className='mt-2'
                                />
                            ) : (
                                <p className='text-sm text-muted-foreground'>
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {hasHeaderActions && (
                        <div className='ml-2 flex shrink-0 flex-wrap items-center justify-end gap-1'>
                            {onTogglePinned && (
                                <PinToggle
                                    pinned={pinned === true}
                                    label={name}
                                    onToggle={onTogglePinned}
                                />
                            )}
                            <TooltipProvider delayDuration={70}>
                                {github && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                asChild
                                                size={'icon'}
                                                variant={'ghost'}
                                                className='shrink-0'
                                            >
                                                <Link
                                                    href={github}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label={`${name} ${copy.labels.repository}`}
                                                >
                                                    <Icons.github className='size-4' />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side='bottom'
                                            className='bg-transparent text-xs'
                                        >
                                            {copy.labels.sourceCode}
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                {url && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                asChild
                                                size={'icon'}
                                                variant={'ghost'}
                                                className='shrink-0'
                                            >
                                                <Link
                                                    href={url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label={
                                                        copy.labels.visitWebsite
                                                    }
                                                >
                                                    <Icons.externalLink className='size-4' />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side='bottom'
                                            className='bg-transparent text-xs'
                                        >
                                            {copy.labels.visitWebsite}
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                {hasFooter && (
                    <div className='mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                        {tags.length > 0 && (
                            <ul className='flex flex-wrap gap-1'>
                                {tags.map((tag, idx) => {
                                    const Icon = Icons[tag.icon]
                                    return (
                                        <li key={idx}>
                                            <Badge variant={'outline'}>
                                                <Icon className='mr-1.5 h-3 w-3 transition-all saturate-100' />{' '}
                                                {tag.name}
                                            </Badge>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        {links.length > 0 && (
                            <div className='flex flex-wrap gap-2 sm:ml-auto sm:justify-end'>
                                {links.map((link) => (
                                    <Button
                                        key={link.url}
                                        asChild
                                        variant='outline'
                                        size='sm'
                                        className='h-7 gap-1 px-2 text-xs'
                                    >
                                        <Link
                                            href={link.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={`${name} ${link.label}`}
                                        >
                                            <Icons.externalLink className='size-3' />
                                            {link.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {testimonial && (
                    <blockquote className='border-l-2 pl-6 text-sm italic text-muted-foreground'>
                        <ReadMore text={testimonial} id='d' />
                    </blockquote>
                )}
            </div>
        </Card>
    )
}

export default Project

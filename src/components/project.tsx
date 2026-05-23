'use client'

import { Icons } from '@/components/icons'
import { useSiteCopy } from '@/components/language-provider'
import PinnedBadge from '@/components/pinned-badge'
import { ReadMore } from '@/components/read-more'
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
import React from 'react'

interface ProjectProps {
    name: string
    icon?: keyof typeof Icons
    description: string
    image?: string
    duration?: string
    url: string
    tags: {
        name: string
        icon: keyof typeof Icons
    }[]
    testimonial?: string
    github?: string
    pinned?: boolean
    index?: number
}

const Project = ({
    name,
    icon,
    description,
    image,
    duration,
    url,
    tags,
    testimonial,
    github,
    pinned,
    index = 0,
}: ProjectProps) => {
    const Icon = Icons[icon!]
    const copy = useSiteCopy()

    return (
        <Card
            className={`group rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background hover:bg-accent/10 dark:hover:bg-accent/10 hover:rounded-xl transition-all duration-300 p-4 ${
                index > 0 ? 'border-t-0' : ''
            }`}
        >
            <div className='flex flex-col gap-2'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-2'>
                        {icon && (
                            <Icon className='h-12 w-12 shrink-0 transition-all saturate-100' />
                        )}
                        {image && (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt='fds'
                                className='h-12 w-auto shrink-0 transition-all saturate-100'
                            />
                        )}
                        <div>
                            <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                <h3 className='font-medium'>{name}</h3>
                                {pinned && <PinnedBadge />}
                                {duration && (
                                    <span className='text-xs text-muted-foreground'>
                                        {duration}
                                    </span>
                                )}
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {description}
                            </p>
                        </div>
                    </div>
                    {url && (
                        <div className='flex'>
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
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                <div>
                    {tags && (
                        <ul className='mt-2 flex flex-wrap gap-1'>
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
                </div>
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

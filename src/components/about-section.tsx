'use client'

import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import SegmentList from '@/components/segment-list'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { useRef, useState } from 'react'

const formatLinkLabel = (url: string) => {
    try {
        const parsed = new URL(url)
        return `${parsed.hostname}${parsed.pathname}`.replace(/\/$/, '')
    } catch {
        return url
    }
}

const AboutSection = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
    const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const copyText = async (label: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value)
        } catch {
            const textarea = document.createElement('textarea')
            textarea.value = value
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
        }

        setCopiedLabel(label)

        if (copiedTimer.current) {
            clearTimeout(copiedTimer.current)
        }

        copiedTimer.current = setTimeout(() => {
            setCopiedLabel(null)
        }, 1600)
    }

    return (
        <section
            id='about'
            className='scroll-mt-28 animate-slide-from-down-and-fade-2 space-y-4 px-4'
        >
            <h2 className='font-bold'>{copy.sections.about}</h2>
            {config.aboutSegments?.length ? (
                <SegmentList segments={config.aboutSegments} />
            ) : (
                <p className='leading-relaxed text-muted-foreground'>
                    {config.description}
                </p>
            )}
            <TooltipProvider delayDuration={70}>
                <div className='flex flex-wrap gap-1.5'>
                    {config.socials.map((social, idx) => {
                        const Icon = Icons[social.icon]
                        const fullLabel = `${social.name}: ${formatLinkLabel(
                            social.url,
                        )}`

                        return (
                            <Tooltip key={`social-${idx}`}>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant='outline'
                                        size='sm'
                                        className='h-8 gap-1.5 px-2.5 text-xs'
                                    >
                                        <Link
                                            href={social.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={fullLabel}
                                            title={fullLabel}
                                        >
                                            <Icon className='size-3.5' />
                                            {social.name}
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='bottom'>
                                    {fullLabel}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    {config.contactMethods?.map((method, idx) => {
                        const Icon = Icons[method.icon]
                        const fullLabel = `${method.label}: ${method.value}`

                        return (
                            <Tooltip key={`method-${idx}`}>
                                <TooltipTrigger asChild>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='sm'
                                        className='h-8 gap-1.5 px-2.5 text-xs'
                                        aria-label={fullLabel}
                                        title={fullLabel}
                                        onClick={() =>
                                            copyText(method.label, method.value)
                                        }
                                    >
                                        <Icon className='size-3.5' />
                                        {method.label}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='bottom'>
                                    {fullLabel}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </div>
            </TooltipProvider>
            {copiedLabel && (
                <div
                    role='status'
                    className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md'
                >
                    {copy.labels.copied}: {copiedLabel}
                </div>
            )}
        </section>
    )
}

export default AboutSection

'use client'

import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { usePinEditMode } from '@/lib/use-pin-edit-mode'
import { Pin } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SiteFooter = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const { editMode, toggleEditMode } = usePinEditMode()
    const pinEditLabel = editMode
        ? copy.labels.pinEditOff
        : copy.labels.pinEditOn

    return (
        <div className='mt-12 flex flex-col border-t pt-6 animate-slide-from-down-and-fade-5'>
            <div className='flex items-center justify-between px-4'>
                <p className='text-sm text-muted-foreground'>
                    © {new Date().getFullYear()} {config.name}
                </p>
                <div className='flex items-center gap-2'>
                    <TooltipProvider delayDuration={70}>
                        {config.socials.map((social, idx) => {
                            const Icon = Icons[social.icon]
                            return (
                                <Tooltip key={idx}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            asChild
                                            variant={'ghost'}
                                            className={cn(
                                                'size-10 p-0 text-muted-foreground transition-colors duration-200 hover:text-foreground',
                                            )}
                                        >
                                            <Link
                                                href={social.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label={social.name}
                                            >
                                                <Icon className='size-5' />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side='top'
                                        className='bg-transparent text-xs'
                                    >
                                        {social.name}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    aria-pressed={editMode}
                                    aria-label={pinEditLabel}
                                    onClick={toggleEditMode}
                                    className={cn(
                                        'size-10 p-0 text-muted-foreground transition-colors duration-200 hover:text-foreground',
                                        editMode && 'text-accent',
                                    )}
                                >
                                    <Pin
                                        className={cn(
                                            'size-5',
                                            editMode && 'fill-current',
                                        )}
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side='top'
                                className='bg-transparent text-xs'
                            >
                                {pinEditLabel}
                            </TooltipContent>
                        </Tooltip>
                        <ModeToggle />
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default SiteFooter

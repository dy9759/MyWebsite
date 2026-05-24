'use client'

import { useSiteCopy } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Pin } from 'lucide-react'

type PinToggleProps = {
    pinned: boolean
    label: string
    onToggle: () => void
    className?: string
}

const PinToggle = ({ pinned, label, onToggle, className }: PinToggleProps) => {
    const copy = useSiteCopy()
    const actionLabel = pinned ? copy.labels.unpin : copy.labels.pin

    return (
        <Button
            type='button'
            variant='ghost'
            size='icon'
            aria-pressed={pinned}
            aria-label={`${actionLabel}: ${label}`}
            title={`${actionLabel}: ${label}`}
            onClick={onToggle}
            className={cn(
                'size-7 shrink-0 text-muted-foreground hover:bg-accent/10 hover:text-accent',
                pinned && 'text-accent',
                className,
            )}
        >
            <Pin className={cn('size-3.5', pinned && 'fill-current')} />
        </Button>
    )
}

export default PinToggle

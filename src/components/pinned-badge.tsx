'use client'

import { useSiteCopy } from '@/components/language-provider'
import { Badge } from '@/components/ui/badge'
import { Pin } from 'lucide-react'

type PinnedBadgeProps = {
    label?: string
}

const PinnedBadge = ({ label }: PinnedBadgeProps) => {
    const copy = useSiteCopy()

    return (
        <Badge
            variant='outline'
            className='gap-1 border-accent/60 text-[10px] text-accent'
        >
            <Pin className='size-2.5 fill-current' />
            {label ?? copy.labels.pinned}
        </Badge>
    )
}

export default PinnedBadge

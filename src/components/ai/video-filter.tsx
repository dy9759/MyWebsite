'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { VideoTag } from '@/ai-config'

interface VideoFilterProps {
    tags: VideoTag[]
    selected: VideoTag[]
    onSelectedChange: (next: VideoTag[]) => void
}

const VideoFilter = ({ tags, selected, onSelectedChange }: VideoFilterProps) => {
    return (
        <ToggleGroup
            type='multiple'
            value={selected}
            onValueChange={(next) => onSelectedChange(next as VideoTag[])}
            variant='outline'
            size='sm'
            className='flex flex-wrap justify-start gap-2'
        >
            {tags.map((tag) => (
                <ToggleGroupItem key={tag} value={tag} aria-label={tag}>
                    {tag}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}

export default VideoFilter

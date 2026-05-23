'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { VideoTag } from '@/ai-config'

export type VideoFilterValue = VideoTag | 'All'

interface VideoFilterProps {
    tags: VideoTag[]
    selected: VideoFilterValue
    onSelectedChange: (next: VideoFilterValue) => void
}

const VideoFilter = ({ tags, selected, onSelectedChange }: VideoFilterProps) => {
    return (
        <ToggleGroup
            type='single'
            value={selected}
            onValueChange={(next) =>
                onSelectedChange((next || 'All') as VideoFilterValue)
            }
            variant='outline'
            size='sm'
            className='flex flex-wrap justify-start gap-2'
        >
            <ToggleGroupItem value='All' aria-label='All videos'>
                All
            </ToggleGroupItem>
            {tags.map((tag) => (
                <ToggleGroupItem key={tag} value={tag} aria-label={tag}>
                    {tag}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}

export default VideoFilter

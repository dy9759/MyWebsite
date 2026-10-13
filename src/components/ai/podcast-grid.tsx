'use client'

import PinnedLinkTable from '@/components/ai/pinned-link-table'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { usePinnedList } from '@/lib/use-pinned-items'

const PodcastGrid = () => {
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const { items, isPinned, togglePinned } = usePinnedList(aiConfig.podcasts, 'ai-podcast', (podcast) => podcast.title)

    return (
        <section
            id='podcasts'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{copy.ai.podcasts.heading}</h2>
                <p className='text-sm text-muted-foreground'>{copy.ai.podcasts.description}</p>
            </div>
            <PinnedLinkTable
                items={items}
                columns={copy.ai.podcasts.columns}
                nameOf={(podcast) => podcast.title}
                subtitleOf={(podcast) => podcast.host}
                isPinned={isPinned}
                togglePinned={togglePinned}
            />
        </section>
    )
}

export default PodcastGrid

'use client'

import { Badge } from '@/components/ui/badge'
import { useAIConfig } from '@/components/language-provider'

interface LayerWrapProps {
    id: string
    layerIndex: number
    animationDelay?: 1 | 2 | 3 | 4 | 5 | 6
    children: React.ReactNode
}

const DELAY_CLASS: Record<number, string> = {
    1: 'animate-slide-from-down-and-fade-1',
    2: 'animate-slide-from-down-and-fade-2',
    3: 'animate-slide-from-down-and-fade-3',
    4: 'animate-slide-from-down-and-fade-4',
    5: 'animate-slide-from-down-and-fade-5',
    6: 'animate-slide-from-down-and-fade-6',
}

const LayerWrap = ({
    id,
    layerIndex,
    animationDelay = 2,
    children,
}: LayerWrapProps) => {
    const aiConfig = useAIConfig()
    const layer = aiConfig.sources?.[layerIndex]
    if (!layer) return null

    return (
        <section
            id={id}
            className={`scroll-mt-28 flex flex-col gap-6 px-4 ${DELAY_CLASS[animationDelay]}`}
        >
            <div className='flex flex-col gap-1 border-l-4 border-accent/60 pl-3'>
                <div className='flex items-center gap-2'>
                    <Badge
                        variant='outline'
                        className='border-accent text-[11px] font-medium text-accent'
                    >
                        {layer.layer}
                    </Badge>
                    <h2 className='text-2xl font-bold'>{layer.title}</h2>
                </div>
                {layer.description && (
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                        {layer.description}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-8'>{children}</div>
        </section>
    )
}

export default LayerWrap

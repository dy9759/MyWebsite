'use client'

import { Sparkles } from 'lucide-react'
import PinnedLinkTable from '@/components/ai/pinned-link-table'
import { Icons } from '@/components/icons'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { usePinnedList } from '@/lib/use-pinned-items'

const ProductGrid = () => {
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const { items, isPinned, togglePinned } = usePinnedList(aiConfig.products, 'ai-product', (product) => product.name)

    return (
        <section
            id='products'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{copy.ai.products.heading}</h2>
                <p className='text-sm text-muted-foreground'>{copy.ai.products.description}</p>
            </div>
            <PinnedLinkTable
                items={items}
                columns={copy.ai.products.columns}
                nameOf={(product) => product.name}
                iconOf={(product) => (product.icon ? Icons[product.icon] : Sparkles)}
                isPinned={isPinned}
                togglePinned={togglePinned}
            />
        </section>
    )
}

export default ProductGrid

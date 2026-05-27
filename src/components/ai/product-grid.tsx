'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles, Star } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import PinToggle from '@/components/pin-toggle'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const ProductGrid = () => {
    const pinState = usePinnedItems()
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const productItems = aiConfig.products.map((product, idx) => ({
        ...product,
        pinKey: createPinKey('ai-product', idx),
    }))
    const products = sortPinnedFirst(productItems, (product) =>
        pinState.isPinned(product.pinKey, product.pinned),
    )

    return (
        <section
            id='products'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{copy.ai.products.heading}</h2>
                <p className='text-sm text-muted-foreground'>
                    {copy.ai.products.description}
                </p>
            </div>

            <div className='overflow-x-auto rounded-lg border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className='hidden sm:table-cell'>
                                Why I use it
                            </TableHead>
                            <TableHead className='w-10 text-right'>
                                Link
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, idx) => {
                            const Icon = product.icon
                                ? Icons[product.icon]
                                : Sparkles
                            return (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <Icon className='size-4 shrink-0 text-muted-foreground' />
                                            <Link
                                                href={product.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='font-medium hover:underline'
                                            >
                                                {product.name}
                                            </Link>
                                            {product.featured && (
                                                <Badge
                                                    variant='outline'
                                                    className='gap-0.5 border-accent/60 text-[10px] text-accent'
                                                >
                                                    <Star className='size-2.5 fill-current' />
                                                    Rec
                                                </Badge>
                                            )}
                                        </div>
                                        <div className='mt-1 text-xs text-muted-foreground sm:hidden'>
                                            {product.description}
                                        </div>
                                    </TableCell>
                                    <TableCell className='hidden text-sm text-muted-foreground sm:table-cell'>
                                        {product.description}
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex justify-end gap-1'>
                                            <PinToggle
                                                pinned={pinState.isPinned(
                                                    product.pinKey,
                                                    product.pinned,
                                                )}
                                                label={product.name}
                                                onToggle={() =>
                                                    pinState.togglePinned(
                                                        product.pinKey,
                                                        product.pinned,
                                                    )
                                                }
                                            />
                                            <Link
                                                href={product.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label={product.name}
                                                className='text-muted-foreground hover:text-foreground'
                                            >
                                                <ArrowUpRight className='size-4' />
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default ProductGrid

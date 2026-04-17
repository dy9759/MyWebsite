import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { AI_CONFIG } from '@/ai-config'

const ProductGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Recommended Products</h2>
                <p className='text-sm text-muted-foreground'>
                    Tools I personally use.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.products.map((product, idx) => {
                    const Icon = product.icon
                        ? Icons[product.icon]
                        : Sparkles
                    return (
                        <Link
                            key={idx}
                            href={product.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group'
                        >
                            <Card className='flex items-start gap-3 p-4 transition-colors hover:bg-accent/10'>
                                <Icon className='mt-0.5 size-5 shrink-0 text-muted-foreground' />
                                <div className='flex min-w-0 flex-col gap-1'>
                                    <div className='flex items-center gap-1.5'>
                                        <h3 className='font-medium group-hover:underline'>
                                            {product.name}
                                        </h3>
                                        <ArrowUpRight className='size-3 text-muted-foreground' />
                                    </div>
                                    <p className='text-sm text-muted-foreground'>
                                        {product.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default ProductGrid

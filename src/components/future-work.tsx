import { Icons } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { CONFIG } from '@/config'

const FutureWork = () => {
    const futureWork = CONFIG.futureWork ?? []
    if (futureWork.length === 0) return null

    return (
        <section className='animate-slide-from-down-and-fade-4 space-y-4 px-4'>
            <h2 className='font-bold'>未来工作</h2>
            <div className='space-y-0'>
                {futureWork.map((item, idx) => (
                    <Card
                        key={idx}
                        className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                            idx > 0 ? 'border-t-0' : ''
                        }`}
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                <h3 className='font-medium'>{item.name}</h3>
                                <span className='text-xs text-muted-foreground'>
                                    {item.direction}
                                </span>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {item.description}
                            </p>
                            <div className='mt-1 flex flex-wrap gap-1.5'>
                                {item.tags.map((tag, tagIdx) => {
                                    const Icon = Icons[tag.icon]
                                    return (
                                        <div
                                            key={tagIdx}
                                            className='flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground'
                                        >
                                            <Icon className='size-3' />
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default FutureWork

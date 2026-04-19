import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AI_CONFIG } from '@/ai-config'

const ItemLink = ({
    name,
    url,
    note,
}: {
    name: string
    url?: string
    note?: string
}) => {
    const content = (
        <span className='inline-flex items-center gap-1'>
            {name}
            {url && (
                <ArrowUpRight className='size-3 text-muted-foreground group-hover:text-foreground' />
            )}
            {note && (
                <span className='text-xs text-muted-foreground'>· {note}</span>
            )}
        </span>
    )
    if (!url) return <span className='text-muted-foreground'>{content}</span>
    return (
        <Link
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='group hover:text-foreground hover:underline'
        >
            {content}
        </Link>
    )
}

const InformationSources = () => {
    const layers = AI_CONFIG.sources ?? []
    const usage = AI_CONFIG.sourcesUsage ?? []
    if (layers.length === 0) return null

    return (
        <section
            id='sources'
            className='flex flex-col gap-5 px-4 animate-slide-from-down-and-fade-4 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Information Sources · 信息源层级</h2>
                <p className='text-sm text-muted-foreground'>
                    我追踪 AI 与科技行业信息的五层体系,从广度到深度。
                </p>
            </div>

            {usage.length > 0 && (
                <div className='rounded-lg border border-accent/60 bg-accent/5 p-4'>
                    <div className='mb-2 text-xs font-medium uppercase tracking-wide text-accent'>
                        我的用法 · How I use it
                    </div>
                    <ol className='flex flex-col gap-2 text-sm text-muted-foreground'>
                        {usage.map((u, i) => (
                            <li key={i} className='flex gap-2'>
                                <span className='shrink-0 font-medium text-foreground'>
                                    {i + 1}.
                                </span>
                                <div className='flex flex-col gap-1'>
                                    <span>{u.rule}</span>
                                    {u.examples && u.examples.length > 0 && (
                                        <ul className='flex flex-col gap-0.5 pl-4 text-xs'>
                                            {u.examples.map((ex, j) => (
                                                <li key={j}>
                                                    <ItemLink {...ex} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className='flex flex-col gap-4'>
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className='rounded-lg border p-4 transition-colors hover:bg-accent/5'
                    >
                        <div className='flex flex-wrap items-baseline gap-2'>
                            <Badge
                                variant='outline'
                                className='border-accent/60 text-[10px] text-accent'
                            >
                                {layer.layer}
                            </Badge>
                            <h3 className='font-medium'>{layer.title}</h3>
                        </div>
                        {layer.description && (
                            <p className='mt-2 text-sm text-muted-foreground'>
                                {layer.description}
                            </p>
                        )}

                        {layer.items && layer.items.length > 0 && (
                            <ul className='mt-3 flex flex-col gap-1 text-sm'>
                                {layer.items.map((it, i) => (
                                    <li key={i}>
                                        <ItemLink {...it} />
                                    </li>
                                ))}
                            </ul>
                        )}

                        {layer.groups && layer.groups.length > 0 && (
                            <div className='mt-3 flex flex-col gap-3'>
                                {layer.groups.map((g, gi) => (
                                    <div key={gi}>
                                        <div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                            {g.label}
                                        </div>
                                        <ul className='mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm'>
                                            {g.items.map((it, ii) => (
                                                <li key={ii}>
                                                    <ItemLink {...it} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default InformationSources

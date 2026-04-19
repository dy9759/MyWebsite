import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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

interface SourcesBlockProps {
    layerIndex: number
    title?: string
}

const SourcesBlock = ({ layerIndex, title }: SourcesBlockProps) => {
    const layer = AI_CONFIG.sources?.[layerIndex]
    if (!layer) return null

    const hasItems = layer.items && layer.items.length > 0
    const hasGroups = layer.groups && layer.groups.length > 0
    if (!hasItems && !hasGroups) return null

    return (
        <div className='rounded-lg border p-4'>
            {title && <h3 className='mb-3 text-sm font-semibold'>{title}</h3>}

            {hasItems && (
                <ul className='flex flex-col gap-1 text-sm'>
                    {layer.items!.map((it, i) => (
                        <li key={i}>
                            <ItemLink {...it} />
                        </li>
                    ))}
                </ul>
            )}

            {hasGroups && (
                <div className='flex flex-col gap-3'>
                    {layer.groups!.map((g, gi) => (
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
    )
}

export default SourcesBlock

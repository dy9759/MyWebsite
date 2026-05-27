'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PinToggle from '@/components/pin-toggle'
import { useAIConfig } from '@/components/language-provider'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const ItemLink = ({
    name,
    url,
    note,
    pinned,
    onTogglePinned,
}: {
    name: string
    url?: string
    note?: string
    pinned?: boolean
    onTogglePinned?: () => void
}) => {
    const content = (
        <>
            {name}
            {url && (
                <ArrowUpRight className='size-3 text-muted-foreground group-hover:text-foreground' />
            )}
            {note && (
                <span className='text-xs text-muted-foreground'>· {note}</span>
            )}
        </>
    )
    const title = url ? (
        <Link
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex flex-wrap items-center gap-1 hover:text-foreground hover:underline'
        >
            {content}
        </Link>
    ) : (
        <span className='inline-flex flex-wrap items-center gap-1 text-muted-foreground'>
            {content}
        </span>
    )

    return (
        <span className='inline-flex items-center gap-1'>
            {title}
            {onTogglePinned && (
                <PinToggle
                    pinned={pinned === true}
                    label={name}
                    onToggle={onTogglePinned}
                />
            )}
        </span>
    )
}

interface SourcesBlockProps {
    layerIndex: number
    title?: string
}

const SourcesBlock = ({ layerIndex, title }: SourcesBlockProps) => {
    const pinState = usePinnedItems()
    const aiConfig = useAIConfig()
    const layer = aiConfig.sources?.[layerIndex]
    if (!layer) return null

    const items = sortPinnedFirst(
        (layer.items ?? []).map((item, idx) => ({
            ...item,
            pinKey: createPinKey('ai-source', layerIndex, 'item', idx),
        })),
        (item) => pinState.isPinned(item.pinKey, item.pinned),
    )
    const groups = (layer.groups ?? []).map((group) => ({
        ...group,
        items: sortPinnedFirst(
            group.items.map((item, idx) => ({
                ...item,
                pinKey: createPinKey('ai-source', layerIndex, group.label, idx),
            })),
            (item) => pinState.isPinned(item.pinKey, item.pinned),
        ),
    }))
    const hasItems = items.length > 0
    const hasGroups = groups.length > 0
    if (!hasItems && !hasGroups) return null

    return (
        <div className='rounded-lg border p-4'>
            {title && <h3 className='mb-3 text-sm font-semibold'>{title}</h3>}

            {hasItems && (
                <ul className='flex flex-col gap-1 text-sm'>
                    {items.map((it, i) => (
                        <li key={i}>
                            <ItemLink
                                {...it}
                                pinned={pinState.isPinned(it.pinKey, it.pinned)}
                                onTogglePinned={() =>
                                    pinState.togglePinned(it.pinKey, it.pinned)
                                }
                            />
                        </li>
                    ))}
                </ul>
            )}

            {hasGroups && (
                <div className='flex flex-col gap-3'>
                    {groups.map((g, gi) => (
                        <div key={gi}>
                            <div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                {g.label}
                            </div>
                            <ul className='mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm'>
                                {g.items.map((it, ii) => (
                                    <li key={ii}>
                                        <ItemLink
                                            {...it}
                                            pinned={pinState.isPinned(
                                                it.pinKey,
                                                it.pinned,
                                            )}
                                            onTogglePinned={() =>
                                                pinState.togglePinned(
                                                    it.pinKey,
                                                    it.pinned,
                                                )
                                            }
                                        />
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

'use client'

// Pinnable link table shared by the podcast and product sections (issue #88):
// name + optional icon / subtitle, description column, pin toggle and link.
import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import PinToggle from '@/components/pin-toggle'

type Row = {
    pinKey: string
    url: string
    description?: string
    featured?: boolean
    pinned?: boolean
}

export default function PinnedLinkTable<T extends Row>({
    items,
    columns,
    nameOf,
    subtitleOf,
    iconOf,
    isPinned,
    togglePinned,
}: {
    items: T[]
    columns: { name: string; description: string; link: string }
    nameOf: (item: T) => string
    subtitleOf?: (item: T) => React.ReactNode
    iconOf?: (item: T) => React.ComponentType<{ className?: string }>
    isPinned: (key: string, defaultPinned?: boolean) => boolean
    togglePinned: (key: string, defaultPinned?: boolean) => void
}) {
    return (
        <div className='overflow-x-auto rounded-lg border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{columns.name}</TableHead>
                        <TableHead className='hidden sm:table-cell'>{columns.description}</TableHead>
                        <TableHead className='w-10 text-right'>{columns.link}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => {
                        const name = nameOf(item)
                        const Icon = iconOf?.(item)
                        const subtitle = subtitleOf?.(item)
                        return (
                            <TableRow key={item.pinKey}>
                                <TableCell>
                                    <div className='flex items-center gap-1.5'>
                                        {Icon ? <Icon className='size-4 shrink-0 text-muted-foreground' /> : null}
                                        <Link href={item.url} target='_blank' rel='noopener noreferrer' className='font-medium hover:underline'>
                                            {name}
                                        </Link>
                                        {item.featured && (
                                            <Badge variant='outline' className='gap-0.5 border-accent/60 text-[10px] text-accent'>
                                                <Star className='size-2.5 fill-current' />
                                                Rec
                                            </Badge>
                                        )}
                                    </div>
                                    {subtitle ? <div className='mt-0.5 text-xs text-muted-foreground'>{subtitle}</div> : null}
                                    <div className='mt-1 text-xs text-muted-foreground sm:hidden'>{item.description}</div>
                                </TableCell>
                                <TableCell className='hidden text-sm text-muted-foreground sm:table-cell'>{item.description}</TableCell>
                                <TableCell>
                                    <div className='flex justify-end gap-1'>
                                        <PinToggle
                                            pinned={isPinned(item.pinKey, item.pinned)}
                                            label={name}
                                            onToggle={() => togglePinned(item.pinKey, item.pinned)}
                                        />
                                        <Link
                                            href={item.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={name}
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
    )
}

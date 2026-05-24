import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type SegmentListItem =
    | string
    | {
          title?: ReactNode
          content: ReactNode
      }

type SegmentListProps = {
    segments: SegmentListItem[]
    className?: string
}

const normalizeTitle = (title: ReactNode) =>
    typeof title === 'string' ? title.replace(/[：:]$/, '') : title

const SegmentList = ({ segments, className }: SegmentListProps) => (
    <ul
        className={cn(
            'space-y-1.5 text-sm leading-relaxed text-muted-foreground',
            className,
        )}
    >
        {segments.map((segment, idx) => {
            const title =
                typeof segment === 'string' ? undefined : segment.title
            const content =
                typeof segment === 'string' ? segment : segment.content

            return (
                <li key={idx} className='flex gap-2'>
                    <span
                        className='mt-0.5 shrink-0 text-xs text-accent'
                        aria-hidden='true'
                    >
                        ▸
                    </span>
                    <span>
                        {title && (
                            <strong className='font-semibold text-foreground'>
                                {normalizeTitle(title)}：
                            </strong>
                        )}
                        {content}
                    </span>
                </li>
            )
        })}
    </ul>
)

export default SegmentList

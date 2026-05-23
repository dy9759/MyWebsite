import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { AI_CONFIG } from '@/ai-config'

const BigTechWatch = () => {
    const companies = AI_CONFIG.bigTech ?? []
    const also = AI_CONFIG.bigTechAlsoTracking ?? []
    if (companies.length === 0) return null

    return (
        <section
            id='bigtech'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-4 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>AI 大厂动态 · Big Tech Watch</h2>
                <p className='text-sm text-muted-foreground'>
                    跟踪关键人物、发布会与播客访谈。点开每家公司展开。
                </p>
            </div>

            <Accordion type='multiple' className='rounded-lg border px-4'>
                {companies.map((c, idx) => {
                    const empty =
                        c.events.length === 0 && c.podcasts.length === 0
                    return (
                        <AccordionItem key={idx} value={`company-${idx}`}>
                            <AccordionTrigger className='text-left'>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <span className='font-medium'>
                                        {c.company}
                                    </span>
                                    {c.people.length > 0 && (
                                        <span className='text-xs font-normal text-muted-foreground'>
                                            {c.people
                                                .map((p) =>
                                                    p.role
                                                        ? `${p.name} (${p.role})`
                                                        : p.name
                                                )
                                                .join(' · ')}
                                        </span>
                                    )}
                                    {empty && (
                                        <Badge
                                            variant='outline'
                                            className='text-[10px] text-muted-foreground'
                                        >
                                            追踪中
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-4 pt-1'>
                                    {c.events.length > 0 && (
                                        <div>
                                            <div className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                                Events / Keynotes
                                            </div>
                                            <ul className='flex flex-col gap-1.5 text-sm'>
                                                {c.events.map((e, i) => (
                                                    <li
                                                        key={i}
                                                        className='flex flex-wrap items-baseline gap-2'
                                                    >
                                                        <Badge
                                                            variant='outline'
                                                            className='shrink-0 text-[10px]'
                                                        >
                                                            {e.type}
                                                        </Badge>
                                                        {e.url ? (
                                                            <Link
                                                                href={e.url}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className='font-medium hover:underline'
                                                            >
                                                                {e.title}
                                                                <ArrowUpRight className='ml-0.5 inline-block size-3 text-muted-foreground' />
                                                            </Link>
                                                        ) : (
                                                            <span className='font-medium'>
                                                                {e.title}
                                                            </span>
                                                        )}
                                                        {e.speaker && (
                                                            <span className='text-xs text-muted-foreground'>
                                                                · {e.speaker}
                                                            </span>
                                                        )}
                                                        {e.date && (
                                                            <span className='text-xs text-muted-foreground'>
                                                                · {e.date}
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {c.podcasts.length > 0 && (
                                        <div>
                                            <div className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                                Podcast Interviews
                                            </div>
                                            <ul className='flex flex-col gap-1.5 text-sm'>
                                                {c.podcasts.map((p, i) => (
                                                    <li
                                                        key={i}
                                                        className='flex flex-wrap items-baseline gap-2'
                                                    >
                                                        {p.url ? (
                                                            <Link
                                                                href={p.url}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className='font-medium hover:underline'
                                                            >
                                                                {p.title}
                                                                <ArrowUpRight className='ml-0.5 inline-block size-3 text-muted-foreground' />
                                                            </Link>
                                                        ) : (
                                                            <span className='font-medium'>
                                                                {p.title}
                                                            </span>
                                                        )}
                                                        {p.date && (
                                                            <span className='text-xs text-muted-foreground'>
                                                                · {p.date}
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {empty && (
                                        <p className='text-sm italic text-muted-foreground'>
                                            关键人物与事件清单待补充。
                                        </p>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>

            {also.length > 0 && (
                <p className='text-xs text-muted-foreground'>
                    Also tracking: {also.join(', ')}
                </p>
            )}
        </section>
    )
}

export default BigTechWatch

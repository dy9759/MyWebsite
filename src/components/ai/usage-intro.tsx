'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'

const UsageIntro = () => {
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const usage = aiConfig.sourcesUsage ?? []
    if (usage.length === 0) return null

    return (
        <section
            id='usage'
            className='mx-4 flex scroll-mt-28 flex-col gap-3 rounded-xl border border-accent/60 bg-accent/5 p-5 animate-slide-from-down-and-fade-1'
        >
            <div className='flex flex-col gap-1'>
                <div className='text-xs font-medium uppercase tracking-wide text-accent'>
                    {copy.ai.usageIntro.heading}
                </div>
                <p className='text-sm text-muted-foreground'>
                    {copy.ai.usageIntro.paragraph}
                </p>
            </div>
            <ol className='flex flex-col gap-2.5 text-sm'>
                {usage.map((u, i) => (
                    <li key={i} className='flex gap-2.5'>
                        <span className='shrink-0 font-semibold text-foreground'>
                            {i + 1}.
                        </span>
                        <div className='flex flex-col gap-1'>
                            <span className='text-muted-foreground'>
                                {u.rule}
                            </span>
                            {u.examples && u.examples.length > 0 && (
                                <ul className='flex flex-col gap-0.5 pl-3 text-xs'>
                                    {u.examples.map((ex, j) => (
                                        <li key={j}>
                                            {ex.url ? (
                                                <Link
                                                    href={ex.url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='inline-flex items-center gap-1 hover:text-foreground hover:underline'
                                                >
                                                    {ex.name}
                                                    <ArrowUpRight className='size-3' />
                                                </Link>
                                            ) : (
                                                <span className='text-muted-foreground'>
                                                    {ex.name}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default UsageIntro

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AI_CONFIG } from '@/ai-config'

const UsageIntro = () => {
    const usage = AI_CONFIG.sourcesUsage ?? []
    if (usage.length === 0) return null

    return (
        <section
            id='usage'
            className='mx-4 flex flex-col gap-3 rounded-xl border border-accent/60 bg-accent/5 p-5 animate-slide-from-down-and-fade-1 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <div className='text-xs font-medium uppercase tracking-wide text-accent'>
                    使用说明 · How to use this library
                </div>
                <p className='text-sm text-muted-foreground'>
                    本库按 6 个层次组织 AI 与科技信息源,从最广的聚合到最深的研究。
                    下面是我在实际使用中遵循的三条原则,帮助你判断该看什么、以什么顺序看。
                </p>
            </div>
            <ol className='flex flex-col gap-2.5 text-sm'>
                {usage.map((u, i) => (
                    <li key={i} className='flex gap-2.5'>
                        <span className='shrink-0 font-semibold text-foreground'>
                            {i + 1}.
                        </span>
                        <div className='flex flex-col gap-1'>
                            <span className='text-muted-foreground'>{u.rule}</span>
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

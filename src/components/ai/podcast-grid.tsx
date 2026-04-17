import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { AI_CONFIG } from '@/ai-config'

const PodcastGrid = () => {
    return (
        <section className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Podcasts</h2>
                <p className='text-sm text-muted-foreground'>
                    Video podcasts I listen to regularly.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.podcasts.map((podcast, idx) => (
                    <Card
                        key={idx}
                        className='flex flex-col gap-2 p-4 transition-colors hover:bg-accent/10'
                    >
                        <Link
                            href={podcast.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-start justify-between gap-2'
                        >
                            <div className='flex flex-col gap-0.5'>
                                <h3 className='font-medium group-hover:underline'>
                                    {podcast.title}
                                </h3>
                                <p className='text-xs text-muted-foreground'>
                                    {podcast.host}
                                </p>
                            </div>
                            <ArrowUpRight className='size-4 shrink-0 text-muted-foreground group-hover:text-foreground' />
                        </Link>
                        <p className='text-sm text-muted-foreground'>
                            {podcast.description}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default PodcastGrid

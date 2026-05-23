import Image from 'next/image'
import { AI_CONFIG } from '@/ai-config'

const AIHero = () => {
    return (
        <section className='flex flex-col gap-6 px-4 animate-slide-from-down-and-fade-1'>
            <div className='overflow-hidden rounded-xl border'>
                <Image
                    src={AI_CONFIG.hero.heroImage}
                    alt='AI Learning Library hero'
                    width={1200}
                    height={600}
                    className='h-auto w-full object-cover'
                    priority
                />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    {AI_CONFIG.hero.title}
                </h1>
                <p className='leading-relaxed text-muted-foreground'>
                    {AI_CONFIG.hero.intro}
                </p>
            </div>
        </section>
    )
}

export default AIHero

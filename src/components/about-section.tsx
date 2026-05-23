import { CONFIG } from '@/config'

const AboutSection = () => {
    return (
        <section className='animate-slide-from-down-and-fade-2 space-y-3 px-4'>
            <h2 className='font-bold'>个人介绍</h2>
            <p className='leading-relaxed text-muted-foreground'>
                {CONFIG.description}
            </p>
        </section>
    )
}

export default AboutSection

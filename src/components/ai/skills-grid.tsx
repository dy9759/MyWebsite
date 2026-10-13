'use client'

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PinToggle from '@/components/pin-toggle'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { usePinnedList } from '@/lib/use-pinned-items'

const SkillsGrid = () => {
        const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const { items: skills, isPinned, togglePinned } = usePinnedList(aiConfig.skills, 'ai-skill', (skill) => skill.title)

    return (
        <section
            id='skills'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-5 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{copy.ai.skills.heading}</h2>
                <p className='text-sm text-muted-foreground'>
                    {copy.ai.skills.description}
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {skills.map((skill) => (
                    <Card
                        key={skill.pinKey}
                        className='flex flex-col gap-3 p-4 transition-colors hover:bg-accent/10'
                    >
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-start justify-between gap-3'>
                                <h3 className='font-medium'>
                                    {skill.title}
                                </h3>
                                <PinToggle
                                    pinned={isPinned(
                                        skill.pinKey,
                                        skill.pinned,
                                    )}
                                    label={skill.title}
                                    onToggle={() =>
                                        togglePinned(
                                            skill.pinKey,
                                            skill.pinned,
                                        )
                                    }
                                />
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {skill.description}
                            </p>
                        </div>
                        <div className='flex gap-2'>
                            {skill.githubUrl && (
                                <Button asChild variant='outline' size='sm'>
                                    <Link
                                        href={skill.githubUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Github className='mr-1.5 size-3.5' />
                                        GitHub
                                    </Link>
                                </Button>
                            )}
                            {skill.demoUrl && (
                                <Button asChild variant='outline' size='sm'>
                                    <Link
                                        href={skill.demoUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <ExternalLink className='mr-1.5 size-3.5' />
                                        Demo
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default SkillsGrid

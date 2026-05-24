'use client'

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PinToggle from '@/components/pin-toggle'
import PinnedBadge from '@/components/pinned-badge'
import { AI_CONFIG } from '@/ai-config'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const SkillsGrid = () => {
    const pinState = usePinnedItems()
    const skillItems = AI_CONFIG.skills.map((skill, idx) => ({
        ...skill,
        pinKey: createPinKey('ai-skill', idx),
    }))
    const skills = sortPinnedFirst(skillItems, (skill) =>
        pinState.isPinned(skill.pinKey, skill.pinned),
    )

    return (
        <section
            id='skills'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-5 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>Skills</h2>
                <p className='text-sm text-muted-foreground'>
                    Small projects I have open-sourced.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {skills.map((skill, idx) => (
                    <Card
                        key={idx}
                        className='flex flex-col gap-3 p-4 transition-colors hover:bg-accent/10'
                    >
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                    <h3 className='font-medium'>
                                        {skill.title}
                                    </h3>
                                    {pinState.isPinned(
                                        skill.pinKey,
                                        skill.pinned,
                                    ) && <PinnedBadge />}
                                </div>
                                <PinToggle
                                    pinned={pinState.isPinned(
                                        skill.pinKey,
                                        skill.pinned,
                                    )}
                                    label={skill.title}
                                    onToggle={() =>
                                        pinState.togglePinned(
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

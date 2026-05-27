'use client'

import Link from 'next/link'
import PinToggle from '@/components/pin-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { getInitials } from '@/lib/utils'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const PeopleGrid = () => {
    const pinState = usePinnedItems()
    const aiConfig = useAIConfig()
    const copy = useSiteCopy()
    const peopleItems = aiConfig.people.map((person, idx) => ({
        ...person,
        pinKey: createPinKey('ai-person', idx),
    }))
    const people = sortPinnedFirst(peopleItems, (person) =>
        pinState.isPinned(person.pinKey, person.pinned),
    )

    return (
        <section
            id='people'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{copy.ai.people.heading}</h2>
                <p className='text-sm text-muted-foreground'>
                    {copy.ai.people.description}
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {people.map((person, idx) => (
                    <Card
                        key={idx}
                        className='flex items-center gap-3 p-4 transition-colors hover:bg-accent/10'
                    >
                        <Avatar className='size-10 shrink-0'>
                            <AvatarImage
                                src={person.avatar}
                                alt={person.name}
                            />
                            <AvatarFallback>
                                {getInitials(person.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                            <div className='flex items-center gap-1.5'>
                                <Link
                                    href={person.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='min-w-0 hover:underline'
                                >
                                    <h3 className='truncate font-medium'>
                                        {person.name}
                                    </h3>
                                </Link>
                                <span className='text-xs text-muted-foreground'>
                                    {person.handle}
                                </span>
                            </div>
                            <p className='line-clamp-2 text-xs text-muted-foreground'>
                                {person.role}
                            </p>
                        </div>
                        <PinToggle
                            pinned={pinState.isPinned(
                                person.pinKey,
                                person.pinned,
                            )}
                            label={person.name}
                            onToggle={() =>
                                pinState.togglePinned(
                                    person.pinKey,
                                    person.pinned,
                                )
                            }
                        />
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default PeopleGrid

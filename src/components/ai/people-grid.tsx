import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { AI_CONFIG } from '@/ai-config'
import { getInitials } from '@/lib/utils'

const PeopleGrid = () => {
    return (
        <section
            id='people'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-3 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>People to Follow</h2>
                <p className='text-sm text-muted-foreground'>
                    Builders and researchers worth following on X.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {AI_CONFIG.people.map((person, idx) => (
                    <Link
                        key={idx}
                        href={person.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group'
                    >
                        <Card className='flex items-center gap-3 p-4 transition-colors hover:bg-accent/10'>
                            <Avatar className='size-10 shrink-0'>
                                <AvatarImage src={person.avatar} alt={person.name} />
                                <AvatarFallback>
                                    {getInitials(person.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex min-w-0 flex-col gap-0.5'>
                                <div className='flex items-center gap-1.5'>
                                    <h3 className='truncate font-medium group-hover:underline'>
                                        {person.name}
                                    </h3>
                                    <span className='text-xs text-muted-foreground'>
                                        {person.handle}
                                    </span>
                                </div>
                                <p className='line-clamp-2 text-xs text-muted-foreground'>
                                    {person.role}
                                </p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default PeopleGrid

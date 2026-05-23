import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CONFIG } from '@/config'
import Link from 'next/link'

const OpenSourceProjects = () => {
    const projects = CONFIG.openSourceProjects ?? []
    if (projects.length === 0) return null

    return (
        <section className='animate-slide-from-down-and-fade-4 space-y-4 px-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='font-bold'>开源项目 / GitHub</h2>
                <Button
                    asChild
                    variant='link'
                    size='sm'
                    className='h-auto px-0 text-muted-foreground underline hover:text-foreground'
                >
                    <Link
                        href='https://github.com/dy9759'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        GitHub
                        <Icons.arrowUpRight className='ml-0.5 size-4' />
                    </Link>
                </Button>
            </div>
            <div className='space-y-0'>
                {projects.map((project, idx) => (
                    <Card
                        key={idx}
                        className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/60 dark:hover:bg-secondary ${
                            idx > 0 ? 'border-t-0' : ''
                        }`}
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-start justify-between gap-3'>
                                <div>
                                    <h3 className='font-medium'>
                                        {project.name}
                                    </h3>
                                    <p className='text-xs text-muted-foreground'>
                                        {project.repo}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant='ghost'
                                    size='icon'
                                    className='shrink-0'
                                >
                                    <Link
                                        href={project.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label={`${project.name} GitHub repository`}
                                    >
                                        <Icons.github className='size-4' />
                                    </Link>
                                </Button>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {project.description}
                            </p>
                            <div className='mt-1 flex flex-wrap gap-1.5'>
                                {project.tags.map((tag, tagIdx) => {
                                    const Icon = Icons[tag.icon]
                                    return (
                                        <div
                                            key={tagIdx}
                                            className='flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground'
                                        >
                                            <Icon className='size-3' />
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default OpenSourceProjects

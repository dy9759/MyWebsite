import Project from '@/components/project'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CONFIG } from '@/config'

const ProjectExperience = () => {
    const grants = CONFIG.research?.grants ?? []
    const projects = CONFIG.projects
    if (projects.length === 0 && grants.length === 0) return null

    return (
        <section className='animate-slide-from-down-and-fade-3 space-y-6 px-4'>
            <h2 className='font-bold'>项目经验</h2>

            {projects.length > 0 && (
                <div className='space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        产品 / AI 项目
                    </h3>
                    <div className='space-y-0'>
                        {projects.map((project, idx) => (
                            <Project
                                key={idx}
                                index={idx}
                                name={project.name}
                                icon={project.icon}
                                duration={project.duration}
                                description={project.description}
                                image={project.image}
                                url={project.url}
                                tags={project.tags}
                                testimonial={project.testimonial}
                                github={project.github}
                            />
                        ))}
                    </div>
                </div>
            )}

            {grants.length > 0 && (
                <div className='space-y-2'>
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        科研项目
                    </h3>
                    <div className='space-y-0'>
                        {grants.map((grant, idx) => (
                            <Card
                                key={idx}
                                className={`rounded-none border-none border-t border-b border-dotted border-muted/80 bg-background p-4 transition-all duration-300 hover:rounded-xl hover:bg-accent/10 dark:hover:bg-accent/10 ${
                                    idx > 0 ? 'border-t-0' : ''
                                }`}
                            >
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <h4 className='font-medium'>
                                            {grant.name}
                                        </h4>
                                        <span className='shrink-0 text-xs text-muted-foreground'>
                                            {grant.duration}
                                        </span>
                                    </div>
                                    <Badge
                                        variant='outline'
                                        className='self-start text-[10px]'
                                    >
                                        {grant.funding}
                                    </Badge>
                                    <dl className='mt-1 space-y-1.5 text-sm text-muted-foreground'>
                                        <div className='flex gap-2'>
                                            <dt className='shrink-0 font-medium text-foreground/80'>
                                                描述:
                                            </dt>
                                            <dd>{grant.overview}</dd>
                                        </div>
                                        <div className='flex gap-2'>
                                            <dt className='shrink-0 font-medium text-foreground/80'>
                                                职责:
                                            </dt>
                                            <dd>{grant.role}</dd>
                                        </div>
                                        <div className='flex gap-2'>
                                            <dt className='shrink-0 font-medium text-foreground/80'>
                                                成果:
                                            </dt>
                                            <dd>{grant.outcomes}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default ProjectExperience

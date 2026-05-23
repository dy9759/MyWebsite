'use client'

import FutureWork from '@/components/future-work'
import OpenSourceProjects from '@/components/open-source-projects'
import Project from '@/components/project'
import ResearchProjects from '@/components/research-projects'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'

const ProjectExperience = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const grants = config.research?.grants ?? []
    const projects = config.projects
    const openSourceProjects = config.openSourceProjects ?? []
    const futureWork = config.futureWork ?? []
    if (
        projects.length === 0 &&
        grants.length === 0 &&
        openSourceProjects.length === 0 &&
        futureWork.length === 0
    )
        return null

    return (
        <section
            id='projects'
            className='scroll-mt-28 animate-slide-from-down-and-fade-3 space-y-6 px-4'
        >
            <h2 className='font-bold'>{copy.sections.projects}</h2>

            {projects.length > 0 && (
                <section
                    id='product-projects'
                    className='scroll-mt-28 space-y-2'
                >
                    <h3 className='text-sm font-medium text-muted-foreground'>
                        {copy.sections.productProjects}
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
                </section>
            )}

            <ResearchProjects variant='embedded' />
            <OpenSourceProjects variant='embedded' />
            <FutureWork variant='embedded' />
        </section>
    )
}

export default ProjectExperience

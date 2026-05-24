'use client'

import FutureWork from '@/components/future-work'
import OpenSourceProjects from '@/components/open-source-projects'
import Project from '@/components/project'
import ResearchProjects from '@/components/research-projects'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { filterPinned } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const ProjectExperience = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const pinState = usePinnedItems()
    const projectItems = config.projects.map((project, idx) => ({
        ...project,
        pinKey: createPinKey('project', idx),
    }))
    const grants = filterPinned(
        (config.research?.grants ?? []).map((grant, idx) => ({
            ...grant,
            pinKey: createPinKey('research-grant', idx),
        })),
        (grant) => pinState.isPinned(grant.pinKey, grant.pinned),
    )
    const projects = filterPinned(projectItems, (project) =>
        pinState.isPinned(project.pinKey, project.pinned),
    )
    const openSourceProjects = filterPinned(
        (config.openSourceProjects ?? []).map((project, idx) => ({
            ...project,
            pinKey: createPinKey('open-source', idx),
        })),
        (project) => pinState.isPinned(project.pinKey, project.pinned),
    )
    const futureWork = filterPinned(
        (config.futureWork ?? []).map((item, idx) => ({
            ...item,
            pinKey: createPinKey('future-work', idx),
        })),
        (item) => pinState.isPinned(item.pinKey, item.pinned),
    )
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
                                links={project.links}
                                tags={project.tags}
                                testimonial={project.testimonial}
                                github={project.github}
                                pinned={pinState.isPinned(
                                    project.pinKey,
                                    project.pinned,
                                )}
                                onTogglePinned={() =>
                                    pinState.togglePinned(
                                        project.pinKey,
                                        project.pinned,
                                    )
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            <ResearchProjects variant='embedded' pinnedOnly />
            <OpenSourceProjects variant='embedded' pinnedOnly />
            <FutureWork variant='embedded' pinnedOnly />
        </section>
    )
}

export default ProjectExperience

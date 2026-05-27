'use client'

import FutureWork from '@/components/future-work'
import OpenSourceProjects from '@/components/open-source-projects'
import Project from '@/components/project'
import ResearchProjects from '@/components/research-projects'
import SectionRailNav from '@/components/section-rail-nav'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'
import Link from 'next/link'

type ProjectCategory = 'consumer' | 'enterprise' | 'content' | 'agent'

const ProjectsPageContent = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const pinState = usePinnedItems()
    const projectItems = config.projects.map((project, idx) => ({
        ...project,
        pinKey: createPinKey('project', idx),
    }))
    const projects = sortPinnedFirst(projectItems, (project) =>
        pinState.isPinned(project.pinKey, project.pinned),
    )

    const projectsByCategory = (category: ProjectCategory) =>
        projects.filter((p) => p.category === category)

    const sectionNavItems = [
        {
            href: '#product-projects',
            label: copy.sections.productProjects,
        },
        {
            href: '#consumer-projects',
            label: copy.sections.consumerProjects,
            indent: true,
        },
        {
            href: '#enterprise-projects',
            label: copy.sections.enterpriseProjects,
            indent: true,
        },
        {
            href: '#content-projects',
            label: copy.sections.contentProjects,
            indent: true,
        },
        {
            href: '#agent-projects',
            label: copy.sections.agentProjects,
            indent: true,
        },
        {
            href: '#open-source',
            label: copy.sections.openSource,
        },
        {
            href: '#future-work',
            label: copy.sections.futureWork,
        },
    ]

    const renderProjects = (category: ProjectCategory) =>
        projectsByCategory(category).map((project, idx) => (
            <Project
                key={`${category}-${idx}`}
                index={idx}
                name={project.name}
                icon={project.icon}
                duration={project.duration}
                description={project.description}
                descriptionSegments={project.descriptionSegments}
                image={project.image}
                url={project.url}
                links={project.links}
                tags={project.tags}
                testimonial={project.testimonial}
                github={project.github}
                pinned={pinState.isPinned(project.pinKey, project.pinned)}
                onTogglePinned={() =>
                    pinState.togglePinned(project.pinKey, project.pinned)
                }
            />
        ))

    return (
        <div className='grid gap-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start'>
            <SectionRailNav
                ariaLabel={copy.projectSectionNav}
                items={sectionNavItems}
                label={copy.nav.projects}
            />

            <div className='min-w-0'>
                <div className='flex animate-slide-from-down-and-fade-1 items-start justify-between'>
                    <Breadcrumb className='mb-4 px-4'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href='/'>{copy.nav.home}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {copy.nav.projects}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <h1 className='animate-slide-from-down-and-fade-2 scroll-m-20 px-4 text-4xl font-bold tracking-tight'>
                    {copy.sections.allProjects}
                </h1>
                <div className='flex flex-col gap-12 pt-12'>
                    <section
                        id='product-projects'
                        className='scroll-mt-28 animate-slide-from-down-and-fade-3 space-y-8 px-4'
                    >
                        <h2 className='font-bold'>
                            {copy.sections.productProjects}
                        </h2>

                        <div id='consumer-projects' className='scroll-mt-28 space-y-2'>
                            <h3 className='text-sm font-medium text-muted-foreground'>
                                {copy.sections.consumerProjects}
                            </h3>
                            <div className='space-y-0'>
                                {renderProjects('consumer')}
                            </div>
                        </div>

                        <div id='enterprise-projects' className='scroll-mt-28 space-y-2'>
                            <h3 className='text-sm font-medium text-muted-foreground'>
                                {copy.sections.enterpriseProjects}
                            </h3>
                            <div className='space-y-0'>
                                {renderProjects('enterprise')}
                            </div>
                            <ResearchProjects variant='embedded' />
                        </div>

                        <div id='content-projects' className='scroll-mt-28 space-y-2'>
                            <h3 className='text-sm font-medium text-muted-foreground'>
                                {copy.sections.contentProjects}
                            </h3>
                            <div className='space-y-0'>
                                {renderProjects('content')}
                            </div>
                        </div>

                        <div id='agent-projects' className='scroll-mt-28 space-y-2'>
                            <h3 className='text-sm font-medium text-muted-foreground'>
                                {copy.sections.agentProjects}
                            </h3>
                            <div className='space-y-0'>
                                {renderProjects('agent')}
                            </div>
                        </div>
                    </section>

                    <OpenSourceProjects />
                    <FutureWork />
                </div>
            </div>
        </div>
    )
}

export default ProjectsPageContent

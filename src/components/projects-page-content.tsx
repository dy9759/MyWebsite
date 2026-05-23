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
import Link from 'next/link'

const ProjectsPageContent = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const projects = sortPinnedFirst(config.projects)
    const sectionNavItems = [
        {
            href: '#product-projects',
            label: copy.sections.productProjects,
        },
        {
            href: '#research-projects',
            label: copy.sections.researchProjects,
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
                        className='scroll-mt-28 animate-slide-from-down-and-fade-3 space-y-4 px-4'
                    >
                        <h2 className='font-bold'>
                            {copy.sections.productProjects}
                        </h2>
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
                                    pinned={project.pinned}
                                />
                            ))}
                        </div>
                    </section>

                    <ResearchProjects />
                    <OpenSourceProjects />
                    <FutureWork />
                </div>
            </div>
        </div>
    )
}

export default ProjectsPageContent

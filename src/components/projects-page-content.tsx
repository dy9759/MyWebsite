'use client'

import OpenSourceProjects from '@/components/open-source-projects'
import Project from '@/components/project'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

const ProjectsPageContent = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()

    return (
        <div>
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
                            <BreadcrumbPage>{copy.nav.projects}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h1 className='animate-slide-from-down-and-fade-2 scroll-m-20 px-4 text-4xl font-bold tracking-tight'>
                {copy.sections.allProjects}
            </h1>
            <div className='animate-slide-from-down-and-fade-3 space-y-0 pt-12'>
                {config.projects.map((project, idx) => (
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
            <div className='pt-12'>
                <OpenSourceProjects />
            </div>
        </div>
    )
}

export default ProjectsPageContent

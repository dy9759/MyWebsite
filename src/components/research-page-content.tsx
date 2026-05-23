'use client'

import Link from 'next/link'
import Achievements from '@/components/achievements'
import SectionRailNav from '@/components/section-rail-nav'
import { useSiteCopy } from '@/components/language-provider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const ResearchPageContent = () => {
    const copy = useSiteCopy()
    const sectionNavItems = [
        {
            href: '#achievements',
            label: copy.sections.achievements,
        },
        {
            href: '#journal-papers',
            label: copy.sections.journalPapers,
        },
        {
            href: '#conference-papers',
            label: copy.sections.conferencePapers,
        },
    ]

    return (
        <div className='grid gap-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start'>
            <SectionRailNav
                ariaLabel={copy.researchSectionNav}
                items={sectionNavItems}
                label={copy.nav.research}
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
                                    {copy.nav.research}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <h1 className='animate-slide-from-down-and-fade-2 scroll-m-20 px-4 text-4xl font-bold tracking-tight'>
                    {copy.nav.research}
                </h1>

                <div className='pt-12'>
                    <Achievements />
                </div>
            </div>
        </div>
    )
}

export default ResearchPageContent

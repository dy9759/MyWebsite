'use client'

import Link from 'next/link'
import Achievements from '@/components/achievements'
import ResearchIntro from '@/components/research-intro'
import SectionRailNav from '@/components/section-rail-nav'
import {
    formatCountLabel,
    useLanguage,
    useSiteConfig,
    useSiteCopy,
} from '@/components/language-provider'
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
    const config = useSiteConfig()
    const { language } = useLanguage()
    const withCount = (label: string, count: number) =>
        formatCountLabel(language, label, count)
    const sectionNavItems = [
        {
            href: '#research-overview',
            label: language === 'zh' ? '研究概览' : 'Overview',
        },
        {
            href: '#journal-papers',
            label: withCount(
                copy.sections.journalPapers,
                config.research?.publications?.length ?? 0,
            ),
        },
        {
            href: '#conference-papers',
            label: withCount(
                copy.sections.conferencePapers,
                config.research?.conferences?.length ?? 0,
            ),
        },
    ]

    return (
        <div className="grid gap-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start">
            <SectionRailNav
                ariaLabel={copy.researchSectionNav}
                items={sectionNavItems}
            />

            <div className="min-w-0">
                <div className="flex animate-slide-from-down-and-fade-1 items-center justify-between">
                    <Breadcrumb className="mb-4 px-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">{copy.nav.home}</Link>
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

                <div className="pt-4">
                    <ResearchIntro />
                    <Achievements />
                </div>
            </div>
        </div>
    )
}

export default ResearchPageContent

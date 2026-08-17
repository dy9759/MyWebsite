'use client'

import Achievements from '@/components/achievements'
import PageBreadcrumb from '@/components/page-breadcrumb'
import ResearchIntro from '@/components/research-intro'
import SectionRailNav from '@/components/section-rail-nav'
import {
    useCountLabel,
    useLanguage,
    useSiteConfig,
    useSiteCopy,
} from '@/components/language-provider'

const ResearchPageContent = () => {
    const copy = useSiteCopy()
    const config = useSiteConfig()
    const { language } = useLanguage()
    const withCount = useCountLabel()
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
                    <PageBreadcrumb
                        current={copy.nav.research}
                        className="mb-4 px-4"
                    />
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

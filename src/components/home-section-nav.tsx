'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import SectionRailNav from '@/components/section-rail-nav'

const SECTION_ITEMS = [
    { href: '#profile', labelKey: 'name' },
    { href: '#contact', labelKey: 'contact' },
    { href: '#about', labelKey: 'about' },
    { href: '#work', labelKey: 'work' },
    { href: '#projects', labelKey: 'projects' },
    { href: '#education', labelKey: 'education' },
    { href: '#qualifications', labelKey: 'qualifications' },
    { href: '#achievements', labelKey: 'achievements' },
] as const

const HomeSectionNav = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()

    const items = SECTION_ITEMS.map((item) => ({
        href: item.href,
        label:
            item.labelKey === 'name'
                ? config.name
                : copy.sections[item.labelKey],
    }))

    return <SectionRailNav ariaLabel={copy.sectionNav} items={items} />
}

export default HomeSectionNav

'use client'

import SectionRailNav from '@/components/section-rail-nav'
import { useSiteCopy } from '@/components/language-provider'

const SectionNav = () => {
    const copy = useSiteCopy()
    const nav = copy.ai.sectionNav
    const sections = [
        { href: '#usage', label: nav.usage },
        { href: '#layer-1', label: nav.layer1 },
        { href: '#layer-2', label: nav.layer2 },
        { href: '#layer-3', label: nav.layer3 },
        { href: '#layer-4', label: nav.layer4 },
        { href: '#layer-5', label: nav.layer5 },
        { href: '#layer-6', label: nav.layer6 },
    ]
    return (
        <SectionRailNav
            ariaLabel={copy.ai.sectionNavAria}
            items={sections}
            label={copy.ai.sidebarTitle}
        />
    )
}

export default SectionNav

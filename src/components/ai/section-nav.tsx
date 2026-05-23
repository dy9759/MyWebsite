import SectionRailNav from '@/components/section-rail-nav'

const SECTIONS = [
    { href: '#usage', label: '使用说明' },
    { href: '#layer-1', label: 'L1 聚合' },
    { href: '#layer-2', label: 'L2 人物' },
    { href: '#layer-3', label: 'L3 播客' },
    { href: '#layer-4', label: 'L4 技术' },
    { href: '#layer-5', label: 'L5 社区' },
    { href: '#layer-6', label: 'L6 中文圈' },
]

const SectionNav = () => {
    return (
        <SectionRailNav
            ariaLabel='AI 资源分类导航'
            items={SECTIONS}
            label='AI Library'
        />
    )
}

export default SectionNav

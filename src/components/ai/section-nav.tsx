import Link from 'next/link'

const SECTIONS = [
    { id: 'usage', label: '使用说明' },
    { id: 'layer-1', label: 'L1 聚合' },
    { id: 'layer-2', label: 'L2 人物' },
    { id: 'layer-3', label: 'L3 播客' },
    { id: 'layer-4', label: 'L4 技术' },
    { id: 'layer-5', label: 'L5 社区' },
    { id: 'layer-6', label: 'L6 中文圈' },
]

const SectionNav = () => {
    return (
        <nav
            aria-label='Jump to section'
            className='flex flex-wrap gap-x-3 gap-y-1 px-4 text-xs text-muted-foreground animate-slide-from-down-and-fade-1'
        >
            <span className='uppercase tracking-wide'>Jump to:</span>
            {SECTIONS.map((s) => (
                <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className='hover:text-foreground hover:underline'
                >
                    {s.label}
                </Link>
            ))}
        </nav>
    )
}

export default SectionNav

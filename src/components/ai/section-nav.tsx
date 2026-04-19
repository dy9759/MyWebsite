import Link from 'next/link'

const SECTIONS = [
    { id: 'sources', label: 'Sources' },
    { id: 'videos', label: 'Videos' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'people', label: 'People' },
    { id: 'bigtech', label: 'Big Tech' },
    { id: 'newsletters', label: 'Newsletters' },
    { id: 'products', label: 'Products' },
    { id: 'prompts', label: 'Prompts' },
    { id: 'skills', label: 'Skills' },
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

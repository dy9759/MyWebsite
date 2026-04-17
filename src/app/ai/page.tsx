import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import AIHero from '@/components/ai/ai-hero'
import VideoTable from '@/components/ai/video-table'
import PodcastGrid from '@/components/ai/podcast-grid'
import PeopleGrid from '@/components/ai/people-grid'
import NewsletterList from '@/components/ai/newsletter-list'
import ProductGrid from '@/components/ai/product-grid'
import PromptAccordion from '@/components/ai/prompt-accordion'
import SkillsGrid from '@/components/ai/skills-grid'
import { AI_CONFIG } from '@/ai-config'

export const metadata: Metadata = {
    title: 'AI Learning Library',
    description: AI_CONFIG.hero.intro,
}

export default function AIPage() {
    return (
        <div className='theme-radix-nova'>
            <div className='flex flex-col gap-12 bg-background text-foreground'>
                <nav className='px-4'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href='/'>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>AI Library</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </nav>

                <AIHero />
                <VideoTable />
                <PodcastGrid />
                <PeopleGrid />
                <NewsletterList />
                <ProductGrid />
                <PromptAccordion />
                <SkillsGrid />
            </div>
        </div>
    )
}

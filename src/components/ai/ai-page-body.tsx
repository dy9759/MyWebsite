'use client'

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
import SectionNav from '@/components/ai/section-nav'
import UsageIntro from '@/components/ai/usage-intro'
import LayerWrap from '@/components/ai/layer-wrap'
import SourcesBlock from '@/components/ai/sources-block'
import VideoTable from '@/components/ai/video-table'
import PodcastGrid from '@/components/ai/podcast-grid'
import PeopleGrid from '@/components/ai/people-grid'
import NewsletterList from '@/components/ai/newsletter-list'
import ProductGrid from '@/components/ai/product-grid'
import PromptAccordion from '@/components/ai/prompt-accordion'
import SkillsGrid from '@/components/ai/skills-grid'
import BigTechWatch from '@/components/ai/big-tech-watch'
import { useSiteCopy } from '@/components/language-provider'

const AIPageBody = () => {
    const copy = useSiteCopy()
    return (
        <div className='theme-radix-nova'>
            <div className='grid gap-6 bg-background text-foreground md:grid-cols-[8rem_minmax(0,1fr)] md:items-start'>
                <SectionNav />

                <div className='flex min-w-0 flex-col gap-12'>
                    <nav className='px-4'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href='/'>
                                            {copy.ai.breadcrumbHome}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {copy.ai.breadcrumbCurrent}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </nav>

                    <AIHero />
                    <UsageIntro />

                    <LayerWrap id='layer-1' layerIndex={0} animationDelay={2}>
                        <SourcesBlock layerIndex={0} />
                    </LayerWrap>

                    <LayerWrap id='layer-2' layerIndex={1} animationDelay={2}>
                        <PeopleGrid />
                        <SourcesBlock
                            layerIndex={1}
                            title={copy.ai.sourcesOverride.layer2}
                        />
                        <NewsletterList />
                    </LayerWrap>

                    <LayerWrap id='layer-3' layerIndex={2} animationDelay={3}>
                        <PodcastGrid />
                    </LayerWrap>

                    <LayerWrap id='layer-4' layerIndex={3} animationDelay={3}>
                        <VideoTable />
                        <BigTechWatch />
                        <SourcesBlock
                            layerIndex={3}
                            title={copy.ai.sourcesOverride.layer4}
                        />
                        <ProductGrid />
                        <PromptAccordion />
                        <SkillsGrid />
                    </LayerWrap>

                    <LayerWrap id='layer-5' layerIndex={4} animationDelay={4}>
                        <SourcesBlock layerIndex={4} />
                    </LayerWrap>

                    <LayerWrap id='layer-6' layerIndex={5} animationDelay={5}>
                        <SourcesBlock layerIndex={5} />
                    </LayerWrap>
                </div>
            </div>
        </div>
    )
}

export default AIPageBody

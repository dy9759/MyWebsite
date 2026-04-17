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

                <div className='px-4'>
                    <p className='text-muted-foreground'>
                        Sections will render here (Task 14).
                    </p>
                </div>
            </div>
        </div>
    )
}

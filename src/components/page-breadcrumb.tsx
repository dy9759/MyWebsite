'use client'

import Link from 'next/link'
import { useSiteCopy } from '@/components/language-provider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type PageBreadcrumbProps = {
    current: string
    // Defaults to nav.home; the AI page overrides it with its own label.
    home?: string
    className?: string
}

const PageBreadcrumb = ({ current, home, className }: PageBreadcrumbProps) => {
    const copy = useSiteCopy()
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">{home ?? copy.nav.home}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{current}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default PageBreadcrumb

'use client'

import { Icons } from '@/components/icons'
import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ContactSection = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()

    return (
        <section className='animate-slide-from-down-and-fade-2 space-y-3 px-4'>
            <h2 className='font-bold'>{copy.sections.contact}</h2>
            <div className='flex flex-wrap items-center gap-3'>
                {config.socials.map((social, idx) => {
                    const Icon = Icons[social.icon]
                    return (
                        <Button
                            key={idx}
                            asChild
                            variant='outline'
                            size='sm'
                            className='gap-1.5'
                        >
                            <Link
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Icon className='size-4' />
                                {social.name}
                            </Link>
                        </Button>
                    )
                })}
                {config.contactMethods?.map((method, idx) => {
                    const Icon = Icons[method.icon]
                    const label = `${method.label}: ${method.value}`

                    if (method.href) {
                        return (
                            <Button
                                key={idx}
                                asChild
                                variant='outline'
                                size='sm'
                                className='gap-1.5'
                            >
                                <Link href={method.href}>
                                    <Icon className='size-4' />
                                    {label}
                                </Link>
                            </Button>
                        )
                    }

                    return (
                        <div
                            key={idx}
                            className='inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium'
                        >
                            <Icon className='size-4' />
                            {label}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ContactSection

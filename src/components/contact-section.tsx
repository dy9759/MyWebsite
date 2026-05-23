import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { CONFIG } from '@/config'
import Link from 'next/link'

const ContactSection = () => {
    return (
        <section className='animate-slide-from-down-and-fade-2 space-y-3 px-4'>
            <h2 className='font-bold'>联系方式</h2>
            <div className='flex flex-wrap items-center gap-3'>
                {CONFIG.socials.map((social, idx) => {
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
                {CONFIG.contactMethods?.map((method, idx) => {
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

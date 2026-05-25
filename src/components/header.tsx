'use client'

import { useSiteConfig, useSiteCopy } from '@/components/language-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { withBasePath } from '@/lib/asset-path'
import { getInitials } from '@/lib/utils'
import Image from 'next/image'

const Header = () => {
    const config = useSiteConfig()
    const copy = useSiteCopy()
    const avatarSrc = withBasePath(config.avatar)

    return (
        <header
            id='profile'
            className='flex w-full scroll-mt-28 animate-slide-from-down-and-fade-1 flex-col gap-6 px-4'
        >
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold'>{config.name}</h1>
                    <p className='mt-1 text-sm text-muted-foreground'>
                        {config.title}
                    </p>
                    <p className='mt-1 text-sm text-muted-foreground'>
                        📍 {copy.labels.location}
                    </p>
                </div>
                <Avatar className='size-20 bg-white p-1'>
                    <AvatarImage
                        src={avatarSrc}
                        className='object-contain'
                        asChild
                    >
                        <Image
                            src={avatarSrc}
                            alt={config.name + ' avatar'}
                            width={80}
                            height={80}
                            priority={true}
                        />
                    </AvatarImage>
                    <AvatarFallback>{getInitials(config.name)}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

export default Header

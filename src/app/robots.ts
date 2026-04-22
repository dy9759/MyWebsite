import { CONFIG } from '@/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const siteBase = CONFIG.siteUrl.replace(/\/$/, '')

    return {
        rules: {
            userAgent: '*',
        },
        sitemap: `${siteBase}/sitemap.xml`,
    }
}

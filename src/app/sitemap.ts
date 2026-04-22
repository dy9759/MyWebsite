import { CONFIG } from '@/config'

export default async function sitemap() {
    const siteUrl = new URL(
        CONFIG.siteUrl.endsWith('/') ? CONFIG.siteUrl : `${CONFIG.siteUrl}/`
    )

    const routes = ['', 'projects/'].map((route) => ({
        url: new URL(route, siteUrl).toString(),
        lastModified: new Date().toISOString(),
    }))

    return [...routes]
}

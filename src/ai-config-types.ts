import { Icons } from '@/components/icons'

export type VideoTag =
    | 'Fundamentals'
    | 'Product'
    | 'Founder Interview'
    | 'Research'
    | 'Tools'

export type AIConfig = {
    hero: {
        title: string
        intro: string
        positioning: string
        curationLabel: string
        updatedLabel: string
        lastUpdated: string
        updateNotes: string[]
    }
    videos: {
        title: string
        channel: string
        duration: string
        url: string
        tldwUrl?: string
        tags: VideoTag[]
        featured?: boolean
        pinned?: boolean
    }[]
    podcasts: {
        title: string
        host: string
        description: string
        url: string
        featured?: boolean
        pinned?: boolean
    }[]
    people: {
        name: string
        handle: string
        avatar: string
        url: string
        role: string
        pinned?: boolean
    }[]
    newsletters: {
        title: string
        description: string
        url: string
        pinned?: boolean
    }[]
    products: {
        name: string
        description: string
        url: string
        icon?: keyof typeof Icons
        featured?: boolean
        pinned?: boolean
    }[]
    prompts: {
        title: string
        description: string
        content: string
        pinned?: boolean
    }[]
    skills: {
        title: string
        description: string
        demoUrl?: string
        githubUrl: string
        pinned?: boolean
    }[]
    sources: {
        layer: string
        title: string
        description?: string
        items?: {
            name: string
            url?: string
            note?: string
            pinned?: boolean
        }[]
        groups?: {
            label: string
            items: { name: string; url?: string; pinned?: boolean }[]
        }[]
    }[]
    sourcesUsage: {
        rule: string
        examples?: { name: string; url?: string }[]
    }[]
    bigTech: {
        company: string
        people: { name: string; role?: string }[]
        events: {
            title: string
            type: string
            speaker?: string
            date?: string
            url?: string
        }[]
        podcasts: {
            title: string
            date?: string
            url?: string
        }[]
    }[]
    bigTechAlsoTracking: string[]
}

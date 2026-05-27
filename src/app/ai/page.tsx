import type { Metadata } from 'next'
import AIPageBody from '@/components/ai/ai-page-body'
import { AI_CONFIG } from '@/ai-config'

export const metadata: Metadata = {
    title: 'AI Learning Library',
    description: AI_CONFIG.hero.intro,
}

export default function AIPage() {
    return <AIPageBody />
}

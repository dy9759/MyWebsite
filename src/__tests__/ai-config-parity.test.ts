import { describe, expect, it } from 'vitest'
import { AI_CONFIG } from '@/ai-config'
import { AI_CONFIG_EN } from '@/ai-config-en'

// url is language-independent, so it is the stable key to align a zh entry
// with its en translation. The shape deliberately omits labels/names (those
// are translated and expected to differ) so a deep-equal catches only real
// drift: layer order, item/group count, url, or pinned flag between languages.
const sourceShape = (config: typeof AI_CONFIG) =>
    config.sources.map((layer) => ({
        layer: layer.layer,
        items: (layer.items ?? []).map((item) => ({
            url: item.url,
            pinned: item.pinned ?? false,
        })),
        groups: (layer.groups ?? []).map((group) => ({
            items: group.items.map((item) => ({
                url: item.url,
                pinned: item.pinned ?? false,
            })),
        })),
    }))

describe('AI_CONFIG zh/en parity', () => {
    it('shares the collections inherited via the spread by reference', () => {
        const inherited = [
            'videos',
            'podcasts',
            'newsletters',
            'products',
            'prompts',
            'skills',
        ] as const
        for (const key of inherited) {
            expect(AI_CONFIG_EN[key]).toBe(AI_CONFIG[key])
        }
    })

    it('keeps people aligned by url and pinned flag', () => {
        expect(AI_CONFIG_EN.people).toHaveLength(AI_CONFIG.people.length)
        AI_CONFIG.people.forEach((person, idx) => {
            expect(AI_CONFIG_EN.people[idx]?.url).toBe(person.url)
            expect(AI_CONFIG_EN.people[idx]?.pinned ?? false).toBe(
                person.pinned ?? false,
            )
        })
    })

    it('keeps the hand-written EN source layers structurally aligned with zh', () => {
        expect(sourceShape(AI_CONFIG_EN)).toEqual(sourceShape(AI_CONFIG))
    })
})

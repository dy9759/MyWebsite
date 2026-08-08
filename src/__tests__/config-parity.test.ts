import { describe, expect, it } from 'vitest'
import { CONFIG, CONFIG_EN } from '@/config'

const CJK = /[一-鿿]/

describe('zh/en config parity', () => {
    it('has the same number of projects', () => {
        expect(CONFIG_EN.projects.length).toBe(CONFIG.projects.length)
    })

    it('keeps project pinned flags aligned by index', () => {
        CONFIG.projects.forEach((project, idx) => {
            expect(CONFIG_EN.projects[idx]?.pinned ?? false).toBe(
                project.pinned ?? false,
            )
        })
    })

    it('has the same number of research publications', () => {
        expect(CONFIG_EN.research?.publications?.length).toBe(
            CONFIG.research?.publications?.length,
        )
    })

    it('has the same number of research conferences', () => {
        expect(CONFIG_EN.research?.conferences?.length).toBe(
            CONFIG.research?.conferences?.length,
        )
    })

    it('translates every publication tier and year in EN config', () => {
        for (const publication of CONFIG_EN.research?.publications ?? []) {
            expect(publication.tier, publication.title).not.toMatch(CJK)
            expect(publication.year, publication.title).not.toMatch(CJK)
        }
    })

    it('translates every conference year in EN config', () => {
        for (const conference of CONFIG_EN.research?.conferences ?? []) {
            expect(conference.year, conference.title).not.toMatch(CJK)
        }
    })
})

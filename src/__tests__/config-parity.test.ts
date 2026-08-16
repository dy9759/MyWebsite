import { describe, expect, it } from 'vitest'
import { CONFIG, CONFIG_EN } from '@/config'

const CJK = /[一-鿿]/

describe('zh/en config parity', () => {
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

    it('derives EN conferences 1:1 from zh with translated title, venue and authors', () => {
        const zh = CONFIG.research?.conferences ?? []
        const en = CONFIG_EN.research?.conferences ?? []
        expect(en).toHaveLength(zh.length)
        en.forEach((conference, idx) => {
            // alignment: pinned flag tracks the same zh entry by position
            expect(conference.pinned ?? false).toBe(zh[idx]?.pinned ?? false)
            // no untranslated Chinese leaks into the EN list
            expect(conference.title, conference.title).not.toMatch(CJK)
            expect(conference.venue, conference.title).not.toMatch(CJK)
            expect(conference.authors, conference.title).not.toMatch(CJK)
        })
    })
})

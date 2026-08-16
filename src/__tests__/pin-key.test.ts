import { describe, expect, it } from 'vitest'
import { createPinKey, pinSlug } from '@/lib/use-pinned-items'

describe('pinSlug', () => {
    it('normalizes whitespace and case for ascii text', () => {
        expect(pinSlug('Techmeme')).toBe('techmeme')
        expect(pinSlug('  Andrej Karpathy ')).toBe('andrej-karpathy')
    })

    it('preserves CJK so zh titles stay distinct', () => {
        const zh = '碳中和背景下粮食主产区土地利用多情景模拟与碳储量分析'
        expect(pinSlug(zh)).toBe(zh)
    })

    it('is deterministic and stable for the same content', () => {
        // stability across reorder is the whole point of a content slug
        expect(pinSlug('Simon Willison')).toBe(pinSlug('Simon Willison'))
        expect(pinSlug('A')).not.toBe(pinSlug('B'))
    })
})

describe('createPinKey', () => {
    it('joins scope and parts with a stable separator', () => {
        expect(createPinKey('ai-source', 0, 'item', pinSlug('Techmeme'))).toBe(
            'ai-source::0::item::techmeme',
        )
    })

    it('drops undefined parts', () => {
        expect(createPinKey('research-publication', undefined, 'x')).toBe(
            'research-publication::x',
        )
    })
})

import { describe, expect, it } from 'vitest'
import { byYearDesc, toEnglishDate, yearSortValue } from '@/lib/year-sort'

describe('yearSortValue', () => {
    it('parses zh year formats', () => {
        expect(yearSortValue('2026')).toBe(202600)
        expect(yearSortValue('2025.5')).toBe(202505)
        expect(yearSortValue('2024.12')).toBe(202412)
    })

    it('parses en month-year labels', () => {
        expect(yearSortValue('May 2025')).toBe(202505)
        expect(yearSortValue('Dec 2024')).toBe(202412)
    })

    it('treats accepted papers as newest', () => {
        expect(yearSortValue('录用')).toBe(Number.MAX_SAFE_INTEGER)
        expect(yearSortValue('Accepted')).toBe(Number.MAX_SAFE_INTEGER)
        expect(yearSortValue('录用')).toBeGreaterThan(yearSortValue('2026'))
    })

    it('sinks unknown formats to the bottom', () => {
        expect(yearSortValue('Sept 2024')).toBe(0)
        expect(yearSortValue('June 2026')).toBe(0)
        expect(yearSortValue('')).toBe(0)
    })

    it('sorts newest first', () => {
        const items = [
            { year: '2023.10' },
            { year: '录用' },
            { year: '2026' },
            { year: 'May 2025' },
        ]
        expect([...items].sort(byYearDesc).map((i) => i.year)).toEqual([
            '录用',
            '2026',
            'May 2025',
            '2023.10',
        ])
    })
})

describe('toEnglishDate', () => {
    it('converts any zh YYYY.M date, not just a fixed table (#100)', () => {
        expect(toEnglishDate('2025.11')).toBe('Nov 2025')
        expect(toEnglishDate('2023.10')).toBe('Oct 2023')
        expect(toEnglishDate('2024.1')).toBe('Jan 2024')
        expect(toEnglishDate('2026')).toBe('2026')
        expect(toEnglishDate('录用')).toBe('Accepted')
        expect(toEnglishDate('2024.13')).toBe('2024')
        expect(toEnglishDate('soon')).toBe('soon')
    })
})

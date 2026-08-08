const EN_MONTHS: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
}

// 录用/Accepted = forthcoming, sorts above dated entries
export const yearSortValue = (year: string): number => {
    if (year === '录用' || year === 'Accepted') return Number.MAX_SAFE_INTEGER
    const zh = year.match(/^(\d{4})(?:\.(\d{1,2}))?$/)
    if (zh) return Number(zh[1]) * 100 + Number(zh[2] ?? 0)
    const en = year.match(/^([A-Z][a-z]{2}) (\d{4})$/)
    if (en) return Number(en[2]) * 100 + (EN_MONTHS[en[1]] ?? 0)
    return 0
}

export const byYearDesc = <T extends { year: string }>(a: T, b: T) =>
    yearSortValue(b.year) - yearSortValue(a.year)

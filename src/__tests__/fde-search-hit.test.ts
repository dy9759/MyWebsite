// @vitest-environment jsdom
// Regression: a wiki search hit must dock the FDE runner in the question's
// chapter even though the parent clears its target as soon as it is used.
import { createElement, useState } from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

// Stand-in for the dynamically imported runner: expose what it was given.
vi.mock('next/dynamic', () => ({
    default: () => (props: { target: { id?: string } | null }) =>
        createElement('div', { 'data-testid': 'runner', 'data-target': props.target?.id ?? '' }),
}))
vi.mock('@/components/language-provider', () => ({
    useLanguage: () => ({ language: 'zh' }),
}))

import WikiFdeChapters from '@/components/wiki/wiki-fde-chapters'

afterEach(() => {
    cleanup()
    window.localStorage.clear()
})

// Mirrors wiki-page-body: the target is cleared through onTargetUsed.
function Parent() {
    const [target, setTarget] = useState<{ id: string; ts: number } | null>({ id: 'embedding-rag-v1', ts: 1 })
    return createElement(WikiFdeChapters, { target, onTargetUsed: () => setTarget(null) })
}

it('docks the runner in the hit question\'s chapter after the parent clears the target', async () => {
    const { getByTestId } = render(createElement(Parent))
    await waitFor(() => expect(getByTestId('runner').dataset.target).toBe('embedding-rag-v1'))
    expect(getByTestId('runner').closest('[id^="course-"]')?.id).toBe('course-fde1')
})

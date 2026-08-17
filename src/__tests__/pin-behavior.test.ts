// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createPinKey, pinSlug, usePinnedItems } from '@/lib/use-pinned-items'

const STORAGE_KEY = 'personal-site-pins-v1'

const stored = () => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
}

beforeEach(() => window.localStorage.clear())
afterEach(() => window.localStorage.clear())

describe('usePinnedItems', () => {
    it('returns the item default when nothing is stored', () => {
        const { result } = renderHook(() => usePinnedItems())
        expect(result.current.isPinned('ai-video::x', true)).toBe(true)
        expect(result.current.isPinned('ai-video::x', false)).toBe(false)
    })

    it('persists an override to localStorage and flips isPinned', () => {
        const { result } = renderHook(() => usePinnedItems())
        act(() => result.current.togglePinned('ai-video::x', false))
        expect(result.current.isPinned('ai-video::x', false)).toBe(true)
        expect(stored()).toEqual({ 'ai-video::x': true })
    })

    it('unpins a default-pinned item and stores false', () => {
        const { result } = renderHook(() => usePinnedItems())
        act(() => result.current.togglePinned('ai-source::0::item::techmeme', true))
        expect(result.current.isPinned('ai-source::0::item::techmeme', true)).toBe(
            false,
        )
        expect(stored()).toEqual({ 'ai-source::0::item::techmeme': false })
    })

    it('returns to the original state after two toggles (#31 repro)', () => {
        const { result } = renderHook(() => usePinnedItems())
        act(() => result.current.togglePinned('k', false))
        act(() => result.current.togglePinned('k', false))
        expect(result.current.isPinned('k', false)).toBe(false)
    })

    it('shares pin state across components via the change event', () => {
        const a = renderHook(() => usePinnedItems())
        const b = renderHook(() => usePinnedItems())
        act(() => a.result.current.togglePinned('shared', false))
        // b never toggled anything but sees a's write through the store
        expect(b.result.current.isPinned('shared', false)).toBe(true)
    })

    it('persists across a remount (page refresh)', () => {
        const first = renderHook(() => usePinnedItems())
        act(() => first.result.current.togglePinned('persist', false))
        first.unmount()
        const second = renderHook(() => usePinnedItems())
        expect(second.result.current.isPinned('persist', false)).toBe(true)
    })

    it('keys grouped source items independently by layer, group and name (#35)', () => {
        const { result } = renderHook(() => usePinnedItems())
        // same item name in two different layers/groups must not collide
        const discord = createPinKey(
            'ai-source',
            5,
            'group',
            pinSlug('Discord'),
            pinSlug('OpenAI'),
        )
        const podcasts = createPinKey(
            'ai-source',
            6,
            'group',
            pinSlug('Podcasts'),
            pinSlug('OpenAI'),
        )
        expect(discord).not.toBe(podcasts)
        act(() => result.current.togglePinned(discord, false))
        expect(result.current.isPinned(discord, false)).toBe(true)
        expect(result.current.isPinned(podcasts, false)).toBe(false)
    })
})

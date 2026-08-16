'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'personal-site-pins-v1'
const CHANGE_EVENT = 'personal-site-pins-change'

type PinOverrides = Record<string, boolean>

export const createPinKey = (
    scope: string,
    ...parts: Array<string | number | undefined>
) => [scope, ...parts.filter((part) => part !== undefined)].join('::')

// Stable pin identifier derived from an item's content (title/name/url).
// Index-based keys drift when the underlying list is reordered or edited;
// a content slug keeps a pin attached to the same item across such changes.
export const pinSlug = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, '-')

const EMPTY: PinOverrides = {}

// Cache keyed on the raw string so getSnapshot returns a stable reference
// until localStorage actually changes (required by useSyncExternalStore).
let cache: { raw: string | null; parsed: PinOverrides } = {
    raw: null,
    parsed: EMPTY,
}

const readStoredPins = (): PinOverrides => {
    if (typeof window === 'undefined') return EMPTY
    let raw: string | null = null
    try {
        raw = window.localStorage.getItem(STORAGE_KEY)
    } catch {
        return EMPTY
    }
    if (raw === cache.raw) return cache.parsed
    let parsed: PinOverrides = EMPTY
    try {
        const value = raw ? JSON.parse(raw) : null
        parsed = value && typeof value === 'object' ? value : EMPTY
    } catch {
        parsed = EMPTY
    }
    cache = { raw, parsed }
    return parsed
}

const subscribe = (onChange: () => void) => {
    window.addEventListener(CHANGE_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
        window.removeEventListener(CHANGE_EVENT, onChange)
        window.removeEventListener('storage', onChange)
    }
}

const getServerSnapshot = () => EMPTY

export const usePinnedItems = () => {
    const overrides = useSyncExternalStore(
        subscribe,
        readStoredPins,
        getServerSnapshot,
    )

    const isPinned = useCallback(
        (key: string, defaultPinned = false) =>
            Object.prototype.hasOwnProperty.call(overrides, key)
                ? overrides[key]
                : defaultPinned,
        [overrides],
    )

    const togglePinned = useCallback((key: string, defaultPinned = false) => {
        const current = readStoredPins()
        const currentPinned = Object.prototype.hasOwnProperty.call(current, key)
            ? current[key]
            : defaultPinned
        const next = { ...current, [key]: !currentPinned }
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        window.dispatchEvent(new Event(CHANGE_EVENT))
    }, [])

    return {
        isPinned,
        togglePinned,
    }
}

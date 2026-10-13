'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { sortPinnedFirst } from '@/lib/pin'
import { readRaw, writeRaw } from '@/lib/safe-storage'

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

// Language-independent pin slug: the item's URL is identical in zh and en,
// while names/titles are translated (issue #90). Falls back to the name.
export const stablePinSlug = (url: string | undefined, name: string) =>
    pinSlug(url && url.trim() ? url : name)

const EMPTY: PinOverrides = {}

// Cache keyed on the raw string so getSnapshot returns a stable reference
// until localStorage actually changes (required by useSyncExternalStore).
let cache: { raw: string | null; parsed: PinOverrides } = {
    raw: null,
    parsed: EMPTY,
}

const readStoredPins = (): PinOverrides => {
    if (typeof window === 'undefined') return EMPTY
    const raw = readRaw(STORAGE_KEY)
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

const has = (o: PinOverrides, k: string | undefined): k is string =>
    k !== undefined && Object.prototype.hasOwnProperty.call(o, k)

const resolvePinned = (
    overrides: PinOverrides,
    key: string,
    defaultPinned: boolean,
    legacyKey?: string,
) =>
    has(overrides, key)
        ? overrides[key]
        : has(overrides, legacyKey)
          ? overrides[legacyKey]
          : defaultPinned

export const usePinnedItems = () => {
    const overrides = useSyncExternalStore(
        subscribe,
        readStoredPins,
        getServerSnapshot,
    )

    // legacyKey: the pre-#90 name-based key, honoured until the item is
    // toggled again (then the stable key is written).
    const isPinned = useCallback(
        (key: string, defaultPinned = false, legacyKey?: string) =>
            resolvePinned(overrides, key, defaultPinned, legacyKey),
        [overrides],
    )

    const togglePinned = useCallback(
        (key: string, defaultPinned = false, legacyKey?: string) => {
            const current = readStoredPins()
            const next = {
                ...current,
                [key]: !resolvePinned(current, key, defaultPinned, legacyKey),
            }
            // Storage blocked or full — leave the pin unchanged.
            if (!writeRaw(STORAGE_KEY, JSON.stringify(next))) return
            window.dispatchEvent(new Event(CHANGE_EVENT))
        },
        [],
    )

    return {
        isPinned,
        togglePinned,
    }
}

// Collapses the repeated call-site boilerplate (issue #64): augment each item
// with its content-derived pinKey, sort pinned-first, and expose the pin state.
export const usePinnedList = <T extends { pinned?: boolean; url?: string }>(
    items: T[],
    scope: string,
    nameOf: (item: T) => string,
) => {
    const pinState = usePinnedItems()
    const withKeys = items.map((item) => ({
        ...item,
        pinKey: createPinKey(scope, stablePinSlug(item.url, nameOf(item))),
        legacyKey: createPinKey(scope, pinSlug(nameOf(item))),
    }))
    const legacyOf = new Map(withKeys.map((item) => [item.pinKey, item.legacyKey]))
    const isPinned = (key: string, defaultPinned = false) =>
        pinState.isPinned(key, defaultPinned, legacyOf.get(key))
    const togglePinned = (key: string, defaultPinned = false) =>
        pinState.togglePinned(key, defaultPinned, legacyOf.get(key))
    const sorted = sortPinnedFirst(withKeys, (item) =>
        isPinned(item.pinKey, item.pinned),
    )
    return { items: sorted, isPinned, togglePinned }
}

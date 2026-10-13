'use client'

import { useState, useSyncExternalStore } from 'react'

const noSubscribe = () => () => {}

// false on the server and during hydration, true afterwards — and from the
// first render for components that mount client-side only. Lets browser-only
// values (localStorage, the URL) replace the static-export defaults without a
// hydration mismatch.
export const useHydrated = () =>
    useSyncExternalStore(
        noSubscribe,
        () => true,
        () => false,
    )

// State seeded from the browser: `fallback` for the server render and
// hydration, then `read()` once on the client (and again whenever `key`
// changes). Adjusts state during render instead of in an effect, so the stored
// value lands before paint rather than in a second commit.
export function useStoredState<T>(read: () => T, fallback: T, key = '') {
    const hydrated = useHydrated()
    const [state, setState] = useState(fallback)
    const [loadedKey, setLoadedKey] = useState<string | null>(null)
    if (hydrated && loadedKey !== key) {
        setLoadedKey(key)
        setState(read())
    }
    return [state, setState] as const
}

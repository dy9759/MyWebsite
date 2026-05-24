'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'personal-site-pins-v1'

type PinOverrides = Record<string, boolean>

export const createPinKey = (
    scope: string,
    ...parts: Array<string | number | undefined>
) => [scope, ...parts.filter((part) => part !== undefined)].join('::')

const readStoredPins = (): PinOverrides => {
    if (typeof window === 'undefined') return {}

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        const parsed = JSON.parse(raw)
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
        return {}
    }
}

const writeStoredPins = (pins: PinOverrides) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pins))
}

export const usePinnedItems = () => {
    const [overrides, setOverrides] = useState<PinOverrides>({})

    useEffect(() => {
        setOverrides(readStoredPins())
    }, [])

    const isPinned = useCallback(
        (key: string, defaultPinned = false) =>
            Object.prototype.hasOwnProperty.call(overrides, key)
                ? overrides[key]
                : defaultPinned,
        [overrides],
    )

    const togglePinned = useCallback((key: string, defaultPinned = false) => {
        setOverrides((current) => {
            const currentPinned = Object.prototype.hasOwnProperty.call(
                current,
                key,
            )
                ? current[key]
                : defaultPinned
            const next = {
                ...current,
                [key]: !currentPinned,
            }
            writeStoredPins(next)
            return next
        })
    }, [])

    return {
        isPinned,
        togglePinned,
    }
}

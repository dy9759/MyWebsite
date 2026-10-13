'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { readRaw, writeRaw } from '@/lib/safe-storage'

const STORAGE_KEY = 'personal-site-pin-edit-mode'
const CHANGE_EVENT = 'pin-edit-mode-change'

// localStorage can throw (blocked storage, Safari private mode) — this hook
// runs in the footer of every page, so it must never take the tree down.
const readStoredEditMode = () => {
    if (typeof window === 'undefined') return false
    return readRaw(STORAGE_KEY) === '1'
}

const subscribe = (onChange: () => void) => {
    window.addEventListener(CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CHANGE_EVENT, onChange)
}

const getServerSnapshot = () => false

export const usePinEditMode = () => {
    const editMode = useSyncExternalStore(
        subscribe,
        readStoredEditMode,
        getServerSnapshot,
    )

    const toggleEditMode = useCallback(() => {
        if (!writeRaw(STORAGE_KEY, readStoredEditMode() ? '0' : '1')) return
        window.dispatchEvent(new Event(CHANGE_EVENT))
    }, [])

    return { editMode, toggleEditMode }
}

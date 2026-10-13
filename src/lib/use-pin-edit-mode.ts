'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'personal-site-pin-edit-mode'
const CHANGE_EVENT = 'pin-edit-mode-change'

// localStorage can throw (blocked storage, Safari private mode) — this hook
// runs in the footer of every page, so it must never take the tree down.
const readStoredEditMode = () => {
    if (typeof window === 'undefined') return false
    try {
        return window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
        return false
    }
}

export const usePinEditMode = () => {
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setEditMode(readStoredEditMode())
        const sync = () => setEditMode(readStoredEditMode())
        window.addEventListener(CHANGE_EVENT, sync)
        return () => window.removeEventListener(CHANGE_EVENT, sync)
    }, [])

    const toggleEditMode = useCallback(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                readStoredEditMode() ? '0' : '1',
            )
        } catch {
            return
        }
        window.dispatchEvent(new Event(CHANGE_EVENT))
    }, [])

    return { editMode, toggleEditMode }
}

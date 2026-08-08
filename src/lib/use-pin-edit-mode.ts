'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'personal-site-pin-edit-mode'
const CHANGE_EVENT = 'pin-edit-mode-change'

const readStoredEditMode = () => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(STORAGE_KEY) === '1'
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
        window.localStorage.setItem(
            STORAGE_KEY,
            readStoredEditMode() ? '0' : '1',
        )
        window.dispatchEvent(new Event(CHANGE_EVENT))
    }, [])

    return { editMode, toggleEditMode }
}

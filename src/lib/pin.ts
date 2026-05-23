export type Pinnable = {
    pinned?: boolean
}

export const isPinned = (item: Pinnable) => item.pinned === true

export const filterPinned = <T extends Pinnable>(items: T[]) =>
    items.filter(isPinned)

export const sortPinnedFirst = <T extends Pinnable>(items: T[]) =>
    [...items].sort((a, b) => Number(isPinned(b)) - Number(isPinned(a)))

export type Pinnable = {
    pinned?: boolean
}

export const isPinned = (item: Pinnable) => item.pinned === true

export const filterPinned = <T extends Pinnable>(
    items: T[],
    resolvePinned: (item: T) => boolean = isPinned,
) => items.filter(resolvePinned)

export const sortPinnedFirst = <T extends Pinnable>(
    items: T[],
    resolvePinned: (item: T) => boolean = isPinned,
) =>
    [...items].sort(
        (a, b) => Number(resolvePinned(b)) - Number(resolvePinned(a)),
    )

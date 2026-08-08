export type Pinnable = {
    pinned?: boolean
}

export const filterPinned = <T extends Pinnable>(
    items: T[],
    resolvePinned: (item: T) => boolean,
) => items.filter(resolvePinned)

export const sortPinnedFirst = <T extends Pinnable>(
    items: T[],
    resolvePinned: (item: T) => boolean,
) =>
    [...items].sort(
        (a, b) => Number(resolvePinned(b)) - Number(resolvePinned(a)),
    )

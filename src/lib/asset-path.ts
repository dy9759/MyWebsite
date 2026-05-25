/**
 * Prefix an absolute public-asset path with the configured basePath.
 *
 * Required for static assets (avatars, hero images) that are referenced as
 * `/images/foo.jpg` and rendered via components that do NOT auto-prefix
 * `basePath` (e.g. Radix `<AvatarImage>` preload, plain `<img>`, CSS `url()`).
 *
 * Next.js' own `<Image>` and `<Link>` already prefix basePath automatically,
 * but Radix `AvatarImage` uses the raw `src` string to preload via
 * `new Image()`, which bypasses any framework prefixing and 404s on Pages.
 */
export function withBasePath(path: string): string {
    if (!path) return path
    if (/^(https?:)?\/\//.test(path)) return path
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
    if (!path.startsWith('/')) return path
    return `${base}${path}`
}

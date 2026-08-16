/** @type {import('next').NextConfig} */
import fs from 'node:fs'

const hasCustomDomain = fs.existsSync('./public/CNAME')
const isGithubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]

// basePath resolution (documented in README "Deployment"):
// 1. An explicit NEXT_PUBLIC_BASE_PATH always wins (set '' to force root).
// 2. Otherwise a GitHub project-pages build derives `/<repo>`.
// 3. A custom domain (public/CNAME) always serves from root.
const derivedBasePath =
    isGithubPages && repoName && !hasCustomDomain ? `/${repoName}` : ''
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? derivedBasePath

// A custom domain serves from '/', so a non-empty basePath would break every
// asset URL. Fail the build loudly instead of shipping a broken deploy.
if (hasCustomDomain && basePath !== '') {
    throw new Error(
        `public/CNAME serves the site from '/', but basePath is '${basePath}'. ` +
            `Unset NEXT_PUBLIC_BASE_PATH or remove public/CNAME.`,
    )
}

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath,
    assetPrefix: basePath || undefined,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
}

export default nextConfig

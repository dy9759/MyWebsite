/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const basePath = isGithubPages && repoName ? `/${repoName}` : ''

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath,
    assetPrefix: basePath || undefined,
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

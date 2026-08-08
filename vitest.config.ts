import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    // Vite 8 uses oxc; the Next tsconfig sets jsx:preserve, so force the
    // automatic runtime for test transforms.
    oxc: {
        jsx: {
            runtime: 'automatic',
        },
    },
    test: {
        include: ['src/__tests__/**/*.test.ts'],
    },
})

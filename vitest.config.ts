import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const testConfig = defineConfig({
    test: {
        include: ['tests/**/*.test.ts']
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@tests': fileURLToPath(new URL('./tests', import.meta.url))
        }
    }
});

export default testConfig;

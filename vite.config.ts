import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { existsSync, readFileSync } from 'node:fs';

const https = existsSync('/Users/viniciusbazanella/tmp/server.crt')
    ? {
          key: readFileSync('/Users/viniciusbazanella/tmp/server.key'),
          cert: readFileSync('/Users/viniciusbazanella/tmp/server.crt')
      }
    : {};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: { https }
});

import {fileURLToPath, URL} from 'node:url'
import {VitePWA} from 'vite-plugin-pwa'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173
    },
    plugins: [vue(),
        VitePWA({
                registerType: 'autoUpdate'
            }
        )
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})

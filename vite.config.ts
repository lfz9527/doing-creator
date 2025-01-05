import {defineConfig} from 'vite'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], //svg地址
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@core': '/src/core'
        }
    },
    css: {
        modules: {
            hashPrefix: 'prefix',
            generateScopedName: '[name]__[local]__[hash:base64:5]'
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    server: {
        port: 8081,
        open: true
    }
})

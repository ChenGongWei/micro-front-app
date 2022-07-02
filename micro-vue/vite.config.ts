import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    // 起别名
    resolve: {
        alias: {
            "@": resolve(__dirname, 'src'),
            "@/pages": resolve(__dirname, 'src/pages'),
            "@/routes": resolve(__dirname, 'src/routes'),
            "@/components": resolve(__dirname, 'src/components'),
        }
    },
    plugins: [vue()],
    // 配置前端服务地址和端口
    server: {
        port: 9000
    }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
            "@/assets": resolve(__dirname, 'src/assets'),
        }
    },
    plugins: [react()],
    // 配置前端服务地址和端口
    server: {
        port: 8088
    }
})

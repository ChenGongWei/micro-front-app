import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from "path"

// useDevMode 开启时与热更新插件冲突
const useDevMode = true     // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        // 起别名
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                "@": resolve(__dirname, 'src'),
                "@/pages": resolve(__dirname, 'src/pages'),
                "@/routes": resolve(__dirname, 'src/routes'),
                "@/components": resolve(__dirname, 'src/components'),
            }
        },
        plugins: [vue(), qiankun('vue', { useDevMode })],
        // 配置前端服务地址和端口
        server: {
            port: 9000,
            cors: true,
        },
        define: {
            'process.env': env
        }
    }
})

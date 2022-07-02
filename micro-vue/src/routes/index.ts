import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        /**
         * path: 路径为 / 时触发该路由规则
         * name: 路由的 name 为 Home
         * component: 触发路由时加载 `Home` 组件
         */
        path: "/",
        name: "Home",
        component: () => import('@/pages/Home/index.vue'),
    },
    {
        path: "/about",
        name: "About",
        component: () => import('@/pages/About/index.vue'),
    }
]

export default routes
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'
import routes from './routes'

let app: any = null

const isQianKun = qiankunWindow.__POWERED_BY_QIANKUN__

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
 function render(props?: any) {
    const { container } = props || {}
    app = createApp(App)
    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    const router = createRouter({
        // 运行在主应用中时，添加路由命名空间 /vue
        history: createWebHistory(isQianKun ? "/vue" : "/"),
        routes
    })
    // 挂载应用
    app.use(router).mount(container ? container.querySelector('#app') : '#app')
}


renderWithQiankun({
    update() {
        console.log('update')
    },
    mount(props) {
        console.log("viteapp mount");
        render(props);
        // console.log(instance.config.globalProperties.$route,"444444444");
    },
    bootstrap() {
        console.log('bootstrap');
    },
    unmount(props) {
        console.log("vite被卸载了");
        app.unmount()
        // instance.unmount();
        // instance._container.innerHTML = '';
        // history.destroy();// 不卸载  router 会导致其他应用路由失败
        // router = null;
        // instance = null;
    },
})

// 独立运行时
if (!isQianKun) {
    render()
}


/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
// export async function bootstrap() {
//     console.log('[vue] vue app bootstraped')
// }

// /**
//  * mount ： 在应用每次进入时调用 
//  */
// export async function mount(props: any) {
//     console.log('mount', props)
//     render(props)
// }

// /**
//  * unmount ：应用每次 切出/卸载 均会调用
//  */
// export async function unmount() {
//     console.log('unmount')
//     app.unmount()
// }
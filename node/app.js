const Koa = require('koa')
// 引入路由配置
const router = require('./router')
// 创建 koa 实例
const app = new Koa()
// 端口
const PORT = 3003

// 通过 app.use 启用路由，其他中间件也由 app.use 启用
app.use(router.routes(), router.allowedMethods())

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})
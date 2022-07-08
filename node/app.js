const Koa = require('koa')
// 引入路由模块
const router = require('koa-router')()
// 创建 koa 实例
const app = new Koa()
// 端口
const PORT = 3003

// 接受两个参数： 路由路径 及  回调函数
router.get('/', ctx => {
    ctx.body = 'Hello World'
})

app.use(ctx => {
    ctx.body = 'Hello World'
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})
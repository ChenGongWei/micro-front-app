const Koa = require('koa')
// 解析 request.body 的内容
const bodyParser = require('koa-bodyparser')
// 静态资源处理
const KoaStaticCache = require('koa-static-cache')
// 引入路由配置
const router = require('./routes')
// 创建 koa 实例
const app = new Koa()
// 端口
const PORT = 3003

// 配置允许跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200
    } else {
        await next()
    }
})

// 配置 request.body 的解析中间件
app.use(bodyParser())

// 静态资源处理，可以访问对应资源
app.use(
    KoaStaticCache('./public', {
        prefix: '/public',
        dynamic: true,
        gzip: true,
    }),
)

// 通过 app.use 启用路由，其他中间件也由 app.use 启用
app.use(router.routes(), router.allowedMethods())

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})
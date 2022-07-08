/** 抽离路由文件 */
const router = require('koa-router')()

router.get('/', ctx => {
    ctx.body = 'Hello World'
})

router.get('/user', ctx => {
    ctx.body = 'Hello User'
})

module.exports = router
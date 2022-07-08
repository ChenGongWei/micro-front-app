/** 抽离路由文件 */
const router = require('koa-router')()
const KoaBody = require('koa-body')
const path = require('path')

// 上传配置
const uploadOptions = {
    // 支持文件格式
    multipart: true,
    formidable: {
        // 上传目录 直接上传到public文件夹，方便访问 文件夹后面要记得加/
        uploadDir: path.join(__dirname, '../public/upload/'),
        // 保留文件扩展名
        keepExtensions: true,
    },
}

router.get('/', ctx => {
    ctx.body = 'Hello World'
})

router.get('/user', ctx => {
    ctx.body = 'Hello User'
})

// 普通文件上传
router.post('/upload', new KoaBody(uploadOptions), (ctx) => {
    try {
        // 获取上传的文件
        const file = ctx.request.files.file
        const filePathArr = file.filepath.split('/')
        const fileName = filePathArr.pop()
        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: {
                url: `/public/upload/${fileName}`
            }
        }
    } catch (error) {
        ctx.body = {
            code: 200,
            msg: '上传失败，请重试',
            data: {}
        }
    }
    // console.log(ctx.request.files.file, 'request')
    
})

module.exports = router
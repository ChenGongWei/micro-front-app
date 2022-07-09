/** 抽离路由文件 */
const router = require('koa-router')()
const KoaBody = require('koa-body')
const path = require('path')
const fse = require('fs-extra')

// 

// 文件上传目录
const uploadDir = path.join(__dirname, '../public')

// 上传配置
const uploadOptions = {
    // 支持文件格式
    multipart: true,
    formidable: {
        // 上传目录 直接上传到public文件夹，方便访问 文件夹后面要记得加/
        uploadDir: path.join(__dirname, '../public/'),
        // 保留文件扩展名
        keepExtensions: true,
        onFileBegin: async (name, file) => { // 文件上传前的设置
            if (!fse.existsSync(uploadDir)) {
                // 没有临时目录则创建
                await fse.mkdirs(uploadDir)
            }
        },
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
        // console.log(file.path, 'path', file.filepath)
        const filePathArr = file.filepath.split('/')
        const fileName = filePathArr.pop()
        // 图片访问的url
        const url = `http://${ctx.request.header.host}/public/${fileName}`
        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: { url }
        }
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '上传失败，请重试',
            data: {}
        }
    }
    // console.log(ctx.request.files.file, 'request')
    
})

// 临时文件目录
const TEMP_DIR = path.resolve(__dirname, '../temp')

// 大文件上传配置
const uploadStencilPreviewOptions = {
    multipart: true,
    formidable: {
        // 文件存放地址 
        uploadDir: path.resolve(__dirname, '../temp/'), 
        keepExtensions: true,
        // 文件最大size
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin: async (file, name) => {
            if (!fse.existsSync(TEMP_DIR)) {
                // 没有临时目录则创建
                await fse.mkdirs(TEMP_DIR)
            }
        }
    },
}
    

// 大文件分片上传
router.post('/upload_chunk', new KoaBody(uploadStencilPreviewOptions), async (ctx) => {
    try {
        
        // 获取上传的文件
        const file = ctx.request.files.file
        
        // 分割文件名  [name, index, ext]
        const fileNameArr = file.originalFilename.split('.')
        // console.log(fileNameArr,'file')
        // 切片存储目录
        const UPLOAD_DIR = path.resolve(__dirname, '../temp')
        const chunkDir = `${UPLOAD_DIR}/${fileNameArr[0]}`
        if (!fse.existsSync(chunkDir)) {
            // 没有临时目录则创建
            await fse.mkdirs(chunkDir)
        }
        // 原文件名.index  -   每一个分片的名字
        const dPath = path.join(chunkDir, fileNameArr[1])

        // 将分片文件从 temp 中移动到本次上传大文件的临时目录中
        await fse.move(file.filepath, dPath, { overwrite: true })
        ctx.body = {
            code: 200,
            msg: '上传成功'
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: -1,
            msg: '上传失败，请重试'
        }
    }
})

// 合并切片
router.post('/merge_chunk', async (ctx) => {
    try {
        // 获取需要合并的文件名
        const { fileName } = ctx.request.body
        const fname = fileName.split('.')[0]
        const TEMP_DIR = path.resolve(__dirname, '../temp')
        const static_preview_url = '/public/previews'
        const STORAGE_DIR = path.resolve(__dirname, `..${static_preview_url}`)
        const chunkDir = path.join(TEMP_DIR, fname)
        const chunks = await fse.readdir(chunkDir)

        if (!fse.existsSync(STORAGE_DIR)) {
            // 没有临时目录则创建
            await fse.mkdirs(STORAGE_DIR)
        }

        chunks.sort((a, b) => a - b).map((chunkPath) => {
            // 合并文件
            fse.appendFileSync(
                path.join(STORAGE_DIR, fileName),
                fse.readFileSync(`${chunkDir}/${chunkPath}`)
            )
        })

        // 删除临时文件夹
        fse.removeSync(chunkDir)
        // 图片访问的url
        const url = `http://${ctx.request.header.host}${static_preview_url}/${fileName}`
        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: { url }
        }
    } catch (error) {
        console.log(error, 'merge')
        ctx.body = {
            code: -1,
            msg: '上传失败，请重试'
        }
    }
})

module.exports = router
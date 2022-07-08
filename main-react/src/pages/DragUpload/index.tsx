/**
 * 拖拽上传文件
 */
import React, { useState, useRef } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Progress, message } from 'antd'
import axios from '@/api/request'
import style from './style.module.scss'

const DragUpload: React.FC = () => {

    /** 目标容器 */
    const el = useRef<HTMLDivElement>(null)

    /** input元素 */
    const inpEl = useRef<HTMLInputElement>(null)

    /** 上传文件 */
    const [files, setFiles] = useState<{name: string, url: string}[]>([])

    /** 进度条 */
    const [progress, setProgress] = useState(0)

    const fileChange = (e: any) => {
        console.log(e, 123)
        const fileList = (e.target as HTMLInputElement).files || []
        uploadFile(fileList[0])

        // const fileReader = new FileReader()
        // fileReader.readAsDataURL(fileList[0])
        // fileReader.onload = e => {
        //     // 获取得到的结果
        //     const data = e.target!.result
        //     setProgress(0)
        //     uploadFile(fileList[0])
        // }
    }

    /** 上传文件 */
    const uploadFile = async (file: File) => {
        setFiles([...files, { name: file.name, url: '' }])
        const timer = setInterval(() => {
            const size = Math.floor(Math.random() * 15) + 5
            if(progress + size >= 100) {
                setProgress(99)
            }
            setProgress(p => p + size)
        }, 400)
        try {
            const form = new FormData()
            form.append('name', 'file')
            form.append('file', file)
            
            const { data:res } = await axios.post('/upload', form, {
                // onUploadProgress: progress => {
                //     console.log(progress, 123)
                //     setProgress(Number(
                //         ((progress.loaded / progress.total) * 100).toFixed(2)
                //     ))
                // }
            })
            console.log(res, 'res')
            setFiles(files => files.map(item => {
                if (item.name === file.name ) {
                    return ({ ...item, url: 'http://localhost:3003' + res.data.url  })
                }
                return item
            }))
            setProgress(100)
            message.success('上传成功')
        } catch (error) {
            console.log(error)
            setFiles(files => files.filter(item => item.name !== file.name))
            message.error('上传失败，请重试')
        } finally {
            clearInterval(timer)
        }
    }

    /** 被拖拽的文件进入容器 */
    const dragOver = (e: any) => {
        e.preventDefault()
        el.current!.style.borderColor = 'red'
        // console.log(e, '进入')
    }

    /** 被拖拽的文件离开容器 */
    const dragLeave = (e: any) => {
        e.preventDefault()
        el.current!.style.borderColor = '#ccc'
        // console.log(e, '离开')
    }

    /** 被拖拽的文件在容器内松开鼠标 */
    const drop = (e: any) => {
        e.preventDefault()
        el.current!.style.borderColor = '#ccc'
        const uploadFile = e.dataTransfer?.files[0]
        uploadFile(uploadFile)

        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(uploadFile!);
        // fileReader.onload = e => {
        //     // 获取得到的结果
        //     const data = e.target!.result
        //     // setFiles([...files, { name: uploadFile.name, url: data as string }])
        //     setProgress(0)
        //     uploadFile(uploadFile, data as string)
        // }
    }

    /** 容器被点击 */
    const handleClick = () => {
        inpEl.current?.click()
    }

    return (
        <div className={style.wrap}>
            <h3 className={style.title}>拖拽上传文件</h3>
            <div
                className={style.box}
                ref={el}
                onDrop={drop}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                onClick={handleClick}
            >
                <CloudUploadOutlined style={{ fontSize: '36px' }} />
                <div className={style.tip}>将文件拖动到此处，或 <span>点击上传</span> </div>
                <input type="file" ref={inpEl} onChange={fileChange}></input>
            </div>
            <div className={style.preview}>
                {files.map((file, idx) => (
                    <div key={idx} className={style.item}>
                        <img src={file?.url} alt="" />
                        <div className={style.info}>
                            <div className={style.name}>{file.name}</div>
                            <Progress percent={idx === files.length - 1 ? progress : 100} />
                            <div className={style.name}>{file?.url}</div>
                        </div>
                    </div>
                    
                ))}
            </div>
            
        </div>
    )
}

export default DragUpload
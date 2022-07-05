/**
 * 拖拽上传文件
 */
import React, { useState, useRef } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import style from './style.module.scss'

const DragUpload: React.FC = () => {

    /** 目标容器 */
    const el = useRef<HTMLDivElement>(null)

    /** input元素 */
    const inpEl = useRef<HTMLInputElement>(null)

    /** 上传文件 */
    const [files, setFiles] = useState<string[]>([])

    const fileChange = (e: any) => {
        console.log(e, 123)
        const fileList = (e.target as HTMLInputElement).files || []

        const fileReader = new FileReader()
        fileReader.readAsDataURL(fileList[0])
        fileReader.onload = e => {
            // 获取得到的结果
            const data = e.target!.result
            setFiles([...files, data as string])
        }
    }

    // const uploadFile = async (file: File) => {
    //     const form = new FormData()
    //     form.append('name', 'file')
    //     form.append('file', file)
    //     const res = await axios.post('/uploadfile', form, {
    //         onUploadProgress: progress => {
    //             console.log(progress, 123)
    //             setProgress(Number(
    //                 ((progress.loaded / progress.total) * 100).toFixed(2)
    //             ))
    //         }
    //     })
    // }

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

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadFile!);
        fileReader.onload = e => {
            // 获取得到的结果
            const data = e.target!.result
            setFiles([...files, data as string])
        }
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
                {files.map(file => (
                    <img key={file} src={file} alt="" />
                ))}
            </div>
        </div>
    )
}

export default DragUpload
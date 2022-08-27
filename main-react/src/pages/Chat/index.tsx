import React, { useRef, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Form, { FormItem, Input  } from '../FormDemo/components/Form'

const Home: React.FC = () => {

    const formRef = useRef<Form>(null)

    const [id, setId] = useState('')

    const [socket, setSocket] = useState<Socket>()

    const [list, setList] = useState<{id: string, data: string}[]>([])

    /** 提交表单 */
    const submit = () => {
        formRef.current?.submitForm((data: any) => {
            console.log('submit：', data)
            if (data.name) {
                socket?.emit('send', data.name)
            }
        })
    }

    /** 重置表单 */
    const reset = () => {
        formRef.current?.resetFrom()
    }

    useEffect(() => {
        if (!id) {
            // 同域名可以直接写端口号加路由（例如：":8080/xxx"）确保跨域问题已解决
            const socket = io(":5000/", {
                // 这里transports的默认值为["polling", "websocket"] 也就是优先使用polling， 但是polling在谷歌浏览器连接不上
                transports: ["websocket", "polling"],
                // 这里的配置项有：IO工厂配置项、低级引擎配置项(会被设置到所有同一管理者的的socket实例上)
                // forceNew, multiplex, transports,upgrade,
                // rememberUpgrade,path,query,extraHeaders,withCredentials,
                // forceBase64,timestampRequests,
                // timestampParam,closeOnBeforeunload
                
                // 在 后端使用时，还有一些额外的配置项：
                // agent, pfx, key, passphrase, cert, ca, ciphers, rejectUnauthorized
                
                // 还有 ManagerOptions 管理性配置项：
                // autoConnect: false, // 是否自动连接，默认为true，设为false后，可以通过 connect() 或者 open()手动开启
                // reconnection: false // 是否自动重连，默认为true，设为false后，需要手动进行重连
                // reconnectionAttempts, reconnectionDelay, reconnectionDelayMax, randomizationFactor,timeout,parser
                
                // 鉴权配置
                // auth: {
                //   token: 'abcd'
                // }
            })

            socket.on("connected", (arg) => {
                console.log(socket.id);
                setId(socket.id);
                console.log(arg);
            })

            socket.on("getChat", (data) => {
                console.log(data, '消息')
                
                setList(list => [...list, data])
            })

            setSocket(socket)
        }
    }, [])

    return (
        <div>
            <h2>Form</h2>
            <Form ref={formRef}>
                <FormItem name="name" label="姓名">
                    <Input />
                </FormItem>
                <FormItem name="age" label="年龄">
                    <Input />
                </FormItem>
            </Form>
            <div style={{ display: 'flex', padding: '10px' }}>
                <div style={{ padding: '5px 20px', color: 'white', backgroundColor: 'blue', borderRadius: '5px' }} onClick={submit}>提交</div>
                <div style={{ padding: '5px 20px', color: 'white', backgroundColor: 'red', marginLeft: '20px', borderRadius: '5px' }} onClick={reset}>重置</div>
            </div>

            <div>
                {list.map((item, index) => (
                    <div key={index}>
                        <span style={{
                            fontWeight: 'bold',
                        }}>{item.id === id ? '我说：' : '他说：'}</span>
                        <span>{item.data}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
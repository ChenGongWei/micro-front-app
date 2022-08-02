import React, { useRef } from 'react'
import Form, { FormItem, Input  } from './components/Form'

const Home: React.FC = () => {

    const formRef = useRef<Form>(null)

    /** 提交表单 */
    const submit = () => {
        formRef.current?.submitForm((data: any) => {
            console.log('submit：', data)
        })
    }

    /** 重置表单 */
    const reset = () => {
        formRef.current?.resetFrom()
    }

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
        </div>
    )
}

export default Home

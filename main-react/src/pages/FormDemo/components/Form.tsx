import React, { ReactElement, PropsWithChildren } from "react"
import "./form.scss"

export type ReactChildType = {
    type: {
        displayName: string
    }
} & ReactElement

/**
 * Form 组件
 */
export default class Form extends React.Component<PropsWithChildren> {
    state: { formData: Record<string, any> } = {
        /** 表单数据 */
        formData: {},
    }

    /** 提交表单数据的方法 */
    submitForm = (cb: (data: Record<string, any>) => void) => {
        cb({ ...this.state.formData })
    }

    /** 重置表单数据 */
    resetFrom = () => {
        const { formData } = this.state
        Object.keys(formData).forEach((key) => {
            formData[key] = ""
        })
        this.setState({ formData })
    }

    /** 设置表单数据 */
    setValue = (name: string, value: string) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    }

    render() {
        const { children } = this.props
        const renderChildren: ReactElement[] = []
        React.Children.forEach(children as ReactChildType[], (child) => {
            if (child.type.displayName === 'formItem') {
                const { name } = child.props
                /** 克隆 FormItem 节点，混入改变表单单元项的方法 */
                const Children = React.cloneElement(child, {
                    key: name,                              /** 加 入key 提升渲染效果 */
                    value: this.state.formData[name] || '', /** value 值 */
                    handleChange: this.setValue            /** 用于改变 value */
                }, child.props.children)
                renderChildren.push(Children)
            }
        })
        return renderChildren
    }
}


export interface FormItemProps {
    children?: ReactChildType
    name?: string
    value?: string
    label?: string
    handleChange?: Function
}

/**
 * FormItem 组件
 */
export function FormItem(props: FormItemProps) {
    const { children, name, value, label, handleChange } = props
    const onChange = (value: string) => {
        /** 通知上一次 value 已经改变 */
        handleChange && handleChange(name, value)
    }

    return (
        <div className="form-item">
            <span className="label">{label}</span>
            {
                React.isValidElement(children) && children.type.displayName === 'input'
                    ? React.cloneElement(children, { value, onChange })
                    : null
            }
        </div>
    )
}

FormItem.displayName = 'formItem'


export interface InputProps {
    value?: string
    onChange?: (value: string) => void

}

/**
 * Input 组件
 */
export function Input({ value, onChange }: InputProps) {
    return <input className="input" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
}

Input.displayName = 'input'
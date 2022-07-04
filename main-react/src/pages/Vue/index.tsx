import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import style from "./style.module.scss"

const Vue: React.FC = () => {
    const navigate = useNavigate();

    const text = '请输入内容'

    // let timer: any = null



    // const [content, setContent] = useState('')

    // useEffect(() => {
    //     let len = 0
    //     timer = setInterval(() => {
    //         setContent(text.slice(0, len))
    //         if(len < text.length) {
    //             len++
    //         } else {
    //             clearInterval(timer)
    //         }
    //     }, 200)
    // }, [])

    return (
        <div className={style.bg}>
            {/* <h1 className={style.title}>Vue页</h1> */}
            <div className={style.inp}>
                <p>
                    {text.split('').map((item, index) => (
                        <span style={{
                            transform: 'translate(-28px,-22px)',
                            animationDelay: `${index * 50}ms`
                        }}>{item}</span>
                    ))}
                </p>

            </div>
            <div id="frame"></div>
        </div>
    );
};

export default Vue;

import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './style.module.scss'

const Home: React.FC = () => {
    const navigate = useNavigate()

    const routeList = [
        {
            title: 'React Demo',
            baseUrl: '',
            children: [{
                title: '拖拽上传文件',
                url: '/dragUpload'
            }, {
                title: '扫雷',
                url: '/mineSweeping'
            }, {
                title: 'About页',
                url: '/about'
            }]
        },
        {
            title: 'Vue Demo',
            baseUrl: '/vue',
            children: [{
                title: '第一个Vue Demo',
                url: '/about'
            }]
        }
    ]

    return (
        <div className={style.home}>
            <h2 className={style.title}>首页</h2>
            {routeList.map(route => (
                <div key={route.baseUrl} className={style.block}>
                    <h3 className={style.subTitle}>{route.title}</h3>
                    <div className={style.list}>
                        {route.children.map(item => (
                            <div
                                key={item.url}
                                className={style.item}
                                onClick={() => navigate(`${route.baseUrl}${item.url}`)}
                            >
                                &gt; {item.title} &lt;
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;

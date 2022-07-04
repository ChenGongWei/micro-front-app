/**
 * 辅助触控
 * 回到首页
 */

import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import styles from './style.module.scss'

/** 不需要展示的路由 */
const hideMap = [
    'myCustomer',
]

const AssistiveTouch: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const visible = useMemo(() => {
        const arr = hideMap.filter(v => location.pathname.indexOf(v) > -1)
        return arr.length === 0
    }, [location])

    if (location.pathname === '/') {
        return null
    }

    if (!visible) {
        return null
    }

    return (
        <div
            className={styles.touch}
            onClick={() => navigate('/', { replace: true })}>
            <HomeOutlined style={{ fontSize: '30px', color: '#aaa' }} />
        </div>
    )
}

export default React.memo(AssistiveTouch)

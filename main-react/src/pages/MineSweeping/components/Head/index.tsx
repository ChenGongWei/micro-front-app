/**
 * 头部计分区域
 */
import React from 'react'
import { useRecoilValue } from 'recoil'
import { mineStatus } from '../../store'

const GameBoard: React.FC = () => {

    const mine = useRecoilValue(mineStatus)

    return <div>
        还剩{mine}颗雷
    </div>
}

export default GameBoard
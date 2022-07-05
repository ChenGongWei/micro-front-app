/**
 * 扫雷
 */
import React from 'react'
import { RecoilRoot } from 'recoil'
import Head from './components/Head'
import GameBoard from './components/GameBoard'
import style from './style.module.scss'

const MineSweeping: React.FC = () => {

    return (
        <div className={style.wrap}>
            <RecoilRoot>
                <Head />
                <GameBoard />
            </RecoilRoot>
        </div>
    )
}

export default MineSweeping
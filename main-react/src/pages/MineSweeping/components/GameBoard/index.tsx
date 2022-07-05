/**
 * 游戏区域
 */
import React, { useState, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import classnames from 'classnames'
import { mineStatus } from '../../store'
import style from './style.module.scss'

interface Position {
    x: number
    y: number
}

interface MineProps extends Position {
    value: number
    flag: 'none' | 'open' | 'check'
}

/** 获取一个随机的 x，y 坐标 */
const getRandomXY = (row: number, column: number, res: any[]): Position => {
    let x = Math.floor(Math.random() * row)
    let y = Math.floor(Math.random() * column)
    if (res.some(i => i.x === x && i.y === y)) {
        return getRandomXY(row, column, res)
    }
    return { x, y }
}

const GameBoard: React.FC = () => {
    const row = 5, column = 5, mineSize = 5
    const [mine, setMine] = useRecoilState(mineStatus)
    const [boxs, setBoxs] = useState<MineProps[][]>([])

    /** 初始化雷盘 */
    const initBoard = useCallback(() => {
        let arr: MineProps[][] = []
        for(let x = 0; x < row; x++) {
            let yArr = []
            for(let y = 0; y < column; y++) {
                yArr.push({
                    x,
                    y,
                    value: 0,
                    flag: 'none',
                })
            }
            arr.push(yArr as MineProps[])
        }
        const mineList = initMine()
        initValue(arr, mineList)
    }, [])

    /** 初始化雷 */
    const initMine = useCallback(() => {
        let mineList: Position[] = []
        for(let i = 0; i < mineSize; i++) {
            const position = getRandomXY(row, column, mineList)
            mineList.push(position)
        }
        return mineList
    }, [])

    /** 初始化数值 */
    const initValue = useCallback((arr: MineProps[][], mineList: Position[]) => {
        mineList.forEach((item: Position) => {
            arr[item.x][item.y].value = -1
            const circleBox = getCircleBox(item.x, item.y)
            circleBox.forEach((box: Position) => {
                const value = arr[box.x][box.y].value
                if (value !== -1) {
                    arr[box.x][box.y].value = value + 1
                }
            })
        })
        setBoxs(arr)
    }, [])

    /** 获取指定位置一圈的坐标 */
    const getCircleBox = useCallback((clientX: number, clientY: number) => {
        let res = []
        for(let x = clientX - 1; x <= clientX + 1; x ++) {
            if (x < 0) continue
            if (x >= row) break 
            for (let y = clientY - 1; y <= clientY + 1; y ++) {
                if (y < 0 || y >= column || (x === clientX && y === clientY)) continue
                res.push({ x, y })
            }
        }
        return res
    }, [])

    /** 鼠标点击事件 */
    const handleClick = (e: any, item: MineProps) => {
        const button = e.button
        if (button === 2) {
            console.log('右键')
        } else {
            let arr = [...boxs]
            arr[item.x][item.y].flag = 'open'
            setBoxs(arr)
        }
    }

    useEffect(() => {
        initBoard()
    }, [])
 
    useEffect(() => {
        console.log(boxs, 'mine')
    }, [boxs])

    return (
        <div className={style.box}>
            {boxs.map(row => 
                row.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={classnames(style.item, {
                            [style.open]: item.flag === 'open'
                        })} 
                        onMouseDown={(e) => handleClick(e, item)}
                        onContextMenu={e => e.preventDefault()}
                    >
                        {item.flag === 'open' ? item.value : ''}
                    </div>
                ))
            )}
        </div>
    )
}

export default GameBoard
/**
 * 游戏区域
 */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import classnames from 'classnames'
import { Modal } from 'antd'
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
    const boxsRef = useRef<MineProps[][]>([])
    const mineRef = useRef<Position[]>([])
    const surplus = useRef(row * column)

    /** 游戏是否结束 */
    const [over, setOver] = useState(false)

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
        mineRef.current = mineList
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
        boxsRef.current = arr
        setBoxs(boxsRef.current)
    }, [])

    /** 获取指定位置一圈的坐标 */
    const getCircleBox = (clientX: number, clientY: number, needValue?: boolean) => {
        let res = []
        for(let x = clientX - 1; x <= clientX + 1; x ++) {
            if (x < 0) continue
            if (x >= row) break 
            for (let y = clientY - 1; y <= clientY + 1; y ++) {
                if (y < 0 || y >= column || (x === clientX && y === clientY)) continue
                if (needValue) {
                    res.push({ 
                        x, 
                        y, 
                        value: boxsRef.current[x][y].value, 
                        flag: boxsRef.current[x][y].flag 
                    })
                } else {
                    res.push({ x, y })
                }
            }
        }
        return res
    }

    /** 鼠标点击事件 */
    const handleClick = (e: any, item: MineProps) => {
        if (over) return
        const button = e.button
        const current = boxsRef.current[item.x][item.y]
        if (button === 2) {
            if (current.flag === 'check') {
                current.flag = 'none'
                setMine(mine + 1)
            } else if (mine > 0) {
                current.flag = 'check'
                setMine(mine - 1)
            }
        } else if (current.flag !== 'check') {
            current.flag = 'open'
            surplus.current = surplus.current - 1
            console.log(surplus.current, '剩余雷数')
            if (current.value === -1) {
                setOver(true)
                gameOver()
            } else if(current.value === 0) {
                handleSpread(item.x, item.y)
            }
        }
        
        if (surplus.current === mineSize) {
            gameSuccess()
        }
        setBoxs([...boxsRef.current])
    }

    /** 扩散 */
    const handleSpread = (clientX: number, clientY: number) => {
        const circleBox = getCircleBox(clientX, clientY, true).filter((c: any) => c.value >= 0 && c.flag !== 'open' && c.flag !== 'check')
        const needSpread: { x: number, y: number }[] = []
        circleBox.forEach(c => {
            boxsRef.current[c.x][c.y].flag = 'open'
            surplus.current = surplus.current - 1
            if(boxsRef.current[c.x][c.y].value === 0) {
                needSpread.push(c)
                // handleSpread(c.x, c.y)
            }
        })
        needSpread.forEach((n) => handleSpread(n.x, n.y))
    }

    /** 游戏结束 */
    const gameOver = () => {
        mineRef.current.forEach(item => {
            boxsRef.current[item.x][item.y].flag = 'open'
        })
        setBoxs(boxsRef.current)
        setTimeout(() => {
            Modal.error({
                title: '游戏失败'
            })
        }, 500)
    }

    /** 游戏通过 */
    const gameSuccess = () => {
        setTimeout(() => {
            Modal.success({
                title: '游戏通过'
            })
        }, 500)
    }

    useEffect(() => {
        initBoard()
        setMine(mineSize)
    }, [])

    return (
        <div className={style.box} style={{ width: `${50 * column}px`, height: `${50 * row}px` }}>
            {boxs.map(row => 
                row.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={classnames(style.item, {
                            [style.open]: item.flag === 'open',
                            [style.check]: item.flag === 'check',
                            [style.mine]: item.flag === 'open' && item.value === -1,
                            [style[`color${item.value}`]]: item.flag === 'open' && item.value > 0,
                        })} 
                        onMouseDown={(e) => handleClick(e, item)}
                        onContextMenu={e => e.preventDefault()}
                    >
                        {(item.flag === 'open' && item.value > 0) ? item.value : ''}
                    </div>
                ))
            )}
        </div>
    )
}

export default GameBoard
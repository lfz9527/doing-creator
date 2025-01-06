import {createContext, useContext} from 'react'


export type justifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

export type alignType = 'top' | 'middle' | 'bottom'

interface RowContextType {
    // 排列方式
    justify: justifyType
    // 对齐方式
    align: alignType
    // 总行数
    cols: number
    // 间隔
    gap: number
    // 是否自动换行
    wrap?: boolean
    //  获取行数
    getCols: (cols: number) => number
    // 获取换行
    getGutter: () => [number, number]
}

const defaultCols = 24

export const RowContext = createContext<RowContextType>({
    justify: 'start',
    align: 'top',
    cols: defaultCols,
    gap: 0,
    wrap: true,
    getCols: (cols) => cols,
    getGutter: () => [0, 0]
})

export const useRowContext = () => useContext(RowContext)

export const validateCols = (cols: number): boolean => {
    return cols > 0 && cols <= defaultCols
}

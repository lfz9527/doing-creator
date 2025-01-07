import {createContext,useContext} from 'react'

export type justifyType =
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
export type alignType = 'top' | 'center' | 'bottom'

interface RowContextType {
    cols: number
    rowGap: number
    columnGap: number
    wrap: boolean
    justify: justifyType
    align: alignType
    getCols: (cols: number) => number
    getGutter: () => [number, number]
}

export const RowContext = createContext<RowContextType>({
    cols: 24,
    rowGap: 0,
    columnGap: 0,
    wrap: true,
    justify: 'start',
    align: 'top',
    getCols: () => 0,
    getGutter: () => [0, 0]
})

export const useRowContext = () => useContext(RowContext)
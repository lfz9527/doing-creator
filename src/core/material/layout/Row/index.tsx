import {FC, PropsWithChildren, useMemo} from 'react'
import {RowContext} from './context'
import type {justifyType, alignType} from './context'
import {ComponentNodeWrapperAttribute} from '@core/canvas/design/component-node-design-wrapper'
import LayoutWrap from '../layout-wrap'

interface RowProps {
    cols?: number
    gap?: number
    wrap?: boolean
    justify?: justifyType
    align?: alignType
    id: string
    [key: string]: any
}

const Row: FC<PropsWithChildren<RowProps & ComponentNodeWrapperAttribute>> = (
    props
) => {
    const {
        gap = 0,
        cols = 24,
        wrap = true,
        children,
        justify = 'start',
        align = 'top'
    } = props
    // 创建上下文值
    const contextValue = useMemo(
        () => ({
            cols,
            gap,
            wrap,
            justify,
            align,
            getCols: (childCols: number) => {
                // 确保列数不超过总列数
                return (childCols / cols) * 100
                // return Math.min(childCols, cols)
            },
            getGutter: (): [number, number] => [gap, 0] // 返回水平和垂直间距
        }),
        [cols, gap, wrap]
    )

    return (
        <RowContext.Provider value={contextValue}>
            <LayoutWrap
                {...props}
                style={{
                    display: 'flex',
                    gap: gap,
                    height: children ? 'auto' : '100px',
                    flexWrap: wrap ? 'wrap' : 'no-wrap',
                    justifyContent: justify,
                    alignItems:
                        align === 'top'
                            ? 'flex-start'
                            : align === 'bottom'
                              ? 'flex-end'
                              : 'center'
                }}
                isEmpty={!children}
            >
                <>{children}</>
            </LayoutWrap>
        </RowContext.Provider>
    )
}

export default Row

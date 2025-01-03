import {FC, PropsWithChildren} from 'react'
import {RowContext} from './context'
import LayoutEmpty from '@core/canvas/design/layout-empty'

interface RowProps {
    cols?: number,
    id: string
    [key: string]: any
}

const Row: FC<PropsWithChildren<RowProps>> = ({cols = 24, children, id}) => {
    const contextValue = {
        cols,
        getColSpan: (span: number) => span,
        gutter: 8,  // 添加 gutter
        getColWidth: (span: number) => `${(span / cols) * 100}%`  // 添加 getColWidth
    }

    return (
        <RowContext.Provider value={contextValue}>
            <div
                data-component-id={id}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: '8px',
                    minHeight: 50,
                    position: 'relative',
                    height: children ? 'auto' : '100px'
                }}
            >
                {children ? children :  <LayoutEmpty id={id} />}
            </div>
        </RowContext.Provider>
    )
}

export default Row

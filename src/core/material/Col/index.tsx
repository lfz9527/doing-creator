import {FC, PropsWithChildren} from 'react'
import {useRowContext} from '../Row/context'
import LayoutEmpty from '@core/canvas/design/layout-empty'

interface ColProps {
    span?: number
    id: string
    [key: string]: any
}

const Col: FC<PropsWithChildren<ColProps>> = ({span = 6, id, children}) => {
    const {getColSpan} = useRowContext()

    return (
        <div
            data-component-id={id}
            style={{
                gridColumn: `span ${getColSpan(span)}`,
                minHeight: 50
            }}
        >
            <div
                style={{
                    height: children ? 'auto' : '100px'
                }}
            >
                {children ? children : <LayoutEmpty id={id} />}
            </div>
        </div>
    )
}

export default Col

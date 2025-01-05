import {FC, PropsWithChildren} from 'react'
import {useRowContext} from '../Row/context'
import {ComponentNodeWrapperAttribute} from '@core/canvas/design/component-node-design-wrapper'
import LayoutWrap from '../layout-wrap'

interface ColProps {
    // 占据的列数
    span?: number
    // 左侧偏移列数
    offset?: number
    id: string
    [key: string]: any
}

const Col: FC<PropsWithChildren<ColProps & ComponentNodeWrapperAttribute>> = (
    props
) => {
    const {span = 24, offset = 0, children} = props
    const {getCols, gap} = useRowContext()

    // 计算列宽百分比
    const width = `${getCols(span)}%`

    // 通过 marginLeft 实现偏移
    const style = {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: `calc(${width} - ${gap / 2}px)`,
        maxWidth: width,
        marginLeft: offset > 0 ? `${getCols(offset)}%` : undefined,
        height: children ? 'auto' : '100px'
    }

    return (
        <LayoutWrap {...props} style={style} isEmpty={!children}>
            {children}
        </LayoutWrap>
    )
}

export default Col

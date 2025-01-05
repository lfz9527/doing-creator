import {FC, PropsWithChildren} from 'react'
import LayoutEmpty from '@core/canvas/design/layout-empty'
import {ComponentNodeWrapperAttribute} from '@core/canvas/design/component-node-design-wrapper'

type LayoutWrapBaseProps = {
    id: string
}

type LayoutWrapProps = LayoutWrapBaseProps & ComponentNodeWrapperAttribute

const LayoutWrap: FC<PropsWithChildren<LayoutWrapProps>> = (props) => {
    const {
        children,
        nodePath,
        id,
        handleClick,
        handleMouseOver,
        handleMouseOut,
        maskRef,
        isOverCurrent,
        canDrop,
        ComponentNodeDrop,
        style,
        key,
        isEmpty
    } = props

    console.log('===', isEmpty)

    return (
        <div
            key={key}
            ref={maskRef}
            onClick={(e) => {
                e.stopPropagation()
                handleClick(e, true)
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            node-path={nodePath}
            data-component-id={id}
            style={{
                ...style,
                position: 'relative'
            }}
        >
            {isOverCurrent && canDrop && <ComponentNodeDrop />}
            {isEmpty && <LayoutEmpty id={id} />}
            {children}
        </div>
    )
}

export default LayoutWrap

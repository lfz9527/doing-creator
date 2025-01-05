import React, {
    CSSProperties,
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState,
    isValidElement,
    cloneElement
} from 'react'
import {materialCateType} from '@core/meta'

import {useMergeRefs, useDrop} from '@core/hooks'

import ComponentNodeDrop from '@core/canvas/design/component-node-drop'

export type ComponentNodeDesignWrapperProps = {
    /**
     * 节点id
     */
    id: string
    /**
     * 标识节点的路径
     */
    nodePath: string
    /**
     * 节点对应的组件名称
     */
    componentName: string
    /**
     * 节点对应的组件分类
     */
    componentCategory: materialCateType
    /**
     * 点击事件
     */
    onClick: (ref: HTMLDivElement | null) => void
    /**
     * 鼠标移入事件
     */
    onMouseOver?: (ref: HTMLDivElement | null) => void
    /**
     * 鼠标移出事件
     */
    onMouseOut?: (ref?: HTMLDivElement) => void
}

export type ComponentNodeWrapperAttribute = {
    key: string
    nodePath: string
    handleClick: (event: React.MouseEvent, current?: boolean) => void
    handleMouseOver: (event: React.MouseEvent, current?: boolean) => void
    handleMouseOut: (event: React.MouseEvent, current?: boolean) => void
    isOverCurrent: boolean
    canDrop: boolean
    ComponentNodeDrop: React.ComponentType<any>
    maskRef: any
    [key: string]: any // 允许其他属性通过
}

const elTagMap = new Map([
    ['inline-block', ['A', 'SPAN', 'BUTTON', 'B', 'I', 'IMG', 'STRONG']],
    ['block', ['DIV', 'P', 'SECTION']]
])

export const ComponentNodeDesignWrapper: FC<
    PropsWithChildren<ComponentNodeDesignWrapperProps>
> = (props) => {
    const {
        id,
        nodePath,
        children,
        componentName,
        componentCategory,
        onMouseOver = () => {},
        onClick = () => {},
        onMouseOut = () => {}
    } = props

    const isLayout = componentCategory === 'layout'
    const isPage = componentName === 'Page'
    const ref = useRef<HTMLDivElement | null>(null)
    const [targetNodeHtml, setTargetNodeHtml] = useState<HTMLElement>()

    const {drop, canDrop, isOverCurrent} = useDrop({
        id: id,
        name: componentName,
        path: nodePath,
        element: targetNodeHtml
    })

    const mgRef = useMergeRefs(ref, drop)

    useEffect(() => {
        if (!ref || !ref.current) return
        const currentEle: HTMLDivElement = ref.current
        const firstChild = currentEle?.firstChild as HTMLElement
        setTargetNodeHtml(firstChild)
    }, [])

    const wrapperStyle: CSSProperties = useMemo(() => {
        const baseStyle = {
            boxSizing: 'border-box'
        } as const
        // 其他组件使用原来的样式
        const tagName = targetNodeHtml?.nodeName
        const realDisplay = Array.from(elTagMap).find(([, value]) =>
            value.includes(tagName!)
        )?.[0]

        // 布局组件使用 contents 使其包装器不影响实际布局
        // Page 组件使用 initial
        // 其他组件根据其 HTML 标签类型决定显示方式
        // const display = isPage ? 'inline-block' : realDisplay || 'inline-block'
        const display = realDisplay || 'inline-block'

        return {
            ...baseStyle,
            width: display === 'block' ? '100%' : 'auto',
            height: display === 'block' ? '100%' : 'auto',
            display
        }
    }, [componentName, targetNodeHtml, isLayout, isPage])

    // 事件处理器
    const handleClick: ComponentNodeWrapperAttribute['handleClick'] = (
        event
    ) => {
        event.stopPropagation()
        onClick(ref.current)
    }

    const handleMouseOver: ComponentNodeWrapperAttribute['handleMouseOver'] = (
        event
    ) => {
        event.stopPropagation()
        onMouseOver(ref.current)
    }

    const handleMouseOut: ComponentNodeWrapperAttribute['handleMouseOut'] = (
        event
    ) => {
        event.stopPropagation()
        onMouseOut()
    }
    // 对于布局组件，我们可以直接渲染内容
    if (isLayout) {
        return isValidElement(children)
            ? cloneElement(children, {
                  key: nodePath + '_wrapper_key',
                  nodePath,
                  handleClick,
                  handleMouseOver,
                  handleMouseOut,
                  maskRef: mgRef,
                  isOverCurrent,
                  canDrop,
                  ComponentNodeDrop,
                  ...children.props
              } as ComponentNodeWrapperAttribute)
            : children
    }

    return (
        <div
            key={nodePath + '_wrapper_key'}
            style={wrapperStyle}
            ref={mgRef}
            node-path={nodePath}
            data-component-id={id}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isOverCurrent && canDrop && <ComponentNodeDrop />}
            {children}
        </div>
    )
}

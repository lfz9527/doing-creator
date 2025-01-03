import React, {
    CSSProperties,
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState
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
        path: nodePath
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
        const display = isLayout
            ? 'contents'
            : isPage
              ? 'initial'
              : realDisplay || 'initial'

        return {
            ...baseStyle,
            display
        }
    }, [componentName, targetNodeHtml, isLayout, isPage])

    // 事件处理器
    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        onClick(targetNodeHtml as HTMLDivElement)
    }

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        onMouseOver(targetNodeHtml as HTMLDivElement)
    }

    const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        onMouseOut()
    }

    // 对于布局组件，我们可以直接渲染内容
    if (isLayout) {
        return (
            <div
                key={nodePath + '_wrapper_key'}
                style={wrapperStyle}
                ref={mgRef}
                node-path={nodePath}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {isOverCurrent && canDrop && <ComponentNodeDrop />}
                {children}
            </div>
        )
    }

    return (
        <div
            key={nodePath + '_wrapper_key'}
            style={wrapperStyle}
            ref={mgRef}
            node-path={nodePath}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isOverCurrent && canDrop && <ComponentNodeDrop />}
            {children}
        </div>
    )
}

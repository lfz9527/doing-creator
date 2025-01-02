import {FC, useState, useMemo, useEffect, useRef, useCallback} from 'react'
import {ComponentNode} from '@/core/meta/component-node'
import {
    ComponentNodeDesignWrapperProps,
    ComponentNodeDesignWrapper
} from './component-node-design-wrapper'
import {ComponentNodeHover} from './component-node-hover'
import {ComponentNodeSelect} from './component-node-select'
import LayoutEmpty from './layout-empty'
import {BuildEngine} from '@core/engine'
import {ActionType, ActionOption} from '@core/canvas/action-tools/type'

interface DesignCanvasProps {
    /**
     * 画布的ref
     */
    windowCanvas: HTMLDivElement
    /**
     * 组件节点shame数据
     */
    componentNode: ComponentNode
    /**
     * 选中的节点变化时的回调
     */
    selectOnChange?: (nodePath: string, id: string) => void
    /**
     * 工具栏的action
     */
    onToolAction?: (option?: ActionOption) => void
}

// 新增自定义 hook
const useNodeState = () => {
    const [selectedEl, setSelectedEl] = useState<HTMLDivElement | null>(null)
    const [hoverEl, setHoverEl] = useState<HTMLDivElement | null>(null)
    const [hoverNode, setHoverNode] = useState<ComponentNode | null>(null)
    const [selectNode, setSelectNode] = useState<ComponentNode | null>(null)

    const resetNodes = useCallback(() => {
        setSelectNode(null)
        setHoverNode(null)
    }, [])

    return {
        selectedEl,
        setSelectedEl,
        hoverEl,
        setHoverEl,
        hoverNode,
        setHoverNode,
        selectNode,
        setSelectNode,
        resetNodes
    }
}

export const DesignCanvas: FC<DesignCanvasProps> = (props) => {
    const {componentNode, selectOnChange, onToolAction, windowCanvas} = props
    const [content, setContent] = useState<React.ReactNode>(null)
    const canvasRef = useRef<HTMLDivElement | null>(null)

    const {
        selectedEl,
        setSelectedEl,
        hoverEl,
        setHoverEl,
        hoverNode,
        setHoverNode,
        selectNode,
        setSelectNode,
        resetNodes
    } = useNodeState()

    const buildEngine = useMemo(() => {
        return new BuildEngine()
    }, [])

    useEffect(() => {
        resetNodes()
    }, [componentNode, resetNodes])

    const onAction = (type: ActionType) => {
        onToolAction?.({type, payload: selectNode})
    }

    const renderComponent = useMemo(async () => {
        try {
            return await buildEngine.build(componentNode, {
                onCustomCreateElement: (ctx) => {
                    const {
                        path,
                        ComponentConstructor,
                        props,
                        children,
                        componentNode
                    } = ctx
                    const {category} = componentNode
                    const id = props.id.toString()

                    // 不加Wrapper的原始构造后的组件
                    const originReactComp = (
                        <ComponentConstructor key={path + id} {...props}>
                            {children}
                        </ComponentConstructor>
                    )
                    const wrapperProps: ComponentNodeDesignWrapperProps = {
                        nodePath: path,
                        id,
                        onClick: (divRef) => {
                            selectOnChange?.(path, id)
                            setSelectedEl(divRef!)
                            setSelectNode(componentNode)
                        },

                        onMouseOver(ref) {
                            setHoverEl(ref!)
                            setHoverNode(componentNode)
                        },
                        onMouseOut() {
                            setHoverEl(null)
                            setHoverNode(null)
                        }
                    }
                    return (
                        <ComponentNodeDesignWrapper
                            key={path + props.id}
                            {...wrapperProps}
                        >
                            {/* 布局组件默认给给空 */}
                            {category === 'layout' ? (
                                children ? (
                                    originReactComp
                                ) : (
                                    <LayoutEmpty id={id} />
                                )
                            ) : (
                                originReactComp
                            )}
                        </ComponentNodeDesignWrapper>
                    )
                }
            })
        } catch (error: unknown) {
            return <div>构建出错：{(error as Error).message}</div>
        }
    }, [
        componentNode,
        buildEngine,
        selectOnChange,
        setHoverEl,
        setHoverNode,
        setSelectNode,
        setSelectedEl
    ])

    useEffect(() => {
        renderComponent.then(setContent)
    }, [renderComponent, componentNode])

    // 简化 hover 遮罩层渲染逻辑
    const renderHoverMask = useMemo(() => {
        if (!hoverEl || !hoverNode?.id || hoverNode.id === selectNode?.id) {
            return null
        }

        return (
            <ComponentNodeHover
                element={hoverEl}
                id={hoverNode.id}
                name={hoverNode.name}
                windowCanvas={windowCanvas}
            />
        )
    }, [hoverEl, hoverNode, selectNode, windowCanvas])

    return (
        <>
            {/* 新增 hover 遮罩层渲染 */}
            {renderHoverMask}

            {/* 新增选中节点渲染 */}
            {selectedEl && selectNode?.id && (
                <ComponentNodeSelect
                    element={selectedEl}
                    id={selectNode.id}
                    name={selectNode.name}
                    canvasRef={canvasRef}
                    onAction={onAction}
                    windowCanvas={windowCanvas}
                />
            )}

            <div ref={canvasRef} style={{height: '100%'}}>
                {content}
            </div>
        </>
    )
}

import {FC, useState, useMemo, useEffect, useRef} from 'react'
import {ComponentNode} from '@/core/meta/component-node'
import {
    ComponentNodeDesignWrapperProps,
    ComponentNodeDesignWrapper
} from './component-node-design-wrapper'
import {ComponentNodeHover} from './component-node-hover'
import {ComponentNodeSelect} from './component-node-select'
import LayoutEmpty from './layout-empty'
import {BuildEngine} from '@core/engine'

interface DesignCanvasProps {
    /**
     * 组件节点shame数据
     */
    componentNode: ComponentNode
    /**
     * 选中的节点变化时的回调
     */
    selectOnChange?: (nodePath: string, id: string) => void
}

export const DesignCanvas: FC<DesignCanvasProps> = (props) => {
    const {componentNode, selectOnChange} = props
    const [content, setContent] = useState<React.ReactNode>(null)
    const canvasRef = useRef<HTMLDivElement | null>(null)
    const [selectedEl, setSelectedEl] = useState<HTMLDivElement | null>(null)
    const [hoverEl, setHoverEl] = useState<HTMLDivElement | null>(null)
    const [hoverNode, setHoverNode] = useState<ComponentNode | null>(null)
    const [selectNode, setSelectNode] =  useState<ComponentNode | null>(null)

    

    const buildEngine = useMemo(() => {
        return new BuildEngine()
    }, [])

    useEffect(() => {
        setSelectedEl(null)
        setHoverEl(null)
    }, [componentNode])

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
    }, [componentNode, buildEngine, selectOnChange])


    useEffect(() => {
        renderComponent.then(setContent)
    }, [renderComponent, componentNode])

    return (
        <>
            {hoverEl && hoverNode?.id && hoverNode?.id !== selectNode?.id && (
                <ComponentNodeHover element={hoverEl!} id={hoverNode?.id } name={hoverNode.name} />
            )}
            {selectedEl && selectNode?.id && (
                <ComponentNodeSelect
                    element={selectedEl}
                    id={selectNode?.id}
                    name={selectNode.name}
                    canvasRef={canvasRef}
                />
            )}

            <div
                ref={canvasRef}
                style={{
                    height: '100%'
                }}
            >
                {content}
            </div>
        </>
    )
}

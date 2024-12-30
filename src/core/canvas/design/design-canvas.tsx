import {FC, useState, useMemo, useEffect} from 'react'
import {ComponentNode} from '@/core/meta/component-node'
import {
    ComponentNodeDesignWrapperProps,
    ComponentNodeDesignWrapper
} from './component-node-design-wrapper'
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
    // 存储选中的path的state
    const [selectedNodePath, setSelectedNodePath] = useState<string>('')

    // buildEngine
    const buildEngine = useMemo(() => {
        return new BuildEngine()
    }, [])

    useEffect(() => {
        setSelectedNodePath('')
    }, [componentNode])

    const renderComponent = useMemo(async () => {
        try {
            return await buildEngine.build(componentNode, {
                onCustomCreateElement: (ctx) => {
                    const {path, ComponentConstructor, props, children} = ctx

                    const id = props.id.toString()

                    // 不加Wrapper的原始构造后的组件
                    const originReactComp = (
                        <ComponentConstructor key={path + props.id} {...props}>
                            {children}
                        </ComponentConstructor>
                    )

                    const wrapperProps: ComponentNodeDesignWrapperProps = {
                        nodePath: path,
                        id,
                        isSelected: path === selectedNodePath,
                        onClick: () => {
                            console.debug('wrapper onClick')
                            setSelectedNodePath(path)
                            selectOnChange?.(path, id)
                        }
                    }
                    return (
                        <ComponentNodeDesignWrapper
                            key={path + props.id}
                            {...wrapperProps}
                        >
                            {originReactComp}
                        </ComponentNodeDesignWrapper>
                    )
                }
            })
        } catch (error: unknown) {
            return <div>构建出错：{(error as Error).message}</div>
        }
    }, [componentNode, selectedNodePath, buildEngine,selectOnChange])
    useEffect(() => {
        renderComponent.then(setContent)
    }, [renderComponent, componentNode])

    return content
}

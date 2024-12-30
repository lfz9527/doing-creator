import {FC, useState, useMemo, useEffect} from 'react'
import {ComponentNode} from '@/core/meta/component-node'
import {
    ComponentNodeDesignWrapperProps,
    ComponentNodeDesignWrapper
} from './component-node-design-wrapper'
import {BuildEngine} from '@core/engine'

interface DesignCanvasProps {
    /**
     * 传入的合法 ComponentNode
     */
    componentNode: ComponentNode
}

export const DesignCanvas: FC<DesignCanvasProps> = (props) => {
    const {componentNode} = props
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

    // 经过buildEngine + schema 创建的React组件（已经考虑的基本的异常处理）

    const renderComponent = useMemo(async () => {
        try {
            return await buildEngine.build(componentNode, {
                onCustomCreateElement: (ctx) => {
                    const {path, ComponentConstructor, props, children} = ctx

                    // 不加Wrapper的原始构造后的组件
                    const originReactComp = (
                        <ComponentConstructor key={path + props.id} {...props}>
                            {children}
                        </ComponentConstructor>
                    )

                    const wrapperProps: ComponentNodeDesignWrapperProps = {
                        nodePath: path,
                        id: props.id.toString(),
                        isSelected: path === selectedNodePath,
                        onClick: () => {
                            console.debug('wrapper onClick')
                            setSelectedNodePath(path)
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
    }, [componentNode, selectedNodePath, buildEngine])

    useEffect(() => {
        renderComponent.then(setContent)
    }, [renderComponent])

    return content
}

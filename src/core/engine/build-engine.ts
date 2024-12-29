import React from 'react'
import {ComponentNode, MaterialConfig} from '@core/meta'
import {CusCreateElementHandle} from './aspect/cus-create-element-handle'
import Material from '@core/material'

/**
 * 物料库
 */
const material = new Material()

/**
 * 构建参数
 */
export interface BuildOptions {
    /**
     * 允许外部使用者自定义组件的构建过程
     */
    onCustomCreateElement?: CusCreateElementHandle
}

export class BuildEngine {
    /**
     *
     *  物料库映射
     * @static
     * @memberof BuildEngine
     */
    static materialMap = new Map<string, MaterialConfig>()

    async initMaterial() {
        await material.init()
        BuildEngine.materialMap = material.materialMap
    }

    /**
     * 构建：通过传入的 ComponentNode 生成对应节点供React 渲染的ReactNode
     * @param ComponentNode
     */
    async build(
        componentNode: ComponentNode,
        buildOptions?: BuildOptions
    ): Promise<React.ReactNode> {
        await this.initMaterial()

        return this.innerBuild(
            componentNode,
            '/' + componentNode.id,
            buildOptions
        )
    }
    /**
     * 构建通过传入的 ComponentNode 生成对应节点供React 渲染的ReactNode
     * @param componentNode
     * @returns
     */
    private innerBuild(
        componentNode: ComponentNode,
        path: string,
        buildOptions?: BuildOptions
    ): React.ReactNode {
        if (!componentNode) return null

        const {id, name, children, props} = componentNode

        // 如果有子元素，则递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode = (children || []).map(
            (childNode: ComponentNode) => {
                const childPath = `${path}/${childNode.id}`
                return this.innerBuild(childNode, childPath, buildOptions)
            }
        )
        // 通过 COMPONENT_MAP 来查找对应组件的构造器
        const componentConstructor =
            BuildEngine.materialMap.get(name)?.component

        if (!componentConstructor) {
            console.error(`找不到组件: ${name}`)
            return null
        }

        if (typeof buildOptions?.onCustomCreateElement === 'function') {
            // 如果外部提供了对应的自定义创建实现，则使用之
            return buildOptions.onCustomCreateElement({
                componentNode,
                path,
                ComponentConstructor: componentConstructor,
                props: {...props},
                children:
                    childrenReactNode.length > 0 ? childrenReactNode : undefined
            })
        }

        return React.createElement(
            componentConstructor as
                | React.ComponentType<Record<string, unknown>>
                | string,
            {
                ...props,
                key: path,
                'data-component-id': id
            },
            childrenReactNode.length > 0 ? childrenReactNode : null
        )
    }
}

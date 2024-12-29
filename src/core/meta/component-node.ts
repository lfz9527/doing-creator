import {ComponentType} from '@core/enum'
import {ComponentNodePropType} from './types'

/**
 * 组件节点
 */
export type ComponentNode = {
    /**
     * 组件id
     */
    id: string
    /**
     * 父组件id
     */
    parentId?: string
    /**
     * 组件描述
     */
    description?: string
    /**
     * 组件类型
     */
    type: ComponentType
    /**
     * 组件节点唯一名称
     */
    name: string
    /**
     * 组件属性集合
     */
    props: {
        [propName: string]: ComponentNodePropType
    }
    /**
     * 子节点组件
     */
    children?: Array<ComponentNode>
}

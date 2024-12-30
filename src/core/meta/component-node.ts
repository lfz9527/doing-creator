
import {ComponentNodePropType,ComponentBaseType} from './types'

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
     * 是否锁定
     */
    isLock?: boolean
    /**
     * 组件类型
     */
    type: ComponentBaseType
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

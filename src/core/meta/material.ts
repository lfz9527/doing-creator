import React from 'react'
import {
    ComponentNodePropType,
    baseComponentNodePropType,
    materialCateType,
    ComponentBaseType
} from './types'

/**
 * 物料属性
 */
export type MaterialPropType = {
    key: string
    value: ComponentNodePropType,
    default?:baseComponentNodePropType
    description?:string
}

/**
 * 物料配置
 */
export type MaterialConfig = {
    /**
     * 组件名称
     */
    name: string
    /**
     * 组件描述
     */
    description: string
    /**
     * 组件图标
     */
    icon?: string
    /**
     * 允许放置到哪些组件上
     */
    allowDrag: string[]
    /**
     * 物料对应的组件
     */
    component: React.ComponentType<any>
    /**
     * 组件类型
     */
    componentType: ComponentBaseType
    /**
     * 组件分类
     */
    category: materialCateType
    /**
     * 组件默认属性
     */
    defaultProps?: MaterialPropType[]
    /**
     * 是否允许放置
     */
    allowDrop: boolean,
    /**
     * 子组件
     */
    children?: React.ComponentType<any>
}

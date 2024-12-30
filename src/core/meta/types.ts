import {ComponentType, materialCate} from '@core/enum'
/**
 * 组件类型
 */
export type ComponentBaseType = keyof typeof ComponentType

/**
 * 物料分类
 */
export type materialCateType = keyof typeof materialCate

/**
 * 基础属性值的类型
 */
export type baseComponentNodePropType = string | number

/**
 * 组件节点每一个属性的类型
 */
export type ComponentNodePropType = baseComponentNodePropType | {
    [key: string]: string | number
}

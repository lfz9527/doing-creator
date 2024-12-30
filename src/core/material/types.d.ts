import {MaterialConfig} from '@/core/meta/material'
/**
 * 组件上下文
 */
export type MaterialContext = {
    registerMater: (name: string, componentConfig: MaterialConfig) => void
}

/**
 * 物料模块
 */
interface MaterialModule {
    default?: (args: MaterialContext) => void
}

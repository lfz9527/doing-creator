import {ComponentNode} from '@core/meta/component-node'
import {ComponentNodePropType} from '@/core/meta'
import {ReactNode} from 'react'

/**
 * CreateElement自定义实现方法参数上下文
 * @field componentNode 组件节点数据
 * @field path 组件节点的路径
 * @field ComponentConstructor 已知匹配到的组件构造器
 * @field props 从ComponentNode中取到的props
 * @field children 已经创建完成的ReactNode数组或undefined
 */
interface CusCreateElementHandleContext {
    componentNode: ComponentNode
    path: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentConstructor: any
    props: {
        [key: string]: ComponentNodePropType
    }
    children?: ReactNode[]
}

/**
 * 函数接口 CreateElement自定义实现方法类型定义
 */

export interface CusCreateElementHandle {
    /**
     * CreateElement自定义实现方法类型定义
     * @param context
     */
    (context: CusCreateElementHandleContext): ReactNode | undefined
}

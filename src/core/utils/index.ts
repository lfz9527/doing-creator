import {useMaterial} from '@/store'
import {ComponentNodePropType, MaterialPropType} from '@core/meta'

/**
 * 获取组件允许拖入的组件
 * @param componentName 组件名
 * @returns
 */
export const getAcceptDrop = (name: string) => {
    const {materialMapConfig} = useMaterial.getState()
    return (
        Array.from(materialMapConfig.values())
            .filter((c) => c.allowDrag?.includes(name))
            .map((o) => o.name) || []
    )
}

/**
 * 格式化组件属性
 * @param component 组件
 * @returns
 */
export const formatProps = (propsList: MaterialPropType[] = []) => {
    const propsData: {
        [key: string]: ComponentNodePropType
    } = {}
    propsList.forEach(({key, value}) => {
        propsData[key] = value
    })
    return propsData
}

/**
 * 计算相对位置
 * @param target 目标元素
 * @param container 容器元素
 * @returns
 */
export const calcRelativePosition = (
    target: HTMLElement,
    container: HTMLElement
): {
    width: number
    height: number
    left: number
    top: number
} => {
    const elementRect = target.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    return {
        width: elementRect.width,
        height: elementRect.height,
        left: elementRect.left - containerRect.left + container.scrollLeft,
        top: elementRect.top - containerRect.top + container.scrollTop
    }
}

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

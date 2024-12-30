import {useMaterial} from '@/store'

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

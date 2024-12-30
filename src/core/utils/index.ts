import {useMaterial} from '@/store'

/**
 * 获取组件允许拖入的组件
 * @param componentName 组件名
 * @returns
 */
export const getAcceptDrop = (name:string) =>{
  const {materialMapConfig} = useMaterial.getState()
  return materialMapConfig.get(name)?.allowDrag || []
}
import {ComponentBaseType,materialCateType,MaterialPropType} from '@core/meta/'

export type Props ={
      // 图标
      icon?: string
      // 描述
      description: string
      // 名称
      name: string
      // 组件类型
      componentType: string
      // 拖拽结束回调
      onDragEnd: OnDragEnd
      // 拖拽开始回调
      onDragStart?: () => void
      [key: string]: any
}

export type DragOptions = {
  name: string
  props: MaterialPropType[]
  componentType: ComponentBaseType
  description: string
  category: materialCateType
  [key: string]: any
}

export type OnDragEnd = (dragOptions:DragOptions) => void
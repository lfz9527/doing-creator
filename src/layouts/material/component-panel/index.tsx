import ComponentItem from '@/layouts/material/component-item'
import {DragOptions} from '@/layouts/material/component-item/type'
import {materialCate} from '@core/enum'
import {MaterialConfig, materialCateType, ComponentNode} from '@core/meta'
import {formatProps} from '@core/utils'
import {useMaterial, useComponent} from '@/store'
import {useCallback, useMemo} from 'react'
const ComponentPanel = () => {
    const {materialMapConfig} = useMaterial()
    const {insertComponent,setCurComponentInfo} = useComponent()

    /**
     * 拖拽开始回调
     */
    const onDragStart = () => {}

    /**
     *
     * @param dropResult 拖拽结束回调
     */
    const onDragEnd = useCallback(
        (dropResult: DragOptions) => {
            const parentId = dropResult.id
            const node: ComponentNode = {
                type: dropResult.componentType,
                description: dropResult.description,
                props: formatProps(dropResult.props),
                name: dropResult.name,
                category: dropResult.category,
                isLock: false,
                children: [],
                id: String(new Date().getTime() + '_' + dropResult.name),
                parentId
            }
            insertComponent('', parentId, node)
            setCurComponentInfo({
                id:'',
                path:''
            })

        },
        [insertComponent]
    )

    /**
     * 渲染所有物料映射组件
     */
    const materialsPanel = useMemo(() => {
        // 初始化分类
        const initializeCategoryMap = () => {
            const map = new Map<materialCateType, MaterialConfig[]>()
            Object.keys(materialCate).forEach((key) =>
                map.set(key as materialCateType, [])
            )
            return map
        }

        // 加载所有组件
        const componentsConf = Array.from(materialMapConfig.values())
        const materialCateMap = initializeCategoryMap()

        // 分组组件
        componentsConf.forEach((item) => {
            // 允许放置的组件才能出现在组件菜单
            if (materialCateMap.has(item.category) && item.allowDrop) {
                materialCateMap.get(item.category)!.push(item)
            }
        })
        // 渲染分类组件
        const renderCategory = ([key, values]: [
            materialCateType,
            MaterialConfig[]
        ]) => {
            if (values.length === 0) return null

            return (
                <div key={key}>
                    <div className='mb-2 text-xs font-bold text-black text-opacity-60'>
                        {materialCate[key]}
                    </div>
                    <div className='grid grid-cols-2 gap-[8px]'>
                        {values.map((com, index) => (
                            <div key={com.name + index}>
                                <ComponentItem
                                    {...com}
                                    onDragEnd={onDragEnd}
                                    onDragStart={onDragStart}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        return Array.from(materialCateMap).map(renderCategory)
    }, [materialMapConfig, onDragEnd])

    return (
        <div className='p-2 w-[250px]'>
            <div className='flex flex-col gap-2'>{materialsPanel}</div>
        </div>
    )
}

export default ComponentPanel

import ComponentItem from '@/components/component-item'
import {materialCate} from '@core/enum'
import {materialCateType} from '@core/meta/types'
import {MaterialConfig} from '@core/meta'
import {useMaterial} from '@/store'
import {useMemo} from 'react'

const ComponentPanel = () => {
    const {materialMapConfig} = useMaterial()

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
            if (materialCateMap.has(item.category)) {
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
                        {values.map((child) => (
                            <ComponentItem key={child.name} {...child} />
                        ))}
                    </div>
                </div>
            )
        }

        return Array.from(materialCateMap).map(renderCategory)
    }, [materialMapConfig])

    return (
        <div className='p-2 w-[250px]'>
            <div className='flex flex-col gap-2'>{materialsPanel}</div>
        </div>
    )
}

export default ComponentPanel

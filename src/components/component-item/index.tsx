import {FC, useEffect, useMemo} from 'react'
import {ComponentBaseType} from '@core/meta/types'
import {MaterialPropType} from '@core/meta/material'
import {useDrag} from 'react-dnd'
import SvgIcon from '@/components/svg-icon'
import {useMaterial} from '@/store'

type Props = {
    // 图标
    icon?: string
    // 描述
    description: string
    // 名称
    name: string
    // 组件类型
    ComponentType: string
    // 拖拽结束回调
    onDragEnd: OnDragEnd
    // 拖拽开始回调
    onDragStart?: () => void
    [key: string]: any
}

type OnDragEnd = (dragOptions: {
    name: string
    props: MaterialPropType[]
    componentType: ComponentBaseType
    description: string
    [key: string]: any
}) => void

const ComponentItem: FC<Props> = (props) => {
    const {icon, description, name, ComponentType, onDragEnd, onDragStart} = props
    const {materialMapConfig} = useMaterial()

    const defaultProps = useMemo(() => {
        return materialMapConfig.get(name)?.defaultProps || []
    }, [materialMapConfig, name])

    const [{isDragging}, drag] = useDrag({
        type: name,
        item: {
            name
        },
        end: (_, monitor) => {
            const dropResult = monitor.getDropResult()
            if (!dropResult) return

            if (onDragEnd) {
                const dragOptions = {
                    name,
                    props: [...defaultProps] as MaterialPropType[],
                    componentType: ComponentType as ComponentBaseType,
                    description,
                    ...dropResult
                }

                // 拖拽结束回调
                onDragEnd(dragOptions)
            }
        },
        collect: (monitor) => ({
            // 是否正在拖拽
            isDragging: monitor.isDragging(),
            // 拖拽中的组件
            handlerId: monitor.getHandlerId()
        })
    })

    useEffect(() => {
        if (isDragging) {
            console.log('拖拽中')
            if(onDragStart) onDragStart()
        } else {
            console.log('拖拽结束')
        }
    }, [isDragging,onDragStart])

    return (
        <div
            ref={drag}
            className='flex items-center gap-2 h-[36px] bg-white px-2  border-[1px] border-solid border-[#e5e6e8] rounded-md cursor-grab hover:border-[#0089ff] hover:text-[#0089ff]  hover:fill-[#0089ff] '
        >
            <SvgIcon
                name={icon ? icon : 'component'}
                iconStyle={{
                    width: 14,
                    height: 14
                }}
            />
            <p className='text-xs text-center select-none'>
                {description || '测试'}
            </p>
        </div>
    )
}

export default ComponentItem

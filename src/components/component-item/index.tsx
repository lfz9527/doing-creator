import {FC, useEffect, useMemo} from 'react'
import {ComponentBaseType} from '@core/meta/types'
import {MaterialPropType} from '@core/meta/material'
import {useDrag} from 'react-dnd'
import SvgIcon from '@/components/svg-icon'
import {useMaterial, useComponent} from '@/store'
import classNames from 'classnames'
import type {Props} from './type'

const ComponentItem: FC<Props> = (props) => {
    const {icon, description, name, componentType, onDragEnd, onDragStart} =
        props
    const {materialMapConfig} = useMaterial()
    const {canvasComponent} = useComponent()

    const materialConfig = useMemo(() => {
        return materialMapConfig.get(name)!
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
                const defaultProps = materialConfig?.defaultProps || []

                const dragOptions = {
                    name,
                    props: [...defaultProps] as MaterialPropType[],
                    componentType: componentType as ComponentBaseType,
                    category: materialConfig?.category,
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

    const clickAddComponent = () => {
        const defaultProps = materialConfig?.defaultProps || []
        
        const dragOptions = {
            name,
            props: [...defaultProps] as MaterialPropType[],
            componentType: componentType as ComponentBaseType,
            category: materialConfig?.category,
            description,
            id: canvasComponent?.id
        }
        

        // 拖拽结束回调
        onDragEnd(dragOptions)
    }

    useEffect(() => {
        if (onDragStart) onDragStart()
    }, [isDragging, onDragStart])

    return (
        <div
            ref={drag}
            onClick={clickAddComponent}
            className={classNames(
                'flex items-center gap-2 h-[36px] bg-white px-2  border-[1px] border-solid border-[#e5e6e8] cursor-pointer rounded-md hover:border-[#0089ff] hover:text-[#0089ff]  hover:fill-[#0089ff] '
            )}
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

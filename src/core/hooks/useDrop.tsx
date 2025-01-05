// 定义组件如何接收拖拽的数据和如何响应拖拽操作
import {useDrop as useDndDrop, DropTargetMonitor} from 'react-dnd'
import {getAcceptDrop} from '@core/utils'

interface Props {
    id: string
    name: string
    path: string
    element?: HTMLElement
}

const useDrop = (props: Props) => {
    const {id, name, path, element} = props
    console.log(1232333, element?.children)

    const [{canDrop, isOverCurrent, isOver}, drop] = useDndDrop(
        {
            accept: getAcceptDrop(name),
            drop: (_: any, monitor) => {
                const didDrop = monitor.didDrop()
                if (didDrop) {
                    return
                }

                // 拖拽结束事件里可以获取到拖拽的数据
                return {
                    id,
                    path
                }
            },
            // hover: (_, monitor: DropTargetMonitor) => {},
            collect: (monitor: DropTargetMonitor) => ({
                isOverCurrent: monitor.isOver({shallow: true}),
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        },
        [id]
    )
    return {
        drop,
        canDrop,
        isOver,
        isOverCurrent
    }
}

export default useDrop

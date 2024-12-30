// 定义组件如何接收拖拽的数据和如何响应拖拽操作
import {useDrop as useDndDrop, DropTargetMonitor} from 'react-dnd'
import {getAcceptDrop} from '@core/utils'

interface Props {
    id: string
    name: string
    path: string
}

const useDrop = (props: Props) => {
    const {id, name, path} = props

    console.log('getAcceptDrop(name)',name,getAcceptDrop(name));
    

    const [{canDrop, isOverCurrent, isOver}, drop] = useDndDrop(
        {
            accept: getAcceptDrop(name),
            drop: (_: any, monitor) => {
                const didDrop = monitor.didDrop()
                console.log('didDrop',didDrop);
                
                if (didDrop) {
                    return
                }

                // 这里把当前组件的id返回出去，在拖拽结束事件里可以拿到这个id。
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

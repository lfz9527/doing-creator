
import {useDrag as useDndDrag} from 'react-dnd'
import {useComponent} from '@/store'

interface Props {
    id: string
    name: string
    path: string
    canDrag?: boolean
}

/**
 *
 * @param id
 * @param componentName
 * @param onDragEnd
 * @returns
 */
const useDrag = (props: Props) => {
    const {id, name,canDrag = true} = props
    const {insertComponent} = useComponent()
    const [{isDragging, handlerId}, drag] = useDndDrag({
        type: name,
        canDrag,
        item: {
            name,
            id
        },
        end: (_, monitor) => {
            const dropResult = monitor.getDropResult() as {
                id?: string
                path?: string
            }
            if (!dropResult) return
            insertComponent(id,dropResult.id!)
        },
        collect: (monitor) => ({
            // 是否正在拖拽
            isDragging: monitor.isDragging(),
            // 拖拽中的组件
            handlerId: monitor.getHandlerId()
        })
    })

    return {
        drag,
        handlerId,
        isDragging
    }
}
export default useDrag

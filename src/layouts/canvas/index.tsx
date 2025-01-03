import {CANVAS_ID} from '@/enum'
import {DesignCanvas} from '@core/canvas'
import {useEffect, useMemo, useRef} from 'react'
import {useCanvas} from '@/store'
import {useComponent} from '@/store'
import {findNodeAndParent} from '@/utils'
import {ActionOption, ActionType} from '@core/canvas/action-tools/type'

const Canvas = () => {
    const {setCanvasRef, canvasRef: containerRef} = useCanvas()
    const {
        components,
        canvasComponent,
        curComponentInfo,
        setCurComponentInfo,
        deleteComponent,
        changeLockComponent
    } = useComponent()
    const canvasRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasRef(canvasRef)
        }
    }, [setCanvasRef])

    /**
     * 更新节点schema
     */
    const updateNodeSchema = useMemo(() => {
        if (canvasComponent) {
            canvasComponent.children = components
            return {
                ...canvasComponent,
                children: [...components]
            }
        }
    }, [canvasComponent, components])

    /**
     * 选中节点
     * @param path
     * @param id
     */
    const selectNodeEvent = (path: string, id: string) => {
        setCurComponentInfo({
            id,
            path
        })
    }

    /**
     * 工具栏的action
     * @param option
     */
    const toolAction = (option?: ActionOption) => {
        const {type, payload = {}} = option || {}
        const {id} = payload

        if (!(type && id)) return

        const {path} = curComponentInfo
        const parentPath = path.split('/').slice(0, -1).join('/')

        const ActionMap = {
            [ActionType.DELETE_NODE]: () => deleteComponent(id),
            [ActionType.LOCK_NODE]: () => changeLockComponent(id),
            [ActionType.SELECT_NODE_PARENT]: () => {
                const {parentComponent} = findNodeAndParent(id, components)
                setCurComponentInfo({
                    id: parentComponent.id,
                    path: parentPath
                })
            }
        }
        ActionMap[type]()
    }

    return (
        <div className='w-full h-full pt-[8px] px-[12px] pb-[12px] flex justify-center content-center overflow-hidden'>
            <div
                id={CANVAS_ID}
                ref={canvasRef}
                className='relative w-full overflow-auto bg-white'
                style={{height: 'calc(100vh - 72px)'}}
            >
                {containerRef?.current && (
                    <DesignCanvas
                        componentNode={updateNodeSchema!}
                        selectOnChange={selectNodeEvent}
                        windowCanvas={containerRef.current}
                        onToolAction={toolAction}
                    />
                )}
            </div>
        </div>
    )
}

export default Canvas

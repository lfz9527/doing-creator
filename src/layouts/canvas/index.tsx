import {CANVAS_ID} from '@/enum'
import {DesignCanvas} from '@core/canvas'
import {useEffect, useMemo, useRef} from 'react'
import {useCanvas} from '@/store'
import {useComponent} from '@/store'
const Canvas = () => {
    const {setCanvasRef} = useCanvas()
    const {components, canvasComponent, setCurComponentInfo} = useComponent()
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

    return (
        <div className='w-full h-full pt-[8px] px-[12px] pb-[12px] flex justify-center content-center overflow-hidden'>
            <div
                id={CANVAS_ID}
                ref={canvasRef}
                className='w-full h-full overflow-auto bg-white '
            >
                <DesignCanvas
                    componentNode={updateNodeSchema!}
                    selectOnChange={selectNodeEvent}
                />
            </div>
        </div>
    )
}

export default Canvas

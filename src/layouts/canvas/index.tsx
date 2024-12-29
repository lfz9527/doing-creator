import {CANVAS_ID} from '@/enum'
import {useEffect, useRef} from 'react'
import {useCanvas} from '@/store'

const Canvas = () => {
    const {setCanvasRef} = useCanvas()

    const canvasRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasRef(canvasRef)
        }
    }, [setCanvasRef])

    return (
        <div className='w-full h-full p-[12px] flex justify-center content-center overflow-hidden'>
            <div
                id={CANVAS_ID}
                ref={canvasRef}
                className=' h-full w-full overflow-auto bg-white'
            >
                <h1>Canvas</h1>
            </div>
        </div>
    )
}

export default Canvas

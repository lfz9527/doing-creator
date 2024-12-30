import {CANVAS_ID} from '@/enum'
import {DesignCanvas} from '@core/canvas'
import {useEffect, useRef,useState} from 'react'
import {useCanvas} from '@/store'

const Canvas = () => {
    const {setCanvasRef} = useCanvas()
    const [componentNodeSchema] = useState(
        {
            name: 'Page',
            id: 2,
            children: [
                {
                    name: 'Text',
                    id: 3,
                    props: {
                        value: 'Hello World',
                        
                    }
                }
            ]
        },
    )

    const canvasRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasRef(canvasRef)
        }
    }, [setCanvasRef])

    return (
        <div className='w-full h-full pt-[8px] px-[12px] pb-[12px] flex justify-center content-center overflow-hidden'>
            <div
                id={CANVAS_ID}
                ref={canvasRef}
                className='w-full h-full overflow-auto bg-white '
            >
                <DesignCanvas componentNode={componentNodeSchema} />
            </div>
        </div>
    )
}

export default Canvas

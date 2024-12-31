// 画布
import {create} from 'zustand'

type CanvasInfo = {
    canvasRef: React.RefObject<HTMLDivElement> | null
}

type Action = {
    setCanvasRef: (ref: CanvasInfo['canvasRef']) => void
}

const useCanvas = create<CanvasInfo & Action>((set) => ({
    canvasRef: null,
    setCanvasRef: (canvasRef: CanvasInfo['canvasRef']) => set({canvasRef})
}))

export default useCanvas

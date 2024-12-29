// 画布
import {create} from 'zustand'

type CanvasInfo = {
    ref: React.RefObject<HTMLDivElement> | null
}

type Action = {
    setCanvasRef: (ref: CanvasInfo['ref']) => void
}

const useCanvas = create<CanvasInfo & Action>((set) => ({
    ref: null,
    setCanvasRef: (ref: CanvasInfo['ref']) => set({ref})
}))

export default useCanvas

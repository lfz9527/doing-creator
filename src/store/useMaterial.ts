// 物料
import {create} from 'zustand'
import {MaterialConfig} from '@core/meta'

type MaterialState = {
    materialMapConfig: Map<string, MaterialConfig>
}

type Action = {
    setMaterialConfig: (
        materialConfig: MaterialState['materialMapConfig']
    ) => void
}

const useMaterial = create<MaterialState & Action>((set) => ({
    materialMapConfig: new Map<string, MaterialConfig>(),
    setMaterialConfig: (
        materialMapConfig: MaterialState['materialMapConfig']
    ) => set({materialMapConfig})
}))

export default useMaterial

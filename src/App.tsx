import {useEffect} from 'react'
import Material from '@core/material'
import Layout from './layouts'
import {useMaterial} from '@/store'
import {initCanvas} from '@/utils'

const material = new Material()

const App = () => {
    const {setMaterialConfig} = useMaterial()

    useEffect(() => {
        // 加载物料库
        async function loadingMaterialComponent() {
            const mate = await material.injectMaterial()
            setMaterialConfig(mate.materialMap)
            initCanvas()
        }

        loadingMaterialComponent()
    }, [setMaterialConfig])

    return <Layout />
}

export default App

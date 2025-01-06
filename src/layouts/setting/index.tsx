import {useComponent, useMaterial} from '@/store'
import TabContent from './tab-content'
import {useMemo} from 'react'

const empty = () => {
    return (
        <div className='flex justify-center pt-[50px] text-[14px] text-[rgba(0,0,0,.6)]'>
            <h1>请在左侧画布点击节点</h1>
        </div>
    )
}

const Setting = () => {
    const {curComponentInfo, findCurrentComponentById} = useComponent()
    const {materialMapConfig} = useMaterial()

    const {id} = curComponentInfo
    const materialName = useMemo(() => {
        if (id) {
            const component = findCurrentComponentById(id)
            return component?.name
        }
    }, [id])

    const settingConf = useMemo(() => {
        if (materialName) {
            return materialMapConfig.get(materialName)?.settingTabs
        }
    }, [materialName])

    return (
        <div className='h-full rounded-sm flex gap-[2px]'>
            <div className='bg-[#fff] w-[350px] '>
                {!curComponentInfo.id ? (
                    empty()
                ) : (
                    <TabContent tabs={settingConf!} />
                )}
            </div>
        </div>
    )
}

export default Setting

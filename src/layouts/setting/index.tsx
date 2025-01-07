import {useComponent, useMaterial} from '@/store'
import TabContent from './tab-content'
import {useMemo} from 'react'


const EmptyContent = () => {
    return (
        <div className='flex justify-center pt-[50px] text-[14px] text-[rgba(0,0,0,.6)]'>
            <h1>请在左侧画布点击节点</h1>
        </div>
    )
}

const LockContent = () => {
    return (
        <div className='flex justify-center pt-[50px] text-[12px] text-[rgba(0,0,0,.6)]'>
            <h1>该节点已被锁定，无法配置</h1>
        </div>
    )
}

const SettingTip = () => {
    return (
        <div className='flex justify-center pt-[50px] text-[12px] text-[rgba(0,0,0,.6)'>
            <p>该节点未添加属性配置项</p>
        </div>
    )
}

const Setting = () => {
    const {curComponentInfo, findCurrentComponentById} = useComponent()
    const {materialMapConfig} = useMaterial()

    const {id} = curComponentInfo
    const component = useMemo(() => {
        if (id) {
            const component = findCurrentComponentById(id)
            return component
        }
    }, [id])


    const isLock = !!component?.isLock
    
    const settingConf = useMemo(() => {
        const materialName = component?.name
        if (materialName) {
            return materialMapConfig.get(materialName)?.settingTabs
        }
    }, [component?.name])

    const contentMap = {
        empty: <EmptyContent />,
        locked: <LockContent />,
        settings: <TabContent tabs={settingConf!} />,
        settingsTip: <SettingTip />
    }

    const getContentType = () => {
        if (!curComponentInfo.id) return 'empty'
        if (isLock) return 'locked'
        if (settingConf) return 'settings'
        return 'settingsTip'
    }

    return (
        <div className='h-full rounded-sm flex gap-[2px]'>
            <div className='bg-[#fff] w-[350px] '>
                {contentMap[getContentType()]}
            </div>
        </div>
    )
}

export default Setting

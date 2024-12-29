import SvgIcon from '@/components/svg-icon'
import {Tooltip} from 'antd'
import {useMemo, useState} from 'react'
import ComponentPanel from './component-panel'
import OutlineTree from './outline-tree'
import classNames from 'classnames'

const icons = (name: string) => (
    <SvgIcon name={name} iconStyle={{width: '18px', height: '18px'}} />
)

const menus: Array<{
    label: string
    key: string
    icon: React.ReactNode
    children: () => React.ReactNode
}> = [
    {
        label: '大纲树',
        key: 'outline-tree',
        icon: icons('tree'),
        children: OutlineTree
    },
    {
        label: '组件',
        key: 'component',
        icon: icons('component'),
        children: ComponentPanel
    }
]

const Material = () => {
    const [actMenu, setActMenu] = useState<string>('component')

    const menuPanel = useMemo(() => {
        const Component = menus.find((m) => m.key === actMenu)?.children
        return Component ? <Component /> : null
    }, [actMenu])
    return (
        <div className='h-full  rounded-sm flex gap-[2px]'>
            <div className='pt-2 bg-[#fff]'>
                {menus.map((m) => {
                    return (
                        <Tooltip key={m.key} placement='right' title={m.label}>
                            <div
                                className={classNames(
                                    'flex gap-[10px] items-center py-[10px] px-[10px] cursor-pointer hover:bg-[#e5e5e554]',
                                    {
                                        'bg-[#e5e5e554]': actMenu === m.key
                                    }
                                )}
                                onClick={() => setActMenu(m.key)}
                            >
                                {m.icon}
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
            <div className='bg-[#fff]'>{menuPanel}</div>
        </div>
    )
}

export default Material

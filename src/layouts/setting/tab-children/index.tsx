import {FC, useEffect, useMemo, useState} from 'react'
import classNames from 'classnames'
import {RightOutlined} from '@ant-design/icons'
import {SettingProps} from '@core/meta'
import {useComponent} from '@/store'
import {Popover} from 'antd'
import ColorPickPanel from '@/components/color-pick-panel'

type TabChildrenProps = {
    childContent: SettingProps[number]['children']
}

const TabChildren: FC<TabChildrenProps> = ({childContent}) => {
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    const {curComponentInfo, findCurrentComponentById} = useComponent()
    const {id} = curComponentInfo

    const componentProps = useMemo(() => {
        return findCurrentComponentById(id)?.props || {}
    }, [id])

    console.log(componentProps)

    const arrowClass = (key: string) => {
        return classNames(
            'transition-transform',
            'duration-100',
            'ease-linear',
            {
                'rotate-0': !activeTabs.includes(key),
                'rotate-90': activeTabs.includes(key)
            }
        )
    }

    const bodyClass = (key: string) => {
        return classNames(
            'transition-[height]',
            'duration-300',
            'ease-in-out',
            {
                'overflow-hidden': !activeTabs.includes(key),
                'h-0': !activeTabs.includes(key),
                'h-auto': activeTabs.includes(key)
            }
        )
    }

    useEffect(() => {
        setActiveTabs(childContent.map((item) => item.key))
    }, [childContent])

    const onChange = (key: string) => {
        if (activeTabs.includes(key)) {
            setActiveTabs(activeTabs.filter((item) => item !== key))
        } else {
            setActiveTabs([...activeTabs, key])
        }
    }

    // 颜色
    const colorContent = (item: any) => {
        const value = componentProps[item.key] as string

        const colorPanel = () =>{
          const colorChange = () =>{

          }


          return <ColorPickPanel onChange={colorChange}/>
        }

        return (
            <div>
                <div className='flex items-center'>
                    <Popover content={colorPanel()} trigger="click" placement="leftTop">
                        {!value ? (
                            <div className='border-[1px] border-[#e5e5e5] border-solid p-1 rounded-md hover:border-[#4096ff] cursor-pointer'>
                                <div className='w-[20px] h-[20px] rounded-md bg-white relative overflow-hidden'>
                                    <div className='absolute w-[35px] h-[2px] bg-[#ff0000] rotate-45 top-[11px] left-[-5px]' />
                                </div>
                            </div>
                        ) : (
                            <div className='flex gap-1 items-center border-[1px] border-[#e5e5e5] border-solid p-1 rounded-md hover:border-[#4096ff] cursor-pointer'>
                                <div
                                    className='w-[20px] h-[20px] rounded-md'
                                    style={{
                                        boxShadow:
                                            'inset 0 0 1px 0 rgba(0,0,0,0.25)',
                                        backgroundImage:
                                            'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0)',
                                        backgroundSize: '50% 50%'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: value,
                                            boxShadow:
                                                'inset 0 0 0 1px rgba(0,0,0,0.06)',
                                            borderRadius: 'inherit'
                                        }}
                                    ></div>
                                </div>
                                <div>{value}</div>
                            </div>
                        )}
                    </Popover>
                </div>
            </div>
        )
    }

    return childContent.map((child, index) => (
        <div key={child.key + index} className='collapse-item'>
            <div
                className='flex justify-between items-center px-4 py-2 bg-[#f2f2f4] border-t-[1px] border-[#e5e5e5] cursor-pointer'
                onClick={() => onChange(child.key)}
            >
                <div>{child.collapseLabel}</div>
                <RightOutlined className={arrowClass(child.key)} />
            </div>
            <div className={bodyClass(child.key)}>
                <div className='body p-3'>
                    {child.props?.map((item, index) => (
                        <div key={item.key + index} className='mb-3'>
                            <div className='mb-2 text-[#5c5f66]'>
                                {item.label}
                            </div>
                            {item.type === 'color' && colorContent(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))
}

export default TabChildren

import {FC, useEffect, useMemo, useState} from 'react'
import classNames from 'classnames'
import {RightOutlined} from '@ant-design/icons'
import {SettingProps} from '@core/meta'
import {useComponent} from '@/store'

import ColorContent from './color-content'
import SelectContent from './select-content'
import InputContent from './input-content'

type TabChildrenProps = {
    childContent: SettingProps[number]['children']
}

const TabChildren: FC<TabChildrenProps> = ({childContent}) => {
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    // 重置回调
    const [resetCallback, setResetCallback] = useState<Map<string, () => void>>(
        new Map()
    )
    const {curComponentInfo, findCurrentComponentById, updateComponent} =
        useComponent()
    const {id} = curComponentInfo

    const componentProps = useMemo(() => {
        return findCurrentComponentById(id)?.props || {}
    }, [id])

    useEffect(() => {
        setActiveTabs(childContent.map((item) => item.key))
    }, [childContent, id])

    const curChildContent = useMemo(() => childContent, [childContent, id])

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

    const onChange = (key: string) => {
        if (activeTabs.includes(key)) {
            setActiveTabs(activeTabs.filter((item) => item !== key))
        } else {
            setActiveTabs([...activeTabs, key])
        }
    }

    // 重置
    const reset = (item: any) => {
        const callback = resetCallback.get(item.key)

        if (callback) {
            callback()
        } else {
            updateComponent(id, {
                [item.key]: item.defaultValue
            })
        }
    }

    // 添加重置回调
    const addResetCallback = (key: string, callback: () => void) => {
        setResetCallback((prev) => new Map(prev).set(key, callback))
    }

    return curChildContent.map((child, index) => (
        <div key={child.key + index} className='collapse-item'>
            <div
                className='flex justify-between items-center px-4 py-2 bg-[#f2f2f4] border-t-[1px] border-[#e5e5e5] cursor-pointer'
                onClick={() => onChange(child.key)}
            >
                <div>{child.collapseLabel}</div>
                <RightOutlined className={arrowClass(child.key)} />
            </div>
            <div className={bodyClass(child.key)}>
                <div className='p-3 body'>
                    {child.props?.map((item, index) => (
                        <div key={item.key + index} className='mb-3'>
                            <div className='flex justify-between mb-2 text-[#5c5f66]'>
                                <div>{item.label}</div>
                                <div
                                    className='cursor-pointer hover:text-[#4096ff]'
                                    onClick={() => reset(item)}
                                >
                                    重置
                                </div>
                            </div>
                            {item.type === 'color' && (
                                <ColorContent
                                    item={item}
                                    id={id}
                                    componentProps={componentProps}
                                    addResetCallback={addResetCallback}
                                />
                            )}
                            {item.type === 'select' && (
                                <SelectContent
                                    item={item}
                                    id={id}
                                    componentProps={componentProps}
                                    addResetCallback={addResetCallback}
                                />
                            )}

                            {(item.type === 'string' ||
                                item.type === 'number') && (
                                <InputContent
                                    item={item}
                                    id={id}
                                    componentProps={componentProps}
                                    addResetCallback={addResetCallback}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))
}

export default TabChildren

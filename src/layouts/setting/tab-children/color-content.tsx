import {FC, useEffect, useState} from 'react'
import {useComponent} from '@/store'
import {Popover} from 'antd'
import ColorPickPanel from '@/components/color-pick-panel'
import {contentProps} from './type'

export type ColorContentProps = contentProps

const ColorContent: FC<contentProps> = ({
    item,
    id,
    componentProps,
    addResetCallback
}) => {
    const {updateComponent} = useComponent()
    const [curColor, setCurColor] = useState<string>(
        componentProps[item.key] as string
    )

    const colorChange = (color: string) => {
        setCurColor(color)
        updateComponent(id, {
            [item.key]: color
        })
    }

    useEffect(() => {
        addResetCallback(item.key, () => {
            colorChange(item.defaultValue)
        })
    }, [item.key])

    return (
        <div className='flex items-center'>
            <Popover
                content={<ColorPickPanel onChange={colorChange} />}
                trigger='click'
                placement='leftTop'
            >
                {!curColor ? (
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
                                boxShadow: 'inset 0 0 1px 0 rgba(0,0,0,0.25)',
                                backgroundImage:
                                    'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0)',
                                backgroundSize: '50% 50%'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: curColor,
                                    boxShadow:
                                        'inset 0 0 0 1px rgba(0,0,0,0.06)',
                                    borderRadius: 'inherit'
                                }}
                            ></div>
                        </div>
                        <div>{curColor}</div>
                    </div>
                )}
            </Popover>
        </div>
    )
}

export default ColorContent

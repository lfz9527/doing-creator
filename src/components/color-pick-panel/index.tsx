import {FC, useState} from 'react'
import {Tooltip} from 'antd'
import {SketchPicker, ColorResult} from '@hello-pangea/color-picker'
import classnames from 'classnames'

export type ColorPickPanelProps = {
    onChange: (color: string) => void
}

type ColorMode = 'single' | 'multi'

type ThemeType = 'themeColor' | 'customColor'

const COLORS = {
    border: {
        active: '#4096ff',
        default: '#d4e5ff'
    },
    single: '#d4e5ff',
    gradient: 'linear-gradient(180deg,#fff,#6296ff 99%)'
} as const

const ColorPickPanel: FC<ColorPickPanelProps> = ({onChange}) => {
    const [active, setActive] = useState<ColorMode>('single')
    const [themeColor, setThemeColor] = useState<ThemeType>('themeColor')

    const handleModeChange = (mode: ColorMode) => {
        setActive(mode)
    }

    // 颜色按钮
    const colorButton = (
        mode: ColorMode,
        title: string,
        background: string
    ) => (
        <Tooltip title={title}>
            <div
                className='rounded-full w-[16px] h-[16px] border-[1px] border-solid cursor-pointer'
                style={{
                    background,
                    borderColor:
                        active === mode
                            ? COLORS.border.active
                            : COLORS.border.default
                }}
                onClick={() => handleModeChange(mode)}
            />
        </Tooltip>
    )

    const renderColor = (color: string, title?: string) => {
        if (color === '无') {
            return (
                <Tooltip title={title ?? color}>
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            border: '1px solid #f7f7f9',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 4
                        }}
                        onClick={() => {
                            onChange('')
                        }}
                    >
                        <div className='absolute w-[35px] h-[2px] bg-[#ff0000] rotate-45 top-[11px] left-[-5px]' />
                    </div>
                </Tooltip>
            )
        }

        if (color === 'transparent') {
            return (
                <Tooltip title={title ?? color}>
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            border: '1px solid #f7f7f9',
                            backgroundImage:
                                'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0)',
                            backgroundSize: '50% 50%',
                            borderRadius: 4
                        }}
                        onClick={() => {
                            onChange('rgba(255,255,255,0)')
                        }}
                    />
                </Tooltip>
            )
        }

        return (
            <Tooltip title={title ?? color}>
                <div
                    style={{
                        width: 24,
                        height: 24,
                        border: '1px solid #f7f7f9',
                        backgroundColor: color,
                        borderRadius: 4
                    }}
                    onClick={() => {
                        onChange(color)
                    }}
                />
            </Tooltip>
        )
    }

    return (
        <div className='w-[250px]'>
            <div
                className='flex items-center gap-4 pb-3'
                style={{
                    borderBottom: `1px solid #e8e9eb`
                }}
            >
                {colorButton('single', '单色', COLORS.single)}
                {/* @TODO 后续可以添加渐变色 */}
                {/* {colorButton('multi', '渐变色', COLORS.gradient)} */}
            </div>

            {active === 'single' && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            gap: 24,
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: `1px solid #e8e9eb`,
                            fontSize: 12,
                            cursor: 'pointer'
                        }}
                    >
                        <span
                            onClick={() => setThemeColor('themeColor')}
                            style={{
                                color:
                                    themeColor === 'themeColor'
                                        ? '#4096ff'
                                        : '#000'
                            }}
                        >
                            主题色
                        </span>
                        <span
                            onClick={() => setThemeColor('customColor')}
                            style={{
                                color:
                                    themeColor === 'customColor'
                                        ? '#4096ff'
                                        : '#000'
                            }}
                        >
                            自定义颜色
                        </span>
                    </div>

                    {themeColor === 'themeColor' && (
                        <div className='max-h-[150px] overflow-y-auto pt-[12px]'>
                            <div className='mb-[12px]'>
                                <div className='text-[#151b26] text-sm'>
                                    通用
                                </div>
                                <div className='flex flex-wrap gap-2 mt-2 cursor-pointer'>
                                    {renderColor('#fff','白色')}
                                    {renderColor(
                                        'transparent',
                                        '透明'
                                    )}
                                    {renderColor('无')}
                                </div>
                            </div>
                            <div className='mb-[12px]'>
                                <div className='text-[#151b26] text-sm'>
                                    页面背景色
                                </div>
                                <div className='flex flex-wrap gap-2 mt-2 cursor-pointer'>
                                    {renderColor('pink')}
                                    {renderColor('yellow')}
                                    {renderColor('red')}
                                    {renderColor('green')}
                                </div>
                            </div>
                        </div>
                    )}
                    {themeColor === 'customColor' && (
                        <div
                            className={classnames(
                                '[&>div]:!p-0',
                                '[&>div]:!shadow-none',
                                'pt-[12px]'
                            )}
                        >
                            <SketchPicker
                                color='#fff'
                                onChange={(color: ColorResult) => {
                                    const {r, g, b, a} = color.rgb
                                    onChange(`rgba(${r}, ${g}, ${b}, ${a})`)
                                }}
                                width='100%'
                            />
                        </div>
                    )}
                </>
            )}

            {active === 'multi' && (
                <div
                    className={classnames(
                        '[&>div]:!p-0',
                        '[&>div]:!shadow-none',
                        'pt-[12px]'
                    )}
                >
                    <SketchPicker width='100%' />
                </div>
            )}
        </div>
    )
}
export default ColorPickPanel

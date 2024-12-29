import {Button, Space, Popconfirm, Segmented} from 'antd'
import SvgIcon from '@/components/svg-icon'
import {useCanvas} from '@/store'

const screenOptions = [
    {
        value: 'pc',
        width: '100%'
    },
    {
        value: 'ipad',
        width: '768px'
    },
    {
        value: 'phone',
        width: '410px'
    }
]

const icons = (name: string) => (
    <div className='p-[2px]'>
        <SvgIcon name={name} iconStyle={{width: '18px', height: '18px'}} />
    </div>
)

const Header = () => {
    const {ref: canvasRef} = useCanvas()

    /**
     * @description: 清空画布
     */
    const clearPage = () => {}
    /**
     * @description: 预览
     */
    const preview = () => {}

    /**
     * @description: 保存
     */
    const save = () => {}

    return (
        <div className='w-[100%] h-[48px] bg-white mb-1'>
            <div className='h-full flex items-center justify-between'>
                <div></div>
                <Space>
                    <Segmented
                        size='small'
                        options={screenOptions.map((s) => {
                            return {
                                label: icons(s.value),
                                value: s.value
                            }
                        })}
                        onChange={(value) => {
                            const width = screenOptions.find(
                                (s) => s.value === value
                            )!.width

                            // 设置画布的宽
                            if (canvasRef?.current) {
                                canvasRef.current.style.width = width
                            }
                            console.log()
                        }}
                    />
                </Space>
                <Space>
                    <Popconfirm
                        title='确认清空画布吗？'
                        okText='确认'
                        cancelText='取消'
                        onConfirm={clearPage}
                        placement='bottomRight'
                    >
                        <Button size='small' className='text-xs'>
                            清空画布
                        </Button>
                    </Popconfirm>

                    <Button
                        size='small'
                        className='text-xs'
                        type='primary'
                        onClick={preview}
                    >
                        预览
                    </Button>
                    <Button
                        onClick={save}
                        size='small'
                        className='text-xs'
                        type='primary'
                    >
                        保存
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default Header

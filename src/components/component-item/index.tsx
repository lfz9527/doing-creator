import {FC} from 'react'
import SvgIcon from '@/components/svg-icon'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

const ComponentItem: FC<Props> = (props) => {
    const {icon, description} = props
    return (
        <div className='flex items-center gap-2 h-[36px] bg-white px-2  border-[1px] border-solid border-[#e5e6e8] rounded-md cursor-grab hover:border-[#0089ff] hover:text-[#0089ff]  hover:fill-[#0089ff] '>
            <SvgIcon
                name={icon ? icon : 'component'}
                iconStyle={{
                    width: 14,
                    height: 14
                }}
            />
            <p className='text-xs text-center select-none'>
                {description || '测试'}
            </p>
        </div>
    )
}

export default ComponentItem

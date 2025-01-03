import { FC, PropsWithChildren } from 'react'

const ToolWrap:FC<PropsWithChildren> = ({children}) => {
    return <div className='flex items-center justify-center rounded-[3px] bg-[#006cff] text-white h-5 text-center select-none'>{children}</div>
}

export default ToolWrap

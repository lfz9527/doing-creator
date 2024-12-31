import {FC, PropsWithChildren} from 'react'
import SvgIcon from '@/components/svg-icon'
import ToolsWrap from './tools-wrap'

type Props = {
    icon?: string
    name: string
}

const NameToolPanel: FC<PropsWithChildren<Props>> = ({icon, name}) => {
    return (
        <ToolsWrap>
            <div className='flex items-center justify-center gap-1  px-[6px]'>
                <div
                    style={{
                      fill: '#fff'
                    }}
                >
                    <SvgIcon
                        name={icon ? icon : 'component'}
                        iconStyle={{
                            width: 14,
                            height: 14
                        }}
                    />
                </div>
                {name}
            </div>
        </ToolsWrap>
    )
}

export default NameToolPanel

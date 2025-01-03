import {FC, PropsWithChildren} from 'react'
import SvgIcon from '@/components/svg-icon'
import {Tooltip} from 'antd'
import ToolsWrap from './tools-wrap'
import {ActionType,actionBarItemList} from './type'

type Props = {
    onAction: (type: ActionType) => void
    actionBar: actionBarItemList
}

const ActionToolPanel: FC<PropsWithChildren<Props>> = ({onAction,actionBar}) => {
    return (
        <ToolsWrap>
            <div className='flex items-center justify-center  px-[6px]'>
                {actionBar.map((action, index) => {
                    return (
                        <Tooltip key={index} title={action.label}>
                            <div
                                className='cursor-pointer hover:bg-[rgba(241,241,241,.3)]  py-1 px-1'
                                style={{
                                    fill: '#fff'
                                }}
                                onClick={() => {
                                    onAction(action.type)
                                }}
                            >
                                <SvgIcon
                                    name={action.icon}
                                    iconStyle={{
                                        width: 14,
                                        height: 14
                                    }}
                                />
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
        </ToolsWrap>
    )
}

export default ActionToolPanel

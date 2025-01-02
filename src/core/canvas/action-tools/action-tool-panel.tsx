import {FC, PropsWithChildren} from 'react'
import SvgIcon from '@/components/svg-icon'
import {Tooltip} from 'antd'
import ToolsWrap from './tools-wrap'
import {ActionType} from './type'

type Props = {
    onAction: (type: ActionType) => void
}

const actions: Array<{
    name: string
    icon: string
    type: ActionType
}> = [
    {
        name: '选择父节点',
        icon: 'select-parent',
        type: ActionType.SELECT_NODE_PARENT
    },
    {
        name: '锁定',
        icon: 'lock',
        type: ActionType.LOCK_NODE
    },
    {
        name: '删除',
        icon: 'delete',
        type: ActionType.DELETE_NODE
    }
]

const ActionToolPanel: FC<PropsWithChildren<Props>> = ({onAction}) => {
    return (
        <ToolsWrap>
            <div className='flex items-center justify-center  px-[6px]'>
                {actions.map((action, index) => {
                    return (
                        <Tooltip key={index} title={action.name}>
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

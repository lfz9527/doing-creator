import {FC, useEffect, useState, useRef, useMemo, useCallback} from 'react'
import {ComponentNode} from '@/core/meta/component-node'
import {useResizeObserver} from '@core/hooks'
import NameToolPanel from '../action-tools/name-tool-panel'
import ActionToolPanel from '../action-tools/action-tool-panel'
import Material from '@core/material'
import {ActionType, actionBarItemList} from '../action-tools/type'
import {calcRelativePosition} from '@core/utils'

const material = new Material()
material.init()

export type ComponentNodeSelectProps = {
    element: HTMLElement
    node: ComponentNode
    canvasRef: React.RefObject<HTMLDivElement>
    onAction: (type: ActionType) => void
    windowCanvas: HTMLDivElement
}

const actionBarList: actionBarItemList = [
    {
        label: '选择父节点',
        icon: 'select-parent',
        type: ActionType.SELECT_NODE_PARENT
    },
    {
        label: '锁定',
        icon: 'lock',
        type: ActionType.LOCK_NODE
    },
    {
        label: '删除',
        icon: 'delete',
        type: ActionType.DELETE_NODE
    }
]

type Position = {
    left: number
    top: number
    width: number
    height: number
    display: string
}

export const ComponentNodeSelect: FC<ComponentNodeSelectProps> = ({
    element,
    canvasRef,
    node,
    onAction,
    windowCanvas = document.querySelector('body')!
}) => {
    const {name, id} = node
    const isPage = name === 'Page'

    const nameToolRef = useRef<HTMLDivElement>(null)
    const [rect, setRect] = useState<Position>({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        display: 'none'
    })

    const [actionBar, setActionBar] = useState<actionBarItemList>(actionBarList)

    // 更新tool初始位置
    const updateToolPosition = (top = '0', left = '0', display = 'flex') => {
        if (nameToolRef?.current) {
            nameToolRef.current.style.left = left
            nameToolRef.current.style.top = top
            nameToolRef.current.style.display = display
        }
    }

    const calcToolPosition = ({width, left, top}:{
        width: number,
        left: number,
        top: number
    }) => {
        if (!nameToolRef.current) {
            return
        }
        const {width: tWidth, height: tHeight} =
            nameToolRef.current.getBoundingClientRect()

        let toolLeft = left + width - tWidth
        
        let toolTop = 0
        if (isPage) {
            toolTop = toolTop + 12
        } else {
            const preferredTop = top - (tHeight + 2)
            if(preferredTop <= 40) {
                toolTop = top + 3
            } else {
                toolTop = preferredTop
            }
         
        }
        // 有些组件比较窄，直接从左开始显示
        if (tWidth >= width) {
            toolLeft = left
        }
        updateToolPosition(toolTop + 'px', toolLeft + 'px', 'flex')
    }

    // 更新mask的位置
    const updateRect = useCallback(() => {
        // 先重置位置
        updateToolPosition()

        const position = calcRelativePosition(element, windowCanvas)
        calcToolPosition(position)
        setRect((state) => ({
            ...state,
            ...position
        }))
    }, [element,node])

    const {observe} = useResizeObserver(updateRect)

    useEffect(() => {
        if (canvasRef.current && element) {
            observe([canvasRef.current, element])
        }
    }, [element])

    useEffect(() => {
        setActionBar(() => {
            return actionBarList
                .map((item) => {
                    if (item.type === ActionType.LOCK_NODE) {
                        return {
                            ...item,
                            icon: node.isLock ? 'un-lock' : 'lock',
                            label: node.isLock ? '取消锁定' : '锁定'
                        }
                    }
                    return item
                })
                .filter((item) => {
                    // 如果没有父节点，就不显示选择父节点
                    if (item.type === ActionType.SELECT_NODE_PARENT) {
                        return !!node.parentId
                    }
                    return true
                })
        })
    }, [node])

    const componentId = element.getAttribute('component-id')
    const {description, icon} = material.materialMap.get(name)!
    if (componentId === id) {
        return (
            <>
                <div
                    ref={nameToolRef}
                    className='absolute z-[100]'
                    style={{
                        gap: 4
                    }}
                >
                    <NameToolPanel name={description} icon={icon} />
                    {!isPage && (
                        <ActionToolPanel
                            onAction={onAction}
                            actionBar={actionBar}
                        />
                    )}
                </div>
                <div
                    className='absolute z-[9999] pointer-events-none'
                    style={{
                        border: '2px solid blue',
                        ...rect,
                        display: 'block'
                    }}
                />
            </>
        )
    }
    return null
}

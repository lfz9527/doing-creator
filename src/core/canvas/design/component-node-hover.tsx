import {FC, useEffect, useMemo, useRef, useState} from 'react'
import NameToolPanel from '../action-tools/name-tool-panel'
import Material from '@core/material'
import {calcRelativePosition} from '@core/utils'
import {ComponentNode} from '@/core/meta/component-node'

const material = new Material()
material.init()

export type ComponentNodeHoverProps = {
    /**
     * 当前hover的组件的元素
     */
    element: HTMLElement
    /**
     * 当前hover的组件
     */
    node: ComponentNode
    /**
     * 画布的dom元素
     */
    windowCanvas: HTMLDivElement
}

type Position = {
    left: number
    top: number
    width: number
    height: number
    display: string
}

export const ComponentNodeHover: FC<ComponentNodeHoverProps> = (props) => {
    const {element, node, windowCanvas} = props
    const [rect, setRect] = useState<Position>({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        display: 'none'
    })
    const {name, id} = node
    const nameToolRef = useRef<HTMLDivElement>(null)
    const isPage = node.name === 'Page'

    useEffect(() => {
        function calcMask() {
            const position = calcRelativePosition(element, windowCanvas)
            setRect((state) => ({
                ...state,
                ...position,
                display: 'block'
            }))
        }
        calcMask()
    }, [node, element, windowCanvas])

    // 计算nameTool的位置
    const calcNameToolPosition = useMemo(() => {
        if (!nameToolRef.current) {
            return {display: 'none', top: 0, left: 0}
        }
        const {height: toolHeight} = nameToolRef.current.getBoundingClientRect()
        const {left, top} = rect

        const toolLeft = left
        const toolTop = isPage ? top : Math.max(0, top - (toolHeight + 2))

        return {
            display: 'block',
            top: toolTop,
            left: toolLeft
        }
    }, [rect, nameToolRef, node])

    const componentId = element.getAttribute('component-id')
    const {description, icon} = material.materialMap.get(name)!
    if (componentId === id) {
        return (
            <>
                <div
                    ref={nameToolRef}
                    className='absolute z-[100]'
                    style={{
                        ...calcNameToolPosition
                    }}
                >
                    <NameToolPanel name={description} icon={icon} />
                </div>
                <div
                    className='absolute z-[100] pointer-events-none'
                    style={{
                        border: '2px dotted blue',
                        ...rect
                    }}
                ></div>
            </>
        )
    }
    return null
}

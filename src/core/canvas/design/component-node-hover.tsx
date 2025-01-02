import {FC, useEffect, useRef, useState} from 'react'
import NameToolPanel from '../action-tools/name-tool-panel'
import Material from '@core/material'
import {calcRelativePosition} from '@core/utils'

const material = new Material()
material.init()

export type ComponentNodeHoverProps = {
    element: HTMLElement
    id: string
    name: string
    windowCanvas: HTMLDivElement
}

type ElementRect = {
    width: number
    height: number
    left: number
    top: number
}

export const ComponentNodeHover: FC<ComponentNodeHoverProps> = (props) => {
    const {element, id, name, windowCanvas} = props
    const [rect, setRect] = useState<ElementRect>({
        width: 0,
        height: 0,
        left: 0,
        top: 0
    })

    const nameToolRef = useRef<HTMLDivElement>(null)

    const calcMask = () => {
        const position = calcRelativePosition(element, windowCanvas)
        setRect(position)
    }

    useEffect(() => {
        calcMask()
        calcNameToolPosition()
    }, [id])

    // 计算nameTool的位置
    function calcNameToolPosition() {
        let display = 'none'
        let toolTop = 0
        let toolLeft = 0
        if (nameToolRef.current) {
            const {width: toolWidth, height: toolHeight} =
                nameToolRef.current.getBoundingClientRect()
            const {width, left, top} = rect

            console.log(left, '--')
            console.log(width, '--')

            toolLeft = left + width - toolWidth - 12
            if (name === 'Page') {
                toolTop = top + 12
            } else {
                const curTop = top - toolHeight

                if (curTop <= 40) {
                    // 超出页面
                    toolTop = top
                } else {
                    toolTop = curTop
                }

                toolLeft = left + width - toolWidth
            }
            display = 'block'
            nameToolRef.current.style.left = toolLeft + 'px'
            nameToolRef.current.style.top = toolTop + 'px'
            nameToolRef.current.style.display = display
        }
    }
    const componentId = element.getAttribute('component-id')
    const {description, icon} = material.materialMap.get(name)!
    if (componentId === id) {
        return (
            <>
                <div
                    ref={nameToolRef}
                    className='absolute z-[100]'
                    style={{
                        display: 'none'
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

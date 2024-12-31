import {FC, useEffect, useRef} from 'react'
import NameToolPanel from '../action-tools/name-tool-panel'
import Material from '@core/material'

const material = new Material()
material.init()

export type ComponentNodeHoverProps = {
    element: HTMLElement
    id: string
    name: string
}

export const ComponentNodeHover: FC<ComponentNodeHoverProps> = (props) => {
    const {element, id, name} = props
    const {width, height, left, top} = element.getBoundingClientRect()
    const nameToolRef = useRef<HTMLDivElement>(null)

    useEffect(calcNameToolPosition, [id])

    // 计算nameTool的位置
    function calcNameToolPosition() {
        let display = 'none'
        let containerTop = '0'
        let containerLef = '0'
        if (nameToolRef.current) {
            const {width: toolWidth, height: toolHeight} =
                nameToolRef.current.getBoundingClientRect()

            containerLef = `${left + width - toolWidth - 12}px`
            if (name === 'Page') {
                containerTop = `${top + 12}px`
            } else {
                const curTop = top - toolHeight

                if (curTop <= 40) {
                    // 超出页面
                    containerTop = `${top}px`
                } else {
                    containerTop = `${curTop}px`
                }

                containerLef = `${left + width - toolWidth}px`
                display = 'block'
            }
            display = 'block'
            nameToolRef.current.style.left = containerLef
            nameToolRef.current.style.top = containerTop
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
                        width,
                        height,
                        left,
                        top
                    }}
                ></div>
            </>
        )
    }
    return null
}

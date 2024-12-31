import {FC, useEffect, useState, useCallback, useRef} from 'react'
import {useResizeObserver} from '@core/hooks'
import NameToolPanel from '../action-tools/name-tool-panel'
import Material from '@core/material'

const material = new Material()
material.init()

type ElementRect = {
    width: number
    height: number
    left: number
    top: number
}

export type ComponentNodeSelectProps = {
    element: HTMLElement
    id: string
    name: string
    canvasRef: React.RefObject<HTMLDivElement>
}

export const ComponentNodeSelect: FC<ComponentNodeSelectProps> = ({
    element,
    id,
    canvasRef,
    name
}) => {
    const nameToolRef = useRef<HTMLDivElement>(null)
    const [rect, setRect] = useState<ElementRect>({
        width: 0,
        height: 0,
        left: 0,
        top: 0
    })

    const updateRect = useCallback(() => {
        if (element) {
            const {width, height, left, top} = element.getBoundingClientRect()
            setRect({width, height, left, top})
            calcNameToolPosition({width, left, top})
        }
    }, [element])

    const {observe} = useResizeObserver(updateRect)

    useEffect(() => {
        updateRect()
        observe([canvasRef.current!, element])
    }, [id])

    // 计算nameTool的位置
    function calcNameToolPosition({width, left, top}:{
        width: number
        left: number
        top: number
    }) {
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
                const curTop = top - (toolHeight + 2)
                if (curTop <= 40) {
                    // 超出页面
                    containerTop = `${top + 4}px`
                } else {
                    containerTop = `${curTop}px`
                }
                containerLef = `${left + width - toolWidth - 3}px`
                display = 'block'
            }
            display = 'block'

            console.log('containerTop', containerTop)

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
                    className='absolute z-[9999] pointer-events-none'
                    style={{
                        border: '2px solid blue',
                        ...rect
                    }}
                />
            </>
        )
    }
    return null
}

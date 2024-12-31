import {
    CSSProperties,
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

export type ComponentNodeDesignWrapperProps = {
    /**
     * 节点id
     */
    id: string
    /**
     * 标识节点的路径
     */
    nodePath: string
    /**
     * 点击事件
     */
    onClick: (ref: HTMLDivElement | null) => void
    /**
     * 鼠标移入事件
     */
    onMouseOver?: (ref: HTMLDivElement | null) => void
    /**
     * 鼠标移出事件
     */
    onMouseOut?: (ref?: HTMLDivElement) => void
}

const inlineBlockEle = ['A', 'SPAN', 'BUTTON', 'B', 'I']

export const ComponentNodeDesignWrapper: FC<
    PropsWithChildren<ComponentNodeDesignWrapperProps>
> = (props) => {
    const {
        id,
        nodePath,
        children,
        onMouseOver = () => {},
        onClick = () => {},
        onMouseOut = () => {}
    } = props

    const ref = useRef<HTMLDivElement | null>(null)
    const [targetNodeHtml, setTargetNodeHtml] = useState<HTMLElement>()

    useEffect(() => {
        if (!ref || !ref.current) return
        const currentEle: HTMLDivElement = ref.current
        const firstChild = currentEle?.firstChild as HTMLElement
        setTargetNodeHtml(firstChild)
    }, [])

    const style: CSSProperties = useMemo(() => {
        // Wrapper内部以下实际的HTML元素在展示的过程中，需要使用inline-block
        // 否则会显示异常
        const tagName = targetNodeHtml?.nodeName
        return {
            boxSizing: 'border-box',
            display: inlineBlockEle.includes(tagName!) ? 'inline-block' : 'initial'
        }
    }, [targetNodeHtml])

    return (
        <div
            key={nodePath + '_wrapper_key'}
            style={{...style}}
            ref={ref}
            component-id={id}
            onClick={(event) => {
                event.stopPropagation()
                onClick(ref.current)
            }}
            onMouseOver={(event) =>{
                event.stopPropagation()
                onMouseOver(ref.current)
            }}
            onMouseOut={(event) =>{
                event.stopPropagation()
                onMouseOut()
            }}
        >
            {children}
        </div>
    )
}

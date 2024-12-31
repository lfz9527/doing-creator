import { useEffect, useRef } from 'react'

type ResizeHandler = (entries: ResizeObserverEntry[]) => void
type Options = {
    watchWindow?: boolean
}

 const useResizeObserver = (handler: ResizeHandler, options: Options = { watchWindow: true }) => {
    const observerRef = useRef<ResizeObserver | null>(null)

    useEffect(() => {
        observerRef.current = new ResizeObserver((entries) => {
            handler(entries) // 传入所有变化的元素信息
        })

        if (options.watchWindow) {
            window.addEventListener('resize', () => handler([]))
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
            if (options.watchWindow) {
                window.removeEventListener('resize', () => handler([]))
            }
        }
    }, [handler, options.watchWindow])

    return {
        observe: (elements: HTMLElement | HTMLElement[]) => {
            if (!observerRef.current) return
            
            if (Array.isArray(elements)) {
                elements.forEach(element => {
                    if (element) observerRef.current?.observe(element)
                })
            } else if (elements) {
                observerRef.current.observe(elements)
            }
        },
        unobserve: (elements: HTMLElement | HTMLElement[]) => {
            if (!observerRef.current) return
            
            if (Array.isArray(elements)) {
                elements.forEach(element => {
                    if (element) observerRef.current?.unobserve(element)
                })
            } else if (elements) {
                observerRef.current.unobserve(elements)
            }
        }
    }
}

export default useResizeObserver
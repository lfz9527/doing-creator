import { MutableRefObject, RefCallback } from 'react'

 const useMergeRefs = (...refs: (RefCallback<any> | MutableRefObject<any>)[]) => {
    return (value: any) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref != null) {
                ref.current = value
            }
        })
    }
}

export default useMergeRefs
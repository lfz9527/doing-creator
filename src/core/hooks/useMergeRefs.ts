import {useCallback} from 'react'
import type {MutableRefObject, LegacyRef, RefCallback} from 'react'

type ReactRef<T> = MutableRefObject<T> | LegacyRef<T> | RefCallback<T>

const useMergeRefs = <T>(...refs: Array<ReactRef<T> | undefined | null>) => {
    return useCallback((element: T | null) => {
        refs.forEach((ref) => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(element)
            } else if (
                typeof ref === 'object' &&
                ref !== null &&
                'current' in ref
            ) {
                ;(ref as MutableRefObject<T | null>).current = element
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs)
}

export default useMergeRefs

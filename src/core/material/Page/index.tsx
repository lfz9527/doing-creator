import {FC, useEffect} from 'react'
import {useDrop} from '@/hooks'

type Props = {
    name: string
    id: string
    children?: React.ReactNode
    [key: string]: any
}

const Page: FC<Props> = (props) => {
    const {children, id, name} = props

    const {drop, canDrop} = useDrop({
        id,
        name,
        path: ''
    })

    useEffect(() => {
        console.log(canDrop)
    }, [canDrop])

    return (
        <div
            ref={drop}
            {...props}
            style={{
                height: '100%'
            }}
        >
            {children}
        </div>
    )
}
export default Page

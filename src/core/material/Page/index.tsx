import {FC} from 'react'
type Props = {
    name: string
    id:string
    children?: React.ReactNode
    [key:string]: any
}

const Text: FC<Props> = (props) => {
    const {children} = props
    return <div  style={{minHeight: 300}}>{children}</div>
}
export default Text

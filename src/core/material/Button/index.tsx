import {FC} from 'react'
import {Button as AntButton} from 'antd'

type Props = {
    [key: string]: any
}

const Button: FC<Props> = (props) => {
    return <AntButton {...props}>{props.value}</AntButton>
}

export default Button

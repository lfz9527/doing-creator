import {FC} from 'react'

type Props = {
    width?: string | number
    height?: string | number
    left?: string | number
    top?: string | number
}
const ComponentNodeDrop: FC<Props> = (props) => {
    const {width = '100%', height = '100%', top = 0, left = 0} = props
    return (
        <div
            style={{
                position: 'absolute',
                left,
                top,
                width,
                height,
                border: '2px dashed #1890ff',
                backgroundColor: 'rgba(24, 144, 255, 0.15)',
                zIndex: 100,
                pointerEvents: 'none'
            }}
        />
    )
}
export default ComponentNodeDrop

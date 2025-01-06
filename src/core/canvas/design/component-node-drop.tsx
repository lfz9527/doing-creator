import {memo} from 'react'
import styled from '@emotion/styled'

export type NodeDropProps = {
    width?: string | number
    height?: string | number
    left?: string | number
    top?: string | number
    dropType: 'center' | 'outdoor'
}

type StyledProps = Omit<NodeDropProps, 'dropType'> & {
    backgroundColor?: string
    border?: string
}

const DropContainer = styled.div<StyledProps>`
    position: absolute;
    left: ${({left = 0}) => left};
    top: ${({top = 0}) => top};
    width: ${({width = '100%'}) => width};
    height: ${({height = '100%'}) => height};
    background-color: ${({backgroundColor = 'rgba(24, 144, 255, 0.15)'}) => backgroundColor};
    border: ${({border = '2px dashed #1890ff'}) => border};
    z-index: 100;
    pointer-events: none;
`

export const ComponentNodeDrop = memo<NodeDropProps>(({dropType = 'center', ...rest}) => {
    const styles = {
        center: {
            border: '2px dashed #1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.15)'
        },
        outdoor: {
            border: 'none',
            backgroundColor: '#0051c2'
        }
    }
    return <DropContainer {...rest} {...styles[dropType]} />
})

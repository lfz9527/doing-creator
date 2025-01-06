import Col from '.'
import {MaterialContext} from '@core/material/types'

const name = Col.name

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name,
        icon: '',
        description: '栅格列布局',
        component: Col,
        allowDrag: ['Page', 'Row', 'Col'],
        componentType: 'static',
        category: 'layout',
        allowDrop: true,
        defaultProps: [
            {
                key: 'span',
                value: 12,
                type: 'number',
                description: '栅格占位格数，为 0 时相当于 display: none'
            },
            {
                key: 'offset',
                value: 0,
                type: 'number',
                description: '栅格左侧的间隔格数'
            }
        ]
    })
}

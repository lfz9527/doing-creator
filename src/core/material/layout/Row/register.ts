import Row from '.'
import {MaterialContext} from '@core/material/types'

const name = Row.name

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name,
        icon: '',
        description: '栅格行布局',
        component: Row,
        allowDrag: ['Page', 'Row', 'Col'],
        componentType: 'static',
        category: 'layout',
        allowDrop: true,
        defaultProps: [
            {
                key: 'cols',
                value: 24,
                default: 24,
                type: 'number',
                description: '布局总列数'
            },
            {
                key: 'gap',
                value: 10,
                default: 0,
                type: 'number',
                description: '每一列直接的间隔'
            },
            {
                key: 'wrap',
                value: 'true',
                default: 'true',
                type: 'boolean',
                description: '每一列直接的间隔'
            },
            {
                key: 'justify',
                value: 'start',
                default: 'start',
                type: 'string',
                description: '排列方式'
            },
            {
                key: 'align',
                value: 'top',
                default: 'top',
                type: 'string',
                description: '对齐方式'
            }
        ]
    })
}

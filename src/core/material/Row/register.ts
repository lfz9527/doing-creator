import Row from '.'
import {MaterialContext} from '../types'

const name = Row.name

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name,
        icon: '',
        description: '栅格布局',
        component: Row,
        allowDrag: ['Page'],
        componentType: 'static',
        category: 'layout',
        allowDrop: true,
        defaultProps:[]
    })
}

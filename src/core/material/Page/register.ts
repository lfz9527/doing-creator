import Page from '.'
import {MaterialContext} from '../types'

const name = Page.name

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name: name,
        icon: '',
        description: '页面',
        component: Page,
        allowDrag: [],
        componentType: 'static',
        category: 'static',
        defaultProps: [],
        allowDrop: false,
    })
}

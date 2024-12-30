import Page from '.'
import {MaterialContext} from '../types'

const name = 'Page'

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name: name,
        icon: '',
        description: '页面',
        component: Page,
        allowDrag: [],
        ComponentType: 'static',
        category: 'static',
        defaultProps: []
    })
}

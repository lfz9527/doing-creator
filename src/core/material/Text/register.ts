import Text from '.'
import {MaterialContext} from '../types'

export default (ctx: MaterialContext) => {
    ctx.registerMater('Text', {
        name: 'Text',
        icon: '',
        description: '按钮',
        component: Text,
        allowDrag: ['Page'],
        ComponentType: 'static',
        category: 'static',
        defaultProps: []
    })
}
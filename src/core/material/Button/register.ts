import Button from '.'
import {MaterialContext} from '../types'

const name = Button.name

export default (ctx: MaterialContext) => {
    ctx.registerMater(name, {
        name,
        icon: '',
        description: '按钮',
        component: Button,
        allowDrag: ['Page','Row'],
        componentType: 'static',
        category: 'static',
        defaultProps: [
            {
                key: 'value',
                value: 'Hello World',
            },
            {
                key: 'type',
                value: 'primary',
            }
        ],
        allowDrop: true,
    })
}

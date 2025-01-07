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
        allowDrop: false,
        defaultProps: [
            {
                key: 'backgroundColor',
                value: '#fff',
                type: 'string',
                description: '背景色'
            }
        ],
        settingTabs: [
            {
                tabLabel: '属性',
                key: 'attributes',
                children: [
                    {
                        collapseLabel: '基本',
                        key: 'basic',
                        props: [
                            {
                                label: '背景色',
                                key: 'backgroundColor',
                                type: 'color',
                                defaultValue: '#fff',
                            },
                        ]
                    },
                ]
            }
        ]
    })
}

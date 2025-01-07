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
                type: 'number',
                description: '布局总格数'
            },
            {
                key: 'rowGap',
                value: 10,
                type: 'number',
                description: '水平间隔'
            },
            {
                key: 'columnGap',
                value: 10,
                type: 'number',
                description: '垂直间隔'
            },
            {
                key: 'wrap',
                value: 'true',
                type: 'boolean',
                description: '是否自动换行'
            },
            {
                key: 'justify',
                value: 'start',
                type: 'string',
                description: '排列方式'
            },
            {
                key: 'align',
                value: 'top',
                type: 'string',
                description: '垂直对齐'
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
                                label: '垂直对齐方式',
                                key: 'align',
                                type: 'select',
                                defaultValue: 'top',
                                options: [
                                    {
                                        label: '顶部对齐',
                                        value: 'top'
                                    },
                                    {
                                        label: '居中对齐',
                                        value: 'center'
                                    },
                                    {
                                        label: '底部对齐',
                                        value: 'bottom'
                                    }
                                ]
                            },
                            {
                                label: '水平排列方式',
                                key: 'justify',
                                type: 'select',
                                defaultValue: 'start',
                                options: [
                                    {
                                        label: '左对齐',
                                        value: 'start'
                                    },
                                    {
                                        label: '居中对齐',
                                        value: 'center'
                                    },
                                    {
                                        label: '右对齐',
                                        value: 'end'
                                    },
                                    {
                                        label: '两端对齐',
                                        value: 'space-between'
                                    },
                                    {
                                        label: '平均分布',
                                        value: 'space-around'
                                    }
                                ]
                            },
                            {
                                label: '水平间隔',
                                key: 'rowGap',
                                type:'number',
                                defaultValue: 0,
                                controlConfig:{
                                    min:0,
                                    step:1,
                                    style:{
                                        width: '100%'
                                    }
                                }
                            },
                            {
                                label: '垂直间隔',
                                key: 'columnGap',
                                type:'number',
                                defaultValue: 0,
                                controlConfig:{
                                    min:0,
                                    step:1,
                                    style:{
                                        width: '100%'
                                    }
                                }
                            },
                            {
                                label: '布局总格数',
                                key: 'cols',
                                type:'number',
                                defaultValue: 24,
                                controlConfig:{
                                    min:1,
                                    max:24,
                                    step:1,
                                    style:{
                                        width: '100%'
                                    }
                                }
                            },
                            {
                                label: '是否自动换行',
                                key: 'wrap',
                                type:'select',
                                defaultValue: 'false',
                                options: [
                                    {
                                        label: '是',
                                        value: 'true'
                                    },
                                    {
                                        label: '否',
                                        value: 'false'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
}

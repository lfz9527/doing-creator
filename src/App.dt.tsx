import {ComponentNode} from '@core/meta'
import {DesignCanvas} from '@core/canvas'
import {ChangeEvent, useState, useMemo} from 'react'
import {Input} from 'antd'

const App = () => {
    // 使用state存储一个schema的字符串
    const [componentNodeJson, setComponentNodeJson] = useState(
        JSON.stringify(
            {
                name: 'page',
                id: 1,
                children: [
                    {
                        name: 'button',
                        id: 2,
                        props: {
                            size: 'small',
                            type: 'primary'
                        },
                        children: [
                            {
                                name: 'text',
                                id: 3,
                                props: {
                                    value: 'hello, my button.'
                                }
                            }
                        ]
                    },
                    {
                        id: 35,
                        name: 'input'
                    }
                ]
            },
            null,
            2
        )
    )

    const componentNode = useMemo(() => {
        return JSON.parse(componentNodeJson) as ComponentNode
    }, [componentNodeJson])

    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{width: '100%', height: 'calc(50%)'}}>
                <Input.TextArea
                    rows={4}
                    value={componentNodeJson}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value
                        // 编辑框发生修改，重新设置JSON
                        setComponentNodeJson(value)
                    }}
                />
            </div>

            <div
                style={{
                    width: '100%',
                    height: 'calc(50%)',
                    border: '1px solid gray'
                }}
            >
                <DesignCanvas componentNode={componentNode} />
            </div>
        </div>
    )
}

export default App

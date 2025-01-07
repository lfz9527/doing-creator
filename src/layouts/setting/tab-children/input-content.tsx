import {FC, useEffect, useState,useMemo} from 'react'
import {useComponent} from '@/store'
import {InputNumber,Input} from 'antd'
import {contentProps} from './type'


type InputContentProps = contentProps

const InputContent: FC<InputContentProps> = ({
    item,
    id,
    componentProps,
    addResetCallback
}) => {
    const {updateComponent} = useComponent()
    const [value, setValue] = useState<string | number>(
        componentProps[item.key] as string
    )
    const inputConfig = useMemo(() => {
        return item.controlConfig ?? {}
    }, [item.controlConfig])

    const onChange = (e: any) => {
        const target = e.target.value
        setValue(target)
        updateComponent(id, {
            [item.key]: target
        })
    }

    const onNumChange = (target: any) => {
        const floorValue = Math.floor(target)
        setValue(floorValue)
        updateComponent(id, {
            [item.key]: floorValue
        })
    }

    useEffect(() => {
        addResetCallback(item.key, () => {
            if (item.type === 'number') {
                onNumChange(item.defaultValue)
            } else {
                onChange({
                    target: {
                        value: item.defaultValue
                    }
                })
            }
        })
    }, [item.key])

    if (item.type === 'number')
        return (
            <InputNumber
                value={value}
                defaultValue={value}
                onChange={onNumChange}
                {...inputConfig}
                style={inputConfig.style || {}}
            />
        )

    return (
        <Input
            value={value}
            defaultValue={value}
            onChange={onChange}
            {...inputConfig}
        />
    )
}
export default InputContent

import {FC, useEffect, useState} from 'react'
import {useComponent} from '@/store'
import {Select} from 'antd'
import {contentProps} from './type'


type ColorContentProps = contentProps

const SelectContent: FC<ColorContentProps> = ({
    item,
    id,
    componentProps,
    addResetCallback
}) => {
    const {updateComponent} = useComponent()
    const [value, setValue] = useState<string>(
        componentProps[item.key] as string
    )

    const onChange = (target: string) => {
        setValue(target)
        updateComponent(id, {
            [item.key]: target
        })
    }

    useEffect(() => {
        addResetCallback(item.key, () => {
            onChange(item.defaultValue)
        })
    }, [item.key])

    return (
        <Select
            value={value}
            defaultValue={value}
            style={{width: '100%'}}
            onChange={onChange}
            options={item.options}
        />
    )
}
export default SelectContent

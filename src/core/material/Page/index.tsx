import {FC, PropsWithChildren} from 'react'

type Props = {
    id: string
    name: string
    backgroundColor: string
    [key: string]: any
}

const Page: FC<PropsWithChildren<Props>> = ({children, ...props}) => {
    return (
        <div
            id={props.id}
            data-name={props.name}
            style={{
                backgroundColor: props.backgroundColor,
                height: '100%',
                width: '100%'
            }}
        >
            {children}
        </div>
    )
}
export default Page

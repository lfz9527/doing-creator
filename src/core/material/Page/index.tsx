import {FC, PropsWithChildren} from 'react'

type Props = {
    name: string
    id: string
    [key: string]: any
}

const Page: FC<PropsWithChildren<Props>> = ({children, ...props}) => {
    return (
        <div
            {...props}
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            {children}
        </div>
    )
}
export default Page

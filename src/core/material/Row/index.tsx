import {FC,PropsWithChildren} from 'react'


const Row: FC<PropsWithChildren> = ({children}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0px, 1fr))',
                gap: 10
            }}
        >
            {children}
        </div>
    )
}
export default Row

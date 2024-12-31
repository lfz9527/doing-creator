interface EmptyProps {
    id?: string
}
const LayoutEmpty: React.FC<EmptyProps> = ({id}) => {
    return (
        <div className='bg-[#f0f0f0] flex justify-center items-center text-xs text-[#a7b1bd] select-none px-[10px] w-full h-[100px]' style={{
            backgroundColor: '#f0f0f0',
            border: '1px dotted',
            color: '#a7b1bd',
        }}>
            {`拖拽组件或容器到此处${id || ''}`}
        </div>
    )
}

export default LayoutEmpty


import Header from './header'
import Canvas from './canvas'
import Setting from './setting'
import Material from './material'


const Layout = () => {

    return (
        <div className='h-screen w-full overflow-hidden bg-[#edeff3]'>
            <Header />
            <div className='flex justify-between h-[calc(100vh-48px)] w-full mt-[4px]'>
                <Material />
                <Canvas />
                <Setting />
            </div>
        </div>
    )
}

export default Layout

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'virtual:svg-icons-register'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import App from './App'
import '@/styles/index.less'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DndProvider backend={HTML5Backend}>
            <App></App>
        </DndProvider>
    </StrictMode>
)

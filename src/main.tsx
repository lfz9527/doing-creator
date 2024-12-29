import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'virtual:svg-icons-register'
import App from './App'
import '@/styles/index.less'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)

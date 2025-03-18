import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { setupLogging } from './services/log.ts'

setupLogging()

createRoot(document.getElementById('root')!).render(<App />)

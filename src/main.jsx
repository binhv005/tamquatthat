import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n/LangContext.jsx'

// Tải lại trang luôn bắt đầu từ đầu trang (không khôi phục vị trí cuộn, bỏ #hash)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <App />
      </LangProvider>
    </MotionConfig>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoApp from './DemoApp'
import clientConfig from './clientConfig'
import { LanguageProvider } from '../context/LanguageContext'

// Seed the default demo language from clientConfig the first time (the switcher
// then stays in control and persists the user's choice in localStorage).
if (!localStorage.getItem('language') && clientConfig.defaultLanguage) {
  localStorage.setItem('language', clientConfig.defaultLanguage)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <DemoApp />
    </LanguageProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoApp from './DemoApp'
import clientConfig from './clientConfig'
import { LanguageProvider } from '../context/LanguageContext'

// Demo supports EN + RU + ES. Seed the default the first time and coerce any
// previously-stored unsupported language to the demo default.
const DEMO_LANGS = ['en', 'ru', 'es']
const stored = localStorage.getItem('language')
if (!stored || !DEMO_LANGS.includes(stored)) {
  localStorage.setItem('language', clientConfig.defaultLanguage || 'en')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <DemoApp />
    </LanguageProvider>
  </React.StrictMode>,
)

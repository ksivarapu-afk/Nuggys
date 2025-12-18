import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-size: 24px; background: white;">ERROR: Root element not found!</div>'
} else {
  try {
    const root = ReactDOM.createRoot(rootElement)
    
    root.render(
      <React.StrictMode>
        <BrowserRouter basename="/Nuggys">
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: red; font-size: 24px; background: white;">ERROR: ${error.message}<br/>${error.stack}</div>`
  }
}

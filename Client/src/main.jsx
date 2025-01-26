import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

const toastOptions = {
  className: '',
  style: {
    border: '4px solid rgb(255, 251, 29)',
    padding: '5px',
    color: 'white',
    background: 'black',
    
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={toastOptions}
      />
    </BrowserRouter>
  </React.Fragment>,
)

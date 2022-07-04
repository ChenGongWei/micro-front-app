import React from 'react'
import ReactDOM from 'react-dom/client'


import App from './App'
import start from './micro'
import './index.css'

// 启动 qiankun
// start()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

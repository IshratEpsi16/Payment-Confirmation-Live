import React from 'react'
import ReactDOM from 'react-dom/client'
//import { NotificationProvider } from './Components/CreatePage/NotificationContext.jsx'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />



  </React.StrictMode>
)

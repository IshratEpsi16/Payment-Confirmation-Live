//import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Signup/Signup';
import { NotificationProvider } from '../src/Components/CreatePage/NotificationContext'
import Customer from './Customer';
import { useState } from 'react';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import CreatePage from './Components/CreatePage/CreatePage';
import User_Homepage from './Components/User_Dashboard/User_Homepage/User_Homepage';

const USER_TYPES = {
  PUBLIC: 'Public User',
  NORMAL_USER: 'Normal User',
  ADMIN_USER: 'Admin User'
}

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER
function App() {


  // Callback function to update the message

  const [message, setMessage] = useState('');

  const sendMessage = (message) => {
    setMessage(message);
  };
  return (<>
    {/*/userhome/:id <div>Logged in as {CURRENT_USER_TYPE}</div> */}
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path='/' element={<PublicElement><Login /></PublicElement>}></Route>
          <Route path='/signup' element={<PublicElement><SignUp /></PublicElement>}></Route>
          <Route path='/home' element={<Adminlement><Home /></Adminlement>}></Route>

          <Route path="/create" element={<CreatePage />} />
          <Route path="/userhome" element={<User_Homepage />} />


          {/* <Route path='/create' element={<Adminlement><CreatePage onSend={handleSend} /></Adminlement>}></Route> */}
          <Route path='/customer' element={<Customer />}></Route>
          {/* <Route path='/userhome' element={<UserElement><User_Homepage message={message} /></UserElement>}></Route> */}
          <Route path='*' element={<div>Page not found</div>}></Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </>
  )
}
function PublicElement({ children }) {
  return <>{children}</>
}
function UserElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER || CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  }
  else {
    return <div>You don't have access to use this</div>

  }
}
function Adminlement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  }
  else {
    return <div>You don't have access to use this</div>

  }
}

export default App
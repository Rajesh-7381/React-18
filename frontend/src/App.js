import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import Register from './Views/Register';
import Login from './Views/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

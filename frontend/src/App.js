import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import Register from './Views/Register';
import Login from './Views/Login';
import DashBoard from './Views/DashBoard';
import Update from './Views/Update';
import Error from './Error';
import Todo from './Views/Todos';
import Forgot from './Views/Forgot';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/update' element={<Update />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/*' element={<Error />} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

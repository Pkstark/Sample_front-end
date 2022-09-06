import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Credentials/Signup';
import SignIn from './Credentials/Signin';
import Dashboard from './Credentials/Dashborad'

function App() {
  return (< div className='bg'>
        <BrowserRouter >
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/profile' element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  </div>

  )
}

export default App
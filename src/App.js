import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Credentials/Signup';
import SignIn from './Credentials/Signin';
import Profile from './Credentials/Profile'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
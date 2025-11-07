import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
  )
}

export default App

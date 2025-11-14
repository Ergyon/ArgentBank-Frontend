import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignIn from '../pages/SignIn'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import Error from '../components/Error/Error'
import AccountDetails from '../pages/AccountDetails/AccountDetails'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/transactions/:accountId" element={<AccountDetails />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRoutes

import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SignInForm from '../components/SignInForm/SignInForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignIn = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async ({ email, password, rememberMe }) => {
    try {
      // appel API
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      // si invalide
      if (!response.ok || data.status !== 200) {
        throw new Error(data.message || 'Invalid email or password')
      }

      // connexion reussie

      // sauvegarde token JWT et donnees user
      const token = data.body.token
      const user = data.body.user || null
      login(token, rememberMe, user)

      // redirection profile
      navigate('/profile')
    } catch (error) {
      console.error('Login error', error)
      setErrorMessage(error.message)
      throw error
    }
  }

  return (
    <>
      <Header />
      <SignInForm onSubmit={handleSubmit} errorMessage={errorMessage} />
      <Footer />
    </>
  )
}
export default SignIn

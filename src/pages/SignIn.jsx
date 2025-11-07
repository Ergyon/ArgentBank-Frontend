import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SignInForm from '../components/SignInForm/SignInForm'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
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
      console.log('Login successful :', data)

      // sauvegarde token JWT
      const token = data.body.token

      // sauvegarde permanente ou temporaire de user
      if (rememberMe) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }

      navigate('/')
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

import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // recupere le token
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    // si pas de token : retour a la page de connexion
    if (!token) {
      navigate('/signin')
      return
    }

    // recupere les donnees user
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/user/profile',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok || data.status !== 200) {
          throw new Error('Failed to fetch user profile')
        }

        // sauvegarde les donnees user
        setUserData(data.body)
        setIsLoading(false)
      } catch (err) {
        console.error('Fetch profile error', err)
        setError('Failed to load profile. Please try again')
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  // si en chargement
  if (isLoading) {
    return (
      <>
        <Header />
        <span className="loading-message">Loading profile...</span>
        <Footer />
      </>
    )
  }

  // si erreur
  if (error) {
    return (
      <>
        <Header />
        <span>{error}</span>
        <Footer />
      </>
    )
  }

  // connexion reussie
  return (
    <>
      <Header />
      <h1 className="welcome-message">
        Welcome back ${userData?.firstName} ${userData?.lastName}!
      </h1>
    </>
  )
}

export default ProfilePage

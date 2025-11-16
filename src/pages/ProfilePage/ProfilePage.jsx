import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getUserAccounts } from '../../services/api'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Account from '../../components/Account/Account'
import EditNameForm from '../../components/EditNameForm/EditNameForm'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { token, userData, setUserData } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)

  useEffect(() => {
    // si pas de token : retour a la page de connexion
    if (!token) {
      navigate('/signin')
      return
    }

    // recupere les donnees user
    const fetchUserData = async () => {
      try {
        const profileResponse = await fetch(
          'http://localhost:3001/api/v1/user/profile',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const profileData = await profileResponse.json()

        if (!profileResponse.ok || profileData.status !== 200) {
          throw new Error('Failed to fetch user profile')
        }

        setUserData(profileData.body)

        // recuperer donnees bancaires (mockees)
        const userId = profileData.body.id || '690c8cd2c415f23560bf230a'
        const accountsResponse = getUserAccounts(userId)

        if (accountsResponse.status !== 200) {
          throw new Error('Failed to fetch accounts')
        }

        setAccounts(accountsResponse.body)
        setIsLoading(false)
      } catch (err) {
        console.error('Fetch profile error', err)
        setError('Failed to load profile. Please try again')
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [token, navigate, setUserData])

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
      <main>
        {isEditingName ? (
          <EditNameForm onClose={() => setIsEditingName(false)} />
        ) : (
          <div className="header-profile">
            <h1 className="welcome-message">
              Welcome back
              <br />
              {userData?.firstName} {userData?.lastName}!
            </h1>
            <button onClick={() => setIsEditingName(true)}>Edit name</button>
          </div>
        )}
        <div className="accounts-container">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <Account key={account.id} account={account} />
            ))
          ) : (
            <div className="accounts-notfound">
              <h2>Accounts not found.</h2>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProfilePage

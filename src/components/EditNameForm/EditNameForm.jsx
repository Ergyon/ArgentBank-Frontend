import React from 'react'
import './EditnameForm.css'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { updateUserProfile } from '../../services/api'

const EditNameForm = ({ onClose }) => {
  const { token, userData, setUserData } = useAuth()
  const [userName, setUsername] = useState(userData?.firstName || '')
  const [firstName, setFirstName] = useState(userData?.firstName || '')
  const [lastName, setLastName] = useState(userData?.lastName || '')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // gestion soumission formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!userName.trim()) {
      setError('Username is required')
      return
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await updateUserProfile(token, {
        username: userName.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })

      if (response.status === 200) {
        setUserData(response.body)

        const isRememberMe = localStorage.getItem('token')
        if (isRememberMe) {
          localStorage.setItem('userData', JSON.stringify(response.body))
        } else {
          sessionStorage.setItem('UserData', JSON.stringify(response.body))
        }

        onClose()
      } else {
        setError(response.message || 'Failed to update prfile')
      }
    } catch (err) {
      console.error('Update profile error:', err)
      setError('An error occured. Please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  // gerer l'annulation
  const handleCancel = () => {
    setUsername(userData?.userName || '')
    setFirstName(userData?.firstName || '')
    setLastName(userData?.lastName || '')
    setError('')
    onClose()
  }

  return (
    <>
      <div className="info-form-container">
        <form className="info-form" onSubmit={handleSubmit}>
          <legend className="info-form-title">Edit user info</legend>

          {error && <div>{error}</div>}
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              className="info-form-input"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="label-input">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              className="info-form-input"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={userData?.firstName}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="label-input">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              className="info-form-input"
              onChange={(e) => setLastName(e.target.value)}
              placeholder={userData?.lastName}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="info-form-cta">
            <button
              className="info-form-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              className="info-form-btn"
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditNameForm

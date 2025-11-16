import React from 'react'
import './EditnameForm.css'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const EditNameForm = () => {
  const { userData } = useAuth()
  const [userName, setUsername] = useState(userData?.firstName)
  const [firstName, setFirstName] = useState(userData?.firstName)
  const [lastName, setLastName] = useState(userData?.lastName)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="info-form-container">
        <form className="info-form" onSubmit={handleSubmit}>
          <legend className="info-form-title">Edit user info</legend>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userName}
            className="info-form-input"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            className="info-form-input"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={userData?.firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            className="info-form-input"
            onChange={(e) => setLastName(e.target.value)}
            placeholder={userData?.lastName}
          />
          <div className="info-form-cta">
            <button className="info-form-btn" type="submit">
              Save
            </button>
            <button className="info-form-btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditNameForm

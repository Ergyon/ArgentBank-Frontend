import React, { useState } from 'react'
import './SignInForm.css'
import { UserCircleIcon } from 'lucide-react'

const SignInForm = ({ onSubmit, errorMessage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill all the fields')
      return
    }

    // verification format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email')
      return
    }

    // chargement et envoie
    setIsLoading(true)

    try {
      await onSubmit({ email, password, rememberMe })
    } finally {
      setIsLoading(false)
    }
  }

  // erreur a afficher
  const displayError = error || errorMessage

  return (
    <div className="signin-container">
      <div className="form-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <UserCircleIcon size={18} className="signin-form-icon" />
          <legend className="signin-form-title">Sign in</legend>

          {/* erreurs */}
          {displayError && <div className="error-message">{displayError}</div>}

          <label htmlFor="email" className="signin-form-label">
            Username
          </label>
          <input
            type="email"
            id="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
          ></input>

          <label htmlFor="password" className="signin-form-label">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
          ></input>

          <div className="signin-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            ></input>

            <label htmlFor="remember-me" className="signin-radio-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInForm

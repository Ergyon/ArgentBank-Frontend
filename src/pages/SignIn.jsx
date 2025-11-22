import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { loginUser } from '../redux/slices/authSlice'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SignInForm from '../components/SignInForm/SignInForm'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  const [localError, setLocalError] = useState('')

  // rediriger si deja connecte
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async ({ email, password, rememberMe }) => {
    try {
      setLocalError('')

      const result = await dispatch(
        loginUser({ email, password, rememberMe }),
      ).unwrap()
    } catch (err) {
      setLocalError(err || 'Login failed')
    }
  }

  return (
    <>
      <Header />
      <SignInForm
        onSubmit={handleSubmit}
        errorMessage={localError || error}
        loading={loading}
      />
      <Footer />
    </>
  )
}
export default SignIn

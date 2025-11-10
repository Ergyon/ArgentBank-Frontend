import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Account from '../components/Account/Account'
import { getAccountTransactions } from '../services/api'

const Transactions = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // verifier authentifiaction
  useEffect(() => {
    if (!token) {
      navigate('/signin')
      return
    }

    // recuperer transactions du compte
    const fetchTransaction = async () => {
      try {
        const response = getAccountTransactions(accountId)

        if (response.status !== 200) {
          throw new Error('Failed to fetch transactions.')
        }

        setTransactions(response.body)
        setIsloading(false)
      } catch (err) {
        setError('Failed to load transactions from your account.')
        setIsLoading(false)
      }
    }

    fetchTransaction()
  }, [accountId, token, navigate])

  if (isLoading) {
    return (
      <>
        <Header />
        <span>Loading transactions...</span>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <span>{error}</span>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Account accountId={accountId} />
        <div className="transactions-container">
          {transactions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Descriptions</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
            </table>
          ) : (
            <span>No transactions found for this account.</span>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
export default Transactions

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Account from '../../components/Account/Account'
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable'
import { getAccountTransactions, getUserAccounts } from '../../services/api'
import './AccountDetails.css'

const Transactions = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const { token, userData } = useAuth()

  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // verifier authentifiaction
  useEffect(() => {
    if (!token) {
      navigate('/signin')
      return
    }

    // recuperer compte et ses transactions
    const fetchData = async () => {
      try {
        const userId = userData?.id
        const accountsResponse = getUserAccounts(userId)
        if (accountsResponse.status !== 200) {
          throw new Error('Failed to fetch account.')
        }

        const foundAccount = accountsResponse.body.find(
          (acc) => acc.id === accountId,
        )

        if (!foundAccount) {
          throw new Error('Account not found.')
        }

        setAccount(foundAccount)

        // transactions du compte
        const transactionsResponse = getAccountTransactions(accountId)

        if (transactionsResponse.status !== 200) {
          throw new Error('Failed to fetch transactions.')
        }

        setTransactions(transactionsResponse.body)
        setIsLoading(false)
      } catch (err) {
        setError(
          err.message || 'Failed to load transactions from your account.',
        )
        setIsLoading(false)
      }
    }

    fetchData()
  }, [accountId, navigate, token, userData])

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
        {account && <Account account={account} />}
        {transactions && <TransactionsTable transactions={transactions} />}
      </main>
      <Footer />
    </>
  )
}

export default Transactions

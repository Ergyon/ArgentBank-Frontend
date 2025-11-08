import accountsData from '../data/accounts.json'
import transactionsData from '../data/transactions.json'

// recuperer les comptes de user
export const getUserAccounts = (userId) => {
  const userAccounts = accountsData.accounts.filter(
    (account) => account.userId === userId,
  )

  return {
    status: 200,
    message: 'Accounts retrieved successfully',
    body: userAccounts,
  }
}

// recuperer les transactions de user
export const getAccountTransactions = (accountId) => {
  const accountTransactions = transactionsData.transactions
    .filter((transaction) => transaction.accountId === accountId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return {
    status: 200,
    message: 'Transactions retrieved successfully',
    body: accountTransactions,
  }
}

// recupere une transaction specifique
export const getTransaction = (transactionId) => {
  const transaction = transactionsData.find((t) => t.id === transactionId)

  if (!transaction) {
    return {
      status: 404,
      message: 'Transaction not found',
      body: null,
    }
  }

  return {
    status: 200,
    message: 'Transaction retrieved successfully',
    body: transaction,
  }
}

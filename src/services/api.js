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

// recuperer les categories
export const getCategories = () => {
  const categories = [
    ...new Set(
      transactionsData.transactions.map((transaction) => transaction.category),
    ),
  ]

  return {
    status: 200,
    message: 'Categories retrieved successfully',
    body: categories.sort(),
  }
}

// mettre a jour la categorie d'une transaction
export const updateCategory = (transactionId, newCategory) => {
  const transaction = transactionsData.transactions.find(
    (t) => t.id === transactionId,
  )

  if (!transaction) {
    return {
      status: 404,
      message: 'Transaction not found',
      body: null,
    }
  }

  transaction.category = newCategory

  return {
    status: 200,
    message: 'Category updated successfully',
    body: transaction,
  }
}

// mettre a jour la note
export const updateNote = (transactionId, newNote) => {
  const transaction = transactionsData.transactions.find(
    (t) => t.id === transactionId,
  )

  if (!transaction) {
    return {
      status: 404,
      message: 'Transaction not found',
      body: null,
    }
  }

  transaction.notes = newNote

  return {
    status: 200,
    message: 'Note updated successfully',
    body: transaction,
  }
}

// mettre a jour le profil user
export const updateUserProfile = async (token, updatedData) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })

    const data = await response.json()

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to update profile')
    }

    return {
      status: 200,
      message: 'Profile updated successfully',
      body: data.body,
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      body: null,
    }
  }
}

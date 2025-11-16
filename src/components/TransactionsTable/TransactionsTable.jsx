import React from 'react'
import TransactionRow from '../TransactionRow/TransactionRow'
import './TransactionsTable.css'

const TransactionsTable = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div>
        <p>No transactions found for this account.</p>
      </div>
    )
  }

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <div className="header-title">Date</div>
        <div className="header-title">Description</div>
        <div className="header-title">Amount</div>
        <div className="header-title">Balance</div>
        <div className="header-title"></div>
      </div>

      <div className="transactions-list">
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}

export default TransactionsTable

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
      <div className="transactions-table">
        <div className="transactions-table-head">
          <h4>Date</h4>
          <h4>Description</h4>
          <h4>Amount</h4>
          <h4>Balance</h4>
        </div>

        <div>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable

import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [users, setUsers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    fetchUsers()
    fetchAccounts()
    fetchTransactions()
  }, [])

  function fetchUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(setUsers)
  }

  function fetchAccounts() {
    fetch('/accounts')
      .then(res => res.json())
      .then(setAccounts)
  }

  function fetchTransactions() {
    fetch('/transactions')
      .then(res => res.json())
      .then(setTransactions)
  }

  const renderedUsers = users?.map(user => <div>{JSON.stringify(user)}</div>)
  const renderedAccounts = accounts?.map(account => <div>{JSON.stringify(account)}</div>)
  const renderedTransactions = transactions?.map(transaction => <div>{JSON.stringify(transaction)}</div>)

  return (

    <div>
      {renderedUsers}
      {renderedAccounts}
      {renderedTransactions}

    </div>
  )
}

export default App





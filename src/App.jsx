import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [users, setUsers] = useState([])


  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(setUsers)
  }


  const renderedUsers = users?.map(user =>
    <tr>
      {JSON.stringify(user)}
      <td>{user.userId}</td>
      <td>{user.first + ' ' + user.last}</td>
      <td>{user.timestamp.$timestamp}</td>
    </tr>)

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">UserId</th>
          <th scope="col">Full Name</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody>
        {renderedUsers}
      </tbody>
    </table>

  )
}

export default App





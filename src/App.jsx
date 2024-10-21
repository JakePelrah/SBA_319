import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(setUsers)
  }

  function rowClick(userId) {
    navigate(`user/${userId}`)
  }

  const renderedUsers = users?.map(user =>
    <tr onClick={() => rowClick(user.userId)}>
      <td>{user.userId}</td>
      <td>{user.first}</td>
      <td>{user.last}</td>
      <td>{new Date(user.created).toLocaleDateString()}</td>
    </tr>)

  return (
    <div className='container'>
      <table class="table table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th scope="col">UserId</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {renderedUsers}
        </tbody>
      </table>
    </div>

  )
}

export default App





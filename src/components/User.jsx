import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function User() {
    const [accounts, setAccounts] = useState([])
    const [user, setUser] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAccounts()
        fetchUser()
    }, [])

    function fetchUser() {
        fetch(`/user/${params.id}`)
            .then(res => res.json())
            .then(setUser)
    }

    function fetchAccounts() {
        fetch(`/accounts/${params.id}`)
            .then(res => res.json())
            .then(setAccounts)
    }

    function rowClick(accountId) {
        navigate(`/account/${user.userId}/${accountId}`)
    }

    const renderedAccounts = accounts?.map(account =>
        <tr onClick={() => rowClick(account.accountId)}>
            <td>{account.accountId}</td>
            <td>{account.accountType}</td>
            <td>{account.balance.$numberDecimal}</td>
            <td>{new Date(account.created).toLocaleDateString()}</td>
        </tr>)

    return (
        <div className='container'>

            <div className="user-info text-center mt-4">
                <span>{user?.first + ' ' + user?.last}</span>
            </div>

            <table class="table table-hover table-responsive mt-5">
                <thead>
                    <tr>
                        <th scope="col">AccountId</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedAccounts}
                </tbody>
            </table>
        </div>)
}
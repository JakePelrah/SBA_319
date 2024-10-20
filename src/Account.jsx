import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function Account() {
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])
    const { userId, accountId } = useParams()

    useEffect(() => {
        fetchUser()
        fetchTransactions()
    }, [])

    function fetchUser() {
        fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(setUser)
    }

    function fetchTransactions() {
        fetch(`/transactions/${accountId}`)
            .then(res => res.json())
            .then(setTransactions)
    }

    const renderedTransactions = transactions?.map(transaction =>
        <tr>
            <td>{transaction.category}</td>
            <td>{transaction.type}</td>
            <td>{transaction.amount.$numberDecimal}</td>
            <td>{new Date(transaction.created).toLocaleDateString()}</td>
        </tr>)

    return (
        <div className='container'>

            <div className="user-info text-center mt-4">
                <span>{user?.first + ' ' + user?.last}</span>
            </div>

            <table class="table table-hover table-responsive mt-5">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedTransactions}
                </tbody>
            </table>
        </div>)
}
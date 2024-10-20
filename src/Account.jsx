import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function Account() {
    const [user, setUser] = useState(null)
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('')
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

    function add(e) {
        e.preventDefault()
        if (category && amount && type) {
            console.log(category, type, amount)
        }
    }

    function remove(transactionId) {
        fetch(`/transactions/${transactionId}`,
            { method: "DELETE" }
        ).then(() => fetchTransactions())
    }


    function edit(transactionId) {
        alert(transactionId)
        // fetch(`/transactions/${transactionId}`,
        //     { method: "PATCH" }
        // ).then(() => fetchTransactions())
    }


    const renderedTransactions = transactions?.map(transaction =>
        <tr>
            <td>{transaction.category}</td>
            <td>{transaction.type}</td>
            <td>{transaction.amount.$numberDecimal}</td>
            <td>{new Date(transaction.created).toLocaleDateString()}</td>
            <td><button onClick={() => remove(transaction.transactionId)} className="btn">Delete</button>
                <button onClick={() => edit(transaction.transactionId)} className="btn">Edit</button></td>

        </tr>)

    return (
        <div className='container'>

            <div className="user-info text-center mt-4">
                <span>{user?.first + ' ' + user?.last}</span>
            </div>

            <div class="row g-3 mt-4">
                <div class="col">
                    <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" class="form-control" placeholder="Category" />
                </div>
                <div class="col">
                    <select onChange={(e) => setType(e.target.value)} type="text" class="form-control" placeholder="Category">
                        <option selected value="">Select transaction type</option>
                        <option value="INCOME">INCOME</option>
                        <option value="EXPENSE">EXPENSE</option>
                        <option value="TRANSFER">TRANSFER</option>
                    </select>
                </div>
                <div class="col">
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="text" class="form-control" placeholder="Amount" />
                </div>
                <div class="col">
                    <button onClick={add} className="btn">ADD</button>
                </div>
            </div>

            <table class="table table-responsive mt-5">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Created</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {renderedTransactions}
                </tbody>
            </table>
        </div>)
}
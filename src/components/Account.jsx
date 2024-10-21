import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function Account() {
    const [user, setUser] = useState(null)
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(null)
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
            fetch('/transactions', {
                method: 'POST',
                body: JSON.stringify({ accountId, category, type, amount }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(({ created }) => {
                    if (created) {
                        fetchTransactions()
                        setAmount('')
                    }
                })
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
            <td>{parseFloat(transaction.amount.$numberDecimal).toFixed(2)}</td>
            <td>{new Date(transaction.created).toLocaleDateString()}</td>
            <td><button onClick={() => remove(transaction.transactionId)} className="delete-btn btn me-2">Delete</button>
                <button onClick={() => edit(transaction.transactionId)} className="edit-btn btn">Edit</button></td>
        </tr>)

    return (
        <div className='container'>

            <div className="user-info text-center mt-4">
                <span>{user?.first + ' ' + user?.last}</span>
            </div>

            <div class="row d-flex justify-content-center  mt-4">
                <div class="col">
                    <select onChange={(e) => setCategory(e.target.value)} type="text" class="form-control" >
                        <option selected value="">Select category</option>
                        <option value="AUTO">AUTO</option>
                        <option value="CHECK">CHECK</option>
                        <option value="COFFEE">COFFEE</option>
                        <option value="CREDIT CARD">CREDIT CARD</option>
                        <option value="DENTIST">DENTIST</option>
                        <option value="ELECTRONICS">ELECTRONICS</option>
                        <option value="FAST FOOD">FAST FOOD</option>
                        <option value="GAS">GAS</option>
                        <option value="HEALTH">HEALTH</option>
                        <option value="PAYCHECK">PAYCHECK</option>
                        <option value="TELEVISION">TELEVISION</option>
                        <option value="UTILITIES">UTILITIES</option>
                        <option value="VETERINARY">VETERINARY</option>
                    </select>
                </div>

                <div class="col">
                    <select onChange={(e) => setType(e.target.value)} type="text" class="form-control" >
                        <option selected value="">Select transaction type</option>
                        <option value="INCOME">INCOME</option>
                        <option value="EXPENSE">EXPENSE</option>
                        <option value="TRANSFER">TRANSFER</option>
                    </select>
                </div>

                <div class="col">
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="text" class="form-control" placeholder="0.00" />
                </div>

                <div class="col">
                    <button onClick={add} className="add-btn btn">ADD</button>
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
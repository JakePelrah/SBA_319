import express from 'express'
import { getTransactions, deleteTransaction, postTransaction, patchTransaction } from '../../db.js'
export const router = express.Router()


router.get('/transactions/:accountId', (req, res) => {
    const { accountId } = req.params
    try {
        getTransactions(accountId).then(transactions => res.json(transactions))
    } catch (e) {
        res.json([])
    }
})

router.delete('/transactions/:accountId', (req, res) => {
    const { accountId } = req.params
    try {
        deleteTransaction(accountId).then(_ => res.json({ deleted: true }))
    } catch (e) {
        res.json({ deleted: false })
    }
})

router.post('/transactions', (req, res) => {
    let { accountId, category, type, amount } = req.body
    try {
        postTransaction({ accountId, category, type, amount })
            .then(_ => res.json({ created: true }))
    } catch (e) {
        res.json({ created: false })
    }
})

router.patch('/transactions', (req, res) => {
    let { accountId, transactionId, category, type, amount } = req.body
    try {
        patchTransaction(transactionId, { accountId, category, type, amount }).then(_ => res.json({ patched: true }))
    } catch (e) {
        res.json({ patched: false })
    }
})


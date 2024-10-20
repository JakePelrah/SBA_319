import express from 'express'
import { getTransactions, deleteTransaction } from '../../db.js'
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
    console.log(req.body)
    // try {
    //     deleteTransaction(accountId).then(_ => res.json({ deleted: true }))
    // } catch (e) {
    //     res.json({ deleted: false })
    // }
})

router.patch('/transactions', (req, res) => {
    console.log(req.body)
    // try {
    //     deleteTransaction(accountId).then(_ => res.json({ deleted: true }))
    // } catch (e) {
    //     res.json({ deleted: false })
    // }
})


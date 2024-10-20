import express from 'express'
import { getTransactions } from '../../db.js'
export const router = express.Router()


router.get('/transactions/:accountId', (req, res) => {
   const {accountId} = req.params
    try {
        getTransactions(accountId).then(transactions=>res.json(transactions))
    } catch (e) {
        res.json([])
    }
})

// router.post()
// router.patch()
// router.delete()
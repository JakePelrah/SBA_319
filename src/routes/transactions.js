import express from 'express'
import { getTransactions } from '../../db.js'
export const router = express.Router()


router.get('/transactions', (req, res) => {
    try {
        getTransactions().then(transactions=>res.json(transactions))
    } catch (e) {
        res.json([])
    }
})

// router.post()
// router.patch()
// router.delete()
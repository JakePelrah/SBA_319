import express from 'express'
import { getAccount } from '../../db.js'
export const router = express.Router()


router.get('/accounts/:userId', (req, res) => {
    const { userId } = req.params
    try {
        getAccount(userId).then(accounts => res.json(accounts))
    } catch (e) {
        res.json([])
    }
})


// router.post()
// router.patch()
// router.delete()
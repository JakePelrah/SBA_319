import express from 'express'
import { getAccounts } from '../../db.js'
export const router = express.Router()


router.get('/accounts', (req, res) => {
    try {
        getAccounts().then(accounts=>res.json(accounts))
    } catch (e) {
        res.json([])
    }
})


// router.post()
// router.patch()
// router.delete()
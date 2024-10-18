import express from 'express'
import { getUsers } from '../../db.js'
export const router = express.Router()


router.get('/users', (req, res) => {
    try {
        getUsers().then(users=>res.json(users))
    } catch (e) {
        res.json([])
    }
})

// router.post()
// router.patch()
// router.delete()
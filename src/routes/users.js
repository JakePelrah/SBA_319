import express from 'express'
import { getUsers, getUser } from '../../db.js'
export const router = express.Router()


router.get('/users', (req, res) => {
    try {
        getUsers().then(users=>res.json(users))
    } catch (e) {
        res.json([])
    }
})

router.get('/user/:userId', (req, res) => {
    const {userId} = req.params
    try {
        getUser(userId).then(user=>res.json(user))
    } catch (e) {
        res.json(null)
    }
})

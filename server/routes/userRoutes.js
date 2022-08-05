const router = require('express').Router()
const User = require('../models/User.js')

// createing user
router.post('/', async (req, res) => {
    try {
        const {name, email,password, picture} = req.body
        console.log(req.body);
        // create in DB
        const user = await User.create({
            name, email, password, picture
        })
        // take it client
        res.status(201).json(user)
    } catch (error) {
        let msg
        if (error.code == 11000) {
            msg = 'User already exists'
        } else {
            msg = error.message
        }
        console.log(error);
        res.status(400).json(msg)
    }
})
// login user
router.post('/login', async (req, res) => {
    try {
        const {name, email,password, picture} = req.body
        console.log(req.body);
        // find user in DB
        const user = await User.findByCredentials(email, password)
        user.status = 'online'
        // save user
        await user.save()
        // take it client
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
})

module.exports = router
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{ "url":1,"title":1,"author":1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.passwordHash.length < 3 || body.username.length < 3){
        response.status(400).end()

    }
    else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)
    
    

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
    }
})
module.exports = usersRouter
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/Sikumonet-app')

app.post('/api/register',async (req,res) => {
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status: 'ok'})
    }catch (err){
        res.json({status: 'error', error: 'Duplicate Email'})
    }
})
app.post('/api/login',async (req,res) => {
        const user = await User.findOne({
            email: req.body.email,

        })
    if(!user) {return {status: 'error', error: 'Invalid login'}}

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(user){
        const token = jwt.sign({
            name: user.name,
            email: user.email
        },
     'secret123'
        )
        return res.json({status: 'ok', user: token })
    }else {
        return res.json({status: 'error', user: false })
    }
})
app.get('/api/quote',async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})

        return res.json({status: 'ok', quote: user.quote})

    }catch (error){
        console.log(error)
        res.json({status: 'error',error: 'invalid token'})
    }

})
app.post('/api/quote',async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.updateOne(
            {email: email},
            {$set: {quote: req.body.quote}}
        )

        return {status: 'ok'}

    }catch (error){
        console.log(error)
        res.json({status: 'error',error: 'invalid token'})
    }

})

app.listen(1337, () =>{
    console.log('server is working!!')
})


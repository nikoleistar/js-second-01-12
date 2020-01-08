const fs = require ('fs')
const express = require('express')
const app = express()
const cart = require('./cart')
const writer = require ('./writer')

const path = 'dist/server/db/'

app.use (express.json ())
app.use ('/', express.static ('dist/public'))

app.get ('/catalog', (req, res) => {
    fs.readFile (path + 'catalogData.json', 'utf-8', (err, data) => {
        console.log(path + 'catalogData.json');
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get ('/cart', (req, res) => {
    fs.readFile (path + 'userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.post('/cart', (req, res) => {
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(500, '{ "result": 0 }')
        } else {
            let { newCart, name } = cart.add (req, JSON.parse(data))

            writer(path + 'userCart.json', JSON.stringify(newCart), res, {action: 'add', name: name})
        }
    })
})

app.put('/cart/:id', (req, res) => {
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(500, '{ "result": 0 }')
        } else {
            let { newCart, name } = cart.change (req, JSON.parse(data))

            writer(path + 'userCart.json', JSON.stringify(newCart), res, {action: 'change', name: name})
        }
    })
})

app.delete('/cart/:id', (req, res) => {
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(500, '{ "result": 0 }')
        } else {
            let { newCart, name } = cart.delete (req, JSON.parse(data))

            writer(path + 'userCart.json', JSON.stringify(newCart), res, {action: 'del', name: name})
        }
    })
})

app.listen(3030, () => console.log(`app listening on port 3030`))
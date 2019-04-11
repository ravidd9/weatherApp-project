const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const City = require('./server/models/City')
mongoose.connect("mongodb://localhost/weatherAppDB", { useNewUrlParser: true })



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)




const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
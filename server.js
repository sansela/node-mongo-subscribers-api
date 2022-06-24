require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
PORT = 3000
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to the database'))

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)

app.listen(PORT, () => console.log(`server started running on the port ${PORT}`))
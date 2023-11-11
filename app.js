const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const leave = require('./salay_all/salary')
const update = require('./update/update')

app.use(cors())
app.use(leave.router)
app.use(update.router)

app.listen(3000, () => {})
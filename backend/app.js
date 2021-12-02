const express = require('express')
const cors = require('cors')
const router = require('./routes/route.js')
const connection = require('./config/dbconn.js')

const app = express()

//set db connection


app.use(cors())
app.use(express.urlencoded({ extended : true}))

app.use('/', router)

app.listen(5000, () => { console.info('server running at http://localhost:5000..') })

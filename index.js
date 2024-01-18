const express = require('express')
var bodyParser = require('body-parser')
const {setupHandler} = require('./handlers/routes.js')
const {myLogger} = require('./middleware/logger.js')
const {reqTime} = require('./middleware/requestTime.js')
const {authentication} = require('./middleware/authentication.js')

const app = express()
const port = 3000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(reqTime)
// app.use(myLogger)

app.get('/', authentication, (req, res) => {
  res.json({
    "message": "this is home path"
  })
})

setupHandler(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
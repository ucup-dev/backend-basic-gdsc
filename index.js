const express = require('express')
var bodyParser = require('body-parser')
const {setupHandler} = require('./handlers/routes.js')
const {myLogger} = require('./middleware/logger.js')
const {reqTime} = require('./middleware/requestTime.js')
const {verifyJWTMiddleware} = require('./middleware/verifyJWTToken.js')
const {setupDB} = require('./database/db.js')
const {JWTUtil} = require('./utils/jwt.js')

const app = express()
const port = 3000


async function main() {

  const dbConnection = await setupDB()

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(reqTime)
  // app.use(myLogger)

  const jwtUtil = new JWTUtil()

  app.get('/', verifyJWTMiddleware(jwtUtil), (req, res) => {
    res.json({
      "message": "this is home path"
    })
  })

  setupHandler(app, dbConnection, jwtUtil)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
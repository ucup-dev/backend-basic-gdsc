const express = require('express')
var bodyParser = require('body-parser')
const {setupHandler} = require('./handlers/routes.js')
const {reqTime} = require('./middleware/requestTime.js')
const {setupDB} = require('./database/db.js')
const {JWTUtil} = require('./utils/jwt.js')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = 3000

async function main() {

  const dbConnection = await setupDB()

  app.use(cors())
  app.options('*', cors())

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(reqTime)
  // app.use(myLogger)

  const jwtUtil = new JWTUtil()

  app.get('/', (req, res) => {
    res.json({
      "message": "Belajar Backend Development Bersama GDSC UIN JAKARTA"
    })
  })

  setupHandler(app, dbConnection, jwtUtil)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
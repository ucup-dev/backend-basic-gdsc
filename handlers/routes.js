const express = require('express')
const mysql = require('mysql2')
const {setupPostHandler} = require('./postHandler.js')
const {setupUserHandler} = require('./userHandler.js')
const {setupProductHandler} = require('./productHandler.js')
const {verifyJWTMiddleware} = require('../middleware/verifyJWTToken.js')

/**
 * 
 * @param {express.Express} app 
 * @param {mysql.Connection} dbConnection
 */
function setupHandler(app, dbConnection, jwtUtil) {

    const userHandlerRouter = express.Router()
    const postHandlerRouter = express.Router()
    const productHandlerRouter = express.Router()
    
    app.use('/user', setupUserHandler(userHandlerRouter, dbConnection, verifyJWTMiddleware(jwtUtil)))
    app.use('/post', setupPostHandler(postHandlerRouter, dbConnection))
    app.use('/product', verifyJWTMiddleware(jwtUtil), setupProductHandler(productHandlerRouter, dbConnection))
}

module.exports = {setupHandler}
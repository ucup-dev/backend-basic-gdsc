const express = require('express')
const mysql = require('mysql2')
const {setupPostHandler} = require('./postHandler.js')
const {setupUserHandler} = require('./userHandler.js')

/**
 * 
 * @param {express.Express} app 
 * @param {mysql.Connection} dbConnection
 */
function setupHandler(app, dbConnection) {

    const userHandlerRouter = express.Router()
    const postHandlerRouter = express.Router()
    
    app.use('/user', setupUserHandler(userHandlerRouter))
    app.use('/post', setupPostHandler(postHandlerRouter, dbConnection))
}

module.exports = {setupHandler}
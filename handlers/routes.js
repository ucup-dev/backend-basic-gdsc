const express = require('express')
const {setupPostHandler} = require('./postHandler.js')
const {setupUserHandler} = require('./userHandler.js')

/**
 * 
 * @param {express.Express} app 
 */
function setupHandler(app) {

    const userHandlerRouter = express.Router()
    const postHandlerRouter = express.Router()
    
    app.use('/user', setupUserHandler(userHandlerRouter))
    app.use('/post', setupPostHandler(postHandlerRouter))
}

module.exports = {setupHandler}
const {Router} = require('express')
const {setupPostHandler} = require('./postHandler.js')
const {setupUserHandler} = require('./userHandler.js')

/**
 * 
 * @param {Router} router 
 */
function setupHandler(router) {
    router.use('/post/', setupPostHandler(router))
    router.use('/user/', setupUserHandler(router))
    return router
}

module.exports = {setupHandler}
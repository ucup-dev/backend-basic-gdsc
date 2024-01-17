const {Router} = require('express')
var {getRandomInt} = require('../utils/randomNumber.js')

const posts = []

/**
 * 
 * @param {Router} router 
 */
function setupPostHandler(router) {

    router.get('/', (req, res) => {
        console.log(req.params, req.query)
        res.json({
          "data": posts
        })
    })
      
    
    router.post('/', (req, res) => {
        console.log(req.body)
    
        posts.push({
            "id": getRandomInt(9999999999999999),
            "title": req.body.title,
            "description": req.body.description
        })
    
        res.json({
            "message": "success"
        })
    })
    
    router.put('/', (req, res) => {
        res.send('Got a PUT request at /user')
    })
    
    router.delete('/:postId', (req, res) => {
    
        console.log(req.params.postId)
    
        for(let i = 0; i < posts.length; i++) {
            if(posts[i].id == req.params.postId) {
                posts.splice(i, 1)
    
                res.end(JSON.stringify({
                    status: true,
                    message: "berhasil delete data"
                }))
                return 
            }
        }
    
        res.json({
            "message": `post with id ${req.params.postId} is not found`
        })
    })

    return router

}

module.exports = {setupPostHandler}
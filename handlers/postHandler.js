const {Router} = require('express')
const {myLogger} = require('../middleware/logger.js')
const mysql = require('mysql2')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection
 */
function setupPostHandler(router, dbConnection) {

    router.get('/', myLogger, async (req, res) => {

        try {
            const sql = 'SELECT * FROM `posts`';
          
            const [rows] = await dbConnection.query(sql);
          
            // console.log(rows);
    
            res.json({
                "status": true,
                "message": "ok",
                "data": rows
            })
            return 

        } catch (err) {
            console.log(err);

            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })
    
    router.post('/', async (req, res) => {
        
        try {
            const sql =
            `INSERT INTO posts (title, description, author_name) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.author_name}')`;
        
            const [result] = await dbConnection.query(sql);

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
            return 

        } catch (err) {
            console.log(err);

            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })
    
    router.put('/', (req, res) => {
        res.send('Got a PUT request at /user')
    })
    
    router.delete('/:postId', async (req, res) => {
        
        try {
            const sql = `DELETE FROM posts WHERE id = ${req.params.postId}`;
          
            const [result] = await dbConnection.query(sql);
          
            console.log(result);

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
            return 

        } catch (err) {
            console.log(err);

            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    return router

}

module.exports = {setupPostHandler}
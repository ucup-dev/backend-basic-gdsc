const {Router} = require('express')
const mysql = require('mysql2')
const {makeSlug} = require('../utils/stringFunction.js')

/**
 * 
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection
 */
function setupProductHandler(router, dbConnection) {

    router.post('/', async (req, res) => {
        try {

            console.log(req.user)

            if(req.user.role != 'admin') {
                res.statusCode = 403
                res.json({
                    "status": false,
                    "message": "anda tidak memiliki akses",
                    "data": null
                })
                return 
            }

            const sql =
            `INSERT INTO products (name, slug, stock, type, price, image) VALUES 
            ('${req.body.name}', '${makeSlug(req.body.name)}', '${req.body.stock}', '${req.body.type}', '${req.body.price}', '${req.body.image}')`;
        
            const [result] = await dbConnection.query(sql);

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
            return 

        } catch (err) {
            console.log(err);

            res.statusCode = 500
            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    router.post('/order', async (req, res) => {
        try {

            console.log(req.user)

            if(req.user.role != 'user') {
                res.statusCode = 403
                res.json({
                    "status": false,
                    "message": "anda tidak memiliki akses",
                    "data": null
                })
                return 
            }

            const sql =
            `INSERT INTO orders (product_id, user_id, quantity) VALUES 
            ('${req.body.productId}', '${req.user.userID}', '${req.body.quantity}')`;
        
            const [result] = await dbConnection.query(sql);

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
            return 

        } catch (err) {
            console.log(err);

            res.statusCode = 500
            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    router.get('/order-owner', async (req, res) => {
        try {
            
            const sql = 'SELECT ord.id as order_id, p.id as product_id, p.name as product_name, u.username as username, ord.quantity as product_quantity, ord.is_accepted as is_accepted FROM orders as ord JOIN products as p ON p.id = ord.product_id JOIN users as u ON u.id = ord.user_id'

            const [rows] = await dbConnection.query(sql)

            if(req.user.role != 'admin') {
                res.statusCode = 403
                res.json({
                    "status": false,
                    "message": "anda tidak memiliki akses",
                    "data": null
                })
                return 
            }

            res.json({
                "status": true,
                "message": "ok",
                "data": rows
            })
            return 

        } catch (err) {
            console.log(err);

            res.statusCode = 500
            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    router.get('/order-user', async (req, res) => {
        try {
            
            const sql = `SELECT ord.id as order_id, p.id as product_id, p.name as product_name, u.username as username, ord.quantity as product_quantity, ord.is_accepted as is_accepted FROM orders as ord JOIN products as p ON p.id = ord.product_id JOIN users as u ON u.id = ord.user_id WHERE u.id = ${req.user.userID}`

            const [rows] = await dbConnection.query(sql)

            if(req.user.role != 'user') {
                res.statusCode = 403
                res.json({
                    "status": false,
                    "message": "anda tidak memiliki akses",
                    "data": null
                })
                return 
            }

            res.json({
                "status": true,
                "message": "ok",
                "data": rows
            })
            return 

        } catch (err) {
            console.log(err);

            res.statusCode = 500
            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    router.put('/accept-order/:order_id', async (req, res) => {
        try {
            
            if(req.user.role != 'admin') {
                res.statusCode = 403
                res.json({
                    "status": false,
                    "message": "anda tidak memiliki akses",
                    "data": null
                })
                return 
            }

            const sql = `UPDATE orders SET is_accepted = 1 WHERE orders.id = ${req.params.order_id}`

            const [result] = await dbConnection.query(sql)

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
            return 

        } catch (err) {
            console.log(err);

            res.statusCode = 500
            res.json({
                "status": false,
                "message": err,
                "data": null
            })
            return 
        }
    })

    router.get('/', async (req, res) => {
        
        try {
            const sql = 'SELECT * FROM `products`';
          
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

            res.statusCode = 500
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

module.exports = {setupProductHandler}
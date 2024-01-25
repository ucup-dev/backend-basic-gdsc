const {Router} = require('express')
const mysql = require('mysql2')
const {HashFunction} = require('../utils/hash.js')
const { JWTUtil } = require('../utils/jwt')

/**
 * 
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection
 */
function setupUserHandler(router, dbConnection) {

    const hashFunction = new HashFunction()
    const jwtUtil = new JWTUtil()

    router.post('/signup', async (req, res) => {

        try {
                //1. ambil nilai dari body
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password

            //2. siapin query insert

            //3. password hash

            const sql = `INSERT INTO users (username, email, password, role) VALUES 
            ('${username}', '${email}', '${hashFunction.hash(password)}', 'user')`

            //4. execute query

            const [result] = await dbConnection.query(sql)

            res.json({
                status: true,
                message: "sukes melakukan pendaftaran akun",
                data: result
            })
            return

        } catch (error) {
            res.json({
                status: false,
                message: error.message,
                data: null
            })
            return
        }
        
    })

    router.post('/login', async (req, res) => {

        try {

            const email = req.body.email
            const password = req.body.password

            const sql = `SELECT * FROM users WHERE email = '${email}'`

            const [rows] = await dbConnection.query(sql)

            if(rows.length == 0) {
                res.json({
                    status: false,
                    message: "kredential tidak valid",
                    data: null
                })
                return
            }
            
            if(!hashFunction.compare(password, rows[0].password)) {
                res.json({
                    status: false,
                    message: "kredential tidak valid",
                    data: null
                })
                return
            }

            const token = jwtUtil.encode({
                username: rows[0].username,
                userID: rows[0].id,
                role: rows[0].role
            })

            res.json({
                status: true,
                message: "login berhasil",
                data: {
                    accessToken: token
                }
            })
            return

        } catch (error) {
            console.log(error)
            res.json({
                status: false,
                message: error.message,
                data: null
            })
            return
        }
    })

    return router
}

module.exports = {setupUserHandler}
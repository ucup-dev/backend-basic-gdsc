
function verifyJWTMiddleware(jwtUtil) {
    return function (req, res, next) {

        try {
            if(!req.headers.authorization) {
                res.statusCode = 401
                res.json({
                    status: false,
                    message: "Unauthenticated",
                    data: null
                })
                return
            }
    
            const token = req.headers.authorization.split(" ")[1]
    
            req.user = jwtUtil.decode(token).data
    
            // Implement the middleware function based on the options object
            next()
        } catch (error) {
            res.statusCode = 500
            res.json({
                status: false,
                message: error.message,
                data: null
            })
        }   
       
      }
}

module.exports = {verifyJWTMiddleware}
const jwt = require('jsonwebtoken');

class JWTUtil {
    
    /**
     * @param {object} payload 
     * @returns
     */
    encode(payload) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: payload
          }, process.env.JWT_SECRET);
    }

    /**
     * @param {string} token 
     * @returns 
     */
    decode(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = {JWTUtil}
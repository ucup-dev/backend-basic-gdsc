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
          }, 'secret');
    }

    /**
     * @param {string} token 
     * @returns 
     */
    decode(token) {
        return jwt.verify(token, 'secret');
    }
}

module.exports = {JWTUtil}
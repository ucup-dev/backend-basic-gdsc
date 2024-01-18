const myLogger = function (req, res, next) {
    console.log('IP Request', req.socket.remoteAddress)
    next()
}

module.exports = {myLogger}
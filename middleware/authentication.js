function authentication(req, res, next) {
    const authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    const splittedAuth = authheader.split(" ")
 
    // console.log("AUTH", splittedAuth[1])
 
    if (splittedAuth[1] == 'ucup') {
        // If Authorized user
        next();
    } else {
        next(new Error('You are not authenticated!'));
    }
 
}

module.exports = {authentication}
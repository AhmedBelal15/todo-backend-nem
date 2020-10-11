const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const authHeaders = req.header('auth-token')
    if (!authHeaders) {
        return res.status(401).json('access denied')
    }
       next()
    
}


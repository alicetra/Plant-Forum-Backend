import jwt from 'jsonwebtoken'

//Constructs the payload for JWT tokens to grab the user ID from it 
const jwt_payload_handler = (user) => {
    return {
        user_id: user._id,
    }
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    // if there is no bearerHeader
    if (!bearerHeader) {
        res.status(401).send({ error: 'Access Denied' })
    } else {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
            if (err) {
                // Token verification failed
                res.status(403).send({ error: err.message })
            } else {
                // Token is valid, proceed to the next middleware
                next()
            }
        })
    }
}
export {jwt_payload_handler,verifyToken}



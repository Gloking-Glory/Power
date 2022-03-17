const jwt = require('jwt');

let secret = process.env.JWT_SECRET;

const verifyToken =(req, res, next)=> {
    let token = req.header.Authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, secret, (err, decoded)=> {
            if (!err) {
                next();
            } else {
                res.status(401).send({message: 'Unathorized'});
            }
        })
    }
}

module.exports = verifyToken
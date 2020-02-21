const jwt = require('jsonwebtoken');
const config = require("../config/local_config").development;

module.exports = {
    validateToken : async (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401).send({ 
                message: 'Authorization Token not present'
            });
        }
        const token = req.headers.authorization; // Bearer <token>
        const options = {
            expiresIn: '2d',
            issuer: config.host
        };
        const payload = await jwt.verify(token, config.JWT_SECRET, options);
        if (!payload || payload.user !== req.body.email) {
            return res.status(401).send({
                message : 'Authentication Error!'
            });
        }
        next();
    }
}
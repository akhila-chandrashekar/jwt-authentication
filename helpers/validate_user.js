const bcrypt = require('bcryptjs');
const config = require("../config/local_config").development;
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: async (inputPassword, user) => {
        const match = await bcrypt.compare(inputPassword, user.password);
        if(!match){
            return {
                error : true,
                message: "Invalid Password"
            }
        }
        const payload = { user: user.email };
        const options = { expiresIn: '2d', issuer: config.host };
        const secret = config.JWT_SECRET; 
        const token = jwt.sign(payload, secret, options);
        return {
            error: false,
            token
        }
    }
}
var jwt = require("jsonwebtoken");
let authConfig = require('../configs/auth.config');

class JwtService {

    verifyAndDecodeJwt(token) {
        if(token && token.includes('Bearer')) {
            token = token.substring(7, token.length);
            let decoded = jwt.verify(token, authConfig.SECRET);
            return {
                validated: true,
                decodedJwt: decoded
            };
        }
        return { validated: false,
                 message: 'Jwt is not present or correct' };
    }

    createJwt(payload) {
        let token = jwt.sign(payload, 
            authConfig.SECRET, {
                expiresIn: authConfig.EXPIRY_TIME
            });
        return `Bearer ${token}`;
    }
}

let jwtService = new JwtService();
module.exports = { jwtService };
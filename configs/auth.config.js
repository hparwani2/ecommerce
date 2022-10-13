require('dotenv').config();

module.exports = { 
    SECRET: process.env.JWT_SECRET,
    EXPIRY_TIME: process.env.JWT_EXPIRY_TIME
}
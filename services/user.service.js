let db = require("../models/index");

class UserService {
    constructor() {
        this.schema = db.user;
    }

    createUser(user) {
        return this.schema
        .create(user)
        .catch((error) => {
            console.log('error occurred while creating user', error);
            return Promise.reject('Error Occurred while creating new user');
        })
        ;
    }

    findUserByEmail(email) {
        return this.schema
        .findOne({
            where: {
                email: email.toLowerCase()
            }
        });
    }
}

let userService = new UserService();
module.exports = {
    userService
}
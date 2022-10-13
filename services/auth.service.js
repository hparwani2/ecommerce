let { userService } = require('./user.service');
let { roleService } = require('./role.service');
var bcrypt = require("bcryptjs");

class AuthService {
    // constructor() {
    //     this.schema = db.user;
    // }

    signUp(user, roleNames) {
        user.password = bcrypt.hashSync(user.password, 8);

        return userService
        .createUser(user)
        .then((user) => {
            console.log('user created successfully');
            if(roleNames) {
                roleService
                .findRolesByName(roleNames)
                .then((roles) => {
                    console.log('roles to the user added successfully');
                    user.setRoles(roles);
                });
            } else {
                user.setRoles([2]);
            }
        }).catch((error) => {
            console.log('Error Occurred while creating new user in auth service', error);
            return Promise.reject('Error Occurred while creating user');
        });
    }
}

let authService = new AuthService();
module.exports = {
    authService
}
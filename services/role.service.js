let db = require("../models/index");

class RoleService {
    constructor() {
        this.schema = db.role;
    }

    findRolesByName(roleNames) {
        return this
        .schema
        .findAll({
            where: {
                name: {
                    [db.Sequelize.Op.or]: roleNames
                }
            }
        }).catch((error) => {
            console.log('Error Occurred while fetching roles by name', error);
            return Promise.reject('Error Occurred while fetching roles by name');
        });
    }
}

let roleService = new RoleService();
module.exports = {
    roleService
}
let { userService } = require('../services/user.service');
let { roleService } = require('../services/role.service');

function checkMandatoryFields(request, response, next) {
    if(!request.body.name) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'Name Should Be Present'
        }));
    }

    if(!request.body.email) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'email should be present'
        }));
    }

    if(!request.body.password) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'password should be present'
        }));
    }
    next();
}

function checkEmailDuplicate(request, response, next) {
    userService
    .findUserByEmail(request.body.email)
    .then((user) => {
        if(user && user.length !== 0) {
            response.setHeader('content-type', 'application/json');
            response.writeHead(400);
            response.end(JSON.stringify({
                message: 'email is already present'
            }));
        } else {
            next();
        }
    });

}

function checkRolesExist(request, response, next) {
    if(request.body.roles) {
        roleService
        .findRolesByName(request.body.roles)
        .then((roles) => {
            let presentRoles = roles.map((role) => {
                return role.dataValues
            });
            
            let presentRoleObj = {};
            for(let role of presentRoles) {
                let name = role.name;
                presentRoleObj[name] = 1;
            }

            let requestedRoles = request.body.roles;
            requestedRoles.forEach((requestedRole) => {
                if(!presentRoleObj[requestedRole]) {
                    response.setHeader('content-type', 'application/json');
                    response.writeHead(400);
                    response.end(JSON.stringify({
                        message: `role with name ${requestedRole} is not present`
                    }));
                }
            });
            next();
        });
    } else {
        next();
    }
}

module.exports = {
    checkEmailDuplicate,
    checkMandatoryFields,
    checkRolesExist
}
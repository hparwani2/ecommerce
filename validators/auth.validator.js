let { userService } = require('../services/user.service');
let { roleService } = require('../services/role.service');
let { jwtService } = require('../services/jwt.service');

function checkMandatoryFields(request, response, next) {
    if(!request.body.name) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'Name Should Be Present'
        }));
        return;
    }

    if(!request.body.email) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'email should be present'
        }));
        return;
    }

    if(!request.body.password) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'password should be present'
        }));
        return;
    }
    next();
}

function checkMandatoryFieldsForSignIn(request, response, next) {

    if(!request.body.email) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'email should be present'
        }));
        return;
    }

    if(!request.body.password) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'password should be present'
        }));
        return;
    }
    next();
}

function checkEmailDuplicate(request, response, next) {
    userService
    .findUserByEmail(request.body.email)
    .then((user) => {
        if(user) {
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

function verifyJwt(request, response, next) {
    try {
        let token = request.headers['x-access-token'];
        let decoded = jwtService.verifyAndDecodeJwt(token);
        if(decoded.validated) {
            request.decodedJwt = decoded.decodedJwt;
            next();
        } else {
            response.setHeader('content-type', 'application/json');
            response.writeHead(401);
            response.end(JSON.stringify({
                message: decoded.message
            }));
            return;
        }
    } catch(error) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(401);
        response.end(JSON.stringify({
            message: error.message
        }));
        return;
    }
}

function isAdmin(request, response, next) {
    if(!request.decodedJwt) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(401);
        response.end(JSON.stringify({
            message: 'Decoded Jwt is not present for check'
        }));
        return;
    }

    let roles = request.decodedJwt.roles;
    let adminRole = roles.filter((role) => role === 'admin');
    if(adminRole.length === 0) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(403);
        response.end(JSON.stringify({
            message: 'User cannot access this resource'
        }));
        return;
    }
    next();
}

module.exports = {
    checkEmailDuplicate,
    checkMandatoryFields,
    checkRolesExist,
    checkMandatoryFieldsForSignIn,
    verifyJwt,
    isAdmin
}
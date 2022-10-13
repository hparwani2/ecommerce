let { authService } = require('../services/auth.service');

function signUp(request, response) {
    let user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }
    let roleNames = request.body.roles;

    authService
    .signUp(user, roleNames)
    .then(() => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(201);
        response.end(JSON.stringify({
            message: 'User Created Successfully'
        }));
    }).catch((error) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: error.message
        }));
    });
}

module.exports = {
    signUp
}
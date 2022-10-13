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

function signIn(request, response) {
    authService
    .signIn(request.body.email, request.body.password)
    .then((authResponse) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(authResponse));
    }).catch(error => {
        if(!error.errorCode) {
            error.errorCode = 500
        }
        console.log('Error Occurred while signing in', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(error.errorCode);
        response.end(JSON.stringify({
            message: error.message
        }));
    });
}

module.exports = {
    signUp,
    signIn
}
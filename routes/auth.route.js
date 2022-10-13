const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');

module.exports = function(app) {
    app.post('/ecomm/api/v1/auth/signup', [authValidator.checkMandatoryFields,
    authValidator.checkEmailDuplicate, authValidator.checkRolesExist], authController.signUp);
}
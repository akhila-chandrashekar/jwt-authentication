const UserController = require('../controllers/user');
const Utils = require('../helpers/utils');

module.exports = (router) => {

    router.route('/users')
            .post(UserController.createUser)
            .get(Utils.validateToken, UserController.getAllUsers)

    router.route('/login')
            .post(UserController.login)

    return router;
}
const User = require('../../models/user');
const Authentification = require('./role');

const { role_login, role_sign_up } = require('./role');

// let login = async (req, res) => {
//     return await role_login(req, res, User)
// }


// let sign_up = async (req, res) => {
//     return await role_sign_up(req, res, User)
// }


class AuthController extends Authentification {
    constructor() {
        super(User)
    }
}


module.exports = new AuthController()

// module.exports = {
//     login,
//     sign_up,
// };

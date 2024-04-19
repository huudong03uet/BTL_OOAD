const Admin = require('../../models/admin');
const Authentification = require('./role');
const { role_login, role_sign_up } = require('./role');


// let login = async (req, res) => {
//     return await role_login(req, res, Admin)
// }


// let sign_up = async (req, res) => {
//     return await role_sign_up(req, res, Admin)
// }


// module.exports = {
//     login,
//     sign_up,
// };



class AuthController extends Authentification {
    constructor() {
        super(Admin)
    }
}


module.exports = new AuthController()

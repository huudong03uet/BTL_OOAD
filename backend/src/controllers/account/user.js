const User = require('../../models/user');
const { role_edit_profile, role_change_password, role_forgot_password } = require('./role');


const edit_profile = async (req, res) => {
    return await role_edit_profile(req, res, User)
}


const change_password = async(req, res) => {
    return await role_change_password(req, res, User)
}


let forgot_password = async (req, res) => {
    return await role_forgot_password(req, res, User)
}


module.exports = {
    edit_profile,
    change_password,
    forgot_password,
};

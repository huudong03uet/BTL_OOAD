const { DOUBLE } = require('sequelize');
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

let qr_payment = async (req, res) => {
    const { user_id, amount } = req.body;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user_id, amount);

        user.coin += parseFloat(amount);

        await user.save();

        return res.status(200).json({ message: 'Payment successful', user });
    } catch (error) {
        console.error('Error while processing payment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {
    edit_profile,
    change_password,
    forgot_password,
    qr_payment
};

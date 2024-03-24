const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const statusCode = require('../../constants/status')


const edit_profile = async (req, res) => {
    try {
        const { user_id, firstName, lastName, country, address, city, state, postal_code, phone } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" })
        }

        user.set({
            firstName: firstName,
            lastName: lastName,
            country: country,
            address: address,
            city: city,
            state: state,
            postal_code: postal_code,
            phone: phone,
        });

        await user.save()

        console.log(user)

        return res.status(statusCode.HTTP_202_ACCEPTED).json({data: user})
    } catch (error) {
        console.error('Edit profile error:', error);
    }
}


const change_password = async(req, res) => {
    try {
        const { user_id, old_password, new_password } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" })
        }

        bcrypt.compare(old_password, user.password, function(err, result) {
            if (result) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(new_password, salt, async function(err, hashedPassword) {
                        user.password = hashedPassword;
                        user.save()
                        user.password = null;
                        return res.status(statusCode.HTTP_202_ACCEPTED).json(user)
                    });
                });
            }
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json({ message: "Sai mật khẩu" });
        });
    } catch (error) {
        console.error('Change password error:', error);
    }
}


module.exports = {
    edit_profile,
    change_password,
};

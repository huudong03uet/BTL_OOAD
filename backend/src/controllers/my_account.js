const statusCode = require('../../constants/status')
const logger = require("../../conf/logger")

const User = require('../models/user');

const { hash_password, compare_password } = require('./util/password')
const send_email = require('./util/send_email')


const edit_profile = async (req, res) => {
    try {
        const { user_id, firstName, lastName, country, address, city, state, postal_code, phone } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
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

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [user:${user.id}]`)
        return res.status(statusCode.HTTP_202_ACCEPTED).json( user )
    } catch (error) {
        logger.error(`Edit profile error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


const change_password = async(req, res) => {
    try {
        const { user_id, old_password, new_password } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" })
        }

        let res_cmp_pass = await compare_password(old_password, user.password)

        if (!res_cmp_pass) {
            logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json({ message: "Sai mật khẩu" });
        }

        let { success, hashedPassword } = await hash_password(new_password);
        if (!success) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({message: "Lỗi"})
        }
        user.password = hashedPassword;
        await user.save();
        user.password = null;

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [user:${user.id}]`)
        return res.status(statusCode.HTTP_202_ACCEPTED).json(user)
    } catch (error) {
        logger.error(`Change password error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let forgot_password = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" })
        }

        let { success, hashedPassword } = await hash_password("Abcd1234@");
        if (!success) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({message: "Lỗi"})
        }
        user.password = hashedPassword;
        await user.save();
        logger.info(`${statusCode.HTTP_205_RESET_CONTENT} [user:${user.id}]`)

        await send_email(
            'ntdat12a03@gmail.com',
            user.email,
            `password = Abc123456@`,
            "QUEN MAT KHAU",
        )

        return res.status(statusCode.HTTP_205_RESET_CONTENT);
    } catch (error) {
        logger.error(`Forgot password error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    edit_profile,
    change_password,
    forgot_password,
};

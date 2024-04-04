const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")
const send_email = require('../../../conf/email');

const User = require('../../models/user');

const { hash_password, compare_password, random_password, find_or_create_location, check_required_field } = require('../util')


const edit_profile = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user_id, first_name, last_name, phone } = req.body.user;
        const { country, address, city, state, postal_code } = req.body.location;

        if (!check_required_field(req.body, ["user", "location"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        if (!check_required_field(req.body.user, ["user_id", "first_name", "last_name"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        let location = await find_or_create_location(country, address, city, state, postal_code, t)

        user.set(
            {
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                location_id: location.id
            },
            { transaction: t }
        );

        await user.save({ transaction: t })

        await t.commit();

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [user:${user.id}]`)
        return res.status(statusCode.HTTP_202_ACCEPTED).json( user )
    } catch (error) {
        await t.rollback();
        logger.error(`Edit profile error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


const change_password = async(req, res) => {
    try {
        const { user_id, old_password, new_password } = req.body;

        if (!check_required_field(req.body, ["user_id", "old_password", "new_password"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        let res_cmp_pass = await compare_password(old_password, user.password)

        if (!res_cmp_pass) {
            logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Sai mật khẩu");
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
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        const new_password = random_password();
        let { success, hashedPassword } = await hash_password(new_password);
        if (!success) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Lỗi")
        }
        user.password = hashedPassword;
        await user.save();
        logger.info(`${statusCode.HTTP_205_RESET_CONTENT} [user:${user.id}]`)

        await send_email(
            'ntdat12a03@gmail.com',
            user.email,
            `password = ${new_password}`,
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

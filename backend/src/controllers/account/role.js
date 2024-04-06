const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")
const send_email = require('../../../conf/email');

const User = require('../../models/user');

const { hash_password, compare_password, random_password, find_or_create_location, check_required_field } = require('../util')


const role_edit_profile = async (req, res, Model) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, [`${Model.name.toLowerCase()}`, "location"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        if (!check_required_field(req.body[`${Model.name.toLowerCase()}`], [`${Model.name.toLowerCase()}_id`, "first_name", "last_name"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone = req.body.phone;
        const role_id = req.body[`${Model.name.toLowerCase()}_id`]
        const { country, address, city, state, postal_code } = req.body.location;

        const role = await Model.findByPk(role_id);

        if (!role) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        let location = await find_or_create_location(country, address, city, state, postal_code, t)

        role.set(
            {
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                location_id: location.id
            },
            { transaction: t }
        );

        await role.save({ transaction: t })

        await t.commit();

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [${Model.name.toLowerCase()}:${role.id}]`)
        return res.status(statusCode.HTTP_202_ACCEPTED).json( role )
    } catch (error) {
        await t.rollback();
        logger.error(`Edit profile error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


const role_change_password = async(req, res, Model) => {
    try {
        if (!check_required_field(req.body, [`${Model.name.toLowerCase()}_id`, "old_password", "new_password"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const role_id = req.body[`${Model.name.toLowerCase()}_id`]
        const old_password = req.body.old_password
        const new_password = req.body.new_password

        const role = await Model.findByPk(role_id);

        if (!role) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        let res_cmp_pass = await compare_password(old_password, role.password)

        if (!res_cmp_pass) {
            logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Sai mật khẩu");
        }

        let { success, hashedPassword } = await hash_password(new_password);
        if (!success) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({message: "Lỗi"})
        }
        role.password = hashedPassword;
        await role.save();
        role.password = null;

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [${Model.name.toLowerCase()}:${role.id}]`)
        return res.status(statusCode.HTTP_202_ACCEPTED).json(role)
    } catch (error) {
        logger.error(`Change password error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let role_forgot_password = async (req, res, Model) => {
    try {
        if (!check_required_field(req.body, ["email"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const role = await Model.findOne({
            where: { email: email },
        });

        if (!role) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
        }

        const new_password = random_password();
        let { success, hashedPassword } = await hash_password(new_password);
        if (!success) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Lỗi")
        }
        role.password = hashedPassword;
        await role.save();
        logger.info(`${statusCode.HTTP_205_RESET_CONTENT} [${Model.name.toLowerCase()}:${role.id}]`)

        await send_email(
            'ntdat12a03@gmail.com',
            role.email,
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
    role_edit_profile,
    role_change_password,
    role_forgot_password,
};

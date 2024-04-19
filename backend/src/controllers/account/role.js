const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")
const send_email = require('../../../conf/email');

const User = require('../../models/user');

const { hash_password, compare_password, random_password, find_or_create_location, check_required_field, upload_image, delete_image } = require('../util')


// const role_edit_profile = async (req, res, Model) => {
//     const t = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, [`${Model.name.toLowerCase()}`, "location"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         if (!check_required_field(req.body[Model.name.toLowerCase()], [`id`, "first_name", "last_name", "email"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let imageToDelete = null;

//         if (Model.name.toLowerCase() != "seller") {
//             const file = req.file;

//             if (file) {
//                 const result = await upload_image(file.path.replace(/\\/g, '/'), `${Model.name.toLowerCase()}_avatar`);
//                 imageToDelete = result.url;
//             }
//         }

//         let role_data = {}

//         if (Model.name.toLowerCase() == "seller") {
//             role_data = {
//                 "phone": req.body[Model.name.toLowerCase()].phone,
//                 "email": req.body[Model.name.toLowerCase()].email,
//                 "name": req.body[Model.name.toLowerCase()].name,
//             }
//         } else {
//             role_data = {
//                 "phone": req.body[Model.name.toLowerCase()].phone,
//                 "email": req.body[Model.name.toLowerCase()].email,
//                 "last_name": req.body[Model.name.toLowerCase()].last_name,
//                 "first_name": req.body[Model.name.toLowerCase()].first_name,
//                 "avatar_path": imageToDelete || "https://via.placeholder.com/150",
//             }
//         }
//         const role_id = req.body[Model.name.toLowerCase()].id
//         const { country, address, city, state, postal_code } = req.body.location;

//         const role = await Model.findByPk(role_id);

//         if (!role) {
//             logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
//         }

//         let location = await find_or_create_location(country, address, city, state, postal_code, t)

//         role.set(
//             {
//                 ...role_data,
//                 location_id: location.id
//             },
//             { transaction: t }
//         );

//         await role.save({ transaction: t })

//         await t.commit();

//         logger.info(`${statusCode.HTTP_202_ACCEPTED} [${Model.name.toLowerCase()}:${role.id}]`)
//         return res.status(statusCode.HTTP_202_ACCEPTED).json( role )
//     } catch (error) {
//         await t.rollback();
//         try {
//             await delete_image(imageToDelete.split('/').slice(-2).join('/'));
//         } catch (deleteError) {
//             logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
//         }
//         logger.error(`Edit profile error: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// const role_change_password = async(req, res, Model) => {
//     try {
//         if (!check_required_field(req.body, [`${Model.name.toLowerCase()}_id`, "old_password", "new_password"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const role_id = req.body[`${Model.name.toLowerCase()}_id`]
//         const old_password = req.body.old_password
//         const new_password = req.body.new_password

//         const role = await Model.findByPk(role_id);

//         if (!role) {
//             logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
//         }

//         let res_cmp_pass = await compare_password(old_password, role.password)

//         if (!res_cmp_pass) {
//             logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
//             return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Sai mật khẩu");
//         }

//         let { success, hashedPassword } = await hash_password(new_password);
//         if (!success) {
//             return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({message: "Lỗi"})
//         }
//         role.password = hashedPassword;
//         await role.save();
//         role.password = null;

//         logger.info(`${statusCode.HTTP_202_ACCEPTED} [${Model.name.toLowerCase()}:${role.id}]`)
//         return res.status(statusCode.HTTP_202_ACCEPTED).json(role)
//     } catch (error) {
//         logger.error(`Change password error: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let role_forgot_password = async (req, res, Model) => {
//     try {
//         if (!check_required_field(req.body, ["email"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const role = await Model.findOne({
//             where: { email: email },
//         });

//         if (!role) {
//             logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
//         }

//         const new_password = random_password();
//         let { success, hashedPassword } = await hash_password(new_password);
//         if (!success) {
//             return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Lỗi")
//         }
//         role.password = hashedPassword;
//         await role.save();
//         logger.info(`${statusCode.HTTP_205_RESET_CONTENT} [${Model.name.toLowerCase()}:${role.id}]`)

//         await send_email(
//             'ntdat12a03@gmail.com',
//             role.email,
//             `password = ${new_password}`,
//             "QUEN MAT KHAU",
//         )

//         return res.status(statusCode.HTTP_205_RESET_CONTENT);
//     } catch (error) {
//         logger.error(`Forgot password error: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


class ProfileService {
    constructor(model) {
        this.model = model
        this.imageToDelete = null;
    }

    get_role_data(dict) {
        throw new Error('Abstract method get_role_data must be implemented by subclass');
    }

    edit_profile = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            if (!check_required_field(req.body, [`${this.model.name.toLowerCase()}`, "location"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            if (this.model.name.toLowerCase() != "seller") {
                if (!check_required_field(req.body[this.model.name.toLowerCase()], [`id`, "first_name", "last_name", "email"])) {
                    logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                    return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
                }
            } else {
                if (!check_required_field(req.body[this.model.name.toLowerCase()], [`id`, "name", "email"])) {
                    logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                    return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
                }
            }
    
            // let imageToDelete = null;
    
            if (this.model.name.toLowerCase() != "seller") {
                const file = req.file;
    
                if (file) {
                    const result = await upload_image(file.path.replace(/\\/g, '/'), `${this.model.name.toLowerCase()}_avatar`);
                    this.imageToDelete = result.url;
                }
            }
    
            let role_data = this.get_role_data(req.body)
    
            // if (this.model.name.toLowerCase() == "seller") {
            //     role_data = {
            //         "phone": req.body[this.model.name.toLowerCase()].phone,
            //         "email": req.body[this.model.name.toLowerCase()].email,
            //         "name": req.body[this.model.name.toLowerCase()].name,
            //     }
            // } else {
            //     role_data = {
            //         "phone": req.body[this.model.name.toLowerCase()].phone,
            //         "email": req.body[this.model.name.toLowerCase()].email,
            //         "last_name": req.body[this.model.name.toLowerCase()].last_name,
            //         "first_name": req.body[this.model.name.toLowerCase()].first_name,
            //         "avatar_path": imageToDelete || "https://via.placeholder.com/150",
            //     }
            // }
            const role_id = req.body[this.model.name.toLowerCase()].id
            const { country, address, city, state, postal_code } = req.body.location;
    
            const role = await this.model.findByPk(role_id);
    
            if (!role) {
                logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng")
            }
    
            let location = await find_or_create_location(country, address, city, state, postal_code, t)
    
            role.set(
                {
                    ...role_data,
                    location_id: location.id
                },
                { transaction: t }
            );
    
            await role.save({ transaction: t })
    
            await t.commit();
    
            logger.info(`${statusCode.HTTP_202_ACCEPTED} [${this.model.name.toLowerCase()}:${role.id}]`)
            return res.status(statusCode.HTTP_202_ACCEPTED).json( role )
        } catch (error) {
            await t.rollback();
            try {
                await delete_image(this.imageToDelete.split('/').slice(-2).join('/'));
            } catch (deleteError) {
                logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
            }
            logger.error(`Edit profile error: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    change_password = async(req, res) => {
        try {
            if (!check_required_field(req.body, [`${this.model.name.toLowerCase()}_id`, "old_password", "new_password"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const role_id = req.body[`${this.model.name.toLowerCase()}_id`]
            const old_password = req.body.old_password
            const new_password = req.body.new_password
    
            const role = await this.model.findByPk(role_id);
    
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

    forgot_password = async (req, res) => {
        try {
            if (!check_required_field(req.body, ["email"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const role = await this.model.findOne({
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
            logger.info(`${statusCode.HTTP_205_RESET_CONTENT} [${this.model.name.toLowerCase()}:${role.id}]`)
    
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
}

module.exports = ProfileService;


// module.exports = {
//     role_edit_profile,
//     role_change_password,
//     role_forgot_password,
// };

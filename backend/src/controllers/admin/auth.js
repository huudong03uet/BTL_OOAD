const { Op } = require('sequelize');

const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const Admin = require('../../models/admin');

const { hash_password, compare_password, check_required_field } = require('../util');


let login = async (req, res) => {
    try {
        const { admin_name, password } = req.body;

        if (!check_required_field(req.body, ["admin_name", "password"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const admin = await Admin.findOne({ 
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [{ email: admin_name }],
                    },
                    {
                        [Op.and]: [{ admin_name: admin_name }],
                    },
                ],
            },
        });

        if (!admin) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng");
        }
        
        let result = await compare_password(password, admin.password)

        if (result) {
            logger.info(`${statusCode.HTTP_200_OK} [admin:${admin.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(admin);
        }

        logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
        return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Sai mật khẩu");
    } catch (error) {
        logger.error(`Login: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
};


let sign_up = async (req, res) => {
    try {
        const { first_name, last_name, admin_name, email, password } = req.body;

        if (!check_required_field(req.body, ["first_name", "last_name", "admin_name", "email", "password"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const existingAdminByEmail = await Admin.findOne({
            where: { email: email },
        });

        const existingAdminByAdminName = await Admin.findOne({
            where: { Admin_name: admin_name },
        });

        if (existingAdminByEmail) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Email already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Email already exists in the system.');
        }

        if (existingAdminByAdminName) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Adminname already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Adminname already exists in the system.');
        }

        let { success, hashedPassword } = await hash_password(password);

        if (success) {
            const newAdmin = await Admin.create({
                admin_name: admin_name,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
            });
            newAdmin.password = undefined;
    
            logger.info(`${statusCode.HTTP_201_CREATED} [Admin:${newAdmin.id}]`)
            return res.status(statusCode.HTTP_201_CREATED).json(newAdmin);
        }

        logger.error(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [Admin]`)
        return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Lỗi tạo Admin.");
    } catch (error) {
        logger.error(`Sign up: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
};


module.exports = {
    login,
    sign_up,
};
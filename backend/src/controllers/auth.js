const { Op } = require('sequelize');

const User = require('../models/user');
const statusCode = require('../../constants/status')
const logger = require("../../conf/logger")

const { hash_password, compare_password } = require('./util/password');
const Location = require('../models/location');


let login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [{ email: user_name }],
                    },
                    {
                        [Op.and]: [{ user_name: user_name }],
                    },
                ],
            },
        });

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy người dùng");
        }
        
        let result = await compare_password(password, user.password)

        if (result) {
            logger.info(`${statusCode.HTTP_200_OK} [user:${user.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(user);
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
        const { first_name, last_name, user_name, email, password } = req.body;

        const existingUserByEmail = await User.findOne({
            where: { email: email },
        });

        const existingUserByUsername = await User.findOne({
            where: { user_name: user_name },
        });

        if (existingUserByEmail) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Email already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Email already exists in the system.');
        }

        if (existingUserByUsername) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Username already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Username already exists in the system.');
        }

        let { success, hashedPassword } = await hash_password(password);

        if (success) {
            const newUser = await User.create({
                user_name: user_name,
                first_name: first_name,
                lastName: last_name,
                email: email,
                password: hashedPassword,
            });
            newUser.password = undefined;
    
            logger.info(`${statusCode.HTTP_201_CREATED} [user:${newUser.id}]`)
            return res.status(statusCode.HTTP_201_CREATED).json(newUser);
        }

        logger.error(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [user]`)
        return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Lỗi tạo user.");
    } catch (error) {
        logger.error(`Sign up: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
};


module.exports = {
    login,
    sign_up,
};

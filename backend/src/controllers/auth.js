const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/user');
const statusCode = require('../../constants/status')
const logger = require("../../conf/logger")


let login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [{ email: username }],
                    },
                    {
                        [Op.and]: [{ username: username }],
                    },
                ],
            },
        });

        if (!user) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            user.password = null
            if (result) {
                logger.info(`${statusCode.HTTP_200_OK} [user:${user.id}]`)
                return res.status(statusCode.HTTP_200_OK).json(user);
            }

            logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Sai mật khẩu`);
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json({ message: "Sai mật khẩu" });
        });
    } catch (error) {
        logger.error(`Login: ${error}`)
    }
};


let sign_up = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const existingUserByEmail = await User.findOne({
            where: { email: email },
        });

        const existingUserByUsername = await User.findOne({
            where: { username: username },
        });

        if (existingUserByEmail) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Email already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({
                error: 'Email already exists in the system.',
            });
        }

        if (existingUserByUsername) {
            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Username already exists in the system.`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({
                error: 'Username already exists in the system.',
            });
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hashedPassword) {
                const newUser = await User.create({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                });
                newUser.password = undefined;
        
                logger.info(`${statusCode.HTTP_201_CREATED} [user:${newUser.id}]`)
                return res.status(statusCode.HTTP_201_CREATED).json(newUser);
            });
        });
    } catch (error) {
        logger.error(`Sign up: ${error}`)
    }
};


module.exports = {
    login,
    sign_up,
};

const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/user');
const statusCode = require('../../constants/status')


const router = express.Router();


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
            return res.status(statusCode.HTTP_404_NOT_FOUND).json({ message: "Không tìm thấy người dùng" });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            user.password = null
            if (result) {
                return res.status(statusCode.HTTP_200_OK).json({ data: user });
            }
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json({ message: "Sai mật khẩu" });
        });

        
    } catch (error) {
        console.error('Login error:', error);
    }
};


let sign_up = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        console.log(req.body)

        const existingUserByEmail = await User.findOne({
            where: { email: email },
        });

        const existingUserByUsername = await User.findOne({
            where: { username: username },
        });

        if (existingUserByEmail) {
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json({
                error: 'Email already exists in the system.',
            });
        }

        if (existingUserByUsername) {
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
        
                return res.status(statusCode.HTTP_201_CREATED).json({ data: newUser });
            });
        });
        
    } catch (error) {
        console.error('Signup error:', error);
    }
};


module.exports = {
    login,
    sign_up,
};

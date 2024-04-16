const { Sequelize, Op } = require('sequelize');

const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const Message = require('../../models/message');

const { check_required_field } = require("../util");
const User = require('../../models/user');


let get_message = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id", "user_2_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let {user_id, user_2_id} = req.params;

        let messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { user_id: user_id, user_2_id: user_2_id },   
                    { user_id: user_2_id, user_2_id: user_id }  
                ]
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });

        let result = []
        for(let mess of messages) {
            let out = {}
            out["position"] = mess.dataValues.user_id == user_id? "right": "left"
            out['type'] = "text"
            out["text"] = mess.dataValues.content
            out["date"] = mess.dataValues.createdAt
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} review length ${result.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);

    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_user_message = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let user_id = req.params.user_id;

        let temp_1 = await Message.findAll({
            where: {
                user_id: user_id,
            },
            attributes: [
                'user_2_id',
                'content',
                [Sequelize.fn('MAX', Sequelize.col('Message.createdAt')), 'createdAt'],
                [Sequelize.literal('(SELECT user_name FROM User WHERE User.id = Message.user_2_id)'), 'user_name'],
                [Sequelize.literal('(SELECT first_name FROM User WHERE User.id = Message.user_2_id)'), 'first_name'],
                [Sequelize.literal('(SELECT last_name FROM User WHERE User.id = Message.user_2_id)'), 'last_name'],
                [Sequelize.literal('(SELECT avatar_path FROM User WHERE User.id = Message.user_2_id)'), 'avatar_path']
            ],
            group: ['user_2_id'],
            order: [
                [Sequelize.literal('Message.createdAt DESC')]
            ]
        });

        let temp_2 = await Message.findAll({
            where: {
                user_2_id: user_id,
            },
            attributes: [
                'user_id',
                'content',
                [Sequelize.fn('MAX', Sequelize.col('Message.createdAt')), 'createdAt'],
                [Sequelize.literal('(SELECT user_name FROM User WHERE User.id = Message.user_id)'), 'user_name'],
                [Sequelize.literal('(SELECT first_name FROM User WHERE User.id = Message.user_id)'), 'first_name'],
                [Sequelize.literal('(SELECT last_name FROM User WHERE User.id = Message.user_id)'), 'last_name'],
                [Sequelize.literal('(SELECT avatar_path FROM User WHERE User.id = Message.user_id)'), 'avatar_path']
            ],
            group: ['user_id'],
            order: [
                [Sequelize.literal('Message.createdAt DESC')]
            ]
        });

        let temp1Map = {};
        temp_1.forEach(item => {
            temp1Map[item.user_2_id] = item;
        });

        let uniqueTemp2 = [];

        temp_2.forEach(item2 => {
            if (!temp1Map[item2.user_id]) {
                uniqueTemp2.push(item2);
            } else {
                let temp1Item = temp1Map[item2.user_id];
                let date1 = new Date(temp1Item.createdAt);
                let date2 = new Date(item2.createdAt);
                if (date2 > date1) {
                    uniqueTemp2.push(item2);
                    delete temp1Map[item2.user_id];
                }
            }
        });
        for (let key in temp1Map) {
            uniqueTemp2.push(temp1Map[key]);
        }

        let mergedResults = [...uniqueTemp2];
        mergedResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let result = []
        for(let user of mergedResults) {
            let out = {}
            out["id"] = user.dataValues.user_id? user.dataValues.user_id: user.dataValues.user_2_id
            out["avatar"] = user.dataValues.avatar_path
            out["alt"] = user.dataValues.user_name
            out['title'] = user.dataValues.first_name + ' ' + user.dataValues.last_name
            out["subtitle"] = user.dataValues.content
            out["date"] = user.dataValues.createdAt
            result.push(out)
        }

        // logger.info(`${statusCode.HTTP_200_OK} review length ${temp.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let send_message = async (req, res) => {
    try {
        if (!check_required_field(req.body, ["user_id", "user_2_id", "content"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await Message.create(req.body)

        logger.info(`${statusCode.HTTP_200_OK} DONE`)
        return res.status(statusCode.HTTP_200_OK).json("DONE");

    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_message,
    get_user_message,
    send_message
};

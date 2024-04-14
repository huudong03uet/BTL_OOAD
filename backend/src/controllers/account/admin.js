const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const statusCode = require('../../../constants/status');
const User = require('../../models/user');
const Seller = require('../../models/seller');


let user_manager = async (req, res) => {
    try {
        let users = await User.findAll()

        logger.info(`${statusCode.HTTP_200_OK} user length ${users.length}`)
        return res.status(statusCode.HTTP_200_OK).json(users);
    } catch (error) {
        logger.error(`Auction get history: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let seller_manager = async (req, res) => {
    try {
        let sellers = await Seller.findAll()

        logger.info(`${statusCode.HTTP_200_OK} sellers length ${sellers.length}`)
        return res.status(statusCode.HTTP_200_OK).json(sellers);
    } catch (error) {
        logger.error(`Auction get history: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = { 
    user_manager,
    seller_manager
}


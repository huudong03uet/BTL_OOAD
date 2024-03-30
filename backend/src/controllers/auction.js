const logger = require('../../conf/logger');
const sequelize = require('../../conf/sequelize');
const statusCode = require('../../constants/status');
const AuctionRoom = require('../models/auction_room');


let create_auction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        console.log(req.body)
        const { user_id, name, condition_coin, location_id, description, status, time_auction } = req.body;

        const auctionData = {
            name: name,
            status: status,
            condition_coin: condition_coin,
            description: description,
            location_id: location_id,
            time_auction: time_auction
        };

        Object.keys(auctionData).forEach(key => auctionData[key] === undefined && delete auctionData[key]);

        const newAuction = await AuctionRoom.create(auctionData, { transaction: t });

        await newAuction.addUser(user_id, { transaction: t });

        await t.commit();

        return res.status(statusCode.HTTP_200_OK).json(newAuction)
    } catch (error) {
        await t.rollback();
        logger.error(`Auction create: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = { create_auction }

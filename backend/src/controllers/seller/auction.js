const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionRequestStatus = require('../../../constants/auction_request_status');
const statusCode = require('../../../constants/status');
const Auction = require('../../models/auction');
const AuctionRequest = require('../../models/auction_request');
const Product = require('../../models/product');
const User = require('../../models/user');
const { check_required_field } = require('../util');


let create_auction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user_id, name, condition_coin, location_id, description, status, time_auction } = req.body;

        if (!check_required_field(req.body, ["user_id", "name", "condition_coin", "location_id", "description", "status", "time_auction"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const auctionData = {
            name: name,
            status: status,
            condition_coin: condition_coin,
            description: description,
            location_id: location_id,
            time_auction: time_auction
        };

        Object.keys(auctionData).forEach(key => auctionData[key] === undefined && delete auctionData[key]);

        const newAuction = await Auction.create(auctionData, { transaction: t });

        await newAuction.addUser(user_id, { transaction: t });

        await AuctionRequest.create({
            status: AuctionRequestStatus.NOT_YET,
            description: description,
            user_id: user_id,
            auction_id: newAuction.id,
        }, { transaction: t })

        await t.commit();

        logger.info(`${statusCode.HTTP_200_OK} [auction:${newAuction.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(newAuction)
    } catch (error) {
        await t.rollback();
        logger.error(`Auction create: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let add_user = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { auction_id, user_id } = req.body;

        if (!check_required_field(req.body, ["auction_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const auction = Auction.findByPk(auction_id);
        const user = User.findByPk(user_id);

        if (!auction || !user) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} [user:${user_id}] [auction:${auction_id}]`)
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or User not found");
        }

        await auction.addUser(user, { transaction: transaction });

        await transaction.commit();

        logger.info(`${statusCode.HTTP_200_OK} [user:${user_id}] [auction:${auction_id}]`)
        return res.status(statusCode.HTTP_200_OK).json("User added to auction successfully");
    } catch (error) {
        await transaction.rollback();
        logger.error(`Auction add user: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let add_product = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { auction_id, product_id } = req.body;

        if (!check_required_field(req.body, ["auction_id", "product_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const auction = Auction.findByPk(auction_id);
        const product = Product.findByPk(product_id);

        if (!auction || !product) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} [product:${product_id}] [auction:${auction_id}]`)
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or Product not found");
        }

        await auction.addProduct(product, { transaction: transaction });

        await transaction.commit();

        logger.info(`${statusCode.HTTP_200_OK} [product:${product_id}] [auction:${auction_id}]`)
        return res.status(statusCode.HTTP_200_OK).json("Product added to auction successfully");
    } catch (error) {
        await transaction.rollback();
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = { create_auction, add_user, add_product }

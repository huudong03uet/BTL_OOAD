const { Op } = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product')
const Image = require('../../models/image')
const Category = require('../../models/category')
const Seller = require('../../models/seller')
const Inspection = require('../../models/inspection')
const Auction = require('../../models/auction')
const BidHistory = require('../../models/history_bid')
const Winner = require('../../models/winner')


const PRODUCT_INCLUDE = [
    {
        model: Image,
        attributes: ["url", "url"],
    },
    {
        model: BidHistory
    },
    {
        model: Inspection
    },
    {
        model: Category,
        attributes: ["id", 'title']
    },
    {
        model: Seller,
        attributes: ['id', 'name']
    },
    {
        model: Auction,
        attributes: ['id', 'name', 'time_auction']
    },
    {
        model: Winner,
        include: [
            {
                model: BidHistory
            },
        ]
    }
];


let get_product = async (whereCondition, productIncludes = PRODUCT_INCLUDE) => {
    try {
        let products = await Product.findAll({
            where: whereCondition,
            include: productIncludes
        });

        logger.info(`Product length: ${products.length}`)
        return products;
    } catch (error) {
        logger.error(`Get product: ${error}`)
        throw new Error('Request timeout');
    }
}


let get_product_by_pk = async (product_id, whereCondition = {}, productIncludes = PRODUCT_INCLUDE) => {
    try {
        let product = await Product.findByPk(product_id, {
            where: whereCondition,
            include: productIncludes
        });

        logger.info(`[product: ${product_id}]`)
        return product;
    } catch (error) {
        logger.error(`Product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    PRODUCT_INCLUDE,
    get_product,
    get_product_by_pk
}

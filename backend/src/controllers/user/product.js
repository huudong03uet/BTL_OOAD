const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')

// const AuctionProduct = require('../../models/auction_product')
const Product = require('../../models/product')

let get_products = async (req, res) => {
    try {
        // const products = await AuctionProduct.findAll({
        //     where: {
        //         status: [AuctionProductStatus.NOT_YET_SOLD, AuctionProductStatus.ON_SALE]
        //     },
        // });

        // logger.info(`${statusCode.HTTP_200_OK} product length: ${products.length}`)
        // return res.status(statusCode.HTTP_200_OK).json(products);
    } catch (error) {
        logger.error(`Get products error: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {get_products}

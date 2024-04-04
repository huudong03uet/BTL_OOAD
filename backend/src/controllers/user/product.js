const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionRoomProductStatus = require('../../../constants/auction_product_status')

const AuctionRoomProduct = require('../../models/auction_room_product')
const Product = require('../../models/product')

let get_products = async (req, res) => {
    try {
        const products = await AuctionRoomProduct.findAll({
            where: {
                status: [AuctionRoomProductStatus.NOT_YET_SOLD, AuctionRoomProductStatus.ON_SALE]
            },
        });

        logger.info(`${statusCode.HTTP_200_OK} product length: ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(products);
    } catch (error) {
        logger.error(`Get products error: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {get_products}

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product')
const Image = require('../../models/image')

let get_products = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                status: [AuctionProductStatus.NOT_YET_SOLD, AuctionProductStatus.ON_SALE]
            },
            include: {
                model: Image,
                attributes: ["id", 'path', "url"]
            }
        });

        logger.info(`${statusCode.HTTP_200_OK} product length: ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(products);
    } catch (error) {
        logger.error(`Get products error: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {get_products}

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product')
const Image = require('../../models/image')
const Category = require('../../models/category')

let get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        logger.info(`${statusCode.HTTP_200_OK} category length: ${categories.length}`)   
        return res.status(statusCode.HTTP_200_OK).json(categories)
    } catch (error) {
        logger.error(`Get products error: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


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

let get_product_detail = async (req, res) => {
    try {
        const product_id = req.params.product_id;

        const product = await Product.findByPk(product_id, {
            include: {
                model: Image,
                attributes: ['id', 'path']
            }
        });

        if (!product) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy product`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy product");
        }

        logger.info(`${statusCode.HTTP_200_OK} [product:${product.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(product);
    } catch (error) {
        logger.error(`Get product detail: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {get_products, get_categories, get_product_detail}

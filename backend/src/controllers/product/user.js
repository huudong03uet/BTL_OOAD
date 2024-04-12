const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')

const Product = require('../../models/product')
const Image = require('../../models/image')
const Category = require('../../models/category')
const { check_required_field } = require('../util')
const { update_value_redis, get_value_redis, set_value_redis } = require('../util/redis')
const Seller = require('../../models/seller')

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
                status: [AuctionProductStatus.NOT_YET_SOLD, AuctionProductStatus.ON_SALE],
                visibility: AuctionProductVisibilityStatus.PUBLIC
            },
            include: [
                {
                    model: Image,
                    attributes: ["id", 'path', "url"]
                }
            ]
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
        if (!check_required_field(req.params, ["product_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const product_id = req.params.product_id;

        const product = await Product.findByPk(product_id, {
            include: [
                {
                    model: Image,
                    attributes: ['id', 'url']
                },
                {
                    model: Category,
                    attributes: ['id', 'title']
                },
                {
                    model: Seller,
                    attributes: ["name"]
                }
            ]
        });

        if (!product) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy product`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy product");
        }

        let value = {}
        value["id"] = product.dataValues.id
        value["time"] = product.dataValues.createdAt
        value["title"] = product.dataValues.title
        value["max_bid"] = product.dataValues.max_estimate
        value["image_path"] = product.dataValues.images[0].dataValues.url
        value["user_sell"] = product.dataValues.seller.name

        await update_value_redis(`${req.params.user_id}_1`, `${product.id}`)
        await set_value_redis(`${product.id}`, value)

        logger.info(`${statusCode.HTTP_200_OK} [product:${product.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(product);
    } catch (error) {
        logger.error(`Get product detail: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_product_recently = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let result = [];
        for (let i = 1; i <= 3; ++i) {
            let out = await get_value_redis(`${req.params.user_id}_${i}`);
            if (out) {
                let product = await get_value_redis(`${out}`);
                if (product) {
                    result.push(product);
                }
            }
        }
        
        logger.info(`${statusCode.HTTP_200_OK} product recently length ${result.length}`);
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Get product recently: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {get_products, get_categories, get_product_detail, get_product_recently}

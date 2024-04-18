const { Op } = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require("../../../conf/logger")
const statusCode = require('../../../constants/status')
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')

const Category = require('../../models/category')
const Inspection = require('../../models/inspection');
const ProductService = require('./conponent');
const { check_required_field } = require('../util')
const { update_value_redis, get_value_redis, set_value_redis } = require('../util/redis')


class ProductController extends ProductService {
    async get_categories (req, res) {
        try {
            const categories = await Category.findAll();
    
            logger.info(`${statusCode.HTTP_200_OK} category length: ${categories.length}`)   
            return res.status(statusCode.HTTP_200_OK).json(categories)
        } catch (error) {
            logger.error(`Get products error: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    async service_product_detail (req, res) {
        try {
            if (!check_required_field(req.params, ["product_id", "user_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const product = await this.get_product_by_pk(req.params.product_id)
    
            if (!product) {
                logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy product`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy product");
            }
    
            await update_value_redis(`${req.params.user_id}_1`, `${product.id}`)
            await set_value_redis(`${product.id}`, product)
    
            logger.info(`${statusCode.HTTP_200_OK} [product:${product.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(product);
        } catch (error) {
            logger.error(`Get product detail: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    async service_products (req, res) {
        try {
            let where_case = {
                ...this.where_case,
                status: {
                    [Op.ne]: AuctionProductStatus.SOLD
                },
                visibility: AuctionProductVisibilityStatus.PUBLIC
            };
    
            const products = await this.get_product(where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} product length: ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Get products error: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    async service_product_recently (req, res) {
        try {
            if (!check_required_field(req.params, ["user_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            let result = [];
            for (let i = 1; i <= 4; ++i) {
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

    async service_product_accept (req, res) {
        try {
            let where_case = {
                ...this.where_case,
                status: {
                    [Op.ne]: AuctionProductStatus.SOLD
                },
                visibility: AuctionProductVisibilityStatus.PUBLIC
            };

            let include = [
                ...this.include,
                {
                    model: Inspection,
                    required: true
                }
            ];
    
            const products = await this.get_product(where_case, include)
    
            logger.info(`${statusCode.HTTP_200_OK} product accept: ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Get products error: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}


module.exports = new ProductController()
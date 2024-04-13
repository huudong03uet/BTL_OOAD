const Sequelize = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')

const InspectionType = require("../../../constants/inspection")

const Product = require('../../models/product');
const { check_required_field } = require('../util');
const Seller = require('../../models/seller');
const Category = require('../../models/category');
const Image = require('../../models/image');
const Inspection = require('../../models/inspection');


let get_all_product_not_inspect = async (req, res) => {
    try {
        let products = await Product.findAll({
            where: {
                inspect_status: InspectionType.NOT_INSPECT
            },
            include: [
                {
                    model: Seller,
                    attributes: ["name", "id"]
                },
                {
                    model: Category,
                    attributes: ["title", "id"]
                },
                {
                    model: Image,
                    attributes: ["url", "id"]
                }
            ]
        })

        let result = []
        for(let product of products) {
            let out = {}
            out["product_id"] = product.id
            out["title"] = product.title
            out["time_create"] = product.createdAt
            out["status"] = product.status
            out["seller"] = product.seller
            out["estimate_min"] = product.min_estimate
            out["estimate_max"] = product.max_estimate
            out["description"] = product.description
            out["dimensions"] = product.dimension
            out["artist"] = product.artist
            out["category"] = product.categories
            out["condition_report"] = product.condition_report
            out["provenance"] = product.provenance
            out["images"] = product.images
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let product_inspect = async(req, res) => {
    try {
        if (!check_required_field(req.body, ["seller_id", "description", "product_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await Inspection.create(req.body);

        logger.info(`${statusCode.HTTP_201_CREATED} product inspect done`)
        return res.status(statusCode.HTTP_201_CREATED).json("Done");
    } catch (error) {
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_all_product_not_inspect,
    product_inspect
};


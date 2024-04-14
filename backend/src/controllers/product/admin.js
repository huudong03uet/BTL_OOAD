const Sequelize = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')

const InspectionType = require("../../../constants/inspection")

const Product = require('../../models/product');
const { check_required_field, delete_image, upload_image } = require('../util');
const Seller = require('../../models/seller');
const Category = require('../../models/category');
const Image = require('../../models/image');
const Inspection = require('../../models/inspection');
const status = require('../../../constants/status');


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
        for (let product of products) {
            let out = {}
            out["product_id"] = product.id
            out["title"] = product.title
            out["time_create"] = product.createdAt
            out["status"] = "pendding"
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


let product_inspect = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["admin_id", "description", "product_id", "status"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { admin_id, product_id } = req.body;

        const existingInspection = await Inspection.findOne({
            where: { admin_id: admin_id, product_id: product_id }
        });

        if (existingInspection) {
            await Inspection.update(inspectionData, {
                where: { admin_id: admin_id, product_id: product_id },
                transaction: t
            });
        } else {
            await Inspection.create(req.body, { transaction: t });
        }

        if (req.body.status == 'Accept') {
            await Product.update({
                inspect_status: InspectionType.INSPECTED
            }, {
                where: {
                    id: req.body.product_id
                },
                transaction: t
            });
        } else if (req.body.status == 'Reject') {
            await Product.update({
                inspect_status: InspectionType.DENIED
            }, {
                where: {
                    id: req.body.product_id
                },
                transaction: t
            });
        }

        await t.commit();

        logger.info(`${statusCode.HTTP_201_CREATED} product inspect done`)
        return res.status(statusCode.HTTP_201_CREATED).json("Done");
    } catch (error) {
        await t.rollback();
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_all_product = async(req, res) => {
    try {
        let products = await Product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ["url", "id"]
                },
            ]
        })

        logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(products);
    } catch (error) {
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let add_category = async (req, res) => {
    const t = await sequelize.transaction();
    let imageToDelete = "";
    try {
        if (!check_required_field(req.body, ["title"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const file = req.file;

        if (file) {
            const result = await upload_image(file.path.replace(/\\/g, '/'), "category");
            imageToDelete = result.url;
        } else {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await Category.findOrCreate({
            where: { title: req.body.title, image_path: imageToDelete },
            transaction: t
        });

        await t.commit();

        logger.info(`${statusCode.HTTP_201_CREATED} create category done`)
        res.status(statusCode.HTTP_201_CREATED).json("done")
    } catch (error) {
        logger.error(`Add product: ${error}`)
        await t.rollback();
        try {
            await delete_image(imageToDelete.split('/').slice(-2).join('/'));
        } catch (deleteError) {
            logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
        }
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_all_product_not_inspect,
    product_inspect,
    get_all_product,
    add_category,
};


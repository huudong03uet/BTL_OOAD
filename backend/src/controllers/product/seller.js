const Sequelize = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')
const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product');
const Image = require('../../models/image')
const Category = require('../../models/category');
const Seller = require('../../models/seller');
const Winner = require('../../models/winner');
const BidHistory = require('../../models/history_bid');

const { upload_image, delete_image, check_required_field } = require('../util');
const { convert_result_item_summary } = require('../util/convert');
const { delete_key_redis } = require('../util/redis');


let add_product = async (req, res) => {
    const t = await sequelize.transaction();
    let imagesToDelete = [];
    try {
        if (!check_required_field(req.body, ["seller_id", "title", "description", "artist", "category_name"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { seller_id, title, description, artist, category_name, dimension, min_estimate, max_estimate, startBid, provenance } = req.body;
        
        const images = await Promise.all(req.files.map(async file => {
            const result = await upload_image(file.path.replace(/\\/g, '/'), "product");
            imagesToDelete.push(result.url);
            return {
                url: result.url,
                path: file.path.replace(/\\/g, '/')
            }
        }));

        const [category, created] = await Category.findOrCreate({
            where: { title: category_name },
            transaction: t
        });

        const seller = await Seller.findByPk(seller_id)

        const productData = {
            title,
            description,
            seller_id: seller.id,
            artist,
            dimension,
            min_estimate,
            max_estimate,
            startBid,
            provenance
        };

        Object.keys(productData).forEach(key => productData[key] === undefined && delete productData[key]);

        const product = await Product.create( productData , { transaction: t })

        await product.addCategory(category, { transaction: t })

        await Image.bulkCreate(images.map(image => ({
            url: image.url,
            path: image.path,
            product_id: product.id
        })), { transaction: t });

        await t.commit();

        logger.info(`${statusCode.HTTP_201_CREATED} [product:${product.id}]`)
        res.status(statusCode.HTTP_201_CREATED).json(product)
    } catch (error) {
        logger.error(`Add product: ${error}`)
        await t.rollback();
        for (const url of imagesToDelete) {
            try {
                await delete_image(url.split('/').slice(-2).join('/'));
            } catch (deleteError) {
                logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
            }
        }
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let update_product = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["seller_id", "id", "title", "description", "artist", "category_name"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { id, title, description, artist, category_name, dimension, min_estimate, max_estimate, provenance } = req.body;
        
        const product = await Product.findByPk(id,{
            where: {
                seller_id: req.body.seller_id
            }
        });

        if (!product) {
            logger.error(`${statusCode.HTTP_403_FORBIDDEN} Product not appect.`);
            return res.status(statusCode.HTTP_403_FORBIDDEN).json("Product not appect.");
        }

        product.title = title;
        product.description = description;
        product.artist = artist;

        if (dimension !== undefined) product.dimension = dimension;
        if (min_estimate !== undefined) product.min_estimate = min_estimate;
        if (max_estimate !== undefined) product.max_estimate = max_estimate;
        if (provenance !== undefined) product.provenance = provenance;

        if (category_name !== undefined) {
            const [category, created] = await Category.findOrCreate({
                where: { title: category_name },
                transaction: t
            });
            await product.setCategories([category], { transaction: t });
        }

        await product.save({ transaction: t });
        await t.commit();

        await delete_key_redis(`${product.id}`)

        logger.info(`${statusCode.HTTP_200_OK} [Product: ${id}]`)
        res.status(statusCode.HTTP_200_OK).json(product);
    } catch (error) {
        logger.error(`Update product: ${error}`);
        await t.rollback();
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let _get_product_by_status = async (seller_id, status) => {
    try {
        let require = false;
        if (status.length == 1 && status[0] == AuctionProductStatus.SOLD) {
            require = true;
        }

        let products = await Product.findAll({
            where: {
                status: status,
                seller_id: seller_id
            },
            include: [
                {
                    model: Seller,
                    attributes: ["name"]
                },
                {
                    model: Image,
                    attributes: ["url"],
                    limit: 1,
                },
                {
                    model: Winner,
                    include: [
                        {
                            model: BidHistory,
                            attributes: ["amount"],
                        }
                    ],
                    required: require,
                }
            ]
        })

        return products
    } catch (error) {
        throw error
    }
}

let get_product_sold = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let products = await _get_product_by_status(req.params.seller_id, [AuctionProductStatus.SOLD])

        let result = []

        for (let product of products) {
            let out = {}
            out["image_path"] = product.images[0].dataValues.url
            out["title"] = product.dataValues.title
            out["user_sell"] = product.dataValues.seller.dataValues.name
            out["id"] = product.dataValues.id
            out["price"] = product.winner.dataValues.bid_history.dataValues.amount
            out["time"] = product.dataValues.createdAt
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} products sold length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_products = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let products = await _get_product_by_status(req.params.seller_id, [AuctionProductStatus.SOLD, AuctionProductStatus.NOT_YET_SOLD, AuctionProductStatus.ON_SALE])

        let reesult = convert_result_item_summary(products)

        logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(reesult);
    } catch (error) {
        logger.error(`Get product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_product_history = async(req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let products = await _get_product_by_status(req.params.seller_id, [AuctionProductStatus.SOLD])

        let result = convert_result_item_summary(products)

        logger.info(`${statusCode.HTTP_200_OK} products history length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Sold product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    add_product,
    get_product_sold,
    update_product,
    get_products,
    get_product_history
};

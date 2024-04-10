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


let add_product = async (req, res) => {
    const t = await sequelize.transaction();
    let imagesToDelete = [];
    try {
        if (!check_required_field(req.body, ["user_id", "title", "description", "artist", "category_name"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { user_id, title, description, artist, category_name } = req.body;
        
        const images = await Promise.all(req.files.map(async file => {
            const result = await upload_image(file.path.replace(/\\/g, '/'), "product");
            imagesToDelete.push(result.url);
            return {
                url: result.url,
                path: file.path.replace(/\\/g, '/')
            }
        }));

        const [category, created] = await Category.findOrCreate({
            where: { name: category_name },
            transaction: t
        });

        const seller = await Seller.findOne({where: {user_id: user_id}})

        const product = await Product.create({
            title,
            description,
            seller_id: seller.id,
            artist,
        }, { transaction: t })

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

let get_product_sold = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { user_id } = req.params;

        let products = await Product.findAll({
            where: {
                status: AuctionProductStatus.SOLD
            },
            include: [
                {
                    model: Seller,
                    where: {
                        user_id: user_id
                    },
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
                    required: true,
                }
            ]
        })

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

module.exports = {
    add_product,
    get_product_sold,
};

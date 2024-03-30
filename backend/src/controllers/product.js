const Sequelize = require('sequelize');

const sequelize = require('../../conf/sequelize')
const logger = require('../../conf/logger')
const statusCode = require('../../constants/status')
const Product = require('../models/product');
const Image = require('../models/image')
const { upload_image, delete_image } = require('./util/image')

let add_product = async (req, res) => {
    const t = await sequelize.transaction();
    let imagesToDelete = [];
    try {
        const { user_id, title, description, artist } = req.body;
        const images = await Promise.all(req.files.map(async file => {
            const result = await upload_image(file.path.replace(/\\/g, '/'), "product");
            imagesToDelete.push(result.url);
            return result.url;
        }));

        const product = await Product.create(
            {
                title: title,
                description: description,
                owner_id: user_id,
                artist: artist,
            },
            { transaction: t }
        );

        await Image.bulkCreate(images.map(image => ({
            path: image,
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

module.exports = {
    add_product,
    get_product_detail
};

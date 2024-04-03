const Sequelize = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')
const Product = require('../../models/product');
const Image = require('../../models/image')
const { upload_image, delete_image } = require('../util/image');
const Category = require('../../models/category');
const Seller = require('../../models/seller');

let add_product = async (req, res) => {
    const t = await sequelize.transaction();
    let imagesToDelete = [];
    try {
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

module.exports = {
    add_product,
};

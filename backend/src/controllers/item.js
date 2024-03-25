const Sequelize = require('sequelize');

const sequelize = require('../../conf/sequelize')
const logger = require('../../conf/logger')
const ImageType = require('../../constants/image_type')
const statusCode = require('../../constants/status')
const Item = require('../models/item');
const Image = require('../models/image')

let add_item = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user_id, title, description, provenance } = req.body;
        const images = req.files.map(file => ({
            path: file.path.replace(/\\/g, '/'),
            type: ImageType.IMAGE_ITEM
        }));

        const item = await Item.create(
            {
                title: title,
                description: description,
                user_id: user_id,
                provenance: provenance,
            },
            { transaction: t }
        );

        await Image.bulkCreate(images.map(image => ({
            ...image,
            item_id: item.id
        })), { transaction: t });

        await t.commit();

        logger.info(`${statusCode.HTTP_201_CREATED} [item:${item.id}]`)

        res.status(statusCode.HTTP_201_CREATED).json(item)
    } catch (error) {
        logger.error(`Add item: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_item_detail = async (req, res) => {
    try {
        const item_id = req.params.item_id;

        const item = await Item.findByPk(item_id, {
            include: Image,
        });

        if (!item) {
            logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy item`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Không tìm thấy item");
        }

        logger.info(`${statusCode.HTTP_200_OK} [item:${item.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(item);
    } catch (error) {
        logger.error(`Get item detail: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = {
    add_item,
    get_item_detail
};

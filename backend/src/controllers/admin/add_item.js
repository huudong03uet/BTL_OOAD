const sequelize = require('../../../conf/sequelize')
const ImageType = require('../../../constants/image_type')
const statusCode = require('../../../constants/status')
const logger = require('../../../conf/logger')
const Item = require('../../models/item');
const Image = require('../../models/image')

let add_item = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user_id, name, description } = req.body;
        const images = req.files.map(file => ({
            path: file.path,
            type: ImageType.IMAGE_ITEM
        }));

        const item = await Item.create(
            {
                name: name,
                description: description,
                user_id: user_id,
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
    }
}

module.exports = {
    add_item
};

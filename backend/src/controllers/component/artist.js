const { Op, fn } = require('sequelize');

const statusCode = require('../../../constants/status');
const logger = require("../../../conf/logger");
const Product = require('../../models/product');
const Image = require('../../models/image');

let get_artist = async (req, res) => {
    try {
        const artists = await Product.findAll({
            attributes: ['artist'], // Chỉ lấy cột artist
            where: {
                [Op.and]: [
                    fn('RAND') < 0.5,
                ]
            },
            include: [
                {
                    model: Image,
                    attributes: ["url"],
                    limit:1,
                }
            ], 
            group: ['artist'], 
            limit: 10,
        });

        let result = []
        for (let artist of artists) {
            let out = {}
            out["name"] = artist.artist
            out["image"] = artist.images[0].url
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} artists length ${artists.length}`);
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Get Artist: ${error}`);
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = {
    get_artist
};

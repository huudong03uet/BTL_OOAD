const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')
const LoveProduct = require('../../models/product_love');
const { check_required_field } = require('../util');


let create_love = async (req, res) => {
    try {
        if (!check_required_field(req.body, ["product_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await LoveProduct.create({
            user_id: req.body.user_id,
            product_id: req.body.product_id
        });

        logger.info(`${statusCode.HTTP_202_ACCEPTED} DONE`)
        return res.status(statusCode.HTTP_200_OK).json("DONE")
    } catch (error) {
        logger.error(`create love: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let check_user_love_product = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["product_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let temp = await LoveProduct.findOne({
            where: req.params
        })

        if (temp) {
            logger.info(`${statusCode.HTTP_200_OK} true`)
            return res.status(statusCode.HTTP_200_OK).json(true)
        }

        logger.info(`${statusCode.HTTP_200_OK} false`)
        return res.status(statusCode.HTTP_200_OK).json(false)
    } catch (error) {
        logger.error(`create love: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let delete_love = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["product_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await LoveProduct.destroy({
            where: {
                user_id: req.params.user_id,
                product_id: req.params.product_id
            }
        });

        logger.info(`${statusCode.HTTP_202_ACCEPTED} DONE`)
        return res.status(statusCode.HTTP_200_OK).json("DONE")
    } catch (error) {
        logger.error(`create love: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = {
    create_love,
    delete_love,
    check_user_love_product,
};

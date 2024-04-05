const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')
const Product = require('../../models/product');
const { check_required_field } = require('../util');


let update_product = async (req, res) => {
    try {
        if (check_required_field(req.body, ["is_inspect", "product_id"])) {
            let product = await Product.update({ is_inspect: req.body.is_inspect }, { where: { id: req.body.product_id } });

            logger.info(`${statusCode.HTTP_202_ACCEPTED} [product: ${product.id}]`)
            res.status(statusCode.HTTP_202_ACCEPTED).json(product)
        } else if (check_required_field(req.body, ["status", "product_id"])) {
            let product = await Product.findByPk(req.body.product_id)

            if (product.is_inspect) {
                product.status = req.body.status;
                product.save();

                logger.info(`${statusCode.HTTP_202_ACCEPTED} [product: ${product.id}]`)
                res.status(statusCode.HTTP_202_ACCEPTED).json(product)
            }

            logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [product: ${product.id}]`)
            res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Product not update status cannot be repaired without inspection")
        }

        logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
        return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = {
    update_product
};

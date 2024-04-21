const { Sequelize, Op } = require('sequelize');

const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")
const { check_required_field } = require("../util")

const Location = require('../../models/location');
const User = require('../../models/user');


let get_location = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["location_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const location_id = req.params.location_id;

        const location = await Location.findByPk(location_id);

        logger.info(`${statusCode.HTTP_200_OK} [location:${location_id}]`)
        return res.status(statusCode.HTTP_200_OK).json(location)
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let analist_location = async (req, res) => {
    try {
        const analist_location = await User.findAll({
            attributes: [
                'Location.postal_code',
                'Location.country',
                [Sequelize.fn('COUNT', Sequelize.col('User.id')), 'quantity']
            ],
            include: [{
                model: Location,
                attributes: ['postal_code', 'country'],
                where: Sequelize.literal('`User`.`location_id` = `Location`.`id`')
            }],
            group: ['Location.postal_code', 'Location.country'],
            having: Sequelize.where(Sequelize.fn('COUNT', Sequelize.col('User.id')), '>=', 1)
        });

        let result = []
        for(let x of analist_location) {
            let out = {}
            out["quantity"] = x.dataValues.quantity
            out["postal_code"] = x.location.postal_code
            out["country"] = x.location.country
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_202_ACCEPTED} location length:${result.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result)
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_location,
    analist_location
};

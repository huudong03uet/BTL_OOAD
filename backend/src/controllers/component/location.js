const { Op } = require('sequelize');

const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")
const { check_required_field } = require("../util")

const Location = require('../../models/location');


let get_location = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["location_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const location_id = req.params.location_id;

        const location = await Location.findByPk(location_id);

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [location:${location_id}]`)
        return res.status(statusCode.HTTP_200_OK).json(location)
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_location
};

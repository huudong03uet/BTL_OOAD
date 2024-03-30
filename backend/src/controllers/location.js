const { Op } = require('sequelize');

const statusCode = require('../../constants/status')
const logger = require("../../conf/logger")
const get_coordinate = require("./util/coordinate")

const Location = require('../models/location');


let get_location = async (req, res) => {
    try {
        const location_id = req.params.location_id;

        const location = await Location.findByPk(location_id);

        logger.info(`${statusCode.HTTP_202_ACCEPTED} [location:${location_id}]`)
        return res.status(statusCode.HTTP_200_OK).json(location)
    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

function _remove_diacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


let find_or_create_location = async (country, address, city, state, postal_code, transaction) => {
    try {
        const {x, y} = await get_coordinate(`${_remove_diacritics(city)}, ${_remove_diacritics(country)}`)

        const locationData = {
            country: country,
            address: address,
            city: city,
            state: state,
            postal_code: postal_code,
            x: x,
            y: y
        };

        Object.keys(locationData).forEach(key => locationData[key] === undefined && delete locationData[key]);

        const [location, created] = await Location.findOrCreate({
            where: locationData,
            transaction: transaction
        });

        logger.info(`Find or Create: Create: ${created}, [location: ${location.id}]`)
        return location
    } catch (error) {
        logger.error(`Set Location: ${error}`)
        return error
    }
}


module.exports = {
    get_location,
    find_or_create_location,
};

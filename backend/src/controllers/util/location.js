const logger = require("../../../conf/logger")
const get_coordinate = require("../util/coordinate")

const Location = require('../../models/location');

function _remove_diacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


let find_or_create_location = async (country, address, city, state, postal_code, transaction) => {
    try {
        let x = 0;
        let y = 0;
        if (!city && !country) {
            const coordinates = await get_coordinate(`${_remove_diacritics(city)}, ${_remove_diacritics(country)}`);
            x = coordinates.x;
            y = coordinates.y;
        }

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


module.exports = find_or_create_location

const logger = require('../../../conf/logger')


let get_coordinate = async (country_city) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country_city)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            logger.info(`Get Coordinate: ${data[0]}`)
            return {
                x: parseFloat(data[0].lat),
                y: parseFloat(data[0].lon)
            };
        } else {
            logger.error(`Get Coordinate: ${country_city}`)
        }
    } catch (error) {
        logger.error(`Get Coordinate: ${country_city}`)
    }
}


module.exports = get_coordinate;
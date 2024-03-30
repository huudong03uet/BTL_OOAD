const cloudinary = require('../../../conf/cloudinary')
const logger = require("../../../conf/logger")

function upload_image(image_path, folder_name) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image_path, { folder: folder_name }, (error, result) => {
            if (error) {
                logger.error(`Upload image: ${error}`)
                reject(error);
            } else {
                logger.info(`Upload image: ${result}`)
                resolve(result);
            }
        });
    })
}


async function delete_image(image_url) {
    try {
        const result = await cloudinary.uploader.destroy(image_url);

        logger.info(`Delete image: ${result}`)
        return result;
    } catch (error) {
        logger.error(`Delete image: ${error}`);
    }
}


module.exports = { upload_image, delete_image }

const cloudinary = require('cloudinary').v2;
const logger = require('./logger')
require('dotenv').config({ path: './conf/.env' })


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


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

module.exports = upload_image;

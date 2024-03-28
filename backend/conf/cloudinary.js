const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './conf/.env' })


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


function upload_image(image_path) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image_path, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = upload_image;

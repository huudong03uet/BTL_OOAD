const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('./logger')
require('dotenv').config({path: './conf/.env'})


const product = process.env.MEDIA + process.env.PRODUCT
const avatar = process.env.MEDIA + process.env.AVATAR

if (!fs.existsSync(product)) {
    fs.mkdirSync(product, { recursive: true });
}

if (!fs.existsSync(avatar)) {
    fs.mkdirSync(avatar, { recursive: true });
}

const STORAGE_PRODUCT = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, product); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const UPLAOD_PRODUCT = multer({ storage: STORAGE_PRODUCT });
const UPLAOD_AVATAR = multer({ dest: avatar });

module.exports = {UPLAOD_PRODUCT, UPLAOD_AVATAR}

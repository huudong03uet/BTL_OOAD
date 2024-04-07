const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const MEDIA = "media/";
const PRODUCT_FOLDER = MEDIA + 'products/';

if (!fs.existsSync(PRODUCT_FOLDER)) {
    fs.mkdirSync(PRODUCT_FOLDER, { recursive: true });
}

// const upload = multer({
//     dest: MEDIA + 'products/'
// });

// router.post('/add-product', upload.single('images'), productController.add_product)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PRODUCT_FOLDER); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.array('images', 5), productController.add_product)

module.exports = router;

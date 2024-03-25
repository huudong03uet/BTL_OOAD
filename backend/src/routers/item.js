const express = require('express')
const multer = require('multer');
const path = require('path');

const router = express.Router();
const itemController = require("../controllers/item")

const MEDIA = "media/"

// const upload = multer({
//     dest: MEDIA + 'items/'
// });

// router.post('/add-item', upload.single('images'), itemController.add_item)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MEDIA + 'items/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add-item', upload.array('images', 5), itemController.add_item)
router.get('/detail-item/item_id=:item_id', itemController.get_item_detail)

module.exports = router;

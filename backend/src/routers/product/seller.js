const express = require("express")
const router = express.Router();
const productController = require("../../controllers/product/seller")

const UPLOAD = require('../../../conf/storage')

router.post("/product/create", UPLOAD.UPLAOD_PRODUCT.array('images', 5), productController.add_product);

module.exports = router;

const express = require("express")
const router = express.Router();
const registerSellerController = require('../../controllers/seller/register')
const auctionController = require("../../controllers/seller/auction")
const productController = require("../../controllers/seller/product")

const UPLOAD = require('../../../conf/storage')


router.post("/register", registerSellerController.register);

router.post("/auciton/create", auctionController.create_auction);
router.post("/auction/add/product", auctionController.add_product);
router.post("/auction/add/user", auctionController.add_user);

router.post("/product/create", UPLOAD.UPLAOD_PRODUCT.array('images', 5), productController.add_product);

module.exports = router;

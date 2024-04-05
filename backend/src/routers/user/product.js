const express = require("express");

const router = express.Router();
const productController = require("../../controllers/user/product");

router.get("/all-product", productController.get_products);

module.exports = router;

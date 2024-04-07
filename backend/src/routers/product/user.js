const express = require("express");

const router = express.Router();
const productController = require("../../controllers/product/user");

router.get("/all-product", productController.get_products);
router.get('/all-category', productController.get_categories)

module.exports = router;
const express = require("express");

const router = express.Router();
const productController = require("../../controllers/product/user");

router.get("/all-product", productController.get_products);
router.get('/all-category', productController.get_categories)
router.get('/detail/product_id=:product_id', productController.get_product_detail)

module.exports = router;

const express = require("express");

const router = express.Router();
const productController = require("../../controllers/product/user");

router.get("/all-product", productController.get_products);
router.get('/all-category', productController.get_categories)
router.get('/detail/product_id=:product_id/user_id=:user_id', productController.get_product_detail)
router.get('/recently/user_id=:user_id', productController.get_product_recently)
router.get('/product-accept', productController.get_product_accept)
module.exports = router;
